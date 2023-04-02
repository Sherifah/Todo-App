import React, {useState} from "react";
import { RiDeleteBin6Line } from "react-icons/ri"
import { CiEdit } from "react-icons/ci"
import { MdOutlineCancel } from "react-icons/md"
import { AiOutlineCheck } from "react-icons/ai"

function Todo(props) {

  const [isEditing, setIsEditing] = useState(false)

  const [newName, setNewName] = useState("")

  function handleChange(e) {
    setNewName(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    props.editTask(props.id, newName === "" ? props.name : newName)
    setIsEditing(false)
    setNewName("")
  }

  const EditTodo = (
    <form className="edit-add-task" onSubmit={handleSubmit}>
      <input 
        id={props.id}
        className="edit-task-input"
        type="text"
        placeholder={props.name}
        value={newName}
        onChange={handleChange}
        />

      {/*<button type="submit" className="btn-add-task" >Save</button>*/}
      <div>
      <button 
        type="submit"
        className="edit-task" 
      >
        <div style={{color:"#228bec"}} ><AiOutlineCheck size={18}/></div>
      </button>
      
      <button 
        className="delete-task" 
        onClick={() => setIsEditing(false)}
      >
        <div style={{color:"#BDBDBD"}} ><MdOutlineCancel size={18}/></div>
      </button>
      </div>
    </form>
  )

  const defaultTodo = (
    <div className="todo-item">
      <div className="todo">
        <input 
          id={props.id}
          type="checkbox"
          name="props.name"
          onChange={() => props.toggleTaskCompleted(props.id)}
          defaultChecked={props.taskCompleted}
          />
        <label 
          className="todo-label" 
          htmlFor="0" 
          style={{"textDecoration":props.taskCompleted ? "line-through" : "none" }}
        >
          {props.name}
        </label>
      </div>

      <div>
      <button 
        className="edit-task" 
        onClick={() => setIsEditing(true)}
      >
        <div style={{color:"#228bec"}} ><CiEdit size={18}/></div>
      </button>
      
      <button 
        className="delete-task" 
        onClick={() => props.deleteTask(props.id)}
      >
        <div style={{color:"#BDBDBD"}} ><RiDeleteBin6Line size={18}/></div>
      </button>
      </div>
      
    </div>
  )


  return (
    <div>
      {isEditing ? EditTodo : defaultTodo}
    </div>
  )
}

export default Todo;
