import InputField from "@/Components/InputField";
import SelectField from "@/Components/SelectField";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useEffect } from "react";
import { Head, useForm, usePage, Link } from "@inertiajs/react";

export default function Create() {
    const { unit_measures = [], product_tributes = [] } = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        code_reference: "",
        name: "",
        quantity: 0,
        discount_rate: 0,
        price: "",
        tax_rate: 0,
        unit_measure_id: 1,
        is_excluded: true,
        tribute_id: 1,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("products.store"));
    };

    useEffect(() => {
        if (parseInt(data.tribute_id) === 1) {
            setData((prev) => ({
                ...prev,
                is_excluded: true,
                tax_rate: 0,
            }));
        } else {
            setData((prev) => ({
                ...prev,
                is_excluded: false,
            }));
        }
    }, [data.tribute_id]);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Crear Producto
                </h2>
            }
        >
            <Head title="Crear Producto" />

            <div className="py-12">
                <div className="mx-auto max-w-4xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-6 shadow-lg sm:rounded-xl dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <InputField
                                    label="Código de Referencia"
                                    name="code_reference"
                                    value={data.code_reference}
                                    onChange={setData}
                                    error={errors.code_reference}
                                    isFocused
                                    required
                                />

                                <InputField
                                    label="Nombre"
                                    name="name"
                                    value={data.name}
                                    onChange={setData}
                                    error={errors.name}
                                    required
                                />

                                <InputField
                                    label="Cantidad"
                                    name="quantity"
                                    type="number"
                                    value={data.quantity}
                                    onChange={setData}
                                    error={errors.quantity}
                                    required
                                />

                                <InputField
                                    label="Descuento (%)"
                                    name="discount_rate"
                                    type="number"
                                    step="10"
                                    value={data.discount_rate}
                                    onChange={setData}
                                    error={errors.discount_rate}
                                />

                                <InputField
                                    label="Precio"
                                    name="price"
                                    type="number"
                                    step="1000"
                                    value={data.price}
                                    onChange={setData}
                                    error={errors.price}
                                    required
                                />

                                <SelectField
                                    label="Unidad de medida"
                                    name="unit_measure_id"
                                    options={unit_measures}
                                    value={data.unit_measure_id}
                                    onChange={setData}
                                    error={errors.unit_measure_id}
                                    required
                                />

                                <InputField
                                    label="Impuesto (%)"
                                    name="tax_rate"
                                    type="number"
                                    // step="0.01"
                                    value={data.tax_rate}
                                    onChange={setData}
                                    error={errors.tax_rate}
                                />

                                <SelectField
                                    label="Tributo"
                                    name="tribute_id"
                                    options={product_tributes}
                                    value={data.tribute_id}
                                    onChange={setData}
                                    error={errors.tribute_id}
                                    required
                                />

                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="is_excluded"
                                        name="is_excluded"
                                        checked={data.is_excluded}
                                        onChange={(e) =>
                                            setData(
                                                "is_excluded",
                                                e.target.checked
                                            )
                                        }
                                        className="rounded text-blue-600"
                                    />
                                    <label
                                        htmlFor="is_excluded"
                                        className="text-gray-700 dark:text-gray-300"
                                    >
                                        ¿Está excluido?
                                    </label>
                                    {errors.is_excluded && (
                                        <p className="text-sm text-red-500 mt-1">
                                            {errors.is_excluded}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-between items-center pt-6 border-t border-gray-200 dark:border-gray-700">
                                <Link
                                    href={route("products.index")}
                                    className="text-sm text-gray-600 hover:underline dark:text-gray-400"
                                >
                                    Cancelar
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                                >
                                    Guardar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
