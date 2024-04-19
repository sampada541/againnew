import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const AuthContext = createContext();
const PatientAuthProvider = ({ children }) => {
  const [PatientAuth, setPatientAuth] = useState({
    patient: null,
    token: "",
  });

  //default axios
  axios.defaults.headers.common["Authorization"] = PatientAuth?.token;

  useEffect(() => {
    const data = localStorage.getItem("PatientAuth");
    if (data) {
      const parseData = JSON.parse(data);
      setPatientAuth({
        ...PatientAuth,
        patient: parseData.patient,
        token: parseData.token,
      });
    }
    //eslint-disable-next-line
  }, []);
  return (
    <AuthContext.Provider value={[PatientAuth, setPatientAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

// custom hook
const usePatientAuth = () => useContext(AuthContext);

export { usePatientAuth, PatientAuthProvider };
