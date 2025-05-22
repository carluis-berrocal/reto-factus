import { useEffect, useState } from "react";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";

export default function SelectField({
    label,
    name,
    options = [],
    value,
    onChange,
    error,
    className = "",
    optionValue = "id",     // 👈 nuevo
    optionLabel = "name",   // 👈 nuevo
    ...props
}) {
    const [localError, setLocalError] = useState(error);

    useEffect(() => {
        setLocalError(error);
    }, [error]);

    const handleChange = (e) => {
        const newValue = e.target.value;
        onChange(name, newValue);

        if (localError && newValue !== "") {
            setLocalError(null);
        }
    };

    return (
        <div className={className}>
            <InputLabel htmlFor={name} value={label} />
            <select
                id={name}
                name={name}
                value={value}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-indigo-600 dark:focus:ring-indigo-600"
                {...props}
            >
                <option value="">Seleccione</option>
                {options.map((opt) => (
                    <option key={opt[optionValue]} value={opt[optionValue]}>
                        {opt[optionLabel]}
                    </option>
                ))}
            </select>
            {localError && <InputError message={localError} className="mt-1" />}
        </div>
    );
}
