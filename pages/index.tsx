import { Layout } from '@/components/Layout';
import Link from 'next/link';

const Home = () => {
  return (
    <Layout
      title="DJ Events | Find the hottest parties"
      description="Find the latest DJ and other musical events"
    >
      <h1>Home</h1>
      <ul>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/events">All Events</Link>
        </li>
        <li>
          <Link href="/events/1">Event 1</Link>
        </li>
      </ul>
    </Layout>
  );
};

export default Home;
