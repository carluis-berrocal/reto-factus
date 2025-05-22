// resources/js/Pages/FactusTester.jsx
import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import ReactJson from "react-json-view";

export default function FactusTester() {
    const [endpoint, setEndpoint] = useState("");
    const [method, setMethod] = useState("get");
    const [params, setParams] = useState("{}");
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);

    const sendRequest = async () => {
        if (!endpoint.trim()) {
            setResponse({
                error: true,
                message: "El campo 'Endpoint' es requerido.",
            });
            return;
        }

        let parsedParams = {};
        try {
            parsedParams = JSON.parse(params || "{}");
        } catch (jsonError) {
            setResponse({
                error: true,
                message:
                    "El formato del JSON es inválido. Por favor, revisa la sintaxis. Asegúrate de usar comillas dobles para las claves y los valores de texto.",
            });
            return;
        }

        setLoading(true);
        setResponse(null);

        try {
            const parsedParams = JSON.parse(params || "{}");
            const url = `/factus/test/${endpoint}?method=${method}`;

            const res = await axios({
                method,
                url,
                data: method !== "get" ? parsedParams : {},
                params: method === "get" ? parsedParams : {},
            });

            setResponse(res.data);
        } catch (error) {
            let errorMessage = error.response?.data?.message || error.message;

            try {
                const parsed = JSON.parse(errorMessage);
                errorMessage = parsed.message || errorMessage;
            } catch (e) {}

            setResponse({
                error: true,
                message: errorMessage,
                status: error.response?.status,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Factus Test
                </h2>
            }
        >
            <Head title="Factus Tester" />

            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6 text-gray-900 dark:text-gray-100">
                        <h1 className="text-2xl font-bold mb-4">
                            Probador de Endpoints Factus
                        </h1>

                        <div className="mb-4">
                            <label className="block mb-1">Endpoint:</label>
                            <input
                                className="w-full border p-2 rounded bg-white text-black dark:bg-gray-700 dark:text-white"
                                type="text"
                                placeholder="Ej: countries, tributes/products"
                                value={endpoint}
                                onChange={(e) => setEndpoint(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block mb-1">Método:</label>
                            <select
                                className="w-full border p-2 rounded bg-white text-black dark:bg-gray-700 dark:text-white"
                                value={method}
                                onChange={(e) => setMethod(e.target.value)}
                            >
                                <option value="get">GET</option>
                                <option value="post">POST</option>
                                <option value="put">PUT</option>
                                <option value="delete">DELETE</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block mb-1">
                                Parámetros (JSON):
                            </label>
                            <textarea
                                className="w-full border p-2 rounded bg-white text-black dark:bg-gray-700 dark:text-white"
                                rows="5"
                                placeholder='Ej: {"id": 123}'
                                value={params}
                                onChange={(e) => setParams(e.target.value)}
                            ></textarea>
                        </div>

                        <button
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            onClick={sendRequest}
                            disabled={loading}
                        >
                            {loading ? "Enviando..." : "Enviar"}
                        </button>

                        {response && (
                            <div className="mt-6 bg-gray-100 dark:bg-gray-900 p-4 rounded border">
                                <h2 className="font-bold mb-2">Respuesta:</h2>
                                <div className="max-h-[400px] overflow-auto rounded bg-black text-white text-sm p-3">
                                    <ReactJson
                                        src={response}
                                        theme="monokai"
                                        name={false}
                                        collapsed={false}
                                        displayDataTypes={false}
                                        enableClipboard={false}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
