import { useEffect, useState } from "react"
import { TodoProvider } from "./context/useTodo"
import TodoForm from "./components/TodoForms";
import TodoItem from "./components/TodoItem";

function App() {

  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prev) => [{id: Date.now(), ...todo}, ...prev])
    console.log(todos);
  }

  const updateTodo = (id, newTodo) => {
    setTodos((prev) => prev.map((todoItem) => todoItem.id === id ? newTodo : todoItem))
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todoItem) => todoItem.id !== id));
  }

  const completeTodo = (id) => {
    setTodos((prev) => prev.map((todoItem) => todoItem.id === id ? {...todoItem, isCompleted: true} : todoItem))
    console.log("Worked!")
  }

  useEffect(() => {
    if(todos && todos.length > 0){
      JSON.parse(localStorage.getItem('todos'))
    }
  }, [todos]);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider value={{todos, addTodo, updateTodo,deleteTodo, completeTodo}}>
        <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <TodoForm /> 
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos.map((todo) => (
              <div key={todo.id}>
                <TodoItem todo={todo}/>
              </div>
            ))}
          </div>
        </div>
        </div>
    </TodoProvider>
    
  )
}

export default App
