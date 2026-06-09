import { Cv } from "../../../db.js";

const getCvs = async (req, res, next) => {
  try {
    const cvs = await Cv.findAll();
    res.send(cvs);
  } catch (error) {
    error.status = 404;
    error.body = error;
    next(error);
  }
};

const getCv = async (req, res, next) => {
  const { id } = req.params;
  try {
    const cv = await Cv.findByPk(id);
    if (!cv) {
      return res.status(404).send({ message: "El cv no existe" });
    }
    res.send(cv);
  } catch (error) {
    error.status = 404;
    error.body = error;
    next(error);
  }
};

export { getCvs,
  getCv, };