import React from 'react';
import { useState } from 'react';

const TodoInput = ({ todos, setTodos }) => {

   const [name, setName] = useState('')

   function addTodo() {
      const text = name.trim()
      if (!text) return
      const newId = todos.length ? Math.max(...todos.map((t) => t.id)) + 1 : 1
      setTodos([{ id: newId, text, completed: false }, ...todos])
      setName('')
   }

   function handleKeyDown(e) {
      if (e.key === 'Enter') addTodo()
   }

   return (
      <div className="todo-input">
         <input
            className="todo-input__field"
            type="text"
            placeholder="What you wanna do today?"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyDown}
         />
         <button className="todo-input__button" onClick={addTodo}>Add</button>
      </div>
   );
};

export default TodoInput;
