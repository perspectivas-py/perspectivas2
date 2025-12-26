import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

interface LayoutProps {
    children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
            <Header />
            <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8">
                {children}
            </main>
            <Footer />
        </div>
    );
}
