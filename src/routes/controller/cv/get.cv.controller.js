import { Cv } from "../../../db.js";
import { HttpError } from "../../../utils/HttpError.js";

const getCvs = async (req, res, next) => {
  try {
    const cvs = await Cv.findAll();
    res.send(cvs);
  } catch (error) {
    next(error);
  }
};

const getCv = async (req, res, next) => {
  const { id } = req.params;
  try {
    const cv = await Cv.findByPk(id);
    if (!cv) {
      throw new HttpError(404, { message: "El cv no existe" });
    }
    res.send(cv);
  } catch (error) {
    next(error);
  }
};

export { getCvs,
  getCv, };