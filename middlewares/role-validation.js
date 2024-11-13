export const rolevalidation = async (req, res, next) => {
  const validatedUser = req.user;
  console.log("dasta from role middleware => ", validatedUser);
  if (validatedUser?.isAdmin === "ADMIN") {
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: "Unauthorized",
    });
  }
};
