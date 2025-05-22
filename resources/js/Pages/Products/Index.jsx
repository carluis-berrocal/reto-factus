import { Pencil, Trash2, Plus } from "lucide-react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";

export default function Index() {
    const { products } = usePage().props;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Productos
                </h2>
            }
        >
            <Head title="Productos" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                    Listado de Productos
                                </h1>
                                <Link
                                    href={route("products.create")}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded inline-flex items-center space-x-2"
                                >
                                    <Plus size={18} />
                                    <span>Crear Producto</span>
                                </Link>
                            </div>

                            <div className="overflow-x-auto bg-white dark:bg-gray-900 rounded shadow">
                                <table className="min-w-full text-sm text-left border">
                                    <thead className="bg-gray-100 dark:bg-gray-700 border-b">
                                        <tr>
                                            <th className="px-4 py-2">
                                                Código
                                            </th>
                                            <th className="px-4 py-2">
                                                Nombre
                                            </th>
                                            <th className="px-4 py-2">
                                                Cantidad
                                            </th>
                                            <th className="px-4 py-2">
                                                Precio
                                            </th>
                                            <th className="px-4 py-2">
                                                Unidad
                                            </th>
                                            <th className="px-4 py-2">
                                                Tributo
                                            </th>
                                            <th className="px-4 py-2">
                                                Acciones
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.data.map((product) => (
                                            <tr
                                                key={product.id}
                                                className="border-b hover:bg-gray-50 dark:hover:bg-gray-800"
                                            >
                                                <td className="px-4 py-2">
                                                    {product.code_reference}
                                                </td>
                                                <td className="px-4 py-2">
                                                    {product.name}
                                                </td>
                                                <td className="px-4 py-2">
                                                    {product.quantity}
                                                </td>
                                                <td className="px-4 py-2">
                                                    $
                                                    {product.price.toLocaleString()}
                                                </td>
                                                <td className="px-4 py-2">
                                                    {product.unit_measure
                                                        ?.name || "-"}
                                                </td>
                                                <td className="px-4 py-2">
                                                    {product.product_tribute
                                                        ?.name || "-"}
                                                </td>
                                                <td className="px-4 py-2 flex space-x-2">
                                                    <Link
                                                        href={route(
                                                            "products.edit",
                                                            product.id
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
                                                            "products.destroy",
                                                            product.id
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
                                {products.links?.map((link, idx) => (
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
