import { EventItem } from '@/components/EventItem';
import { Layout } from '@/components/Layout';
import { API_URL } from '@/config/index';
import { GetStaticProps, InferGetServerSidePropsType } from 'next';
import { IEventResponse } from 'types/interface';

const Home = (props: InferGetServerSidePropsType<typeof getStaticProps>) => {
  const { events } = props;
  return (
    <Layout
      title="DJ Events | Find the hottest parties"
      description="Find the latest DJ and other musical events"
    >
      <h1>Upcoming events</h1>
      {events.events.length === 0 && <h3>No events to show</h3>}
      {events.events.map((event) => (
        <EventItem {...event} />
      ))}
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<{
  events: IEventResponse;
}> = async () => {
  const res = await fetch(`${API_URL}/api/events`);
  const events: IEventResponse = await res.json();
  events.events.length = 3;

  if (!events) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      events,
    },
    revalidate: 1,
  };
};

export default Home;
