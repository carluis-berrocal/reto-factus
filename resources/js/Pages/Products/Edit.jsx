import InputField from "@/Components/InputField";
import SelectField from "@/Components/SelectField";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage, Link } from "@inertiajs/react";

export default function Edit() {
    const { product, unitMeasures = [], productTributes = [] } = usePage().props;

    const { data, setData, put, processing, errors } = useForm({
        code_reference: product.code_reference || "",
        name: product.name || "",
        quantity: product.quantity || 0,
        discount_rate: product.discount_rate || 0,
        price: product.price || 0,
        tax_rate: product.tax_rate || 0,
        unit_measure_id: product.unit_measure_id || "",
        is_excluded: product.is_excluded ?? false,
        tribute_id: product.tribute_id || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("products.update", product.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Editar Producto
                </h2>
            }
        >
            <Head title="Editar Producto" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-6 shadow-lg sm:rounded-xl dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-6 max-w-4xl mx-auto"
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <InputField
                                    label="Código de Referencia"
                                    name="code_reference"
                                    value={data.code_reference}
                                    onChange={setData}
                                    error={errors.code_reference}
                                    required
                                    isFocused
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
                                    min={0}
                                    step="any"
                                />
                                <InputField
                                    label="Precio"
                                    name="price"
                                    type="number"
                                    value={data.price}
                                    onChange={setData}
                                    error={errors.price}
                                    min={0}
                                    step="any"
                                />
                                <InputField
                                    label="Descuento (%)"
                                    name="discount_rate"
                                    type="number"
                                    value={data.discount_rate}
                                    onChange={setData}
                                    error={errors.discount_rate}
                                    min={0}
                                    max={100}
                                    step="any"
                                />
                                <InputField
                                    label="Impuesto (%)"
                                    name="tax_rate"
                                    type="number"
                                    value={data.tax_rate}
                                    onChange={setData}
                                    error={errors.tax_rate}
                                    min={0}
                                    max={100}
                                    step="any"
                                />
                                <SelectField
                                    label="Unidad de Medida"
                                    name="unit_measure_id"
                                    options={unitMeasures}
                                    value={data.unit_measure_id}
                                    onChange={setData}
                                    error={errors.unit_measure_id}
                                />
                                <SelectField
                                    label="Tributo"
                                    name="tribute_id"
                                    options={productTributes}
                                    value={data.tribute_id}
                                    onChange={setData}
                                    error={errors.tribute_id}
                                />
                                <div className="sm:col-span-2 flex items-center gap-2">
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

                            <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
                                <Link
                                    href={route("products.index")}
                                    className="text-sm text-gray-600 hover:underline dark:text-gray-400"
                                >
                                    Cancelar
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm"
                                >
                                    Actualizar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
