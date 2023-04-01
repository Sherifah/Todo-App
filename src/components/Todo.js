import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri"

function Todo(props) {
  return (
    <div className="todo-item">
      <div className="todo">
        <input 
          id={props.id}
          type="checkbox"
          name="props.name"
          onChange={() => props.toggleTaskCompleted(props.id)}
          defaultChecked={props.taskCompleted}
          />
        <label className="todo-label" htmlFor="0" style={{"textDecoration":props.taskCompleted ? "line-through" : "none" }}>
          {props.name}
        </label>
      </div>
      
      <button className="delete-task" onClick={() => props.deleteTask(props.id)}><div style={{color:"#BDBDBD"}} ><RiDeleteBin6Line size={18}/></div></button>
      
    </div>
  )
}

export default Todo;
