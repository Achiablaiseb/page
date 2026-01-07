
import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, AlertCircle, Info } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
    id: string;
    message: string;
    type: ToastType;
}

interface ToastContextType {
    showToast: (message: string, type: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = useCallback((message: string, type: ToastType) => {
        const id = Date.now().toString();
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 4000);
    }, []);

    const removeToast = (id: string) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
                <AnimatePresence>
                    {toasts.map(toast => (
                        <motion.div
                            key={toast.id}
                            initial={{ opacity: 0, y: 20, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 20, scale: 0.9 }}
                            className={`flex items-center gap-3 p-4 rounded-xl shadow-lg border min-w-[300px] backdrop-blur-sm ${toast.type === 'success' ? 'bg-white/95 border-green-100 text-gray-800' :
                                    toast.type === 'error' ? 'bg-white/95 border-red-100 text-gray-800' :
                                        'bg-white/95 border-blue-100 text-gray-800'
                                }`}
                        >
                            <div className={`p-2 rounded-full ${toast.type === 'success' ? 'bg-green-100 text-green-600' :
                                    toast.type === 'error' ? 'bg-red-100 text-red-600' :
                                        'bg-blue-100 text-blue-600'
                                }`}>
                                {toast.type === 'success' && <CheckCircle2 size={18} />}
                                {toast.type === 'error' && <AlertCircle size={18} />}
                                {toast.type === 'info' && <Info size={18} />}
                            </div>
                            <p className="flex-1 text-sm font-semibold">{toast.message}</p>
                            <button
                                onClick={() => removeToast(toast.id)}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X size={16} />
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};
