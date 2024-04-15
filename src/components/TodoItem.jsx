import React from 'react'

const Todo = ({ todo, onToggleCompleted, onDelete }) => {
    return (
        <tr>
            <td>{todo.id}</td>
            <td>{todo.text}</td>
            <td>
                <input className='checkbox_styling' type="checkbox" checked={todo.completed} onChange={() => onToggleCompleted(todo.id)} />
                <button className='delete_todo_btn' onClick={() => onDelete(todo.id)}>Delete</button>
            </td>
        </tr>
    );
  };
  
  export default Todo;