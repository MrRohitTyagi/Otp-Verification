import { connect } from "mongoose";

export function connectTODB() {
  connect(
    "mongodb+srv://rt8tyagi4366:IoXd37AonCqj0ipV@universal.vohiouy.mongodb.net/"
  )
    .then(() => {
      console.log("Connected to DB successfully");
    })
    .catch((err) => {
      console.log("err", err);
    });
}
export default connectTODB;
