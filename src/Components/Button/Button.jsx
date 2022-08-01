import React, { useState, useEffect } from "react";
import { AiFillPlusCircle, AiOutlineClear} from "react-icons/ai";
import { RiDeleteBin5Line } from "react-icons/ri";
import {BiEdit} from "react-icons/bi";
import "./ListStyle.css";
import styles from "./Button.module.css";
import Swal from "sweetalert2";
import nextId from "react-id-generator";

function Button() {
  const [tasks, setTasks] = useState(localStorage.tasks? JSON.parse(localStorage.tasks) : []);

  useEffect(() => { 
    
   localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks])
  

  const clickHandler = async () => {
    const { value: task } = await Swal.fire({
      title: "Add a new task",
      input: "text",
      inputPlaceholder: "Enter a new task",
      showCancelButton: true,
    });
    if (task) {
        let taskId = nextId();
      setTasks([...tasks, {
        id: taskId,
        value: task
      }]);
      localStorage.setItem('tasks', JSON.stringify(tasks))
    }
  };

  const onDelete = (e) => {
    e.target.classList.add("tasks");

  };

  const removeClick = (id) => {
    let filtered = tasks.length > 0 && tasks.filter((item) => (item.id !== id))
    setTasks(filtered)
    localStorage.setItem('tasks', JSON.stringify(filtered))
  };

  const clearClick = () => {
     
const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })
  
  swalWithBootstrapButtons.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete all Tasks!',
    cancelButtonText: 'No, cancel!',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      swalWithBootstrapButtons.fire(
        'Deleted!',
        'Your tasks has been deleted.',
        'success'
      )
      setTasks([])
      localStorage.setItem('tasks', JSON.stringify(tasks))
    } 
  })
  }


  const editClick = async (id) => {
    console.log(id)
    const copy = [...tasks];
    const Index = copy.indexOf(copy.find(item => item.id === id));
    console.log(Index)

    console.log(tasks.value)
    const { value: update } = await Swal.fire({
        inputValue: copy[Index].value,
        title: "Edit Task",
        input: "text",
        inputPlaceholder: "Update Task",
        showCancelButton: true,
      })
      if (update) { 
        copy[Index].value = update;
        setTasks(copy);

        localStorage.setItem('tasks',JSON.stringify(copy))
      }
  }

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.task}>
          <ul>
            {tasks.map((task) => (
              <li key={task.id} className="tasksList" >
                <span onClick={onDelete}>{task.value}</span>

                {<RiDeleteBin5Line onClick={() => removeClick(task.id)} style={{margin: "20px"}} />}
                <BiEdit onClick={() => editClick(task.id)}  />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div></div>
      <button className={styles.button} onClick={clickHandler}>
        <AiFillPlusCircle /> New Task
      </button>
      <button className={styles.clear} onClick={clearClick}>
        <AiOutlineClear /> Clear
      </button>
    </div>
  );
}

export default Button;
