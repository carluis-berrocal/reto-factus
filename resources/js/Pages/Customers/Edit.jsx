import InputField from "@/Components/InputField";
import SelectField from "@/Components/SelectField";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage, Link } from "@inertiajs/react";

export default function Edit() {
    const {
        municipalities = [],
        tributes = [],
        legalOrganizations = [],
        identificationDocuments = [],
        customer,
    } = usePage().props;

    const { data, setData, put, processing, errors } = useForm({
        identification: customer.identification || "",
        dv: customer.dv || "",
        company: customer.company || "",
        trade_name: customer.trade_name || "",
        names: customer.names || "",
        address: customer.address || "",
        email: customer.email || "",
        phone: customer.phone || "",
        legal_organization_id: customer.legal_organization_id || "",
        tribute_id: customer.tribute_id || "",
        identification_document_id: customer.identification_document_id || "",
        municipality_id: customer.municipality_id || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("customers.update", customer.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Editar Cliente
                </h2>
            }
        >
            <Head title="Editar Cliente" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-6 shadow-lg sm:rounded-xl dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-6 max-w-4xl mx-auto"
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <InputField
                                    label="Identificación"
                                    name="identification"
                                    value={data.identification}
                                    onChange={setData}
                                    error={errors.identification}
                                    required
                                    isFocused
                                />
                                <InputField
                                    label="DV"
                                    name="dv"
                                    value={data.dv}
                                    onChange={setData}
                                    error={errors.dv}
                                />
                                <InputField
                                    label="Razón Social"
                                    name="company"
                                    value={data.company}
                                    onChange={setData}
                                />
                                <InputField
                                    label="Nombre Comercial"
                                    name="trade_name"
                                    value={data.trade_name}
                                    onChange={setData}
                                />
                                <InputField
                                    label="Nombres"
                                    name="names"
                                    value={data.names}
                                    onChange={setData}
                                    error={errors.names}
                                    className="sm:col-span-2"
                                />
                                <InputField
                                    label="Dirección"
                                    name="address"
                                    value={data.address}
                                    onChange={setData}
                                    error={errors.address}
                                    className="sm:col-span-2"
                                />
                                <InputField
                                    label="Correo"
                                    name="email"
                                    type="email"
                                    value={data.email}
                                    onChange={setData}
                                    error={errors.email}
                                />
                                <InputField
                                    label="Teléfono"
                                    name="phone"
                                    value={data.phone}
                                    onChange={setData}
                                    error={errors.phone}
                                />
                                <SelectField
                                    label="Tipo de organización"
                                    name="legal_organization_id"
                                    options={legalOrganizations}
                                    value={data.legal_organization_id}
                                    onChange={setData}
                                    error={errors.legal_organization_id}
                                />
                                <SelectField
                                    label="Tipo de tributo"
                                    name="tribute_id"
                                    options={tributes}
                                    value={data.tribute_id}
                                    onChange={setData}
                                />
                                <SelectField
                                    label="Tipo de documento"
                                    name="identification_document_id"
                                    options={identificationDocuments}
                                    value={data.identification_document_id}
                                    onChange={setData}
                                />
                                <SelectField
                                    label="Municipio"
                                    name="municipality_id"
                                    options={municipalities}
                                    value={data.municipality_id}
                                    onChange={setData}
                                />
                            </div>

                            <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
                                <Link
                                    href={route("customers.index")}
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
