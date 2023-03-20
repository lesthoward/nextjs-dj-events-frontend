import styles from '@/styles/Dashboard.module.css';
import { Layout } from '@/components/Layout';
import { API_URL } from '@/config/index';
import { parseCookies } from '@/helpers/index';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useEffect } from 'react';
import { useState } from 'react';
import { IEventMe } from 'types/interface';
import { DashboardEvent } from '@/components/DashboardEvent';

const Dashboard = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { events } = props;
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, [isBrowser]);

  return (
    <Layout
      title="User Dashboard"
      description="Check your events and account details"
    >
      <div className={styles.dash}>
        <h1>Dashboard</h1>
        <h3>My Events</h3>

        {events.map((event) => (
          <DashboardEvent key={event.id} {...event} />
        ))}
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<{
  events: IEventMe[];
}> = async ({ req }) => {
  const { token } = parseCookies(req);
  const res = await fetch(`${API_URL}/api/events/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const events = await res.json();

  if (!events.length) {
    return {
      props: { events: [] },
    };
  }

  return {
    props: {
      events,
    },
  };
};

export default Dashboard;
