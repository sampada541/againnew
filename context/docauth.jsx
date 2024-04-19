import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const AuthContext = createContext();
const DoctorAuthProvider = ({ children }) => {
  const [Doctorauth, setDoctorAuth] = useState({
    doctor: null,
    token: "",
  });

  //default axios
  axios.defaults.headers.common["Authorization"] = Doctorauth?.token;

  useEffect(() => {
    const data = localStorage.getItem("DoctorAuth");
    if (data) {
      const parseData = JSON.parse(data);
      setDoctorAuth({
        ...Doctorauth,
        doctor: parseData.doctor,
        token: parseData.token,
      });
    }
    //eslint-disable-next-line
  }, []);
  return (
    <AuthContext.Provider value={[Doctorauth, setDoctorAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

// custom hook
const useDoctorAuth = () => useContext(AuthContext);

export { useDoctorAuth, DoctorAuthProvider };
