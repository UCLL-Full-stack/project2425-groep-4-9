import Head from 'next/head';
import Header from '@components/header';
import UserRegisterForm from '@components/user/UserRegisterForm';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Register: React.FC = () => {
    return (
        <>
            <Head>
                <title>Registreer user</title>
            </Head>
            <Header />
            <main>
                <section className="p-6 min-h-screen flex flex-col items-center">
                    <UserRegisterForm />
                </section>
            </main>
        </>
    );
};

import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { locale } = context;

    return {
        props: {
            ...(await serverSideTranslations(locale ?? 'en', ['common'])),
        },
    };
};

export default Register;
