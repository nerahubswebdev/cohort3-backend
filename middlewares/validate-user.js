export const validateUser = async (req, res, next) => {
  const accesstoken = req.cookies.goat;
  const refreshtoken = req.cookies.nama;

  console.log("the cookies i set => ", { accesstoken, refreshtoken });
  if (refreshtoken) {
    next();
  } else {
    res.status(400).json({
      success: false,
      message: "not well",
    });
    return;
  }
};
