import React, { useState } from "react";
import axios from "axios";
import { useDoctorAuth } from "../../context/docauth";
import Layout from "../../components/Layout/Layout";

const AddSlotsForm = () => {
  const [doctor, setDoctor] = useDoctorAuth("");
  const [dateTime, setDateTime] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Convert to IST
      const selectedDateTime = new Date(dateTime);

      // Check if selected date and time is in the past
      if (selectedDateTime < new Date()) {
        console.error("Selected date and time should be in the future.");
        return;
      }

      const formattedDateTime = selectedDateTime.toISOString(); // Convert to ISO format

      const response = await axios.post("/api/v1/fetch/addDocSlots", {
        doctorId: doctor?.doctor?._id,
        dateTime: formattedDateTime,
      });

      console.log(response.data.message);
    } catch (error) {
      console.error("Error adding appointment slot:", error);
      console.error("Failed to add appointment slot.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Add Slot">
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
          <button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Appointment"}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default AddSlotsForm;
