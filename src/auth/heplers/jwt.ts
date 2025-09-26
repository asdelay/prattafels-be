import jwt from 'jsonwebtoken';

export const generateTokens = ({
  email,
  fullName,
}: {
  email: string;
  fullName: string;
}) => {
  const newAccessToken = jwt.sign(
    { email, fullName },
    process.env.JWT_ACCESS_SECRET as string,
    {
      expiresIn: '15m',
    },
  );

  const newRefreshToken = jwt.sign(
    { email, fullName },
    process.env.JWT_REFRESH_SECRET as string,
    {
      expiresIn: '30d',
    },
  );

  return { newAccessToken, newRefreshToken };
};

export const verifyAccessToken = (accessToken: string) => {
  const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET!);

  return decoded;
};

export const verifyRefreshToken = (refreshToken: string) => {
  const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!);

  return decoded;
};
