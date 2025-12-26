export const STORAGE_KEYS = {
    THEME: 'theme',
    HF_TOKEN: 'hf_token',
    SEARCH_HISTORY: 'search_history',
};

export interface SearchHistoryItem {
    id: string;
    query: string;
    response: string;
    timestamp: number;
}

export const storage = {
    getToken: (): string | null => {
        return localStorage.getItem(STORAGE_KEYS.HF_TOKEN);
    },

    setToken: (token: string) => {
        localStorage.setItem(STORAGE_KEYS.HF_TOKEN, token);
    },

    getHistory: (): SearchHistoryItem[] => {
        try {
            const items = localStorage.getItem(STORAGE_KEYS.SEARCH_HISTORY);
            return items ? JSON.parse(items) : [];
        } catch (e) {
            console.error('Error parsing history', e);
            return [];
        }
    },

    addToHistory: (query: string, response: string) => {
        const history = storage.getHistory();
        const newItem: SearchHistoryItem = {
            id: crypto.randomUUID(),
            query,
            response,
            timestamp: Date.now(),
        };

        // Keep last 50 items
        const newHistory = [newItem, ...history].slice(0, 50);
        localStorage.setItem(STORAGE_KEYS.SEARCH_HISTORY, JSON.stringify(newHistory));
        return newHistory;
    },

    clearHistory: () => {
        localStorage.removeItem(STORAGE_KEYS.SEARCH_HISTORY);
    }
};
