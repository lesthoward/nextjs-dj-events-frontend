import { EventItem } from '@/components/EventItem';
import { Layout } from '@/components/Layout';
import { API_URL } from '@/config/index';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { IEventResponse } from 'types/interface';
import qs from 'qs';
import Link from 'next/link';

const PerPage = 3;

const Home = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { events } = props;
  const { meta } = events;
  const lastPage = meta?.pagination?.total
    ? Math.ceil(meta.pagination.total / PerPage)
    : 1;
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

      {meta?.pagination?.page && meta?.pagination?.page > 1 && (
        <Link href={`/events?page=${meta.pagination.page - 1}`}>
          <span className="btn-secondary">Prev</span>
        </Link>
      )}
      {meta?.pagination?.page && meta?.pagination?.page < lastPage && (
        <Link href={`/events?page=${meta.pagination.page + 1}`}>
          <span className="btn-secondary">Next</span>
        </Link>
      )}
      <span>
        {meta?.pagination?.page} of {lastPage}
      </span>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<{
  events: IEventResponse;
}> = async (props) => {
  const { query } = props;
  const pageNumber = query.page ? Number(query.page) : 1;
  const queryStr = qs.stringify({
    pagination: {
      page: pageNumber,
      pageSize: PerPage,
    },
    populate: ['image'],
    sort: ['date:asc'],
  });

  // Fetch events
  const eventRes = await fetch(`${API_URL}/api/events?${queryStr}`);
  const events: IEventResponse = await eventRes.json();

  // Fetch total number of events
  const totalRes = await fetch(`${API_URL}/api/events/count`);
  const total: number = await totalRes.json();

  if (!events) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      events,
    },
  };
};

export default Home;
