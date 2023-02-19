import type { NextApiRequest, NextApiResponse } from 'next';
import { IEvent } from 'types/interface';
import eventsData from './data.json';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<IEvent[] | string>
) {
  if (req.method === 'GET') {
    const filteredEvents = eventsData.events.filter(
      (event) => event.slug === req.query.slug
    );
    res.status(200).json(filteredEvents);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).send('Method not allowed');
  }
}
