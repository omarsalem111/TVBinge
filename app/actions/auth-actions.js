"use server";

import { checkExistingUser, createUser, getUser } from "@/lib/db/user";
import {
  formatErrors,
  loginSchema,
  signUpSchema,
} from "@/lib/validations/auth";
import { createSession } from "@/lib/validations/session";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export async function authUser(authMode, prevState, formData) {
  const userData = Object.fromEntries(formData.entries());
  let validationResult;
  if (authMode === "login") {
    validationResult = await loginSchema.safeParseAsync(userData);
  } else {
    validationResult = await signUpSchema.safeParseAsync(userData);
  }

  if (!validationResult.success) {
    const formattedErrors = formatErrors(validationResult.error);
    return { errors: formattedErrors.fieldErrors };
  }

  const validatedFields = validationResult.data;

  if (authMode === "login") {
    const result = await loginUser(validatedFields);
    if (result.errors) return result;
  } else {
    const result = await registerUser(validatedFields);
    if (result.errors) return result;
  }
}

async function loginUser({ email, password }) {
  const user = await checkExistingUser(email);
  console.log(user);

  if (!user) {
    console.log("login error");
    return { errors: { email: ["Account doesn't exist"] } };
  }

  const passwordMatch = await bcrypt.compare(password, user.passwordHash);

  if (!passwordMatch) {
    console.log("login error");
    return { errors: { password: ["Incorrect Password"] } };
  }

  console.log(`user log in: ${user.id} `);

  await createSession(user.id);

  console.log(`Session created`);

  redirect("/");
}

async function registerUser({ username, email, password }) {
  const isExistingUser = await checkExistingUser(email);

  if (isExistingUser) {
    console.log("signup error");
    return { errors: { email: ["Email Already Exists. Log In Instead"] } };
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await createUser({
    username,
    email,
    passwordHash,
  });

  console.log(`user created: ${user.id} `);

  await createSession(user.id);

  console.log(`Session created`);

  redirect("/");
}
