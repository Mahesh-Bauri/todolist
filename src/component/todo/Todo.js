import React from "react";
import "./todo.styles.scss";
import { RxCross1 } from "react-icons/rx";
import { FiEdit } from "react-icons/fi";
import { FaRegCheckCircle, FaCheckCircle } from "react-icons/fa";
import { useTodos } from "../../context/todoContext";

const Todo = ({ title, completed, id }) => {
  // get state and function from Custom Hooks
  const { handleDelete, handleCompleted, setUpdateTodo } = useTodos();

  return (
    <div className="todo-container">
      <span className="icon-check" onClick={() => handleCompleted(id)}>
        {!completed ? (
          <FaRegCheckCircle className="not-completed" />
        ) : (
          <FaCheckCircle className="completed" />
        )}
      </span>
      <div className="title-wrapper">
        <p className={`title ${completed && "todo-completed"}`}>{title}</p>
      </div>
      <span className="edit" onClick={() => setUpdateTodo({ id, title })}>
        <FiEdit />
      </span>
      <span className="cancle" onClick={() => handleDelete(id)}>
        <RxCross1 />
      </span>
    </div>
  );
};

export default Todo;
