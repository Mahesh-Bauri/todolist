import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import TodoList from "./components/todolist/TodoList";
import TodoProvider from "./contexts/todoContext";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    // Custom Todo context provider
    <TodoProvider>
      {/* Todolist component */}
      <TodoList />
      {/* Toast Container Component  */}
      <ToastContainer />
    </TodoProvider>
  );
}

export default App;
