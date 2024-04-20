import React, { useState } from "react";
import axios from "axios";
import { useDoctorAuth } from "../../context/docauth";

const AddSlotsForm = () => {
  const [doctor, setDoctor] = useDoctorAuth("");
  const [dateTime, setDateTime] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert to IST
    const selectedDateTime = new Date(dateTime);

    // Check if selected date and time is in the past
    if (selectedDateTime < new Date()) {
      setMessage("Error: Please select a future date and time.");
      return;
    }

    const formattedDateTime = selectedDateTime.toISOString(); // Convert to ISO format

    try {
      const response = await axios.post("/api/v1/fetch/addDocSlots", {
        doctorId: doctor.doctor._id,
        dateTime: formattedDateTime,
      });

      setMessage(response.data.message);
    } catch (error) {
      setMessage("Error: " + error.message);
    }
  };

  return (
    <div>
      <h2>Add Appointment Slots</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="dateTime">Date Time:</label>
          <input
            type="datetime-local"
            id="dateTime"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
          />
        </div>
        <button type="submit">Add Appointment</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddSlotsForm;
