import { EventItem } from '@/components/EventItem';
import { Layout } from '@/components/Layout';
import { API_URL } from '@/config/index';
import { GetStaticProps, InferGetServerSidePropsType } from 'next';
import Link from 'next/link';
import { IEventResponse } from 'types/interface';

const Home = (props: InferGetServerSidePropsType<typeof getStaticProps>) => {
  const { events } = props;
  return (
    <Layout
      title="DJ Events | All Events"
      description="List of all dj and musical events near you"
    >
      <h1>Upcoming events</h1>
      {events?.data?.length === 0 && <h3>No events to show</h3>}
      {events?.data?.map((event) => (
        <EventItem key={event.attributes.id} {...event} />
      ))}
      {events?.data?.length && (
        <Link href="/events" className="btn-secondary">
         View All Events
        </Link>
      )}
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<{
  events?: IEventResponse;
}> = async () => {
  const res = await fetch(`${API_URL}/api/events?populate=*&sort=date%3Adesc&pagination[pageSize]=3`);
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
