import jwt from "jsonwebtoken";

export const generateToken = (userId: string) => {
    return jwt.sign({ id: userId }, 'umeralikhan', {
        expiresIn: "30d",
    });
};