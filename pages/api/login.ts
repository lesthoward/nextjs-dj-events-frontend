import { NextApiRequest, NextApiResponse } from 'next';
import { API_URL } from '@/config/index';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { identifier, password } = req.body;
    let strapiData = {} as any;
    try {
      const strapiRes = await fetch(`${API_URL}/api/auth/local`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identifier,
          password,
        }),
      });
      const data = await strapiRes.json();
      strapiData = data;
      if (strapiRes.ok) {
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
