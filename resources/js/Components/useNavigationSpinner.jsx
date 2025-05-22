// hooks/useNavigationSpinner.js
import { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';

export default function useNavigationSpinner() {
    const { url } = usePage();
    const [isLoading, setIsLoading] = useState(false);
    const [lastUrl, setLastUrl] = useState(url);

    useEffect(() => {
        if (url !== lastUrl) {
            setIsLoading(true);
            setLastUrl(url);
            const timer = setTimeout(() => setIsLoading(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [url]);

    return isLoading;
}