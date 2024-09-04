import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import './globals.css';
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
        <head>
        </head>
        <body>
        <Header />
        <main>{children}</main>
        <Footer />
        </body>
        </html>
    );
}
