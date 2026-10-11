import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function FlashMessage() {
    const { flash } = usePage().props;
    const [visible, setVisible] = useState(true);
    const message = flash?.success || flash?.error;
    const isError = !!flash?.error;

    useEffect(() => {
        if (!message) return;
        setVisible(true);
        const t = setTimeout(() => setVisible(false), 4000);
        return () => clearTimeout(t);
    }, [message]);

    if (!message || !visible) return null;

    return (
        <div
            role="alert"
            className={`mx-auto mt-4 flex max-w-7xl items-center justify-between rounded-md border px-4 py-3 text-sm sm:mx-6 lg:mx-8 xl:mx-auto ${
                isError
                    ? 'border-red-200 bg-red-50 text-red-800'
                    : 'border-green-200 bg-green-50 text-green-800'
            }`}
        >
            <span>{message}</span>
            <button onClick={() => setVisible(false)} aria-label="Dismiss" className="ml-4 font-bold">
                ×
            </button>
        </div>
    );
}
