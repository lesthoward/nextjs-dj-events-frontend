import { Layout } from '@/components/Layout';
import { API_URL } from '@/config/index';
import { GetStaticPaths, GetStaticProps } from 'next';
import { IEvent, IEventResponse } from 'types/interface';
import { InferGetServerSidePropsType } from 'next';
import styles from '@/styles/Event.module.css';
import Link from 'next/link';
import * as Icons from 'react-icons/fa';
import Image from 'next/image';

const Event = (props: InferGetServerSidePropsType<typeof getStaticProps>) => {
  const { id, name, date, time, image, performers, description, address, venue } =
    props;

  const deleteEventHandler = () => {};
  return (
    <Layout
      title="DJ Events | Find the hottest parties"
      description="Find the latest DJ and other musical events"
    >
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${id}`}>
            <Icons.FaPencilAlt /> Edit Event
          </Link>
          <Link href="#" className={styles.delete}>
            <Icons.FaTimes /> Delete Event
          </Link>
        </div>
      </div>

      <span>
        {date} at {time}
      </span>
      <h1>{name}</h1>
      {image && (
        <div className={styles.image}>
          <Image src={image} width={960} height={600} alt={name} />
        </div>
      )}

      <h3>Performers: </h3>
      <p>{performers}</p>
      <h3>Description: </h3>
      <p>{description}</p>
      <h3>Venue: {venue}</h3>
      <p>{address}</p>

      <Link href='/events' className={styles.back}>
        {'< '}
        Go To Events List
      </Link>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${API_URL}/api/events`);
  const events: IEventResponse = await res.json();
  const paths = events.events.map((event) => ({
    params: { slug: event.slug },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<IEvent> = async (context) => {
  const { params } = context;
  if (!params) {
    return {
      notFound: true,
    };
  }
  const res = await fetch(`${API_URL}/api/events/${params.slug}`);
  const events: IEvent[] = await res.json();
  if (!events.length) {
    return {
      notFound: true,
    };
  }
  return {
    props: events[0],
  };
};

// export const getServerSideProps: GetServerSideProps<IEvent> = async (
//   context
// ) => {
//   const {
//     query: { slug },
//   } = context;
//   const res = await fetch(`${API_URL}/api/events/${slug}`);
//   const events: IEvent[] = await res.json();
//   return {
//     props: events[0] || {},
//   };
// };

export default Event;
