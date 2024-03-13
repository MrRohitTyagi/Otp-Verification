import express from "express";
import cors from "cors";
import connectTODB from "./config/db.js";
import { sendMail } from "./utils.js";
import OTP from "./model/otp-Model.js";

const app = express();
connectTODB();
app.use(cors());
app.use(express.json());

app.post("/send-otp", async (req, res) => {
  try {
    const { email } = req.body;
    const stamp = Date.now().toString();
    const token = stamp.substring(stamp.length - 4);

    await OTP.create({ email, token, isActive: true });
    sendMail(token, email);
    res.send({ success: true, msg: "Token sent successfully" });
  } catch (error) {
    console.log("error", error);
  }
});

app.post("/verify-otp", async (req, res) => {
  try {
    const { email, token } = req.body;
    const response = await OTP.findOne({ email, token });
    console.log("response", response);
    if (!response) {
      res.status(400).send({ success: true, msg: "Please enter correct otp" });
    }

    if (response.isActive) {
      await OTP.findByIdAndUpdate(response._id.toString(), {
        isActive: false,
      });
      res.send({ success: true, msg: "OTP varification successfull" });
    } else {
      res.status(400).send({
        success: true,
        msg: "This top is Expired please genrate new otp",
      });
    }
  } catch (error) {
    console.log("error", error);
  }
});

app.listen(5000, () => {
  console.clear();
  console.log("server running at port 5000");
});
