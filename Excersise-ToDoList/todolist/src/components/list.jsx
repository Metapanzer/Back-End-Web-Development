import { useState, useEffect } from "react";
import axios from "axios";

export default function List(props) {
  const [isCompleted, setIsCompleted] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [task, setTask] = useState([]);
  console.log(task);

  useEffect(() => {
    getTask();
  }, []);

  const getTask = async () => {
    try {
      let response = await axios.get("http://localhost:5000/todo");
      setTask(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {task
        ? task.map((item, index) => (
            <>
              {isCompleted ? (
                <div className="p-3 bg-slate-600 text-white rounded-md w-fit flex flex-row justify-around gap-8">
                  <s key={index}>{item.Description}</s>
                  <div className="flex flex-row gap-2">
                    <button onClick={() => setIsCompleted(false)}>
                      Completed
                    </button>
                    <button>Edit</button>
                    <button onClick={() => setTask("")}>Delete</button>
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-slate-800 text-white rounded-md w-fit flex flex-row justify-around gap-8">
                  {isEdited ? (
                    <>
                      <input
                        type="text"
                        name=""
                        id=""
                        onChange={(event) => setTask(event.target.value)}
                        value={task.list}
                        className="text-black"
                      />
                      <div className="flex flex-row gap-2">
                        <button onClick={() => setIsCompleted(true)}>
                          Completed
                        </button>
                        <button onClick={() => setIsEdited(false)}>Save</button>
                        <button onClick={() => setTask("")}>Delete</button>
                      </div>
                    </>
                  ) : (
                    <>
                      <p key={index}>{item.Description}</p>
                      <div className="flex flex-row gap-2">
                        <button onClick={() => setIsCompleted(true)}>
                          Completed
                        </button>
                        <button onClick={() => setIsEdited(true)}>Edit</button>
                        <button onClick={() => setTask("")}>Delete</button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </>
          ))
        : "No Task"}

      {/* {task ? (
        <>
          {isCompleted ? (
            <div className="p-3 bg-slate-600 text-white rounded-md w-fit flex flex-row justify-around gap-8">
              <s>{task}</s>
              <div className="flex flex-row gap-2">
                <button onClick={() => setIsCompleted(false)}>Completed</button>
                <button>Edit</button>
                <button onClick={() => setTask("")}>Delete</button>
              </div>
            </div>
          ) : (
            <div className="p-3 bg-slate-800 text-white rounded-md w-fit flex flex-row justify-around gap-8">
              {isEdited ? (
                <>
                  <input
                    type="text"
                    name=""
                    id=""
                    onChange={(event) => setTask(event.target.value)}
                    value={task.list}
                    className="text-black"
                  />
                  <div className="flex flex-row gap-2">
                    <button onClick={() => setIsCompleted(true)}>
                      Completed
                    </button>
                    <button onClick={() => setIsEdited(false)}>Save</button>
                    <button onClick={() => setTask("")}>Delete</button>
                  </div>
                </>
              ) : (
                <>
                  <p>{task}</p>
                  <div className="flex flex-row gap-2">
                    <button onClick={() => setIsCompleted(true)}>
                      Completed
                    </button>
                    <button onClick={() => setIsEdited(true)}>Edit</button>
                    <button onClick={() => setTask("")}>Delete</button>
                  </div>
                </>
              )}
            </div>
          )}
        </>
      ) : (
        "No Task"
      )} */}
    </div>
  );
}
