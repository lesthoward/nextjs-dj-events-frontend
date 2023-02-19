import Link from 'next/link';

const Home = () => {
  return (
    <>
      <h1>Home</h1>
      <div>
        <Link href="/about">About</Link>
        <Link href="/events">Events</Link>
      </div>
      <div>
        <Link href="/events/slug">A Single Event</Link>
      </div>
    </>
  );
};

export default Home;
