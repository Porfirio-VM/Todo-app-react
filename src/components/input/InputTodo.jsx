import { useState } from "react";
import Container from "../Container/Container"
import './InputTodo.css'

// main function of the component that recieves as prop the function addTodo 
const InputTodo = ({addTodo}) =>{

    //useState to save the value of the input 
    const [task, setTask] = useState("")

    const handleInput = (e) =>{
        setTask(e.target.value)
    }

    const handleSubmit = (e) =>{
        e.preventDefault(); //prevents the reload of the page when the form is submit
        addTodo(task)
        setTask("") //reset the value
    }

    return(
        <Container 
        inputs='button'
        handleSubmit={handleSubmit}
        child={
            <form onSubmit={handleSubmit} className="form-todo">
                <input placeholder="Create a new todo..." className="input-todo" value={task} onChange={handleInput}  type="text" />
            </form>
            }
        />
            
    )
}

export default InputTodo