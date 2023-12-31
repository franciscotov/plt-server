import { Request, Response } from "express";
import {
  ReqHeader,
  UserAttributes,
  UserBase,
} from "../sequelize/models/interfaces/interfaces.ts";
import { GoogleUser } from "../sequelize/models/types/index.ts";
import { getFirstName, getLastName } from "./utils.ts";
import User, { UserInput, encryptPassword } from "../sequelize/models/User.ts";
import Role from "../sequelize/models/Role.ts";
import { createPlayer } from "./playerService.ts";

const jwt = require("jsonwebtoken");
// const { sendEmail } = require("./emailService");
// const { getCurrentDomainFront } = require("../config/currentDomain");

async function getAllUsers() {
  try {
    return await User.findAll(
      { include: [] }
      // { attributes: { exclude: ["password"] } }
    );
  } catch (error: any) {
    throw new Error(error);
  }
}

async function getUserByEmail(email: string) {
  try {
    return await User.findOne({ where: { email: email } });
  } catch (error: any) {
    throw new Error(error);
  }
}

async function getUserById(id: number) {
  //@ Lau para usar en boton promote
  try {
    return await User.findOne({ where: { id } });
  } catch (error: any) {
    throw new Error(error);
  }
}

async function createUser(user: UserBase) {
  const { name, lastname, password, email, roleId, google } = user;
  try {
    if (!google) {
      let [newUser, created] = await User.findOrCreate({
        where: { email },
        defaults: {
          name,
          lastname,
          password,
          email,
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
      const [user, created] = await User.findOrCreate({
        where: { email },
        defaults: {
          name,
          lastname,
          password,
          email,
          // roleId,
          google,
        },
      });
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
    roleId,
    address,
    dni,
    phoneNumber,
    newsletter,
  } = user;
  let obj: any = {};
  if (password && newPassword) {
    const userPassword = await User.findOne({
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
    // if (userPassword) {
    //   const hashed = User.encryptPassword(password, userPassword.salt());
    //   if (hashed === userPassword.password()) {
    //     obj.password = newPassword;
    //   } else if (hashed !== userPassword.password()) {
    //     return {
    //       __typename: "error",
    //       name: "error",
    //       detail: "Invalid password",
    //     };
    //   }
    // }
  }
  if (!password && newPassword) obj.password = newPassword;
  if (name) obj.name = name;
  if (email) obj.email = email;
  if (roleId) obj.role = roleId;
  if (address) obj.address = address;
  if (dni) obj.dni = dni;
  if (phoneNumber) obj.phoneNumber = phoneNumber;
  if (newsletter) obj.newsletter = newsletter; //**********/

  try {
    if (id) {
      let user = await User.findOne({ where: { id } });
      let newUser = await user?.update(obj, {
        attributes: { exclude: ["password", "salt"] },
      });
      return { __typename: "user", ...newUser?.dataValues };
    } else if (email && !id) {
      let user = await User.findOne({ where: { email } });
      let newUser = await user?.update(obj, {
        attributes: { exclude: ["password", "salt"] },
      });
      return { __typename: "user", ...newUser?.dataValues };
    }
  } catch {
    return { __typename: "error", name: "error", detail: "Invalid user" };
  }
}

//---- LOGIN WHIT GOOGLE  ----
async function loginUserWithGoogle(req: Request, res: Response) {
  const googleUser: GoogleUser = req.body;
  const role = await Role.findOne({ where: { id: 2 } });
  const userToCreated: UserInput = {
    email: googleUser.email || "",
    name: getFirstName(googleUser.displayName || ""),
    lastname: getLastName(googleUser.displayName || ""),
    google: true,
    password: "1234",
    roleId: role?.id,
  };
  try {
    const [newUser, created] = await User.findOrCreate({
      where: { email: userToCreated.email },
      defaults: { ...userToCreated },
    });
    if (created) {
      const player = await createPlayer(newUser);
      if (!player) {
        throw new Error("Can't create the new player");
      }
    }
    const token = jwt.sign(
      {
        id: userToCreated.email,
        name: googleUser.displayName,
      },
      "secret",
      { expiresIn: 60 * 60 }
    );
    userToCreated.token = token;
    return res.status(200).send(userToCreated);
  } catch (error) {
    return res.status(400).send(error);
  }
}

async function resetPassword(id: number) {
  try {
    const user = await User.findOne({
      where: {
        id: id,
      },
    });
    const token = jwt.sign(
      {
        id: user?.id,
        email: user?.email,
      },
      "resetPassword",
      { expiresIn: 60 * 60 }
    ); //60*60 = 3600 seg = 1 hour
    // let urlReset = `${getCurrentDomainFront()}/reset-password?resetToken=${token}&email=${user.email}`
    let textEmail = `<html>`;
    textEmail += `<span>Hi ${user?.name}</span><br>`;
    // textEmail += `<span>If you wanna reset your password click <a href=${urlReset}>here</a></span><br>`;
    textEmail += `<span>Have a good day!</span><br><br>`;
    textEmail += `<span>Codebakery</span>`;

    return {
      __typename: "user",
      id: user?.id,
      name: user?.name,
      email: user?.email,
      // role: user?.role,
      token: token,
    };
  } catch (err: any) {
    console.error(err.message);
    return {
      __typename: "error",
      name: "Not Found",
      detail: "Not Found",
    };
  }
}

async function loginUser(req: Request, res: Response) {
  const { email, password }: ReqHeader = req.headers as ReqHeader;
  const user: User | null = await User.findOne({
    where: {
      email: email,
    },
    include: [Role],
    // exclude: ["roleId"],
  });
  if (!user) {
    return res.status(400).send({
      __typename: "error",
      name: "The user doesn't exists",
      detail: "The user doesn't exists",
    });
  }
  if (user) {
    const hashed = encryptPassword(password, user.getDataValue("salt"));
    if (hashed === user.getDataValue("password")) {
      const token = jwt.sign(
        {
          id: user.id,
          name: user.name,
        },
        "secret",
        { expiresIn: 60 * 60 }
      );
      return res.status(200).send({
        id: user.id,
        name: user.name,
        email: user.email,
        token: token,
        role: user.get("Role"),
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
    const userToDelete = await User.findByPk(id);
    await userToDelete?.destroy();

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
