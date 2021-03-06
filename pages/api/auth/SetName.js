import dbConnection from "../../../util/dbConnection";
import User from "../../../models/user";
import axios from "axios";

dbConnection();

export default async (req, res) => {
  const { method } = req;
  if (method === "POST") {
    const { body } = req;
    try {
      const user = await User.findOne({
        number: body.phoneNumber
      }).exec();
      await User.findByIdAndUpdate(
        user._id,
        {
          name: body.name,
          invitedBy: body.invitedBy,
          amount: body.invitedBy.length > 0 ? 10000 : 5000,
          qr: body.qr ? true : false
        },
        (err) => console.log(err)
      );
      if (body.invitedBy.length > 0) {
        let code = atob(body.invitedBy);
        console.log(code);
        const userInv = await User.findOne({
          promoCode: code
        }).exec();
        await User.findByIdAndUpdate(
          userInv._id,
          {
            amount: userInv.amount + 5000,
            invitations: userInv.invitations ? userInv.invitations + 1 : 1
          },
          (err) => console.log(err)
        );
      }
      await axios.get(
        process.env.SMS_URL +
          "to=96170097533" +
          "&message=New user: " +
          body.name +
          "-> number: " +
          body.phoneNumber +
          " qr: " +
          body.qr
      );

      res.status(200).end("done");
    } catch (err) {
      return res.end("هناك خطأ في النظام يرجى المحاولة مجدداً");
    }
  }
};
