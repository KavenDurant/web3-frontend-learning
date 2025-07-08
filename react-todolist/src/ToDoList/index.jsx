import React, { useState } from 'react';
import './index.css';
export default function TodoList() {
    const [todos, setTodos] = useState(["1111","2222","3333"]);
    const [input, setInput] = useState('');
    const handleInputChange = (e) => {
        setInput(e.target.value);
    }
    const handleAddTodo = () => {
        setTodos([...todos, input]);
        setInput('');
    }
    const handleDeleteTodo = (index) => {
        setTodos(todos.filter((item,i)=>i !== index));
        // filter是数组的方法，用于过滤数组中的元素，返回一个新数组，新数组中的元素是原数组中满足条件的元素。
        // 参数是一个函数，函数参数是数组中的每个元素，返回一个布尔值，如果为true，则保留该元素，如果为false，则不保留该元素。
        // 参数是一个函数，函数参数是数组中的每个元素，返回一个布尔值，如果为true，则保留该元素，如果为false，则不保留该元素。
    }
    return (
        <div className='todo-list'>
            <h2>Todo List</h2>
            <div className='todo-list-content'>
                <div className='todo-list-item'>
                    <input type="text" placeholder='Add a new todo' value={input} onChange={handleInputChange} />
                    <button onClick={handleAddTodo} disabled={input === ''}>Add</button>
                </div>
            </div>
            <div className='todo-list-menu'>
                <div className='todo-list-menu-content'>
                    {todos.map((item,index)=>{
                        return (
                            <div className='todo-list-menu-item' key={index}>
                                <span>{index + 1}-{item}</span>
                                <button onClick={()=>handleDeleteTodo(index)}>Delete</button>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}