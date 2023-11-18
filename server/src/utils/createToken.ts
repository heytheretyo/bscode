import { sign } from "jsonwebtoken";
import { User } from "@prisma/client";

export const createTokens = (user: User) => {
  const refreshToken = sign(
    { userId: user.id },
    process.env.REFRESH_TOKEN_SECRET as string,
    {
      expiresIn: "14d",
    }
  );

  const accessToken = sign(
    { userId: user.id },
    process.env.ACCESS_TOKEN_SECRET as string,
    {
      expiresIn: "15min",
    }
  );

  return { refreshToken, accessToken };
};
