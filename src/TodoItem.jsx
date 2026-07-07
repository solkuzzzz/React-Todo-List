import React from 'react';
import { useState } from 'react';

const TodoItem = ({setTodos, todos, todo}) => {

   function deleteBtn() {
      setTodos(todos.filter((t) => t.id !== todo.id))
   }

   return (
      <div style={{display: 'flex'}}>
         <input type="checkbox" checked={todo.completed} onChange={() => setTodos(todos.map((t) => (todo.id === t.id ? {...t, completed: !t.completed} : t)))}/>
         <p>{todo.text}</p>
         <button style={{height: '30px', marginLeft: '10px', marginTop: '10px'}} onClick={deleteBtn}>Delete</button>
      </div>
   );
};

export default TodoItem;