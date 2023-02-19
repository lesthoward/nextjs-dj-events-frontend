import { Layout } from '@/components/Layout';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Event = () => {
  const router = useRouter();
  return (
    <Layout
      title="DJ Events | Find the hottest parties"
      description="Find the latest DJ and other musical events"
    >
      <h1>Event</h1>
    </Layout>
  );
};

export default Event;
