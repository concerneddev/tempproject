import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Tourist } from "../models/Tourist.js";
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

export const registerTourist = async (req, res) => {
  try {
    console.log("Using auth/register");
    if (!req.body.firstname || 
      !req.body.lastname ||
      !req.body.emailid ||
      !req.body.phonenumber ||
      !req.body.password 
    ) {
      return res.status(400).send({
        message: "Send all required fields: firstname, lastname, emailid, phonenumber, password",
      });
    }

    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const emailid = req.body.emailid;
    const phonenumber = req.body.phonenumber;
    const password = req.body.password;

    // unique user
    let tourist = await Tourist.findOne({ emailid });
    if (tourist) {
      return res.status(400).send({ message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    tourist = await Tourist.create({
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
export const loginTourist = async (req, res) => {
  try {
    // validate fields
    if (!req.body.emailid || !req.body.password) {
      return res.status(400).send({
        message: "Send all required fields: username and password.",
      });
    }

    const emailid = req.body.emailid;
    const password = req.body.password;

    // check if User exists
    const tourist = await Tourist.findOne({ emailid });
    if (!tourist ) {
      return res.status(400).send({
        message: "Invalid credentials.",
      });
    }

    // compare the password
    const isMatch = await bcrypt.compare(password, tourist.password);
    if (!isMatch) {
      return res.status(401).send({ message: "Invalid credentials." });
    }

    // generate JWT
    const payload = { userId: tourist._id };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: 86400 });
    const userId = tourist._id;

    return res.status(201).send({ token: token, userId: userId });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
};
