import React, { useState, useEffect } from 'react';
import TodoList from './TodoList';
import TodoForm from './TodoForm';
import "./TodoApp.css"
const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [filterCompleted, setFilterCompleted] = useState(false);

  useEffect(() => {
    // Fetch initial todos from the API
    fetch('https://jsonplaceholder.typicode.com/users/1/todos')
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((error) => console.log(error));
  }, []);

  const addTodo = (title) => {
    // Validate and add new task
    if (title.trim()) {
      const newTodo = {
        id: todos.length + 1,
        title,
        completed: false,
      };
      setTodos([newTodo,...todos]);
    }
  };

  const toggleComplete = (id) => {
    // Toggle the completion status of a task
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const editTodo = (id, newTitle) => {
    // Edit the title of a task
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, title: newTitle } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    // Delete a task
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const filteredTodos = filterCompleted
    ? todos.filter((todo) => todo.completed)
    : todos;

  return (
    <div className="container">
      <h1 className='head'>!! Todo List !!</h1>
      <TodoForm addTodo={addTodo} />
      <div className='checkbox-wrapper'>
        <label>
          Show Completed :
          <input
            type="checkbox"
            checked={filterCompleted}
            onChange={() => setFilterCompleted(!filterCompleted)}
            style={{
              transform: 'scale(2)',
              marginLeft:'10px'
            }}
          />
        </label>
      </div>
      <TodoList
        todos={filteredTodos}
        toggleComplete={toggleComplete}
        editTodo={editTodo}
        deleteTodo={deleteTodo}
      />
    </div>
  );
};

export default TodoApp;
