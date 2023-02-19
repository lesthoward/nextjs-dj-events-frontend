import type { NextApiRequest, NextApiResponse } from 'next';
import { IEventResponse } from 'types/interface';
import eventsData from './data.json';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<IEventResponse | string>
) {
  if (req.method === 'GET') {
    res.status(200).json(eventsData);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).send('Method not allowed');
  }
}
