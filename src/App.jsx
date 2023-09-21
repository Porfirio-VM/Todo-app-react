import Todo from "./components/todo/Todo"
import InputTodo from "./components/input/InputTodo"
import { useEffect, useState } from "react"
import './App.css'
import sun from "./images/icon-sun.svg"
import moon from "./images/icon-moon.svg"

function App() {

  const [theme, setTheme] = useState(moon) //useState to assing the default theme
  const [todo, setTodo] = useState([]) //useState to store all todo created
  const [filter, setFilter] = useState([]) //useState to filter todo
  
  // I create a useState to generate an id for each created todo, to avoid depending on the indexes, since depending on them caused errors in the filtering.
  const [taskIdCounter, setTaskIdCounter] = useState(1);

  //useEffect to render the todos when a new todo is added
  useEffect(() => {
    setFilter(todo);
  }, [todo]);

  useEffect(() => {
    // Applies the theme to the body of the document when the component is assembled
    if (theme === sun) {
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
    } else {
      document.body.classList.add("light-mode");
      document.body.classList.remove("dark-mode");
    }
  }, [theme]);

  //arrow function to add a new todo
  const addTodo = (task) => {
    if (task === "") {
      alert('You need to write some task');
    } else {
      const newTask = { id: taskIdCounter, text: task, checked: false };
      setTaskIdCounter(taskIdCounter + 1);  //increase the id for the next created todo
      setTodo([...todo, newTask]);
    }
  }

  //function to delete a specific todo 
  const deleteTodo = (id) =>{
    const updatedTodo = todo.filter((item) => item.id !== id);
    setTodo(updatedTodo);
  }

  //add checked to items that are selected
  const toggleCheck = (id) =>{
    const updatedTodo = todo.map((item) => {
      if (item.id === id) {
        return { ...item, checked: !item.checked };
      }
      return item;
    });
    setTodo(updatedTodo);
  }

  /*--- Todo filters functions ---*/
  const showAll = () =>{
    setFilter(todo)
  }

  const showActive = () =>{
    const active = todo.filter(task => !task.checked)
    setFilter(active)
  }

  const showCompleted = () =>{
    const completed = todo.filter(task => task.checked)
    setFilter(completed)
  }

  const deleteSelected = () =>{
    const newTodo = todo.filter(task => !task.checked)
    setTodo(newTodo)
  }

  const changeTheme = () =>{
    const newTheme = theme === moon ? sun : moon;
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  }

  return (
    <>
      <header className="todo-header">
        <h1>TODO</h1>
        <button className="switch" onClick={changeTheme}>
            <img src={theme} alt="" />
        </button>
      </header>
      <main>
        <div className="component-border">
          {/* call to component InputTodo then we pass the funciton addTodo as a prop */}
          <InputTodo addTodo={addTodo} /> 
        </div>
        <div className="component-border">
         { /* call to component Todo then pass the filter as todo to render the filtered todos, then pass some functions */}
          <Todo todo={filter} deleteTodo={deleteTodo} toggleCheck={toggleCheck} />
        </div>
      </main>
      <footer className="todo-footer">
        <div className="todo-items">{todo.filter(task => !task.checked).length} Items Left</div>
        <div className="todo-filter">
          <button className="button-foot" onClick={showAll}>All</button>
          <button className="button-foot" onClick={showActive}>Active</button>
          <button className="button-foot" onClick={showCompleted}>Completed</button>
        </div>
        <div className="clear-items">
          <button className="button-foot" onClick={deleteSelected}>Clear Completed</button>
        </div>
      </footer>
    </>
  )
}

export default App
