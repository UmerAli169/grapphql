import jwt from "jsonwebtoken";

const authenticateUser = (req: any, res: any, next: any) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(403).json({ message: "Unauthorized. No token found" });
  }

  try {
    const decoded = jwt.verify(token, "umeralikhan") as { userId: string };
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default authenticateUser;
