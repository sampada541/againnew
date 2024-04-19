import React, { useState } from "react";
import axios from "axios";

const AddSpecialization = () => {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to the server to add the name
      await axios.post("/api/v1/pred-dis/add/specialization", {
        name,
      });
      // Reset the form after successful submission
      setName("");
      alert("Specialization added successfully!");
    } catch (error) {
      console.error("Error adding name:", error);
      alert("An error occurred while adding name.");
    }
  };

  return (
    <div className="form-container">
      <h2>Add Specialization</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Specialization:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddSpecialization;
