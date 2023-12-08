import React, { useState } from 'react';
import "./TodoItem.css";

const TodoItem = ({ todo, toggleComplete, editTodo, deleteTodo }) => {
  const [editing, setEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    if (editedTitle.trim() !== '') {
      editTodo(todo.id, editedTitle);
      setEditing(false);
    } else {
      alert('Task name cannot be empty. Please enter a valid title.');
    }
  };
  const getMarkCompleteButtonText = () => {
    return todo.completed ? 'Mark as Not Completed' : 'Mark as Completed';
  };

  return (
    <div className="todo-item">
      {editing ? (
        <>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <div>
            <button onClick={handleSave} className='save'>Save</button>
          </div>
        </>
      ) : (
        <>
          <h2 className='title'>{todo.title}</h2>
          <div className="buttons">
            <button onClick={handleEdit} className='edit'>Edit</button>
            <button onClick={() => deleteTodo(todo.id)}className='delete'>Delete</button>

          </div>
        </>
      )}
      <p>
        <strong>Status:</strong> {todo.completed ? 'Completed' : 'Not Completed'}
      </p>
      <button
              onClick={() => toggleComplete(todo.id)}
              className='mark-complete'
              style={{
                backgroundColor: todo.completed ? 'rgb(19, 137, 86)' : 'rgb(198, 96, 12)',
                color: '#fff',
                border: 'none',
                padding: '8px 15px',
                cursor: 'pointer',
                borderRadius: '4px',
                transition: 'background-color 0.3s ease',
                marginRight: '5px',
              }}
            >
              {getMarkCompleteButtonText()}
            </button>
    </div>
  );
};

export default TodoItem;
