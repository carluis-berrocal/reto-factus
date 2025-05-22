import { useState, useEffect } from "react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";

export default function InputField({
    label,
    name,
    value,
    onChange,
    error,
    type = "text",
    className = "",
    ...props
}) {
    const [localError, setLocalError] = useState(error);

    useEffect(() => {
        setLocalError(error); // Actualiza el error local si viene nuevo desde props
    }, [error]);

    const handleChange = (e) => {
        const newValue = e.target.value;
        onChange(name, newValue);

        // Si hay error y el usuario empieza a escribir, lo ocultamos visualmente
        if (localError && newValue !== "") {
            setLocalError(null);
        }
    };

    return (
        <div className={className}>
            <InputLabel htmlFor={name} value={label} />
            <TextInput
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={handleChange}
                className="mt-1 block w-full"
                {...props}
            />
            {localError && <InputError message={localError} className="mt-1" />}
        </div>
    );
}
