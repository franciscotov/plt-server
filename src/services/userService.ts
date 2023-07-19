import { Request, Response } from "express";
import {
  UserAttributes,
  UserBase,
} from "../sequelize/models/interfaces/interfaces";
import { Users } from "../db";

const jwt = require("jsonwebtoken");
// const { sendEmail } = require("./emailService");
// const { getCurrentDomainFront } = require("../config/currentDomain");

async function getAllUsers() {
  try {
    return await Users.findAll(
      { include: [] },
      { attributes: { exclude: ["password"] } }
    );
  } catch (error: any) {
    throw new Error(error);
  }
}

async function getUserByEmail(email: string) {
  try {
    return await Users.findOne({ where: { email: email } });
  } catch (error: any) {
    throw new Error(error);
  }
}

async function getUserById(id: number) {
  //@ Lau para usar en boton promote
  try {
    return await Users.findOne({ where: { id } });
  } catch (error: any) {
    throw new Error(error);
  }
}

async function createUser(user: UserBase) {
  const { name, lastname, password, email, role, google } = user;
  try {
    if (!google) {
      let [newUser, created] = await Users.findOrCreate({
        where: { email },
        defaults: {
          name,
          lastname,
          password,
          email,
          role,
          google,
        },
      });
      if (!created) {
        if (newUser.dataValues.google) {
          newUser.update({ password, google: false });
        }
      }
      //
      return {
        __typename: "user",
        ...newUser.dataValues,
        detail: "user created",
      };
    } else {
      //
      const [user, created] = await Users.findOrCreate({
        where: { email },
        defaults: {
          name,
          lastname,
          password,
          email,
          role,
          google,
        },
      });
      // created true es por que lo creó, no existia
      // siempre devuelve el usuario, pero el detalle va en función de
      // si existia o no
      //
      if (created)
        return {
          __typename: "user",
          ...user.dataValues,
          detail: "User created",
        };
      return { __typename: "user", ...user.dataValues, detail: "Email" };
    }
  } catch (error) {
    return {
      __typename: "error",
      name: "error",
      detail: "Email already exist o invalid email",
    };
  }
}

//---- MODIFY USER ----
async function modifyUser(user: UserAttributes) {
  const {
    id,
    name,
    password,
    newPassword,
    email,
    role,
    address,
    dni,
    phoneNumber,
    newsletter,
  } = user;
  let obj: any = {};
  if (password && newPassword) {
    const userPassword = await Users.findOne({
      where: {
        email: email,
      },
    });
    if (!userPassword) {
      return {
        __typename: "error",
        name: "The user doesn't exists",
        detail: "The user doesn't exists",
      };
    }
    if (userPassword) {
      const hashed = Users.encryptPassword(password, userPassword.salt());
      if (hashed === userPassword.password()) {
        obj.password = newPassword;
      } else if (hashed !== userPassword.password()) {
        return {
          __typename: "error",
          name: "error",
          detail: "Invalid password",
        };
      }
    }
  }
  if (!password && newPassword) obj.password = newPassword;
  if (name) obj.name = name;
  if (email) obj.email = email;
  if (role) obj.role = role;
  if (address) obj.address = address;
  if (dni) obj.dni = dni;
  if (phoneNumber) obj.phoneNumber = phoneNumber;
  if (newsletter) obj.newsletter = newsletter; //**********/

  try {
    if (id) {
      let user = await Users.findOne({ where: { id } });
      let newUser = await user.update(obj, {
        attributes: { exclude: ["password", "salt"] },
      });
      return { __typename: "user", ...newUser.dataValues };
    } else if (email && !id) {
      let user = await Users.findOne({ where: { email } });
      let newUser = await user.update(obj, {
        attributes: { exclude: ["password", "salt"] },
      });
      return { __typename: "user", ...newUser.dataValues };
    }
  } catch {
    return { __typename: "error", name: "error", detail: "Invalid user" };
  }
}

//---- LOGIN WHIT GOOGLE  ----
async function loginUserWithGoogle(email: string, tokenId: string) {
  const user = await Users.findOne({
    where: {
      email,
    },
  });
  if (!user) {
    return {
      __typename: "error",
      name: "The user doesn't exists",
      detail: "The user doesn't exists",
    };
  }
  if (user) {
    const token = jwt.sign(
      {
        id: user.id,
        email,
      },
      "secret",
      { expiresIn: 60 * 60 }
    ); //60*60 = 3600 seg = 1 hour
    return {
      __typename: "user",
      id: user.id,
      name: user.name,
      email: user.email,
      token: token,
      role: user.role,
      twoFA: user.twoFA,
    };
  }
}

async function resetPassword(id: number) {
  try {
    const user = await Users.findOne({
      where: {
        id: id,
      },
    });
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      "resetPassword",
      { expiresIn: 60 * 60 }
    ); //60*60 = 3600 seg = 1 hour
    // let urlReset = `${getCurrentDomainFront()}/reset-password?resetToken=${token}&email=${user.email}`
    let textEmail = `<html>`;
    textEmail += `<span>Hi ${user.name}</span><br>`;
    // textEmail += `<span>If you wanna reset your password click <a href=${urlReset}>here</a></span><br>`;
    textEmail += `<span>Have a good day!</span><br><br>`;
    textEmail += `<span>Codebakery</span>`;

    return {
      __typename: "user",
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: token,
    };
  } catch (err: any) {
    console.log(err.message);
    return {
      __typename: "error",
      name: "Not Found",
      detail: "Not Found",
    };
  }
}

// async function loginUser(email: string, password: string) {
async function loginUser(req: Request, res: Response) {
  const { email, password } = req.headers;
  // const headers = {
  //   email: req.headers.email,
  //   password: req.headers.password,
  //   captcha: req.headers.captcha,
  //   firebaseToken: req.headers.firebasetoken,
  // };
  const user = await Users.findOne({
    where: {
      email: email,
    },
  });

  if (!user) {
    console.log('erorrr')
    return res.status(400).send({
      __typename: "error",
      name: "The user doesn't exists",
      detail: "The user doesn't exists",
    });
  }
  if (user) {
    console.log('existe')
    const hashed = Users.encryptPassword(password, user.salt());
    if (hashed === user.password()) {
      console.log('todo ok')
      const token = jwt.sign(
        {
          id: user.id,
          name: user.name,
        },
        "secret",
        { expiresIn: 60 * 60 }
      ); //60*60 = 3600 seg = 1 hour
      return res.status(200).send({
        __typename: "user",
        id: user.id,
        name: user.name,
        email: user.email,
        token: token,
        role: user.role,
        twoFA: user.twoFA,
      });
    } else {
      return res.status(400).send({
        __typename: "error",
        name: "invalid password",
        detail: "invalid password",
      });
    }
  }
}
//------ DELETE USER ---------
async function deleteUser(id: number) {
  try {
    const userToDelete = await Users.findByPk(id);
    await userToDelete.destroy();

    return { __typename: "booleanResponse", boolean: true };
  } catch (error) {
    return { __typename: "error", name: "error", detail: "User not found" };
  }
}

export {
  getAllUsers,
  createUser,
  modifyUser, //@ lau usare este para modificar el role: de usuario comun a admin
  loginUser,
  getUserByEmail,
  deleteUser,
  getUserById, //lo creo para traer datos de ese usuario a modificar -@Lau
  loginUserWithGoogle,
  resetPassword,
};