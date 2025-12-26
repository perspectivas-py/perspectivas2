import React, { useState, useEffect } from 'react';
import { Layout } from '../components/Layout';
import { aiService } from '../lib/aiService';
import { storage, SearchHistoryItem } from '../lib/storage';
import { Search as SearchIcon, Send, Settings, Clock, Trash2, Key, AlertTriangle } from 'lucide-react';

export function Search() {
    const [query, setQuery] = useState('');
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [history, setHistory] = useState<SearchHistoryItem[]>([]);
    const [showSettings, setShowSettings] = useState(false);
    const [token, setToken] = useState('');

    useEffect(() => {
        setHistory(storage.getHistory());
        setToken(storage.getToken() || '');
    }, []);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;
        if (!token) {
            setError('Por favor configura tu token de Hugging Face en los ajustes (icono de engranaje).');
            setShowSettings(true);
            return;
        }

        setLoading(true);
        setError('');
        setResult('');

        try {
            const text = await aiService.generateText(query);
            setResult(text);
            const newHistory = storage.addToHistory(query, text);
            setHistory(newHistory);
        } catch (err: any) {
            setError(err.message || 'Error al generar la respuesta');
        } finally {
            setLoading(false);
        }
    };

    const saveToken = () => {
        storage.setToken(token);
        setShowSettings(false);
        setError('');
    };

    const clearHistory = () => {
        storage.clearHistory();
        setHistory([]);
    };

    const loadFromHistory = (item: SearchHistoryItem) => {
        setQuery(item.query);
        setResult(item.response);
    };

    return (
        <Layout>
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                            Buscador IA
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">
                            Pregunta lo que quieras y obtén respuestas generadas por Inteligencia Artificial.
                        </p>
                    </div>
                    <button
                        onClick={() => setShowSettings(!showSettings)}
                        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        title="Configuración"
                    >
                        <Settings className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                    </button>
                </div>

                {/* Settings Panel */}
                {showSettings && (
                    <div className="mb-8 p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-lg animate-in fade-in slide-in-from-top-4">
                        <h3 className="text-lg font-semibold mb-4 flex items-center">
                            <Key className="w-5 h-5 mr-2" />
                            Configuración de API
                        </h3>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                                Hugging Face Token
                            </label>
                            <input
                                type="password"
                                value={token}
                                onChange={(e) => setToken(e.target.value)}
                                placeholder="hf_..."
                                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Necesitas un token gratuito de <a href="https://huggingface.co/settings/tokens" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">Hugging Face</a> para usar el modelo.
                            </p>
                        </div>
                        <div className="flex justify-end">
                            <button
                                onClick={saveToken}
                                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                            >
                                Guardar
                            </button>
                        </div>
                    </div>
                )}

                {/* Search Input */}
                <form onSubmit={handleSearch} className="mb-8 relative">
                    <div className="relative">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="¿Qué quieres saber hoy?"
                            className="w-full p-4 pl-12 pr-12 text-lg rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                        />
                        <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                        <button
                            type="submit"
                            disabled={loading || !query.trim()}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                </form>

                {/* Error Message */}
                {error && (
                    <div className="mb-8 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center text-red-700 dark:text-red-400">
                        <AlertTriangle className="w-5 h-5 mr-2 flex-shrink-0" />
                        <p>{error}</p>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Main Content / Results */}
                    <div className="md:col-span-2 space-y-6">
                        {loading ? (
                            <div className="p-8 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 text-center animate-pulse">
                                <div className="inline-block w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                                <p className="text-gray-600 dark:text-gray-400">La IA está pensando...</p>
                            </div>
                        ) : result ? (
                            <div className="p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
                                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Respuesta:</h3>
                                <div className="prose dark:prose-invert max-w-none whitespace-pre-wrap text-gray-700 dark:text-gray-300">
                                    {result}
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                                <div className="mb-4 flex justify-center">
                                    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-full">
                                        <SearchIcon className="w-8 h-8 opacity-50" />
                                    </div>
                                </div>
                                <p>Escribe tu consulta arriba para comenzar.</p>
                            </div>
                        )}
                    </div>

                    {/* Sidebar / History */}
                    <div className="md:col-span-1">
                        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 border border-gray-200 dark:border-gray-800 h-full max-h-[600px] overflow-y-auto">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-semibold flex items-center text-gray-800 dark:text-gray-200">
                                    <Clock className="w-4 h-4 mr-2" />
                                    Historial
                                </h3>
                                {history.length > 0 && (
                                    <button
                                        onClick={clearHistory}
                                        className="text-xs text-red-500 hover:text-red-600 flex items-center"
                                    >
                                        <Trash2 className="w-3 h-3 mr-1" />
                                        Borrar
                                    </button>
                                )}
                            </div>

                            <div className="space-y-3">
                                {history.length === 0 ? (
                                    <p className="text-sm text-gray-500 text-center py-4">Sin historial reciente</p>
                                ) : (
                                    history.map((item) => (
                                        <button
                                            key={item.id}
                                            onClick={() => loadFromHistory(item)}
                                            className="w-full text-left p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-500 transition-colors group"
                                        >
                                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100 line-clamp-2 mb-1 group-hover:text-primary-600 dark:group-hover:text-primary-400">
                                                {item.query}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {new Date(item.timestamp).toLocaleDateString()}
                                            </p>
                                        </button>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
