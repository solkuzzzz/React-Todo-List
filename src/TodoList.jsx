import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, setTodos }) => {
   return (
      <div>
         {todos.map((todo) => < TodoItem setTodos={setTodos} todos={todos} todo={todo} key={todo.id} />)}
         {todos.length === 0 && 'There is nothing to do' }
      </div>
   );
};

export default TodoList;