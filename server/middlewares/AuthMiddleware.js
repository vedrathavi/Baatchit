import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  console.log(req.cookies);
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(401).json({
      message: "Not Authorised",
      cookies: req.cookies,
      token: req.cookies.jwt,
    });
  }
  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    if (err) {
      console.log("JWT error:", err.message);
      return res.status(403).send("Token is not valid!");
    }
    req.userId = payload.userId;
    console.log("Verified token for user:", payload.userId);
    console.log({ token });
    next();
  });
};
