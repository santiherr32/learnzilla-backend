const { BYTES, BASE, ITERATIONS, LONG_ENCRYPTION, ENCRYPT_ALGORITHM } =
  process.env;
import { randomBytes, pbkdf2 } from "crypto";

import { promisify } from "util";

const randomBytesAsync = promisify(randomBytes);
const pbkdf2Async = promisify(pbkdf2);

async function generateHashedPassword(password) {
  const salt = await randomBytesAsync(parseInt(BYTES));
  const newSalt = salt.toString(BASE);

  const key = await pbkdf2Async(
    password,
    newSalt,
    parseInt(ITERATIONS),
    parseInt(LONG_ENCRYPTION),
    ENCRYPT_ALGORITHM
  );

  const newPassword = key.toString(BASE);
  return { newPassword, newSalt };
}

async function verifyHashedPassword(password, salt, hashedPassword) {
  const key = await pbkdf2Async(
    password,
    DbUser.salt,
    parseInt(ITERATIONS),
    parseInt(LONG_ENCRYPTION),
    ENCRYPT_ALGORITHM
  );

  const newPassword = key.toString(BASE);

  return newPassword;
}

export default {
  generateHashedPassword,
  verifyHashedPassword,
};
