import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PatientRegister from "./pages/Patient/PatientRegister";
import DoctorRegister from "./pages/Doctor/DoctorRegister";
import PatientLogin from "./pages/Patient/PatientLogin";
import PatientRoute from "./components/Routes/Patient";
import DoctorLogin from "./pages/Doctor/DoctorLogin";
import DoctorRoute from "./components/Routes/Doctor";
import PredictDisease from "./pages/Patient/PredictDisease";
import PatientPhotoUploadForm from "./pages/Patient/PhotoUploadForm";
import PatientProfile from "./pages/Patient/PatientProfile";
import PageNotFound from "./pages/PageNotFound";
import PatientHomePage from "./pages/Patient/PatientHomePage";
import DoctorHomePage from "./pages/Doctor/DoctorHomePage";
import DoctorProfile from "./pages/Doctor/DoctorProfile";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import FilesUpload from "./pages/Doctor/FileUploadModal";
import AddSpecialization from "./pages/Admin/AddSpecilization";
import SearchResults from "./pages/Patient/SearchResults";
import Caledly from "./pages/Doctor/Caledly";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/patient-register" element={<PatientRegister />} />
      <Route path="/doctor-register" element={<DoctorRegister />} />
      <Route path="/patient-login" element={<PatientLogin />} />
      <Route path="/doctor-login" element={<DoctorLogin />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/add-specialization" element={<AddSpecialization />} />
      <Route path="/caledly" element={<Caledly />} />
      <Route path="/files-upload" element={<FilesUpload />} />
      <Route path="/SearchResults" element={<SearchResults />} />
      <Route path="/dashboard/*" element={<PatientRoute />}>
        <Route path="predict-disease" element={<PredictDisease />} />
        <Route path="patient-upload" element={<PatientPhotoUploadForm />} />
        <Route path="patient-profile" element={<PatientProfile />} />
        <Route path="patient-home" element={<PatientHomePage />} />
      </Route>
      <Route path="/dashboard/*" element={<DoctorRoute />}>
        <Route path="doctor-home" element={<DoctorHomePage />} />
        <Route path="doctor-profile" element={<DoctorProfile />} />
      </Route>
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
