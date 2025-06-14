export const formatCurrency = (value) => {
    return new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 2,
    }).format(value);
};

export const formatearFecha = (fecha) => {
    if (!fecha) return "";

    const [diaMesAnio, hora, periodo] = fecha.split(" ");
    const [dia, mes, anio] = diaMesAnio.split("-");
    const meses = [
        "Ene",
        "Feb",
        "Mar",
        "Abr",
        "May",
        "Jun",
        "Jul",
        "Ago",
        "Sep",
        "Oct",
        "Nov",
        "Dic",
    ];

    return `${dia} ${
        meses[parseInt(mes, 10) - 1]
    } ${anio} a las ${hora} ${periodo}`;
};

export function calculateDV(nit) {
    if (!/^\d+$/.test(nit)) return "";

    const weights = [71, 67, 59, 53, 47, 43, 41, 37, 29, 23, 19, 17, 13, 7, 3];
    let sum = 0;
    nit
        .padStart(15, "0")
        .split("")
        .forEach((digit, index) => {
            sum += parseInt(digit) * weights[index];
        });

    const remainder = sum % 11;
    if (remainder < 2) return remainder.toString();
    return (11 - remainder).toString();
}

