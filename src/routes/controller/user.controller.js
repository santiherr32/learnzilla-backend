import "dotenv/config";

import { Student } from "../../db.js";


const loginGoogle = async (req, res, next) => {
  const { firstName, lastName, email, tokenId } = req.body;
  try {
    let student = await Student.findOne({
      where: { email },
    });
    if (!student) {
      student = await Student.create({
        name: firstName,
        lastname: lastName,
        email,
        username: email,
        tokenId,
      });
    }
    res.status(200).json(student);
  } catch (err) {
    next(err);
  }
};

export { loginGoogle, };