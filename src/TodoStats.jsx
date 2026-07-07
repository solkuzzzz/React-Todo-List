import React from 'react';

const TodoStats = ({ todos }) => {

   const completed = todos.filter((t) => t.completed === true)
   const rest = todos.filter((t) => t.completed === false)

   return (
      <div className="todo-stats">
         <span>All: <b>{todos.length}</b></span>
         <span>Completed: <b>{completed.length}</b></span>
         <span>Rest: <b>{rest.length}</b></span>
      </div>
   );
};

export default TodoStats;
