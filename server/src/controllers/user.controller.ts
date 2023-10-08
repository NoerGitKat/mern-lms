import { NextFunction, Request, Response } from "express";
import { ErrorHandler, createActivationToken, sendEmail } from "../utils";
import { userModel } from "../models";
import { IRegistrationBody } from "../types";
import { renderFile } from "ejs";
import { join } from "path";
import { validationResult } from "express-validator";

export async function registerUser(req: Request, res: Response, next: NextFunction) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(422).json({ errors: result.array() });
  }

  try {
    const { name, email, password } = req.body;

    const isEmailExists = await userModel.findOne({ email });
    if (isEmailExists) return next(new ErrorHandler("Email already exists!", 422));

    const newUser: IRegistrationBody = {
      name,
      email,
      password,
    };

    const { activationCode, token } = createActivationToken(newUser);

    const data = { user: newUser.name, activationCode };

    const html = await renderFile(join(__dirname, "../emails/account-activation.ejs"), data);

    await sendEmail({
      email,
      subject: "Activate your account!",
      template: "account-activation.ejs",
      data,
    });

    return res.status(201).json({
      success: true,
      message: `Please check the inbox for ${email} for an activation link!`,
      activationCode: token,
    });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 400));
  }
}
