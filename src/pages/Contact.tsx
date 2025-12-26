import React from 'react';
import { Layout } from '../components/Layout';
import { Mail, MessageSquare, Send } from 'lucide-react';

export function Contact() {
    return (
        <Layout>
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold mb-4">Contáctanos</h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        ¿Tienes preguntas o sugerencias? Nos encantaría escucharte.
                    </p>
                </div>

                <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium mb-2">Nombre</label>
                                <input type="text" className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent" placeholder="Tu nombre" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Email</label>
                                <input type="email" className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent" placeholder="tu@email.com" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Mensaje</label>
                            <textarea rows={4} className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent" placeholder="¿En qué podemos ayudarte?"></textarea>
                        </div>
                        <button type="submit" className="w-full py-3 px-6 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg flex items-center justify-center space-x-2 transition-colors">
                            <Send className="w-4 h-4" />
                            <span>Enviar Mensaje</span>
                        </button>
                    </form>
                </div>
            </div>
        </Layout>
    );
}
