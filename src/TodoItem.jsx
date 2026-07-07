import React from 'react';
import { useState } from 'react';
import { getTheme } from './todoTheme';

const TodoItem = ({ setTodos, todos, todo, onDelete }) => {

   const [leaving, setLeaving] = useState(false)
   const theme = getTheme(todo.id)

   function toggleComplete() {
      setTodos(todos.map((t) => (todo.id === t.id ? { ...t, completed: !t.completed } : t)))
   }

   function handleDeleteClick() {
      if (leaving) return
      setLeaving(true)
      onDelete(todo)
   }

   return (
      <div
         className={`todo-item${leaving ? ' leaving' : ''}${todo.completed ? ' completed' : ''}`}
         style={{ background: theme.bg, color: theme.text }}
      >
         <div className="todo-item__content">
            <button className="todo-item__check" onClick={toggleComplete} aria-label="Toggle complete">
               {todo.completed ? '✓' : ''}
            </button>
            <div className="todo-item__text">
               <p className="todo-item__title">{todo.text}</p>
               <p className="todo-item__subtitle">{todo.completed ? 'Done' : 'In progress'}</p>
            </div>
            <button className="todo-item__delete" onClick={handleDeleteClick} aria-label="Delete">✕</button>
         </div>
         <span className={`todo-item__shape shape-${theme.shapeType}`} style={{ background: theme.shape }} />
      </div>
   );
};

export default TodoItem;
