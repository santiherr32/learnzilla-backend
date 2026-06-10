import { Records } from "../../../db.js";

const postRecord = async (req, res, next) => {
  try {
    const { idVideo, idStudent } = req.query;
    const newRecord = await Records.create({
      idVideo,
      idStudent,
    });
    res.status(200).send(newRecord);
  } catch (error) {
    next(error);
  }
};

export { postRecord, };