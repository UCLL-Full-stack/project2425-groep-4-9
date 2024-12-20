import Head from 'next/head';
import Header from '@components/header';
import UserLoginForm from '@components/user/UserLoginForm';
import UserTable from '@components/user/UserTable';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Login: React.FC = () => {
    return (
        <>
            <Head>
                <title>User Signup</title>
            </Head>
            <Header />
            <main>
                <section className="p-6 min-h-screen flex flex-col items-center">
                    <UserLoginForm />

                    <UserTable />
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

export default Login;
