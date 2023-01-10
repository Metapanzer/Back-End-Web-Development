import React from "react";
import { FaEdit, FaCheckSquare, FaTrashAlt } from "react-icons/fa";
import { toast, Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [task, setTask] = useState([]);
  const [Id, setId] = useState();
  const [isEdited, setIsEdited] = useState(false);
  const [taskEdit, setTaskEdit] = useState("");
  const [Description, setDescription] = useState("");

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

  const addTask = async () => {
    try {
      toast.success("Task added!");
      await axios.post("http://localhost:5000/todo/create", {
        Description,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const editTask = (itemId, itemDescription) => {
    setIsEdited(!isEdited);
    setTaskEdit(itemDescription);
    setId(itemId);
  };

  const saveEditedTask = async (id, Description) => {
    try {
      toast.success("Task Edited!");
      setIsEdited(!isEdited);
      await axios.patch(`http://localhost:5000/todo/edit/${id}`, {
        Description,
      });
      getTask();
    } catch (error) {
      console.log(error);
    }
  };

  const taskCompleted = async (id, Completed) => {
    try {
      Completed === 0 ? (Completed = 1) : (Completed = 0);
      await axios.patch(`http://localhost:5000/todo/edit/${id}`, {
        Completed,
      });
      getTask();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/todo/delete/${id}`);
      toast.success("Task Deleted!");
      getTask();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-tr from-[#C7F0DB] to-[#464159]">
      <div className="writer">
        <p className="writer-text">Just Do It.</p>
      </div>
      <form className="my-3 ">
        <input
          type="text"
          name=""
          id=""
          onChange={(description) => setDescription(description.target.value)}
          placeholder="Add a Task"
          className="border-2 border-black rounded-lg p-1 w-96"
        />
        <button
          onClick={() => addTask()}
          className="ml-2 p-1.5 rounded-md bg-[#C7F0DB] font-semibold"
        >
          I got this!!
        </button>
      </form>
      <div className="flex flex-row justify-center mt-8">
        {task.length !== 0 ? (
          <table className="table-fixed border-2 border-collapse border-black">
            <thead>
              <tr>
                <th className="border-2 border-black p-2">No</th>
                <th className="border-2 border-black p-2 w-96">Description</th>
                <th className="border-2 border-black p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {task.map((item, index) => (
                <tr key={item.Id}>
                  <td className="border-2 border-black p-2">{index + 1}</td>
                  <td className="border-2 border-black p-2">
                    {item.Completed === 0 ? (
                      <>{item.Description}</>
                    ) : (
                      <s className="text-red-700">{item.Description}</s>
                    )}
                  </td>
                  <td className="border-1.5 border-black p-2 flex flex-row items-center gap-5">
                    <span>
                      <FaEdit
                        onClick={() => editTask(item.Id, item.Description)}
                        className="w-6 h-6"
                      />
                    </span>
                    <span>
                      <FaCheckSquare
                        className="w-6 h-6"
                        onClick={() => taskCompleted(item.Id, item.Completed)}
                      />
                    </span>
                    <span>
                      <FaTrashAlt
                        onClick={() => deleteTask(item.Id)}
                        className="w-6 h-6"
                      />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p></p>
        )}
      </div>
      <div className="mt-8">
        {isEdited ? (
          <>
            Edit Task:
            <input
              type="text"
              name=""
              id=""
              value={taskEdit}
              onChange={(event) => setTaskEdit(event.target.value)}
              className="border border-black w-96 rounded-md p-2 ml-2"
            />
            <button
              className="rounded-md bg-blue-500 p-2 ml-3 font-semibold"
              onClick={() => saveEditedTask(Id, taskEdit)}
            >
              Save
            </button>
          </>
        ) : (
          <div className="bg-[#C7F0DB] rounded-md p-2 font-semibold">
            Happy Holiday!
          </div>
        )}
      </div>
      <Toaster />
    </div>
  );
}
