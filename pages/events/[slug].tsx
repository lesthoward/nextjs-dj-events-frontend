import Link from 'next/link';
import { useRouter } from 'next/router';

const Event = () => {
  const router = useRouter();
  return (
    <>
      <h1>Event Slug</h1>
      {router.query.slug}
      <div>
        <Link href="/">Go back to home</Link>
      </div>
    </>
  );
};

export default Event;
