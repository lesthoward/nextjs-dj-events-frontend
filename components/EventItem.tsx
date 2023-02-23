import Image from 'next/image';
import Link from 'next/link';
import styles from '@/styles/EventItem.module.css';
import { IEvent } from 'types/interface';

export const EventItem = (props: IEvent) => {
  const { attributes } = props;
  const { image, name, date, time, slug } = attributes;
  return (
    <div className={styles.event}>
      <div className={styles.img}>
        <Image
          src={image ? image.data.attributes.url : '/images/event-default.png'}
          width={170}
          height={100}
          alt={name}
        />
      </div>

      <div className={styles.info}>
        <span>
          {new Date(date).toLocaleDateString('En-en')} at {time}
        </span>
        <h3>{name}</h3>
      </div>

      <div className={styles.link}>
        <Link href={`/events/${slug}`} className="btn">
          Details
        </Link>
      </div>
    </div>
  );
};
