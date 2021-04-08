import React from "react";

const PersonsFormInput = ({ name, number, handleChange, addPerson }) => {
  return (
    <div className="persons-form-container">
      <form onSubmit={addPerson}>
        <div className="persons-form">
          <label>name:</label>{" "}
          <input name="name" value={name} onChange={handleChange} />
        </div>
        <div className="persons-form">
          <label>number:</label>{" "}
          <input name="number" value={number} onChange={handleChange} />
        </div>
        <div className="persons-form-button">
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default PersonsFormInput;
