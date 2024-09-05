import Header from '@/app/components/layout/Header';
import Footer from '@/app/components/layout/Footer';
import '@/app/globals.css';
import { ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
}

export const metadata = {
    title: 'Abrigo Temporário',
    description: 'Conectando vítimas de enchentes a abrigos temporários',
};

export default function RootLayout({ children }: LayoutProps) {
    return (
        <html lang="pt-BR">
        <head />
        <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow mx-10">
            {children}
        </main>
        <Footer />
        </body>
        </html>
    );
}
