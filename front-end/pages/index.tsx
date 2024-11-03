import Head from 'next/head';
import Image from 'next/image';
import Header from '@components/header';
import styles from '@styles/home.module.css';

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Soccer app</title>
        <meta name="description" content="Courses app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
        <span>
          <Image
            src="/images/voetbal.jpg"
            alt="Soccer ball"
            width={100}
            height={100}
          />
          <h1>Welcome!</h1>
        </span>

        <div className={styles.description}>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae quis numquam molestias cum rem officia a enim at optio, consequuntur sapiente iure quia quisquam corrupti nihil asperiores quo saepe odit!
          </p>
        </div>
      </main>
    </>
  );
};

export default Home;
