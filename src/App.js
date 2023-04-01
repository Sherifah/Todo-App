import React, {useState} from "react";
import FilterButton from "./components/FilterButton";
import Form from "./components/Form";
import Todo from "./components/Todo";
import { nanoid } from "nanoid";
import { RiDeleteBin6Line } from "react-icons/ri"


const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.taskCompleted,
  Completed: (task) => task.taskCompleted
};

const FILTER_NAMES = Object.keys(FILTER_MAP);


function App() {
  const [tasks, setTasks] = useState([])

  const [filter, setFilter] = useState("All")

  const taskList = tasks
  .filter(FILTER_MAP[filter])
  .map((task) => 
    <Todo
      name={task.name}
      id={task.id}
      taskCompleted={task.taskCompleted}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      />
  )

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton key={name} name={name} isPressed={ name === filter} setFilter={setFilter} />
  ))

  function addTask(name) {
    const newTask = { id: `todo-${nanoid()}`, name,  taskCompleted: false }
    return (
      setTasks((oldTasks) => 
        [...oldTasks, newTask]
      )
    )
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => task.id !== id)
    setTasks(remainingTasks)
  }

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) {
        return({...task, taskCompleted: !task.taskCompleted})
      }
      else {
        return(task)
      }
    })
    setTasks(updatedTasks)
  }

  function deleteTasks() {
    setTasks([]);
  }

  return (
    <div className="todo-app">
      <h1 className="todo-title">#Todo</h1>
      <div className="tabs-list col">
        {filterList}
      </div>
      <Form 
        addTask={addTask}/>
      <div className="todo-list">
        {taskList}
      </div>
      <button type="button" className="delete-tasks" onClick={deleteTasks} style={{visibility: tasks.length <= 0 ? "hidden" : "visible" }}>
        <span style={{color: "white", marginRight: "5px"}}><RiDeleteBin6Line size={10}/></span> 
        Delete All</button>
    </div>
  )
}

export default App;
