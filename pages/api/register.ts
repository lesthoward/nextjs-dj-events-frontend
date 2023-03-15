import cookie from 'cookie'
import { NextApiRequest, NextApiResponse } from 'next';
import { API_URL } from '@/config/index';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { username, email, password } = req.body;
    let strapiData = {} as any;
    try {
      const strapiRes = await fetch(`${API_URL}/api/auth/local/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });
      const data = await strapiRes.json();
      strapiData = data;
      if (strapiRes.ok) {
        res.setHeader(
          'Set-Cookie',
          cookie.serialize('token', data.jwt, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            maxAge: 60 * 60 * 24 * 7, // 1 week
            sameSite: 'strict',
            path: '/',
          })
        );
        res.status(200).json({ user: data });
      } else {
        res
          .status(data.error.status)
          .json({ message: data.error.details.errors[0].message });
      }
    } catch (error) {
      res.status(strapiData.error.status).json(strapiData.error);
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
