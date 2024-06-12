"use client";
import React, { useState, useReducer, Reducer } from "react";

interface TaskInterface {
  id: number;
  text: string;
  done: boolean;
}
type ActionType =
  | { type: "added"; id: number; text: string }
  | { type: "changed"; task: TaskInterface }
  | { type: "deleted"; id: number };

const tasksReducer: Reducer<TaskInterface[], ActionType> = (tasks, action) => {
  switch (action.type) {
    case "added": {
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false,
        },
      ];
    }
    case "changed": {
      return tasks.map((t) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case "deleted": {
      return tasks.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error("Unknow ation: " + action.type);
    }
  }
};
const Page: React.FC = () => {
  const [text, setText] = useState<string>("Hello, world!");
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  function handleAddTask(text: string) {
    dispatch({
      type: "added",
      id: nextId++,
      text: text,
    });
  }

  function handleChangeTask(task: TaskInterface) {
    dispatch({
      type: "changed",
      task: task,
    });
  }

  function handleDeleteTask(id: number) {
    //setTasks(tasks.filter((t) => t.id !== id))
    dispatch({
      type: "deleted",
      id: id,
    });
  }

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-2xl font-bold mb-4">My Todos</h1>
      <div className="mb-4">
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter a task"
        />
        <button
          className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={() => handleAddTask(text)}
        >
          Add Task
        </button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="mb-2 flex items-center">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={task.text}
              onChange={(e) =>
                handleChangeTask({ ...task, text: e.target.value })
              }
            />
            <button
              className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => handleDeleteTask(task.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const initialTasks: TaskInterface[] = [
  { id: 0, text: "Learn React", done: true },
  { id: 1, text: "Learn TypeScript", done: false },
  { id: 2, text: "Learn Hooks", done: false },
];
let nextId = initialTasks.length;
export default Page;
//reference: https://react.dev/learn/extracting-state-logic-into-a-reducer
