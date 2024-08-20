"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoCloseSharp } from "react-icons/io5";
import { addSticky, deleteSticky } from "../redux/stickiesSlice";
import "./style.css";

export default function Sticky() {
  const dispatch = useDispatch();
  const stickies = useSelector((state) => state.stickies);

  const generateRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSticky = {
      id: Date.now(),
      title: e.target.stickytitle.value,
      text: e.target.stickytext.value,
      done: false,
      color: generateRandomColor(), // Assign a random color
    };
    dispatch(addSticky(newSticky));
    e.target.reset(); // Reset the form after submission
  };

  const handleDelete = (id) => {
    dispatch(deleteSticky(id));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="sticky-form">
          <label htmlFor="stickytitle">Title for your sticky:</label>
          <input type="text" name="stickytitle" id="stickytitle" required />
          <label htmlFor="stickytext">Write something down:</label>
          <textarea
            name="stickytext"
            id="stickytext"
            cols="24"
            rows="10"
            required
          ></textarea>
          <button className="button" id="createsticky">
            Stick it!
          </button>
        </div>
      </form>
      <div id="stickies-container">
        {stickies.map((sticky) => (
          <div
            key={sticky.id}
            className="sticky"
            style={{ backgroundColor: sticky.color }} // Apply random color
          >
            <div className="icon-container">
              <IoCloseSharp
                onClick={() => handleDelete(sticky.id)}
                className="delete-icon"
              />
            </div>
            <h3>{sticky.title}</h3>
            <p>{sticky.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
