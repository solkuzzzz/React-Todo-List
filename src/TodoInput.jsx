import React from 'react';
import { useState } from 'react';

const TodoInput = ({todos, setTodos}) => {

   const [name, setName] = useState('')
   let newId = 3
   
   function addTodo(e) {
      setTodos([...todos, {id: newId + 1, text: `${name}`, completed: false}])
      newId++
   }
   
   return (
      <label>
         <input type="text" placeholder='What you wanna do today?' value={name} onChange={e => setName(e.target.value)}/>
         <button onClick={addTodo}>Add</button>
      </label>
   );
};

export default TodoInput;