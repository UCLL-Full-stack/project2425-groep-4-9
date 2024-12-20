import Head from 'next/head';
import Image from 'next/image';
import Header from '@components/header';
import styles from '@styles/home.module.css';
import { useTranslation } from 'react-i18next';

const Home: React.FC = () => {
    const { t } = useTranslation();

    return (
        <>
            <Head>
                <title>Football App</title>
                <meta name="description" content="Courses app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <main className={styles.main}>
                <span>
                    <Image src="/images/voetbal.jpg" alt="Soccer ball" width={100} height={100} />
                    <h1>Welcome!</h1>
                </span>

                <div className={styles.description}>
                    Welkom in onze voetbal applicatie. Neem een kijkje rond!
                </div>
            </main>
        </>
    );
};

import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { locale } = context;

    return {
        props: {
            ...(await serverSideTranslations(locale ?? 'en', ['common'])),
        },
    };
};

export default Home;
