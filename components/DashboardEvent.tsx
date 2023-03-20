import styles from '@/styles/DashboardEvent.module.css';
import Link from 'next/link';
import { MouseEvent } from 'react';
import * as Icons from 'react-icons/fa';
import { IEventMe } from 'types/interface';
import { parse } from 'cookie';
import { API_URL } from '../config';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

export const DashboardEvent = (event: IEventMe) => {
  const router = useRouter();
  
  const deleteEventHandler = async (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const confirm = window.confirm('Are you sure?');
    if (confirm) {
      const { token } = parse(document.cookie);
      const url = `${API_URL}/api/events/${event.id}`;
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
        router.reload();
      }
    }
  };

  return (
    <div className={styles.event}>
      <h4>
        <Link href={`/events/${event.slug}`}>{event.name}</Link>
      </h4>
      <Link href={`/events/edit/${event.id}`} className={styles.edit}>
        <Icons.FaPencilAlt /> <span>Edit Event</span>
      </Link>
      <Link
        href={`/events/delete/${event.id}`}
        className={styles.delete}
        onClick={deleteEventHandler}
      >
        <Icons.FaTimes /> <span>Delete</span>
      </Link>
    </div>
  );
};
