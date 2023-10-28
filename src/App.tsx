import React, { useState, useEffect } from "react";
import "./App.css";

type TodoItem = {
  id: number;
  text: string;
  completed: boolean;
};

const App: React.FC = () => {
  const [todoList, setTodoList] = useState<TodoItem[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const addTodo = () => {
    if (inputValue.trim() !== "") {
      const newItem: TodoItem = {
        id: Date.now(),
        text: inputValue,
        completed: false,
      };
      setTodoList([...todoList, newItem]);
      setInputValue("");
      localStorage.setItem("todoList", JSON.stringify([...todoList, newItem]));
    }
  };

  const deleteTodo = (id: number) => {
    const updatedTodoList = todoList.filter((item: TodoItem) => item.id !== id);
    setTodoList(updatedTodoList);
    localStorage.setItem("todoList", JSON.stringify(updatedTodoList));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  useEffect(() => {
    const storedList = localStorage.getItem("todoList");
    if (storedList) {
      setTodoList(JSON.parse(storedList));
    }
  }, []);

  // useEffect(() => {
  //   if (todoList.length) {
  //     localStorage.setItem("todoList", JSON.stringify(todoList));
  //   }
  // }, [todoList]);

  const filteredTodoList = todoList.filter((item) =>
    item.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="app-container">
      <h1>Todo List</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Add a new item"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <div className="input-container" style={{ marginRight: "0px" }}>
        <input
          type="text"
          style={{ marginRight: "0px" }}
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <ul className="todo-list">
        {filteredTodoList.map((item) => (
          <li
            key={item.id}
            className={`todo-item ${item.completed ? "completed" : ""}`}
          >
            {item.text}
            <button onClick={() => copyToClipboard(item.text)}>Copy</button>
            <button
              className="delete-button"
              onClick={() => deleteTodo(item.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
