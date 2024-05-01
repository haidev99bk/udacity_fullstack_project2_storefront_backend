import bcrypt from "bcrypt";
import dotEnv from "dotenv";
dotEnv.config();

export const hashPassword = (pass: string) => {
  return bcrypt.hashSync(
    pass + process.env.BCRYPT_PEPPER,
    parseInt(process.env.SALT_ROUNDS as string)
  );
};
