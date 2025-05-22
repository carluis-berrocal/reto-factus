import { Plus, FileDown, FileText, Search, Eraser, Eye } from "lucide-react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage, useForm, router } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { formatCurrency, formatearFecha } from '@/utils/helpers';

export default function Index() {
    const { bills, pagination, error, filters } = usePage().props;
    const [hasSearched, setHasSearched] = useState(false);
    const { data, setData } = useForm({
        number: filters?.number || "",
    });

    const handleSearch = (e) => {
        e.preventDefault();
        if (data.number.trim() === "") {
            return;
        }
        router.get(
            route("bills.index"),
            {
                "filter[number]": data.number,
            },
            {
                preserveState: true,
                replace: true,
            }
        );

        setHasSearched(true); // ← ESTA LÍNEA ESCLAVE
    };

    const handleClear = () => {
        setData("number", "");
        setHasSearched(false);
        router.get(
            route("bills.index"),
            {},
            {
                preserveState: false,
                replace: true,
            }
        );
    };

    

    useEffect(() => {
        if (hasSearched && data.number.trim() === "") {
            router.get(
                route("bills.index"),
                {},
                {
                    preserveState: false,
                    replace: true,
                }
            );
            setHasSearched(false);
        }
    }, [data.number]);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Facturas
                </h2>
            }
        >
            <Head title="Facturas" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {error ? (
                        <div className="p-6 bg-red-100 text-red-700 rounded border border-red-300">
                            {error}
                        </div>
                    ) : (
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                            <div className="p-6 text-gray-900 dark:text-gray-100">
                                <div className="flex justify-between items-center mb-6">
                                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                        Listado de Facturas
                                    </h1>
                                    <Link
                                        href={route("bills.create")}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded inline-flex items-center space-x-2"
                                    >
                                        <Plus size={18} />
                                        <span>Crear Factura</span>
                                    </Link>
                                </div>

                                <div className="overflow-x-auto bg-white dark:bg-gray-900 rounded shadow">
                                    <form
                                        onSubmit={handleSearch}
                                        className="m-4 flex items-center space-x-2"
                                    >
                                        <input
                                            type="text"
                                            placeholder="Buscar por número"
                                            value={data.number}
                                            onChange={(e) =>
                                                setData(
                                                    "number",
                                                    e.target.value
                                                )
                                            }
                                            className="border rounded px-3 py-2 w-64 dark:bg-gray-900 dark:text-white"
                                        />
                                        <button
                                            type="submit"
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded inline-flex items-center space-x-2"
                                        >
                                            <Search size={18} />
                                            <span>Buscar</span>
                                        </button>
                                        {data.number && (
                                            <button
                                                type="button"
                                                onClick={handleClear}
                                                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 inline-flex items-center space-x-2"
                                            >
                                                <Eraser size={18} />
                                                <span>Limpiar</span>
                                            </button>
                                        )}
                                    </form>
                                    <table className="min-w-full text-sm text-left border">
                                        <thead className="bg-gray-100 dark:bg-gray-700 border-b">
                                            <tr>
                                                <th className="px-4 py-2">
                                                    Número
                                                </th>
                                                <th className="px-4 py-2">
                                                    Cliente
                                                </th>
                                                <th className="px-4 py-2">
                                                    Email
                                                </th>
                                                <th className="px-4 py-2">
                                                    Forma de Pago
                                                </th>
                                                <th className="px-4 py-2">
                                                    Total
                                                </th>
                                                <th className="px-4 py-2">
                                                    Creado
                                                </th>
                                                <th className="px-4 py-2">
                                                    Estado
                                                </th>
                                                <th className="px-4 py-2">
                                                    Acciones
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {bills.length > 0 ? (
                                                bills.map((bill) => (
                                                    <tr
                                                        key={bill.id}
                                                        className="border-b hover:bg-gray-50 dark:hover:bg-gray-800"
                                                    >
                                                        <td className="px-4 py-2">
                                                            {bill.number}
                                                        </td>
                                                        <td className="px-4 py-2">
                                                            {bill.names}
                                                        </td>
                                                        <td className="px-4 py-2">
                                                            {bill.email}
                                                        </td>
                                                        <td className="px-4 py-2">
                                                            {
                                                                bill
                                                                    .payment_form[
                                                                    "name"
                                                                ]
                                                            }
                                                        </td>
                                                        <td className="px-4 py-2 text-right">
                                                            {formatCurrency(
                                                                bill.total
                                                            )}
                                                        </td>

                                                        <td className="px-4 py-2">
                                                            {formatearFecha(
                                                                bill.created_at
                                                            )}
                                                        </td>

                                                        <td className="px-4 py-2">
                                                            { bill.created_at
                                                                ? "Aprobado"
                                                                : "Rechazado"}
                                                        </td>
                                                        <td className="px-4 py-2 flex items-center space-x-2">
                                                            {/* Botón de descarga PDF */}
                                                            <a
                                                                title="Descargar PDF"
                                                                href={route(
                                                                    "bills.download.pdf",
                                                                    bill.number
                                                                )}
                                                                className="text-blue-600 hover:text-blue-800"
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                            >
                                                                <FileDown
                                                                    size={18}
                                                                />
                                                            </a>

                                                            {/* Botón de descarga XML */}
                                                            <a
                                                                title="Descargar XML"
                                                                href={route(
                                                                    "bills.download.xml",
                                                                    bill.number
                                                                )}
                                                                className="text-green-600 hover:text-green-800"
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                            >
                                                                <FileText
                                                                    size={18}
                                                                />
                                                            </a>

                                                            {/* Botón para ver el detalle de la factura */}
                                                            <Link
                                                                title="Ver Detalle"
                                                                href={route(
                                                                    "bills.show",
                                                                    bill.number
                                                                )}
                                                                className="text-orange-600 hover:text-orange-800"
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                            >
                                                                <Eye
                                                                    size={18}
                                                                />
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td
                                                        colSpan="8"
                                                        className="px-4 py-4 text-center text-gray-500"
                                                    >
                                                        No hay facturas
                                                        disponibles.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="mt-4">
                                    {pagination?.links?.map((link, idx) => {
                                        const pageMatch =
                                            link.url?.match(/[\?&]page=(\d+)/);
                                        const page = pageMatch
                                            ? pageMatch[1]
                                            : null;
                                        const localHref = page
                                            ? `/bills?page=${page}`
                                            : "";

                                        return (
                                            <Link
                                                key={idx}
                                                href={localHref}
                                                dangerouslySetInnerHTML={{
                                                    __html: link.label,
                                                }}
                                                className={`px-2 py-1 mx-1 rounded ${
                                                    link.active
                                                        ? "bg-blue-600 text-white"
                                                        : "text-blue-600"
                                                } ${
                                                    !link.url &&
                                                    "pointer-events-none text-gray-400"
                                                }`}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
