import mongoose from "mongoose";

export const connect_DB = (cb) => {
  mongoose
    .connect(process.env.DB_URI)
    .then(() => {
      console.log("DB Connected Successfully");
      cb();
    })
    .catch((err) => {
      console.log(`DB Error Occured`, err);
    });
};
