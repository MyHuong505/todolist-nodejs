import React, { useEffect, useState } from "react";
import Create from "./Create";
import axios from "axios";
import { FaRegTrashAlt, FaRegCircle, FaCheckCircle } from "react-icons/fa";

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
      <div className="header">
        <h2 className="header-title">
          <span class="yellow-text">To</span>
          <span class="blue-text">do</span>
        </h2>
      </div>
      <Create />
      {todos.length === 0 ? (
        <div>{<h2>No Record</h2>}</div>
      ) : (
        todos.map((todo) => (
          <div className="task">
            <div className="checkbox" onClick={() => handleEdit(todo._id)}>
              {todo.done ? (
                <FaCheckCircle className="icon done-icon" />
              ) : (
                <FaRegCircle className="icon not-done-icon" />
              )}
              <span className={todo.done ? "line_through" : ""}>
                {todo.task}
              </span>
            </div>
            <div>
              <span>
                <FaRegTrashAlt
                  className="icon trash-bin"
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
