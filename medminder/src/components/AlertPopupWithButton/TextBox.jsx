import React, { useState } from 'react';
import "./AlertPopup.css";

const TextBox = ({placeholder, rows}) => {
  const [text, setText] = useState('');
  const handleChange = (event) => {
    setText(event.target.value);
  };
  return (
    <div>
      <label htmlFor="multilineInput"></label>
      <textarea
        value={text}
        onChange={handleChange}
        rows={rows} // You can adjust the number of rows as needed
        cols={50} // You can adjust the number of columns as needed
        className="no-resize" // Apply a class for styling
        placeholder={placeholder}
      />
    </div>
  );
};
export default TextBox;