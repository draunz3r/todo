import { useState } from "react";
import "./App.css";

type TodoType = {
  name: string;
  description?: string;
  status: string;
};

function App() {
  const [todo, setTodo] = useState<TodoType>({
    name: "",
    description: "",
    status: "todo",
  });
  const [todoList, setTodoList] = useState<TodoType[]>([]);
  const [todoCompletedList, setTodoCompletedList] = useState<TodoType[]>([]);

  const handleCheckboxChange = (index: number) => {
    setTodoList((prev) =>
      prev.filter((item) => item.name !== prev[index].name)
    );
    setTodoCompletedList((prev) => {
      let exists = prev.find((item) => item.name === todoList[index].name);
      if (exists) {
        return prev;
      }
      return [todoList[index], ...prev];
    });
  };

  return (
    <>
      <main className="main">
        <section>
          <h1>Add todo</h1>
          <form>
            <input
              type="text"
              name="add-todo"
              id="add-todo"
              value={todo.name}
              placeholder="Add todo"
              onChange={(event) => {
                event.preventDefault();
                setTodo((prev) => {
                  return { ...prev, name: event.target.value };
                });
              }}
            />
            <textarea
              name="add-todo-desc"
              id="add-todo-desc"
              value={todo.description}
              placeholder="Description (optional)"
              onChange={(event) => {
                event.preventDefault();
                setTodo((prev) => {
                  return { ...prev, description: event.target.value };
                });
              }}
            />
            <input
              type="date"
              name="due-date"
              id="due-date"
              value={new Date().toISOString().slice(0, 16)}
            />
            <button
              onClick={(event) => {
                event.preventDefault();
                if (todo.name === "") {
                  return;
                }
                setTodoList((prev) => [...prev, todo]);
                setTodo({ name: "", description: "", status: "todo" });
              }}
            >
              Add
            </button>
          </form>
        </section>
        <h2>In progress</h2>
        {todoList.length > 0 ? (
          <section className="display-todo">
            <ul style={{ width: "inherit" }}>
              {todoList.map((item, index) => (
                <li
                  style={{
                    textDecoration: `${
                      item.status === "done" ? "line-through" : "none"
                    }`,
                  }}
                >
                  <input
                    type="checkbox"
                    name="mark-done"
                    id={`mark-done-${index}`}
                    value="done"
                    checked={item.status === "done"}
                    onChange={() => handleCheckboxChange(index)}
                  />

                  <span>{item.name}</span>
                  <button
                    onClick={(event) => {
                      event.preventDefault();
                      setTodoList((prev) =>
                        prev.filter((todo) => todo.name !== item.name)
                      );
                      setTodoCompletedList((prev) =>
                        prev.filter((todo) => todo.name !== item.name)
                      );
                    }}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </section>
        ) : (
          <></>
        )}
        <h2>Completed</h2>
        {todoCompletedList.length > 0 ? (
          <section className="completed-todo">
            <ul>
              {todoCompletedList.map((item, index) => {
                return (
                  <li key={index}>
                    <span>{item.name}</span>
                  </li>
                );
              })}
            </ul>
          </section>
        ) : (
          <></>
        )}
      </main>
      <main>
        <h1>Analytics</h1>
        <section className="analytics-section">
          <div className="total-tasks-completed-card">
            <h1>Total completed</h1>
            <span>{todoCompletedList.length}</span>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
