import { sign } from "jsonwebtoken";
import { IActivationToken, IRegistrationBody } from "../types";
import { ACTIVATION_SECRET } from "../constants";

export default function createActivationToken(newUser: IRegistrationBody): IActivationToken {
  const activationCode = Math.floor(1000 * Math.random() * 9000).toString();

  const token = sign({ newUser, activationCode }, ACTIVATION_SECRET, { expiresIn: "5m" });

  return { token, activationCode };
}
