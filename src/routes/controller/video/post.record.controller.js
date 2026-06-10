import { Records } from "../../../db.js";

const postRecord = async (req, res, next) => {
  try {
    const { idVideo, idStudent } = req.query;
    //*If exists a query parameter add the record to stdent_record table
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