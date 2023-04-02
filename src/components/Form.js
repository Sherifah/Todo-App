import React, {useState} from "react";

function Form(props) {

  const [name, setName] = useState("")

  function handleChange(e) {
    setName(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    props.addTask(name)
    setName("")
  }

  return (
    <form className="add-task" onSubmit={handleSubmit}>
      <input 
        className="task-input"
        type="text"
        placeholder="Add task..."
        value={name}
        onChange={handleChange}
        />

      <button type="submit" className="btn-add-task" >Add</button>
    </form>
  )
}

export default Form;
