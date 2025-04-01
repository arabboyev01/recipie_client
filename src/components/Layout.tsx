import React, { ReactNode } from 'react';
import Head from 'next/head';
import Header from './Header';

interface LayoutProps {
    children: ReactNode;
    title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title = 'Recipe App' }) => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Head>
                <title>{title}</title>
                <meta name="description" content="Recipe application" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />

            <main className="container mx-auto px-4 py-6">
                {children}
            </main>

            <footer className="bg-gray-800 text-white text-center p-4">
                <p>© {new Date().getFullYear()} Recipe App</p>
            </footer>
        </div>
    );
};

export default Layout;