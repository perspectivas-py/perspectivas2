import React from 'react';
import { Layout } from '../components/Layout';

export function Tools() {
    return (
        <Layout>
            <h1 className="text-3xl font-bold mb-6">Herramientas de IA</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
                Directorio de herramientas útiles impulsadas por inteligencia artificial.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800">
                        <div className="h-12 w-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg mb-4"></div>
                        <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded mb-2"></div>
                        <div className="h-20 bg-gray-100 dark:bg-gray-800/50 rounded"></div>
                    </div>
                ))}
            </div>
        </Layout>
    );
}
