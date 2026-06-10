import "dotenv/config";
const { STRIPE_KEY } = process.env;
import { Student, Order } from "../../../db.js";
import { HttpError } from "../../../utils/HttpError.js";
import Stripe from "stripe";
const stripe = Stripe(STRIPE_KEY);

const stripePay = async (req, res, next) => {
  const { email, token, orderId } = req.body;

  try {
    const order = await Order.findOne({
      where: {
        id: orderId,
      },
    });
    if (!order) {
      throw new HttpError(404, { message: "No se encontro la orden" });
    }
    const student = await Student.findOne({
      where: {
        id: order.studentId,
      },
    });
    if (!student) {
      throw new HttpError(404, { message: "No se encontro el estudiante" });
    }

    let customer = await stripe.customers.create({
      //Crea el cliente
      email: email,
      source: token.id,
      name: token.card.name,
    });

    let charge = await stripe.charges.create({
      //Crea el cargo
      amount: parseFloat(order.amount) * 100,
      description: `Payment for USD ${order.amount}`,
      currency: "USD",
      customer: customer.id,
    });
    if (charge) {
      //Si se creo el cargo
      await student.addCourse(order.arrayCoursesId); //Agrega los cursos al estudiante
      await Order.update(
        {
          status: true,
        },
        {
          where: {
            id: order.id,
          },
        }
      );
      return res.status(200).json({ message: "Pago realizado con exito" });
    } else {
      throw new HttpError(500, { message: "Ha ocurrido un error" });
    }
  } catch (error) {
    error.status = 500;
    next(error);
  }
};

const generateOrder = async (req, res, next) => {
  const { id, studentId, coursesId, totalAmount, status } = req.body;

  try {
    const student = await Student.findOne({
      //Busca el estudiante
      where: {
        id: studentId,
      },
    });
    if (!student) {
      throw new HttpError(404, { message: "No se encontro el estudiante" });
    }

    const order = await Order.create({
      id: id,
      studentId: studentId,
      amount: totalAmount,
      arrayCoursesId: coursesId,
      status: status,
    });

    res
      .status(200)
      .json({ message: "Orden generada con exito", orderId: order.id });
  } catch (error) {
    next(error);
  }
};

export { stripePay, generateOrder };
