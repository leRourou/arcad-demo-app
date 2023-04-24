import React, { useState } from "react";
import "../style/tags.scss"

export default function Filter(props) {

    let [filterClass, setFilterClass] = useState("tag");

    // Define the tag color based on the type
    switch (props.type) {
        case "include":
            filterClass += " tag-include";
            break;
        case "exclude":
            filterClass += " tag-exclude";
            break;
        case "add":
            filterClass += " tag-add";
            break;
        default:
            break;
    }

    // Determine the icon to display based on the type (add or delete)
    function determineIcon() {
        var icon = "http://localhost:3000/images/deleteTag.svg";
        var alt = "delete tag"
        var onClick = handleDelete;

        if (props.type === "add") {
            icon = "http://localhost:3000/images/addTag.svg";
            alt = "add tag";
            onClick = props.onAdd;
        }

        return (
            <img src={icon} alt={alt} onClick={onClick}></img>
        );
    }


    // Delete the tag
    function handleDelete() {
        setFilterClass(filterClass + " tag-delete");
        setTimeout(() => {
            props.onDelete(props.id);
        }, 350);
    }

    return (
        <div className={filterClass}>
            <p>{props.label}</p>
            {determineIcon()}
        </div>
    );
}
