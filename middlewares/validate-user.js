import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const validateUser = async (req, res, next) => {
  const accesstoken = req.cookies.goat;
  const refreshtoken = req.cookies.nama;

  console.log("the cookies i set => ", { accesstoken, refreshtoken });

  // use the cookies to protect stuff
  if (!accesstoken) {
    if (!refreshtoken) {
      return res.status(403).json({
        success: false,
        message: "session expired",
      });
    } else {
      jwt.verify(refreshtoken, process.env.ada, async (err, decoded) => {
        if (err) {
          return res.status(403).json({
            success: false,
            message: "invalid token",
          });
        } else {
          // console.log("the decoded jwt token for refresah => ", decoded);
          const validuser = await User.findById(decoded.tttete).exec();

          if (!validuser) {
            res.status(404).json({
              success: false,
              message: "not found",
            });

            return;
          }
          // console.log("the valid user => ", validuser);

          const accesstoken = jwt.sign(
            {
              jdjdjdjd: validuser?._id,
            },
            process.env.obi,
            {
              expiresIn: process.env.mat,
            }
          );

          res.cookie("goat", accesstoken, {
            // httpOnly: true,
            // secure: true,
            sameSite: "none",
            maxAge: 5 * 1000,
          });

          const { password, ...rest } = validuser._doc;

          req.user = rest;

          next();
        }
      });
    }
  } else {
    jwt.verify(accesstoken, process.env.obi, async (err, decoded) => {
      if (err) {
        return res.status(403).json({
          success: false,
          message: "invalid token",
        });
      } else {
        // console.log("the decoded jwt token for access => ", decoded);
        const validuser = await User.findById(decoded.jdjdjdjd).exec();

        if (!validuser) {
          res.status(404).json({
            success: false,
            message: "not found",
          });

          return;
        }
        // console.log("the valid user => ", validuser);
        const { password, ...rest } = validuser._doc;

        req.user = rest;
        next();
      }
    });
  }
};
