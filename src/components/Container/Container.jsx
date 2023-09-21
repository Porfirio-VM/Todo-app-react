import './Container.css'
import check from '../../images/icon-check.svg'

//main funtion of the component container that recieves the props to display some features dependig the content of these
const Container = ({child, cross, inputs, handleSubmit,id, deleteTodo, toggleCheck, checked}) =>{

    const handleCheckboxClick = () => {
        toggleCheck(id); // Call the callback function with the id of the task
      };

    return(
        <article className="todo-container">
           {inputs == "button"? //ternary operator to display a certain type of HTML tag
                <button onClick={handleSubmit} className='circle' type="button" value="">  
                        <img src={check} alt="" />
                </button>
           :
                <label htmlFor={id} className='custom-checkbox'>
                        <input checked={checked === true? true: false} type="checkbox" name="todo-task" id={id} onChange={handleCheckboxClick}/>
                        <span className="checkmark">
                            <img src={check} alt="" />
                        </span>
                </label>}
            
            <div className="task">
                {child}
                <picture className='cross' onClick={()=>deleteTodo(id)}>
                    {cross ? <img src={cross}></img>: null}
                </picture>
                
            </div>    
        </article>
    )
}

export default Container