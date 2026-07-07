import { useState } from "react";
import TodoInput from "./TodoInput.jsx";
import TodoList from "./TodoList.jsx";
import TodoStats from "./TodoStats.jsx";

const todoData = [{
  id: 1,
  text: "Buy milk",
  completed: false
},
{
  id: 2,
  text: "Walk dog",
  completed: true
}
]

export default function App() {
  const [todos, setTodos] = useState( todoData )

  return (
    <div>
      < TodoInput setTodos={setTodos} todos={todos}/>
      < TodoStats todos={todos}/>
      < TodoList todos={todos} setTodos={setTodos} />
    </div>
  )
}