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
      <h1>Events</h1>
      {events.data?.length === 0 && <h3>No events to show</h3>}
      {events.data?.map((event) => (
        <EventItem key={event.id} {...event} />
      ))}
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<{
  events: IEventResponse;
}> = async () => {
  const res = await fetch(`${API_URL}/api/events?populate=*`);
  const events: IEventResponse = await res.json();

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
