import React from 'react';
import { Layout } from '../components/Layout';
import { Brain, ArrowRight, Zap, Globe, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Home() {
    return (
        <Layout>
            {/* Hero Section */}
            <div className="flex flex-col items-center justify-center text-center py-20 px-4">
                <div className="bg-primary-100 dark:bg-primary-900/30 p-3 rounded-full mb-6">
                    <Brain className="w-12 h-12 text-primary-600 dark:text-primary-400" />
                </div>
                <h1 className="text-5xl font-bold tracking-tight mb-6 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                    Explora el Futuro de la IA
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mb-10">
                    Tu portal todo-en-uno para buscar, aprender y utilizar herramientas de Inteligencia Artificial gratuitas y de código abierto.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                        to="/search"
                        className="inline-flex items-center justify-center px-8 py-3 w-full sm:w-auto text-base font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-full transition-colors"
                    >
                        Probar Buscador IA
                        <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                    <Link
                        to="/tools"
                        className="inline-flex items-center justify-center px-8 py-3 w-full sm:w-auto text-base font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-full transition-colors"
                    >
                        Ver Herramientas
                    </Link>
                </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-16">
                <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow">
                    <Zap className="w-10 h-10 text-yellow-500 mb-4" />
                    <h3 className="text-xl font-bold mb-2">Rápido y Gratuito</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                        Acceso instantáneo a modelos de IA sin costos ocultos ni tarjetas de crédito.
                    </p>
                </div>
                <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow">
                    <Globe className="w-10 h-10 text-blue-500 mb-4" />
                    <h3 className="text-xl font-bold mb-2">100% Open Source</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                        Construido con tecnologías libres y transparente para la comunidad.
                    </p>
                </div>
                <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow">
                    <Shield className="w-10 h-10 text-green-500 mb-4" />
                    <h3 className="text-xl font-bold mb-2">Privacidad Primero</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                        Tus búsquedas se guardan localmente en tu dispositivo.
                    </p>
                </div>
            </div>
        </Layout>
    );
}
