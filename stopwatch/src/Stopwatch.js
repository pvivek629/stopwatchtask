import React from "react";
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./App.css";

export default function Stopwatch() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [show, setShow] = useState(false);
  const [inputValue, setinputValue] = useState({});
  const [taskData, setTaskData] = useState([]);
  const [errors, setErrors] = useState("");

  console.log("inputValue", inputValue);
  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!running) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  const handleOnChnage = (e) => {
    const { name, value } = e.target;
    setinputValue({ ...inputValue, [name]: value, time: time });
    if (e.target.name.trim()) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleClick = () => {
    if (validateForm()) {
      const newData = { ...inputValue };
      setTaskData([...taskData, newData]);
      setShow(false);
    }
  };

  const validateForm = () => {
    let formIsValid = true;
    let errors = {};
    if (inputValue && !inputValue.title) {
      formIsValid = false;
      errors["title"] = "*Please enter title!";
    }

    if (inputValue && !inputValue.note) {
      formIsValid = false;
      errors["note"] = "*Please enter note !";
    }
    setErrors(errors);
    return formIsValid;
  };

  return (
    <>
      <div className="text-center text-white">
        <h1>Time Section</h1>
      </div>
      <div className="d-flex  align-items-center flex-column timer ">
        <div className="d-flex mb-5">
          <h1 className="font-weight-bold text-danger">
            {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
          </h1>
          <h1 className="font-weight-bold text-danger">
            {("0" + Math.floor((time / 1000) % 60)).slice(-2)}:
          </h1>
          <h1 className="font-weight-bold text-danger">
            {("0" + ((time / 10) % 100)).slice(-2)}
          </h1>
        </div>
        <div className="col-6 d-flex justify-content-around">
          {running === false ? (
            <button
              className="btn btn-success"
              onClick={() => setRunning(true)}
            >
              Start
            </button>
          ) : (
            <button
              className="btn btn-secondary"
              onClick={() => setRunning(false)}
            >
              Pause
            </button>
          )}
          <button className="btn btn-danger" onClick={() => setTime(0)}>
            Reset
          </button>
          {time > 100 && (
            <button
              className="btn btn-primary"
              onClick={() => {
                setShow(true);
                setRunning(false);
              }}
            >
              Save
            </button>
          )}
        </div>

        <Modal show={show} onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>TIme Save</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <div className="mb-3">
                <label>User Name</label>
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  placeholder="Enter the title"
                  onChange={(e) => handleOnChnage(e)}
                />
              </div>
              <span className="text-danger"> {errors["title"]}</span>
              <div className="mb-3">
                <label>Note</label>
                <textarea
                  type="text"
                  name="note"
                  className="form-control"
                  placeholder="Enter the note"
                  onChange={(e) => handleOnChnage(e)}
                />
                <span className="text-danger"> {errors["note"]}</span>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-danger" onClick={() => setShow(false)}>
              Close
            </button>
            <button className="btn btn-success" onClick={() => handleClick()}>
              Save Changes
            </button>
          </Modal.Footer>
        </Modal>
        <div className="mt-5 col-12">
          <h1 className="text-center text-black">Task Section</h1>
          {taskData.length > 0 && (
            <button className="btn btn-danger" onClick={() => setTaskData([])}>
              Task clear
            </button>
          )}
          {taskData.length > 0 ? (
            <div>
              <table className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>time</th>
                    <th>title</th>
                    <th>note</th>
                  </tr>
                </thead>
                {taskData.map((item, i) => {
                  return (
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>
                          <span className="font-weight-bold text-danger">
                            {("0" + Math.floor((item.time / 60000) % 60)).slice(
                              -2
                            )}
                            :
                          </span>
                          <span className="font-weight-bold text-danger">
                            {("0" + Math.floor((item.time / 1000) % 60)).slice(
                              -2
                            )}
                            :
                          </span>
                          <span className="font-weight-bold text-danger">
                            {("0" + ((item.time / 10) % 100)).slice(-2)}
                          </span>
                        </td>
                        <td>{item.title}</td>
                        <td>{item.note}</td>
                      </tr>
                    </tbody>
                  );
                })}
              </table>
            </div>
          ) : (
            <div>
              <h1 className="mt-5">No Task Data</h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
