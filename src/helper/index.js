export const handleTitle = ({ document, array }) => {
    document.title = `${array.join(" | ")} - Farenow`;
}

export const handleDescription = ({ description, array }) => {
    description.setAttribute(
        "content",
        `Farenow offers best services for ${array.join(", ")}. More info visits today at Farenow.`
    );
}


