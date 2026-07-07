import React from 'react';

const TodoStats = ({todos}) => {

   const completed = todos.filter((t) => t.completed === true)
   const rest = todos.filter((t) => t.completed === false)

   return (
      <div>
         All:{todos.length} Completed:{completed.length} Rest: {rest.length}
      </div>
   );
};

export default TodoStats;