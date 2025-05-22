import { Pencil, Trash2, Plus, CheckCircle } from "lucide-react"; // Asegúrate de tener CheckCircle
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import FlashMessage from "@/Components/FlashMessage";

export default function Index() {
    const { customers } = usePage().props;
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Clientes
                </h2>
            }
        >
            <Head title="Clientes" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                    Listado de Clientes
                                </h1>
                                <Link
                                    href={route("customers.create")}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded inline-flex items-center space-x-2"
                                >
                                    <Plus size={18} />
                                    <span>Crear Cliente</span>
                                </Link>
                            </div>

                            <div className="overflow-x-auto bg-white dark:bg-gray-900 rounded shadow">
                                <table className="min-w-full text-sm text-left border">
                                    <thead className="bg-gray-100 dark:bg-gray-700 border-b">
                                        <tr>
                                            <th className="px-4 py-2">
                                                Nombre
                                            </th>
                                            <th className="px-4 py-2">
                                                Identificación
                                            </th>
                                            <th className="px-4 py-2">Email</th>
                                            <th className="px-4 py-2">
                                                Teléfono
                                            </th>
                                            <th className="px-4 py-2">
                                                Municipio
                                            </th>
                                            <th className="px-4 py-2">
                                                Acciones
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {customers.data.map((customer) => (
                                            <tr
                                                key={customer.id}
                                                className="border-b hover:bg-gray-50 dark:hover:bg-gray-800"
                                            >
                                                <td className="px-4 py-2">
                                                    {customer.names}
                                                </td>
                                                <td className="px-4 py-2">
                                                    {customer.identification}
                                                </td>
                                                <td className="px-4 py-2">
                                                    {customer.email}
                                                </td>
                                                <td className="px-4 py-2">
                                                    {customer.phone}
                                                </td>
                                                <td className="px-4 py-2">
                                                    {customer.municipality
                                                        ?.name || "-"}
                                                </td>
                                                <td className="px-4 py-2 flex space-x-2">
                                                    <Link
                                                        href={route(
                                                            "customers.edit",
                                                            customer.id
                                                        )}
                                                        className="text-blue-600 hover:text-blue-800"
                                                        title="Editar"
                                                    >
                                                        <Pencil size={18} />
                                                    </Link>
                                                    <Link
                                                        as="button"
                                                        method="delete"
                                                        href={route(
                                                            "customers.destroy",
                                                            customer.id
                                                        )}
                                                        className="text-red-600 hover:text-red-800"
                                                        title="Eliminar"
                                                    >
                                                        <Trash2 size={18} />
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-4">
                                {customers.links?.map((link, idx) => (
                                    <Link
                                        key={idx}
                                        href={link.url || ""}
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                        className={`px-2 py-1 mx-1 rounded ${
                                            link.active
                                                ? "bg-blue-600 text-white"
                                                : "text-blue-600"
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
