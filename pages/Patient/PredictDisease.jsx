import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/PredictDisease.css";

const SymptomPage = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [isPredicting, setIsPredicting] = useState(false);

  const predictDisease = async () => {
    try {
      setIsPredicting(true);
      const res = await axios.post("/api/v1/pred-dis/predict", {
        symptoms: selectedSymptoms,
      });
      if (res) {
        const dis = res.data.Predicted_Disease;
        toast.success(dis);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Prediction failed:", error);
      toast.error("Prediction failed. Please try again later.");
    } finally {
      setIsPredicting(false);
    }
  };
  // mapping function

  const handleSymptomToggle = (symptom) => {
    const updatedSymptoms = [...selectedSymptoms];
    const index = updatedSymptoms.indexOf(symptom);
    if (index === -1) {
      updatedSymptoms.push(symptom);
    } else {
      updatedSymptoms.splice(index, 1);
    }
    setSelectedSymptoms(updatedSymptoms);
  };

  const handlePredict = () => {
    if (selectedSymptoms.length === 0) {
      toast.error("At least one symptom must be selected.");
      return;
    }
    predictDisease();
  };

  const symptoms = [
    "Itching",
    "Skin Rash",
    "Nodal Skin Eruptions",
    "Continuous Sneezing",
    "Shivering",
    "Chills",
    "Joint Pain",
    "Stomach Pain",
    "Acidity",
    "Ulcers on Tongue",
    "Muscle Wasting",
    "Vomiting",
    "Burning Micturition",
    "Spotting Urination",
    "Fatigue",
    "Weight Gain",
    "Anxiety",
    "Cold Hands and Feets",
    "Mood Swings",
    "Weight Loss",
    "Restlessness",
    "Lethargy",
    "Patches in Throat",
    "Irregular Sugar Level",
    "Cough",
    "High Fever",
    "Sunken Eyes",
    "Breathlessness",
    "Sweating",
    "Dehydration",
    "Indigestion",
    "Headache",
    "Yellowish Skin",
    "Dark Urine",
    "Nausea",
    "Loss of Appetite",
    "Pain Behind the Eyes",
    "Back Pain",
    "Constipation",
    "Abdominal Pain",
    "Diarrhoea",
    "Mild Fever",
    "Yellow Urine",
    "Yellowing of Eyes",
    "Acute Liver Failure",
    "Fluid Overload",
    "Swelling of Stomach",
    "Swelled Lymph Nodes",
    "Malaise",
    "Blurred and Distorted Vision",
    "Phlegm",
    "Throat Irritation",
    "Redness of Eyes",
    "Sinus Pressure",
    "Runny Nose",
    "Congestion",
    "Chest Pain",
    "Weakness in Limbs",
    "Fast Heart Rate",
    "Pain During Bowel Movements",
    "Pain in Anal Region",
    "Bloody Stool",
    "Irritation in Anus",
    "Neck Pain",
    "Dizziness",
    "Cramps",
    "Bruising",
    "Obesity",
    "Swollen Legs",
    "Swollen Blood Vessels",
    "Puffy Face and Eyes",
    "Enlarged Thyroid",
    "Brittle Nails",
    "Swollen Extremeties",
    "Excessive Hunger",
    "Extra Marital Contacts",
    "Drying and Tingling Lips",
    "Slurred Speech",
    "Knee Pain",
    "Hip Joint Pain",
    "Muscle Weakness",
    "Stiff Neck",
    "Swelling Joints",
    "Movement Stiffness",
    "Spinning Movements",
    "Loss of Balance",
    "Unsteadiness",
    "Weakness of One Body Side",
    "Loss of Smell",
    "Bladder Discomfort",
    "Foul Smell of Urine",
    "Continuous Feel of Urine",
    "Passage of Gases",
    "Internal Itching",
    "Toxic Look (Typhos)",
    "Depression",
    "Irritability",
    "Muscle Pain",
    "Altered Sensorium",
    "Red Spots Over Body",
    "Belly Pain",
    "Abnormal Menstruation",
    "Dischromic Patches",
    "Watering From Eyes",
    "Increased Appetite",
    "Polyuria",
    "Family History",
    "Mucoid Sputum",
    "Rusty Sputum",
    "Lack of Concentration",
    "Visual Disturbances",
    "Receiving Blood Transfusion",
    "Receiving Unsterile Injections",
    "Stomach Bleeding",
    "Distention of Abdomen",
    "History of Alcohol Consumption",
    "Fluid Overload",
    "Blood in Sputum",
    "Prominent Veins on Calf",
    "Palpitations",
    "Painful Walking",
    "Pus Filled Pimples",
    "Blackheads",
    "Scurring",
    "Skin Peeling",
    "Silver Like Dusting",
    "Small Dents in Nails",
    "Inflammatory Nails",
    "Blister",
    "Red Sore Around Nose",
    "Yellow Crust OOze",
  ];

  // Calculate number of symptoms in each section
  const numSymptomsInSection = Math.ceil(symptoms.length / 4);

  // Function to render a section of symptoms
  const renderSymptomSection = (startIdx) => {
    const endIdx =
      startIdx + numSymptomsInSection > symptoms.length
        ? symptoms.length
        : startIdx + numSymptomsInSection;
    return (
      <div className="symptom-column" key={startIdx}>
        {symptoms.slice(startIdx, endIdx).map((symptom, index) => (
          <div key={index} className="symptom-item">
            <label>
              <input
                type="checkbox"
                value={symptom}
                checked={selectedSymptoms.includes(symptom)}
                onChange={() => handleSymptomToggle(symptom)}
              />{" "}
              {symptom}
            </label>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Layout title="Symptom Checker - CureConnect">
      <div className="container">
        <h2 className="text-center">Predict Disease</h2>
        <p
          className="tagline"
          style={{ textAlign: "center", fontWeight: "400px" }}
        >
          Here's a list of symptoms. Please indicate which ones you are
          currently experiencing.
        </p>
        <div className="symptom-container">
          {Array.from({ length: 4 }, (_, index) =>
            renderSymptomSection(index * numSymptomsInSection)
          )}
        </div>
        <p></p>
        <p></p>
        <div className="text-center">
          <button
            className="btn btn-primary"
            onClick={predictDisease}
            disabled={isPredicting}
          >
            {isPredicting ? "Predicting..." : "Predict Disease"}
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default SymptomPage;
