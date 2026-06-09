import { Order } from "../../../db.js";

const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.findAll({});
    res.status(200).send(orders);
  } catch (error) {
    error.status = 404;
    error.body = error;
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
      res.status(404).send({ message: "No se encontro el pedido" });
    }
    res.status(200).send(order);
  } catch (error) {
    error.status = 404;
    error.body = error;
    next(error);
  }
};

export { getOrders,
  getOrder, };