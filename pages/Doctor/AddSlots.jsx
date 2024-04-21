import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useDoctorAuth } from "../../context/docauth";
import Layout from "../../components/Layout/Layout";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/AddSlots.css";

const AddSlotsForm = () => {
  const [doctor, setDoctor] = useDoctorAuth("");
  const [dateTime, setDateTime] = useState("");
  const [loading, setLoading] = useState(false);
  const doctorId = doctor?.doctor?._id;
  const [appointments, setAppointments] = useState([]);

  // show previous added slots
  useEffect(() => {
    // Check if doctorId is available
    if (!doctorId) {
      toast.error("Doctor ID not provided");
      return;
    }

    axios
      .get(`/api/v1/fetch/preSlots/${doctorId}`)
      .then((response) => {
        const { appointments } = response.data;
        setAppointments(appointments);
      })
      .catch((error) => {
        console.error("Error fetching doctor data:", error);
        toast.error("Error fetching doctor data");
      });
  }, [doctorId]);
  console.log(appointments);

  function convertToIST(dateTimeString) {
    const utcDateTime = new Date(dateTimeString);
    const istDateTime = new Date(
      utcDateTime.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
    );
    return istDateTime.toLocaleString();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Convert to IST
      const selectedDateTime = new Date(dateTime);

      // Check if selected date and time is in the past
      if (selectedDateTime < new Date()) {
        toast.error("Selected date and time should be in the future.");
        return;
      }

      const formattedDateTime = selectedDateTime.toISOString(); // Convert to ISO format

      const response = await axios.post("/api/v1/fetch/addDocSlots", {
        doctorId: doctor?.doctor?._id,
        dateTime: formattedDateTime,
      });

      if (response.status === 201) {
        toast.success(response.data.message);
        window.location.reload();
      } else {
        toast.error("Failed to add appointment slot.");
      }
    } catch (error) {
      toast.error(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Add Slot">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="add-slots-container">
              <h2>Add Appointment Slots</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="datetime-local"
                    id="dateTime"
                    value={dateTime}
                    onChange={(e) => setDateTime(e.target.value)}
                    className="form-control"
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? "Adding..." : "Add Appointment"}
                </button>
              </form>
            </div>
          </div>
          <div className="col-md-6">
            {/* Right column content */}
            <table>
              <thead>
                <tr>
                  <th>Start Date and Time</th>
                  <th>End Date And Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {appointments.length === 0 ? (
                  <tr>
                    <td colSpan="3">No slots found</td>
                  </tr>
                ) : (
                  appointments.map((appointment) => (
                    <tr key={appointment._id}>
                      <td>{convertToIST(appointment.dateTime)}</td>
                      <td>{convertToIST(appointment.endDateTime)}</td>
                      <td>
                        {appointment.isAvailable === true ? "empty" : "booked"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddSlotsForm;
