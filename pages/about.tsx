import { useRouter } from 'next/router';

const About = () => {
  const router = useRouter();

  return (
    <>
      <h1>About</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
        repudiandae sed illum, quasi aspernatur asperiores nihil odit tenetur,
        commodi temporibus quos officiis laborum similique iusto saepe
        laudantium reprehenderit eius odio.
      </p>
      <p>Version: 1.0.0</p>
      <button onClick={() => router.push('/')}>Go back to home page</button>
    </>
  );
};

export default About;
