import React, { useState } from 'react';
import "./TodoForm.css"
const TodoForm = ({ addTodo }) => {
  const [newTodo, setNewTodo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(newTodo);
    setNewTodo('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a new task..."
        value={newTodo}
        maxLength={50} 
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button type="submit" className='add'>Add</button>
    </form>
  );
};

export default TodoForm;
