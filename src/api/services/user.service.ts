import bcrypt from "bcrypt";
import * as EmailValidator from "email-validator";
import { insertUser } from "../dao/user.dao";
import { User } from "../interfaces/User";

export const createUser = async (
  email: string,
  password: string
): Promise<{ user: User | null; error: string | null }> => {
  if (!EmailValidator.validate(email)) {
    return { user: null, error: "Invalid Email" };
  }
  const passwordWithPepper = `${password}${process.env.PEPPER}`;
  const saltedPassword = bcrypt.hashSync(passwordWithPepper, 10);
  const user = await insertUser(email, saltedPassword);
  return { user, error: null };
};
