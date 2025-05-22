import { useEffect, useState } from "react";
import { usePage } from "@inertiajs/react";

export default function FlashMessage({ duration = 4000 }) {
    const { flash } = usePage().props;
    const [visible, setVisible] = useState(false);

    const message =
        flash.success || flash.error || flash.warning || flash.info || null;

    const type = flash.success
        ? "success"
        : flash.error
        ? "error"
        : flash.warning
        ? "warning"
        : flash.info
        ? "info"
        : null;

    useEffect(() => {
        if (message) {
            setVisible(true);
            const timer = setTimeout(() => setVisible(false), duration);
            return () => clearTimeout(timer);
        }
    }, [message, duration]);

    if (!message) return null;

    const bgColors = {
        success: "bg-green-100 border-green-300 text-green-800",
        error: "bg-red-100 border-red-300 text-red-800",
        warning: "bg-yellow-100 border-yellow-300 text-yellow-800",
        info: "bg-blue-100 border-blue-300 text-blue-800",
    };

    return (
        <div className="fixed top-4 right-4 z-50 w-[300px] max-w-full">
            <div
                className={`px-4 py-3 rounded text-sm border flex items-center justify-between shadow-lg transition-all duration-500 ease-in-out transform
                    ${
                        visible
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 -translate-y-2 pointer-events-none"
                    }
                    ${bgColors[type]}`}
            >
                <span className="mr-4">{message}</span>
                <button
                    onClick={() => setVisible(false)}
                    className="font-bold px-2 hover:opacity-70"
                    aria-label="Cerrar"
                >
                    &times;
                </button>
            </div>
        </div>
    );
}
