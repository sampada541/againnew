import axios from "axios";
const fetchDoctorDocuments = async (doctorId, documentType) => {
  try {
    const response = await axios.get(
      `/api/v1/auth/doctor/${doctorId}/${documentType}`,
      {
        responseType: "arraybuffer", // Ensure response type is set to arraybuffer
      }
    );
    const blob = new Blob([response.data], { type: "image/" }); // Assuming image type is JPEG

    return URL.createObjectURL(blob); // Create object URL from blob
  } catch (error) {
    console.error("Error fetching patient image:", error);
    return null;
  }
};

export default fetchDoctorDocuments;
