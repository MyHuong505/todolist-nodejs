import React, { useEffect, useState } from "react";
import Create from "./Create";
import axios from "axios";
import {
  FaRegTrashAlt,
  FaRegCircle,
  FaCheckCircle,
  FaRegEdit,
} from "react-icons/fa";

function Home() {
  const [todos, setTodos] = useState([]);
  const [editTodos, setEditTodos] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:3200/")
      .then((result) => setTodos(result.data))
      .catch((err) => console.log(err));
  }, []);

  const handleCheck = (id, event) => {
    const clickedOnIcon = event.target.classList.contains("icon");

    if (clickedOnIcon) {
      axios
        .put(`http://localhost:3200/${id}`)
        .then((result) => {
          window.location.reload();
        })
        .catch((err) => console.log(err));
    }
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3200/${id}`)
      .then((result) => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const handleEdit = (id) => {
    const editedTodos = { ...editTodos };
    editedTodos[id] = todos.find((todo) => todo._id === id).task;
    setEditTodos(editedTodos);
  };

  const handleUpdate = (id) => {
    axios
      .put(`http://localhost:3200/${id}`, { task: editTodos[id] })
      .then((result) => {
        // Cập nhật lại state todos nếu cần
        const editedTodos = { ...editTodos };
        delete editedTodos[id]; // Xóa task khỏi danh sách chỉnh sửa
        setEditTodos(editedTodos);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="home">
      <div className="header">
        <h2 className="">
          <span className="yellow-text">To</span>
          <span className="blue-text">do</span>
        </h2>
      </div>
      <Create />
      {todos.length === 0 ? (
        <div>
          <h2 className="header-title">No Record</h2>
        </div>
      ) : (
        todos.map((todo) => (
          <div className="task" key={todo._id}>
            <div className="checkbox" onClick={(e) => handleCheck(todo._id, e)}>
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
                <FaRegEdit
                  className="icon edit-icon"
                  onClick={() => handleEdit(todo._id)}
                />
              </span>

              <span>
                <FaRegTrashAlt
                  className="icon trash-bin"
                  onClick={() => handleDelete(todo._id)}
                />
              </span>

              {editTodos[todo._id] && (
                <div>
                  <input
                    type="text"
                    value={editTodos[todo._id]}
                    onChange={(e) => {
                      const editedTodos = { ...editTodos };
                      editedTodos[todo._id] = e.target.value;
                      setEditTodos(editedTodos);
                    }}
                  />
                  <button onClick={() => handleUpdate(todo._id)}>Update</button>
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;
