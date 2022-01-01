import React from "react";

const btn = props => {
    console.log(props.text === "show B"? "render pageII btn" : "render pageI btn")
    return (
        <div onClick={props.setProps}>{props.text}</div>
    )
}

export default btn