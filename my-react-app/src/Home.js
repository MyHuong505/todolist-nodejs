import React, { useEffect, useState } from "react";
import Create from "./Create";
import axios from "axios";
import { FaTrash, FaCircle, FaCheckCircle } from "react-icons/fa";

function Home() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3200/")
      .then((result) => setTodos(result.data))
      .catch((err) => console.log(err));
  }, []);

  const handleEdit = (id) => {
    axios
      .put("http://localhost:3200/" + id)
      .then((result) => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const handleDelte = (id) => {
    axios
      .delete("http://localhost:3200/" + id)
      .then((result) => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="home">
      <h2>Todo List</h2>
      <Create />
      {todos.length === 0 ? (
        <div>{<h2>No Record</h2>}</div>
      ) : (
        todos.map((todo) => (
          <div className="task">
            <div className="checkbox" onClick={() => handleEdit(todo._id)}>
              {todo.done ? (
                <FaCheckCircle className="icon" />
              ) : (
                <FaCircle className="icon" />
              )}
              <span className={todo.done ? "line_through" : ""}>
                {todo.task}
              </span>
            </div>
            <div>
              <span>
                <FaTrash
                  className="icon"
                  onClick={() => handleDelte(todo._id)}
                />
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;
