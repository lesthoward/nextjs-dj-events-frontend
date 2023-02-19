import { Layout } from '@/components/Layout';
import { useRouter } from 'next/router';

const About = () => {
  const router = useRouter();

  return (
    <Layout
      title='About DJ Events'
      description='This is an app to find the latest DJ and other musical events'
    >
      <h1>About</h1>
      <p>
        This is an app to find the latest DJ and other musical events
      </p>
      <p>Version: 1.0.0</p>
      <button onClick={() => router.push('/')}>Go Back to Home</button>
    </Layout>
  );
};

export default About;
