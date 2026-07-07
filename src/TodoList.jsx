import React from 'react';
import { useState } from 'react';
import TodoItem from './TodoItem';
import { getTheme } from './todoTheme';

const TodoList = ({ todos, setTodos }) => {

   const [fallingShapes, setFallingShapes] = useState([])

   function handleDelete(todo) {
      const theme = getTheme(todo.id)
      const uid = `${todo.id}-${Date.now()}`
      const left = Math.random() * 70 + 15
      setFallingShapes((prev) => [...prev, { uid, theme, left }])

      setTimeout(() => {
         setTodos((prevTodos) => prevTodos.filter((t) => t.id !== todo.id))
      }, 350)
   }

   function removeFallingShape(uid) {
      setFallingShapes((prev) => prev.filter((s) => s.uid !== uid))
   }

   return (
      <div className="todo-list-wrapper">
         <div className={`todo-list${todos.length > 4 ? ' todo-list--peek' : ''}`}>
            {todos.map((todo) => (
               <TodoItem key={todo.id} setTodos={setTodos} todos={todos} todo={todo} onDelete={handleDelete} />
            ))}
            {todos.length === 0 && <p className="todo-empty">There is nothing to do</p>}
         </div>
         <div className="falling-shapes">
            {fallingShapes.map((s) => (
               <span
                  key={s.uid}
                  className={`falling-shape shape-${s.theme.shapeType}`}
                  style={{ left: `${s.left}%`, background: s.theme.shape }}
                  onAnimationEnd={() => removeFallingShape(s.uid)}
               />
            ))}
         </div>
      </div>
   );
};

export default TodoList;
