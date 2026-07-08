import React from 'react';
import { useEffect, useRef, useState } from 'react';
import TodoItem from './TodoItem';
import { getTheme } from './todoTheme';

// must stay in sync with the card height / gap / window height set in styles.css
const CARD_HEIGHT = 94
const GAP = 18
const VISIBLE_CARDS = 4
const WINDOW_HEIGHT = VISIBLE_CARDS * CARD_HEIGHT + (VISIBLE_CARDS - 1) * GAP

const TodoList = ({ todos, setTodos }) => {

   const [fallingShapes, setFallingShapes] = useState([])
   const listRef = useRef(null)
   const prevLength = useRef(todos.length)

   useEffect(() => {
      if (todos.length > prevLength.current && listRef.current) {
         listRef.current.scrollTo({ top: 0, behavior: 'smooth' })
      }
      prevLength.current = todos.length
   }, [todos])

   function handleDelete(todo) {
      const theme = getTheme(todo.id)
      const uid = `${todo.id}-${Date.now()}`
      const left = Math.random() * 70 + 15

      const visibleCount = Math.min(todos.length, VISIBLE_CARDS)
      const lastCardBottom = visibleCount > 0 ? visibleCount * CARD_HEIGHT + (visibleCount - 1) * GAP : 0
      const top = lastCardBottom - WINDOW_HEIGHT

      setFallingShapes((prev) => [...prev, { uid, theme, left, top }])

      setTimeout(() => {
         setTodos((prevTodos) => prevTodos.filter((t) => t.id !== todo.id))
      }, 350)
   }

   function removeFallingShape(uid) {
      setFallingShapes((prev) => prev.filter((s) => s.uid !== uid))
   }

   return (
      <div className="todo-list-wrapper">
         <div className="todo-list" ref={listRef}>
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
                  style={{ left: `${s.left}%`, top: `${s.top}px`, background: s.theme.shape }}
                  onAnimationEnd={() => removeFallingShape(s.uid)}
               />
            ))}
         </div>
      </div>
   );
};

export default TodoList;
