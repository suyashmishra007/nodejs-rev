const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
require("dotenv").config();
app.use(express.json());

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: process.env.SENDGRID_KEY,
    },
  })
);
const sendEmail = async () => {
  try {
    const res = await transporter.sendMail({
      to: process.env.SENDGRID_TO,
      from: process.env.SENDGRID_FROM,
      subject: "Hello , this email feature is available",
      html: "<h1>Tested successfully</h1>",
    });
    console.log(res);
    ``;
  } catch (error) {
    console.log(error);
  }
};

sendEmail();
