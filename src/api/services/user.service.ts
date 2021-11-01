import bcrypt from "bcrypt";
import * as EmailValidator from "email-validator";
import { insertUser, getUser } from "../dao/user.dao";
import { User } from "../interfaces/User";

const concatPasswordWithPepper = (password: string): string =>
  `${password}${process.env.PEPPER}`;

export const createUser = async (
  email: string,
  password: string
): Promise<{ user: User | null; error: string | null }> => {
  if (!EmailValidator.validate(email)) {
    return { user: null, error: "Invalid Email" };
  }
  const passwordWithPepper = concatPasswordWithPepper(password);
  const saltedPassword = bcrypt.hashSync(passwordWithPepper, 10);
  const user = await insertUser(email, saltedPassword);
  return { user, error: null };
};

export const logUserIn = async (
  email: string,
  password: string
): Promise<{ user: User | null; error: string | null }> => {
  const user = await getUser(email);

  if (!user) {
    return { user: null, error: "user does not exists" };
  }

  const passwordMatch = bcrypt.compareSync(
    concatPasswordWithPepper(password),
    user.password
  );

  if (!passwordMatch) {
    return { user: null, error: "user and password combo dont match" };
  }

  return { user, error: null };
};
