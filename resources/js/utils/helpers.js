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
