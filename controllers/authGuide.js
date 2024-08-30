import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Guide } from "../models/Guide.js";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.SECRET_KEY;
/*
{
    "firstname": "nametwo",
    "lastname": "nametwo",
    "emailid": "nametwo@gmail.com",
    "phonenumber": "1111111111",
    "password": "password"
}
 */

export const registerGuide = async (req, res) => {
  try {
    if (
      !req.body.firstname ||
      !req.body.lastname ||
      !req.body.emailid ||
      !req.body.phonenumber ||
      !req.body.password
    ) {
      return res.status(400).send({
        message:
          "Send all required fields: firstname, lastname, emailid, phonenumber, password",
      });
    }

    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const emailid = req.body.emailid;
    const phonenumber = req.body.phonenumber;
    const password = req.body.password;

    // unique user
    let guide = await Guide.findOne({ emailid });
    if (guide) {
      return res.status(400).send({ message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    guide = await Guide.create({
      firstname: firstname,
      lastname: lastname,
      emailid: emailid,
      phonenumber: phonenumber,
      password: hashedPassword,
    });

    return res.status(201).send({ message: "User registered successfully." });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
};

/*
{
  "emailid": "",
  "password": ""
}
 */
export const loginGuide = async (req, res) => {
  try {
    // validate fields
    if (!req.body.emailid || !req.body.password) {
      return res.status(400).send({
        message: "Send all required fields: emailid and password.",
      });
    }

    const emailid = req.body.emailid;
    const password = req.body.password;

    // check if User exists
    const guide = await Guide.findOne({ emailid });
    if (!guide) {
      return res.status(400).send({
        message: "Invalid credentials.",
      });
    }

    // compare the password
    const isMatch = await bcrypt.compare(password, guide.password);
    if (!isMatch) {
      return res.status(401).send({ message: "Invalid credentials." });
    }

    // generate JWT
    const payload = { userId: guide._id };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: 86400 });
    const userId = guide._id;

    return res.status(201).send({ token: token, userId: userId });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
};
