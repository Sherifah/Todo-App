import React from "react";

function FilterButton(props) {
    const status = props.isPressed ? "active" : "";
  return (
    <div>
        <button className={`tab-item ${status}`} onClick={() => props.setFilter(props.name)}>{props.name}</button>
    </div>
  )
}

export default FilterButton;
