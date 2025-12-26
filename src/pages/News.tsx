import React from 'react';
import { Layout } from '../components/Layout';

export function News() {
    return (
        <Layout>
            <h1 className="text-3xl font-bold mb-6">Noticias de IA</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
                Las últimas novedades del mundo de la Inteligencia Artificial.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                        <div className="h-48 bg-gray-200 dark:bg-gray-800 animate-pulse"></div>
                        <div className="p-4">
                            <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded mb-2 w-3/4"></div>
                            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2"></div>
                        </div>
                    </div>
                ))}
            </div>
        </Layout>
    );
}
