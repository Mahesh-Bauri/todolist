import React, { useState, createContext, useEffect, useContext } from "react";
import { toast } from "react-toastify";

// Create Todo Context
const todoContext = createContext();

// Custom Hooks
export const useTodos = () => {
	const value = useContext(todoContext);
	return value;
};

// Custom Context Provider Component
const TodoProvider = ({ children }) => {
	const [todoText, setTodoText] = useState("");
	const [todos, setTodos] = useState([]);
	const [isEdit, setIsEdit] = useState(false);
	const [id, setId] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const addTodo = async (todo) => {
		try {
			var res = await fetch("https://jsonplaceholder.typicode.com/posts", {
				method: "POST",
				body: JSON.stringify({
					userId: 1,
					title: todo,
					completed: false,
				}),
				headers: {
					"Content-type": "application/json; charset=UTF-8",
				},
			});
		} catch (e) {
			console.log(e.message);
		}
		return await res.json();
	};

	// addind the todo in todos state
	const handleAdd = async (e, todo) => {
		e.preventDefault();

		if (!todo) {
			toast.warn("Please add something!", {
				autoClose: 1000,
			});
			return;
		}

		if (isEdit) {
			handleUpdate(todo);
			return;
		}

		toast.success("Todo is adding!", { autoClose: 1000 });

		// dummy fetch call using async function
		const data = await addTodo(todo);

		// set Todos in todos state
		setTodos((prev) => {
			return [{ ...data, id: new Date().getTime() }, ...prev];
		});

		// show toast for successfully added
		toast.success("Added Successfully!", { autoClose: 2000 });
	};

	// toggle the todo item
	const handleCompleted = (id) => {
		const foundTodo = todos.find((todo) => todo.id === id);

		setTodos((prev) => {
			return prev.map((todo) => {
				if (todo.id === id) {
					return { ...todo, completed: !todo.completed };
				}
				return todo;
			});
		});

		if (!foundTodo.completed) {
			toast.success("Task Completed!", {
				position: toast.POSITION.BOTTOM_LEFT,
				autoClose: 1500,
			});
		} else {
			toast.success("Task Incompleted!", {
				position: toast.POSITION.BOTTOM_LEFT,
				autoClose: 1000,
			});
		}
	};

	const updateTodo = async (todo) => {
		try {
			var res = await fetch(`https://jsonplaceholder.typicode.com/todos/1`, {
				method: "PUT",
				body: JSON.stringify({
					id: id,
					title: todo.title,
					userId: 1,
				}),
				headers: {
					"Content-type": "application/json; charset=UTF-8",
				},
			});
		} catch (e) {
			console.log(e.message);
		}
		return await res.json();
	};

	// helper function for update the todo
	const setUpdateTodo = (todo) => {
		window.scroll({
			top: 0,
			behavior: "smooth",
		});

		setTodoText(todo.title);
		setId(todo.id);
		setIsEdit(true);
	};

	// update the todos state
	const handleUpdate = async (newTodo) => {
		toast.success("Todo is updating!", { autoClose: 1000 });
		await updateTodo(newTodo);
		setId(null);

		// update todos using id's
		setTodos((prev) => {
			return prev.map((todo) => {
				if (todo.id === id) return { ...todo, title: newTodo };
				return todo;
			});
		});

		toast.success("Updated Successfully!", { autoClose: 2000 });
		setIsEdit(false);
	};

	// helper function
	const deleteTodo = async (id) => {
		try {
			await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
				method: "DELETE",
			});
		} catch (e) {
			console.log(e.message);
		}
	};

	// delete function for deleting the todo
	const handleDelete = async (idx) => {
		toast.success("Todo is deleting!", { autoClose: 1000 });
		if (idx === id) {
			setTodoText("");
		}
		setIsEdit(false);
		await deleteTodo(idx);
		toast.success("Deleted Successfully!", { autoClose: 2000 });
		setTodos((prev) => {
			return prev.filter((todo) => idx !== todo.id);
		});
	};

	// async function to fetch todos
	const getTodos = async (url) => {
		const res = await fetch(url);
		const data = await res.json();
		setTodos(data.slice(0, 6));
		setIsLoading(false);
	};

	// to get all list of todos and set todos state
	useEffect(() => {
		setIsLoading(true);
		getTodos("https://jsonplaceholder.typicode.com/todos");
	}, []);

	return (
		<todoContext.Provider
			value={{
				todos,
				handleAdd,
				todoText,
				setTodoText,
				handleCompleted,
				handleDelete,
				setUpdateTodo,
				isLoading,
			}}
		>
			{children}
		</todoContext.Provider>
	);
};

export default TodoProvider;
