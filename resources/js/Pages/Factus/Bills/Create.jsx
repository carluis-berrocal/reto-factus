import InputField from "@/Components/InputField";
import SelectField from "@/Components/SelectField";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage, Link } from "@inertiajs/react";
import { useState } from "react";
import { Plus, Minus, Trash2, PlusCircle } from "lucide-react";
import { formatCurrency } from '@/utils/helpers';


export default function Create() {
    const {
        products = [],
        customers = [],
        paymentForm = [],
        paymentMethodCode = [],
        flash,
    } = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        payment_form: "",
        payment_method_code: "",
        customer_id: "",
        observations: "",
        items: [],
    });

    const addItem = () => {
        setData("items", [
            ...data.items,
            {
                product_id: "",
                quantity: 1,
                price: 0,
                discount_rate: 0,
                tax_rate: 0,
                is_excluded: false,
            },
        ]);
    };

    const removeItem = (index) => {
        const newItems = [...data.items];
        newItems.splice(index, 1);
        setData("items", newItems);
    };

    const updateItem = (index, key, value) => {
        const newItems = [...data.items];
        newItems[index][key] = value;

        if (key === "product_id") {
            const selectedProduct = products.find((p) => p.id == value);
            newItems[index].price = selectedProduct ? selectedProduct.price : 0;
            newItems[index].discount_rate = selectedProduct
                ? selectedProduct.discount_rate
                : 0;
            newItems[index].tax_rate = selectedProduct
                ? selectedProduct.tax_rate
                : 0;
            newItems[index].is_excluded = selectedProduct
                ? selectedProduct.is_excluded
                : false;
        }

        setData("items", newItems);
    };

    const incrementQty = (index) => {
        updateItem(index, "quantity", data.items[index].quantity + 1);
    };

    const decrementQty = (index) => {
        const qty = data.items[index].quantity;
        if (qty > 1) updateItem(index, "quantity", qty - 1);
    };

    // Función para calcular totales detallados teniendo en cuenta si está excluido de impuestos
    const calculateTotals = () => {
        let subtotal = 0;
        let totalDiscounts = 0;
        let totalIva = 0;
        let totalToPay = 0;

        data.items.forEach((item) => {
            const baseUnit = item.is_excluded
                ? item.price // Si está excluido, el precio ya es base
                : item.price / (1 + item.tax_rate / 100); // Si no, se saca la base del precio con IVA

            const baseTotal = baseUnit * item.quantity;
            const descuento = baseTotal * (item.discount_rate / 100);
            const baseDescontada = baseTotal - descuento;

            const iva = item.is_excluded
                ? 0 // No se aplica IVA si está excluido
                : baseDescontada * (item.tax_rate / 100);

            const total = baseDescontada + iva;

            subtotal += baseTotal;
            totalDiscounts += descuento;
            totalIva += iva;
            totalToPay += total;
        });

        return {
            subtotal: subtotal.toFixed(2),
            totalDiscounts: totalDiscounts.toFixed(2),
            totalIva: totalIva.toFixed(2),
            totalToPay: totalToPay.toFixed(2),
        };
    };

    const totals = calculateTotals();


    const handleSubmit = (e) => {
        e.preventDefault();
        if (data.items.length === 0) {
            alert(
                "Debes agregar al menos un producto antes de crear la factura."
            );
            return;
        }
        post(route("bills.store"));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Crear Factura
                </h2>
            }
        >
            <Head title="Crear Factura" />

            <div className="py-12">
                <div className="mx-auto max-w-6xl space-y-6 sm:px-6 lg:px-8">
                    {flash.error && (
                        <div className="bg-red-100 text-red-800 px-4 py-2 rounded mb-4 border border-red-300">
                            {flash.error}
                        </div>
                    )}

                    <div className="bg-white p-6 shadow-lg sm:rounded-xl dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <SelectField
                                    label="Forma de Pago"
                                    name="payment_form"
                                    options={paymentForm}
                                    value={data.payment_form}
                                    onChange={setData}
                                    error={errors.payment_form}
                                    optionLabel="name"
                                    optionValue="code"
                                    required
                                />

                                <SelectField
                                    label="Método de Pago"
                                    name="payment_method_code"
                                    options={paymentMethodCode}
                                    value={data.payment_method_code}
                                    onChange={setData}
                                    error={errors.payment_method_code}
                                    optionLabel="name"
                                    optionValue="code"
                                    required
                                />

                                <SelectField
                                    label="Cliente"
                                    name="customer_id"
                                    options={customers}
                                    value={data.customer_id}
                                    onChange={setData}
                                    error={errors.customer_id}
                                    optionLabel="names"
                                    optionValue="id"
                                    required
                                />

                                <div>
                                    <label
                                        htmlFor="observations"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >
                                        Observaciones
                                    </label>
                                    <textarea
                                        id="observations"
                                        name="observations"
                                        value={data.observations || ""}
                                        onChange={(e) =>
                                            setData(
                                                "observations",
                                                e.target.value
                                            )
                                        }
                                        rows={3}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-900 dark:text-white"
                                        placeholder="Comentarios o información adicional para esta factura..."
                                    />
                                    {errors.observations && (
                                        <p className="text-sm text-red-600 mt-1">
                                            {errors.observations}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="mt-8 overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-100 dark:bg-gray-700">
                                        <tr>
                                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                                                Producto
                                            </th>
                                            <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700 dark:text-gray-300">
                                                Cantidad
                                            </th>
                                            <th className="px-4 py-2 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">
                                                Precio
                                            </th>
                                            <th className="px-4 py-2 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">
                                                Base
                                            </th>
                                            <th className="px-4 py-2 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">
                                                Descuento
                                            </th>
                                            <th className="px-4 py-2 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">
                                                IVA
                                            </th>
                                            <th className="px-4 py-2 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">
                                                Total
                                            </th>
                                            <th className="px-4 py-2"></th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                        {data.items.map((item, index) => {
                                            const baseUnit =
                                                item.price /
                                                (1 +
                                                    (item.is_excluded
                                                        ? 0
                                                        : item.tax_rate / 100));
                                            const baseTotal =
                                                baseUnit * item.quantity;
                                            const descuento =
                                                baseTotal *
                                                (item.discount_rate / 100);
                                            const baseDescontada =
                                                baseTotal - descuento;

                                            // Solo calcular IVA si el producto NO está excluido
                                            const iva = item.is_excluded
                                                ? 0
                                                : baseDescontada *
                                                  (item.tax_rate / 100);
                                            const total = baseDescontada + iva;

                                            return (
                                                <tr
                                                    key={index}
                                                    className="bg-white dark:bg-gray-800"
                                                >
                                                    <td className="px-4 py-2">
                                                        <select
                                                            value={
                                                                item.product_id
                                                            }
                                                            onChange={(e) =>
                                                                updateItem(
                                                                    index,
                                                                    "product_id",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className="w-full border-gray-300 rounded dark:bg-gray-900 dark:text-white"
                                                        >
                                                            <option value="">
                                                                Seleccionar
                                                                producto
                                                            </option>
                                                            {products.map(
                                                                (product) => (
                                                                    <option
                                                                        key={
                                                                            product.id
                                                                        }
                                                                        value={
                                                                            product.id
                                                                        }
                                                                    >
                                                                        {
                                                                            product.name
                                                                        }
                                                                    </option>
                                                                )
                                                            )}
                                                        </select>
                                                    </td>
                                                    <td className="px-4 py-2 text-center">
                                                        <div className="flex justify-center items-center space-x-2">
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    decrementQty(
                                                                        index
                                                                    )
                                                                }
                                                                className="text-gray-600 dark:text-gray-300 hover:text-red-600"
                                                            >
                                                                <Minus
                                                                    size={16}
                                                                />
                                                            </button>
                                                            <span className="text-gray-700 dark:text-gray-300">
                                                                {item.quantity}
                                                            </span>
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    incrementQty(
                                                                        index
                                                                    )
                                                                }
                                                                className="text-gray-600 dark:text-gray-300 hover:text-green-600"
                                                            >
                                                                <Plus
                                                                    size={16}
                                                                />
                                                            </button>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-2 text-right text-gray-700 dark:text-gray-300">
                                                        
                                                        {formatCurrency(
                                                            item.price
                                                        )}
                                                    </td>
                                                    <td className="px-4 py-2 text-right text-gray-700 dark:text-gray-300">
                                                        
                                                        {formatCurrency(
                                                            baseTotal
                                                        )}
                                                    </td>
                                                    <td className="px-4 py-2 text-right text-gray-700 dark:text-gray-300">
                                                        -{formatCurrency(descuento)}
                                                    </td>
                                                    <td className="px-4 py-2 text-right text-gray-700 dark:text-gray-300">
                                                        {formatCurrency(iva)}
                                                    </td>
                                                    <td className="px-4 py-2 text-right text-gray-700 dark:text-gray-300">
                                                        {formatCurrency(total)}
                                                    </td>
                                                    <td className="px-4 py-2 text-center">
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                removeItem(
                                                                    index
                                                                )
                                                            }
                                                            className="text-red-500 hover:text-red-700"
                                                        >
                                                            <Trash2 size={18} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })}

                                        {/* Botón para agregar producto, centrado y antes de los totales */}
                                        <tr>
                                            <td
                                                colSpan={8}
                                                className="px-4 py-4 text-center"
                                            >
                                                <button
                                                    type="button"
                                                    onClick={addItem}
                                                    className="inline-flex items-center text-blue-600 hover:text-blue-800"
                                                >
                                                    <PlusCircle
                                                        className="mr-1"
                                                        size={18}
                                                    />
                                                    Agregar producto
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>

                                    <tfoot className="bg-gray-50 dark:bg-gray-900 font-semibold text-gray-700 dark:text-gray-300">
                                        <tr>
                                            <td
                                                colSpan={3}
                                                className="px-4 py-2 text-right"
                                            >
                                                Subtotal:
                                            </td>
                                            <td className="px-4 py-2 text-right">
                                                {formatCurrency(
                                                    totals.subtotal
                                                )}
                                            </td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td
                                                colSpan={3}
                                                className="px-4 py-2 text-right"
                                            >
                                                Total Descuentos:
                                            </td>
                                            <td className="px-4 py-2 text-right">
                                                -
                                                {formatCurrency(
                                                    totals.totalDiscounts
                                                )}
                                            </td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td
                                                colSpan={3}
                                                className="px-4 py-2 text-right"
                                            >
                                                Total IVA:
                                            </td>
                                            <td className="px-4 py-2 text-right">
                                                {formatCurrency(
                                                    totals.totalIva
                                                )}
                                            </td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td
                                                colSpan={3}
                                                className="px-4 py-2 text-right"
                                            >
                                                Total a pagar:
                                            </td>
                                            <td className="px-4 py-2 text-right ">
                                                {formatCurrency(
                                                    totals.totalToPay
                                                )}
                                            </td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>

                            <div className="flex justify-between items-center pt-6 border-t border-gray-200 dark:border-gray-700">
                                <Link
                                    href={route("bills.index")}
                                    className="text-sm text-gray-600 hover:underline dark:text-gray-400"
                                >
                                    Cancelar
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                                >
                                    Crear Factura
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
