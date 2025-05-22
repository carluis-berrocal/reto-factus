import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import { Undo2 } from "lucide-react";
import { formatCurrency, formatearFecha } from "@/utils/helpers";

export default function Show() {
    const { bill } = usePage().props;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Detalle de Factura
                </h2>
            }
        >
            <Head title="Detalle Factura" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-2xl font-bold">
                                    Detalle de Factura
                                </h1>
                                <Link
                                    href={route("bills.index")}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded inline-flex items-center"
                                >
                                    <Undo2 size={18} />
                                    <span className="ml-2">Regresar</span>
                                </Link>
                            </div>
                            <div className="mb-8 grid grid-cols-1 md:grid-cols-1 gap-6">
                                <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded shadow">
                                    <h3 className="text-lg font-semibold  text-center">
                                        FACTURA ELECTRÓNICA DE VENTA
                                    </h3>
                                    <h3 className="text-lg font-semibold mb-2 text-center">
                                        NÚMERO {bill.bill.number}
                                    </h3>

                                    <ul className="text-sm space-y-1 text-center">
                                        <li>
                                            <strong>
                                                Fecha de Generacion:
                                            </strong>{" "}
                                            {formatearFecha(
                                                bill.bill.created_at
                                            )}
                                        </li>
                                        <li>
                                            <strong>
                                                Fecha de Validación:
                                            </strong>{" "}
                                            {formatearFecha(
                                                bill.bill.validated
                                            )}
                                        </li>
                                        <img
                                            src={bill.company.url_logo}
                                            alt="Logo empresa"
                                            className="h-32 mb-4 mx-auto bg-gray-200 dark:bg-gray-700 p-4 rounded-lg shadow-lg object-contain"
                                        />
                                    </ul>
                                </div>
                            </div>

                            {/* Información General */}
                            <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Empresa */}
                                <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded shadow">
                                    <h3 className="text-lg font-semibold mb-2">
                                        Empresa
                                    </h3>

                                    <ul className="text-sm space-y-1">
                                        <li>
                                            <strong>NIT:</strong>{" "}
                                            {bill.company.nit}-{bill.company.dv}
                                        </li>
                                        <li>
                                            <strong>Nombre:</strong>{" "}
                                            {bill.company.name}
                                        </li>
                                        <li>
                                            <strong>Teléfono:</strong>{" "}
                                            {bill.company.phone}
                                        </li>
                                        <li>
                                            <strong>Email:</strong>{" "}
                                            {bill.company.email}
                                        </li>
                                        <li>
                                            <strong>Dirección:</strong>{" "}
                                            {bill.company.direction}
                                        </li>
                                        <li>
                                            <strong>Municipio:</strong>{" "}
                                            {bill.company.municipality}
                                        </li>
                                    </ul>
                                </div>

                                {/* Cliente */}
                                <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded shadow">
                                    <h3 className="text-lg font-semibold mb-2">
                                        Cliente
                                    </h3>
                                    <ul className="text-sm space-y-1">
                                        <li>
                                            <strong>Identificación:</strong>{" "}
                                            {bill.customer.identification}
                                        </li>
                                        <li>
                                            <strong>Nombre:</strong>{" "}
                                            {bill.customer.names}
                                        </li>
                                        <li>
                                            <strong>Teléfono:</strong>{" "}
                                            {bill.customer.phone}
                                        </li>
                                        <li>
                                            <strong>Email:</strong>{" "}
                                            {bill.customer.email}
                                        </li>
                                        <li>
                                            <strong>Dirección:</strong>{" "}
                                            {bill.customer.address}
                                        </li>
                                        <li>
                                            <strong>Municipio:</strong>{" "}
                                            {bill.customer.municipality?.name}
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* CUFE y QR */}
                            <div className="mb-10 bg-gray-100 dark:bg-gray-900 p-4 rounded shadow flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div>
                                    <h4 className="text-md font-semibold">
                                        CUFE
                                    </h4>
                                    <p className="text-sm break-all mb-2">
                                        {bill.bill.cufe}
                                    </p>

                                    {/* Enlace a la verificación */}
                                    <a
                                        href={bill.bill.qr} // Asegúrate que esta propiedad exista y tenga la URL correcta
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block mt-2 text-blue-600 hover:underline text-sm font-medium"
                                    >
                                        Verificar factura en la DIAN
                                    </a>
                                </div>

                                <div>
                                    <img
                                        src={bill.bill.qr_image}
                                        alt="Código QR"
                                        className="h-32"
                                    />
                                </div>
                            </div>

                            {/* Tabla de Ítems */}
                            <div className="overflow-x-auto rounded shadow">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-800">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                                                Producto
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                                                Cantidad
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                                                Precio
                                            </th>

                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                                                Descuento
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                                                Total
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                                        {bill.items.map((item, index) => (
                                            <tr key={index}>
                                                <td className="px-6 py-4 text-sm">
                                                    {item.name}
                                                </td>
                                                <td className="px-6 py-4 text-sm">
                                                    {item.quantity}
                                                </td>
                                                <td className="px-6 py-4 text-sm">
                                                    {formatCurrency(item.price)}
                                                </td>
                                                <td className="px-6 py-4 text-sm">
                                                    {formatCurrency(
                                                        item.discount
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-sm">
                                                    {formatCurrency(item.total)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    {/* Pie de tabla */}
                                    <tfoot>
                                        <tr>
                                            <td colSpan="100%" className="px-6 pt-6">
                                            <div className="flex justify-between gap-8 text-sm">
                                                {/* Columna izquierda: Observaciones y métodos de pago */}
                                                <div className="w-1/2">
                                                <p className="mb-1">
                                                    <span className="font-semibold">
                                                    Observaciones:
                                                    </span>{" "}
                                                    {bill.bill.observation || "N/A"}
                                                </p>
                                                <p className="mb-1">
                                                    <span className="font-semibold">
                                                    Forma de pago:
                                                    </span>{" "}
                                                    {bill.bill.payment_form?.name || "N/A"}
                                                </p>
                                                <p>
                                                    <span className="font-semibold">
                                                    Medio de pago:
                                                    </span>{" "}
                                                    {bill.bill.payment_method?.name || "N/A"}
                                                </p>
                                                </div>

                                                {/* Columna derecha: Totales */}
                                                <div className="w-1/2">
                                                <table className="ml-auto text-right">
                                                    <tbody>
                                                    <tr>
                                                        <td className="pr-4 font-semibold text-lg">
                                                        Valor Bruto:
                                                        </td>
                                                        <td className="text-lg font-semibold">
                                                        {formatCurrency(bill.bill.gross_value)}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="pr-4 font-semibold text-lg">
                                                        Base Imponible:
                                                        </td>
                                                        <td className="text-lg font-semibold">
                                                        {formatCurrency(bill.bill.tax_amount)}
                                                        </td>
                                                    </tr>
                                                    <tr className="font-bold">
                                                        <td className="pr-4 text-xl">
                                                        Total Factura:
                                                        </td>
                                                        <td className="text-xl font-bold">
                                                        {formatCurrency(bill.bill.total)}
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                </div>
                                            </div>
                                            </td>
                                        </tr>
                                    </tfoot>

                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
