import Image from 'next/image';
import Link from 'next/link';
import styles from '@/styles/EventItem.module.css';
import { IEvent } from 'types/interface';

export const EventItem = (props: IEvent) => {
  const { image, name, date, time } = props;
  return (
    <div className={styles.event}>
      <div className={styles.img}>
        <Image
          src={image || '/images/event-default.png'}
          width={170}
          height={100}
          alt={name}
        />
      </div>

      <div className={styles.info}>
        <span>
          {date} at {time}
        </span>
        <h3>{name}</h3>
      </div>

      <div className={styles.link}>
        <Link href={`/events/${props.slug}`} className="btn">
          Details
        </Link>
      </div>
    </div>
  );
};
