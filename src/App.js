import React, {useState, useEffect} from "react";
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
  const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem("tasks")) || [])

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
      editTask={editTask}
      />
  )

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton key={name} name={name} isPressed={ name === filter} setFilter={setFilter} />
  ))

  //apply the save and get functions using useEffect
  //get the saved notes and add them to the array

  //saving data to local storage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks])

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

  function editTask(id, newName) {
    const editedTaskList = tasks.map((task) => {
      if (id === task.id) {
        return {...task, name: newName}
      }
      return task
    })
    setTasks(editedTaskList);
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
    const deletedTasks = tasks.filter((task) => {
      if (filter === "Active") {
        return task.taskCompleted
      } else if (filter === "Completed") {
        return !task.taskCompleted
      } else if (filter === "All") {
        return (setTasks([]))
      }
    })
    setTasks(deletedTasks);
  }

  const todoNoun = taskList.length > 1 ? "tasks" : "task";
  const todoHeading = taskList.length === 0 ? "You have no tasks" : `You have ${taskList.length} ${todoNoun} remaining`;

  return (
    <div className="todo-app">
      <h1 className="todo-title">#Todo</h1>
      <div className="tabs-list col">
        {filterList}
      </div>
      <Form 
        addTask={addTask}
        />
      <div className="todo-number">
        {todoHeading}
      </div>
      
      <div className="todo-list">
        {taskList}
      </div>
      <button type="button" 
              className="delete-tasks" 
              onClick={deleteTasks} 
              style={{visibility: taskList.length <= 0 ? "hidden" : "visible" }}
            >
        <span 
          style={{color: "white", marginRight: "5px"}}>
            <RiDeleteBin6Line size={10}/>
        </span> 
        Delete All
      </button>
    </div>
  )
}

export default App;
