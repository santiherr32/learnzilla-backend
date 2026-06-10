import { Order } from "../../../db.js";
import { HttpError } from "../../../utils/HttpError.js";

const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.findAll({});
    res.status(200).send(orders);
  } catch (error) {
    next(error);
  }
};

const getOrder = async (req, res, next) => {
  const { id } = req.params;
  try {
    const order = await Order.findOne({
      where: {
        id,
      },
    });
    if (!order) {
      throw new HttpError(404, { message: "No se encontro el pedido" });
    }
    res.status(200).send(order);
  } catch (error) {
    next(error);
  }
};

export { getOrders,
  getOrder, };