import { useEffect, useState } from "react"
import Container from "../Container/Container"
import './Todo.css'
import cross from '../../images/icon-cross.svg'

const Todo = ({todo, deleteTodo, toggleCheck}) =>{

    //useState to store al render todos
    const [renderedTodo, setRenderedTodo] = useState([])

    //useEfect to render evert todo in the array with a map function
    useEffect(()=>{
        const task = 
        todo.map((item, index) => (
            <li key={item.id}>
                {/* call to container component then pass all the props that the component needs to display a certain type of content*/}
                <Container child={item.text} toggleCheck={toggleCheck} deleteTodo={deleteTodo} cross={cross} inputs='checkbox' id={item.id} checked={item.checked}/>
            </li>
        ))
        setRenderedTodo(task)
    }, [todo])

    return (
        <ul className="todo-list">
           {renderedTodo}
        </ul>
    )
}

export default Todo