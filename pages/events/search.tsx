import { EventItem } from '@/components/EventItem';
import { Layout } from '@/components/Layout';
import { API_URL } from '@/config/index';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import qs from 'qs';
import { IEventResponse } from 'types/interface';

const Search = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { events } = props;
  const router = useRouter();
  const term = router.query.term;
  return (
    <Layout
      title="Search Results"
      description="Find the latest DJ and other musical events"
    >
      <h1>Search Results: {term}</h1>
      {events.data?.length === 0 && <h3>No events found</h3>}
      {events.data?.map((event) => (
        <EventItem key={event.id} {...event} />
      ))}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<{
  events: IEventResponse;
}> = async (props) => {
  const { query } = props;
  const searchRequest = qs.stringify({
    filters: {
      $or: [
        { name: { $containsi: query.term } },
        { performers: { $containsi: query.term } },
        { description: { $containsi: query.term } },
        { venue: { $containsi: query.term } },
      ],
    },
  });
  const res = await fetch(`${API_URL}/api/events?${searchRequest}&populate=image`);
  const events = await res.json();

  return {
    props: {
      events,
    },
  };
};

export default Search;
