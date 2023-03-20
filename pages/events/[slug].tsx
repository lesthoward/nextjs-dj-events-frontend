import 'react-toastify/dist/ReactToastify.css';
import styles from '@/styles/Event.module.css';
import Link from 'next/link';
import Image from 'next/image';
import * as Icons from 'react-icons/fa';
import { Layout } from '@/components/Layout';
import { API_URL } from '@/config/index';
import qs from 'qs';
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import { IEvent, IEventResponse } from 'types/interface';
import { InferGetServerSidePropsType } from 'next';
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { getCloudinaryImage } from 'utils/images.utils';
import { parse } from 'cookie';

const Event = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { event } = props;
  const { id, attributes } = event;
  const { name, date, time, image, performers, description, address, venue } =
    attributes;
  const router = useRouter();

  const deleteEventHandler = async () => {
    const confirmAction = confirm('Are you sure?');
    if (confirmAction) {
      const { token } = parse(document.cookie);
      const url = `${API_URL}/api/events/${id}`;
      const res = await fetch(url, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error.message || 'Something went wrong');
      } else {
        router.push('/events');
      }
    }
  };
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
          <Link href="#" className={styles.delete} onClick={deleteEventHandler}>
            <Icons.FaTimes /> Delete Event
          </Link>
        </div>
      </div>

      <ToastContainer />

      <span>
        {new Date(date).toLocaleDateString('En-en')} at {time}
      </span>
      <h1>{name}</h1>
      {image && image.data ? (
        <div className={styles.image}>
          <Image
            src={getCloudinaryImage({
              data: props.event,
            })}
            width={960}
            height={600}
            alt={name}
          />
        </div>
      ) : (
        <h1>No Image</h1>
      )}

      <h3>Performers: </h3>
      <p>{performers}</p>
      <h3>Description: </h3>
      <p>{description}</p>
      <h3>Venue: {venue}</h3>
      <p>{address}</p>

      <Link href="/events" className={styles.back}>
        {'< '}
        Go To Events List
      </Link>
    </Layout>
  );
};

// export const getStaticPaths: GetStaticPaths = async () => {
//   const res = await fetch(`${API_URL}/api/events`);
//   const events: IEventResponse = await res.json();

//   if (!events.data?.length) {
//     return {
//       paths: [],
//       fallback: true,
//     };
//   }

//   const paths = events.data.map(({ attributes: { slug } }) => ({
//     params: { slug },
//   }));

//   return {
//     paths,
//     fallback: true,
//   };
// };

// export const getStaticProps: GetStaticProps<IEvent> = async (context) => {
//   const { params } = context;
//   if (!params) {
//     return {
//       notFound: true,
//     };
//   }
//   const url = `${API_URL}/api/events?filters[slug][$eq]=${params.slug}&populate=image`;
//   const res = await fetch(url);
//   const events: IEventResponse = await res.json();

//   if (!events.data?.length) {
//     return {
//       notFound: true,
//     };
//   }
//   return {
//     props: events.data[0],
//   };
// };

export const getServerSideProps: GetServerSideProps<{
  event: IEvent;
}> = async (context) => {
  const {
    query: { slug },
  } = context;
  const eventQuery = qs.stringify({
    filters: {
      slug: {
        $eq: slug,
      },
    },
  });
  const apiEndpoint = `${API_URL}/api/events?${eventQuery}&populate=*`
  const res = await fetch(apiEndpoint);
  console.log('🚀 ~ file: [slug].tsx:156 ~ apiEndpoint:', apiEndpoint)
  const events = await res.json();
  if (!events || !events.data?.length) {
    return {
      props: {
        event: {
          attributes: {}
        },
      },
    };
  }
  return {
    props: {
      event: events.data[0],
    },
  };
};

export default Event;
