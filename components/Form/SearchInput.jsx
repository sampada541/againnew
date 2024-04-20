import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const [specialization, setSpecialization] = useState(""); // State for specialization
  const [suggestions, setSuggestions] = useState([]); // State for suggestions
  const navigate = useNavigate();

  // Dictionary mapping abbreviated names to full names
  const specializationDictionary = {
    Phy: "Physician",
    Der: "Dermatologist",
    AI: "Allergist or Immunologist",
    Gas: "Gastroenterologist",
    Hep: "Hepatologist",
    Pul: "Pulmonologist",
    Car: "Cardiologist",
    Neu: "Neurologist",
    Orth: "Orthopedic Surgeon or Physiatrist",
    IDS: "Infectious Disease Specialist",
    Endo: "Endocrinologist",
    Ped: "Pediatrician",
    IM: "Internal Medicine",
    CS: "Colorectal Surgeon",
    EMS: "Emergency Medicine Specialist",
    VS: "Vascular Surgeon",
    Rheu: "Rheumatologist",
    ENT: "ENT Specialist",
    UN: "Urologist or Nephrologist",
    Oph: "Ophthalmologist",
    Psy: "Psychiatrist",
    Onc: "Oncologist",
    Hem: "Hematologist",
    Neph: "Nephrologist",
    Gyn: "Gynecologist",
    Andro: "Andrologist",
  };

  useEffect(() => {
    // Filter suggestions based on input value
    const filteredSuggestions = Object.values(specializationDictionary).filter(
      (spec) => spec.toLowerCase().startsWith(specialization.toLowerCase())
    );
    // Add suggestions containing the specialization anywhere in the word
    const additionalSuggestions = Object.values(
      specializationDictionary
    ).filter(
      (spec) =>
        spec.toLowerCase().includes(specialization.toLowerCase()) &&
        !filteredSuggestions.includes(spec)
    );
    setSuggestions([...filteredSuggestions, ...additionalSuggestions]);
  }, [specialization]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate(`/SearchResults?q=${encodeURIComponent(specialization)}`);
  };

  return (
    <div>
      <form
        className="d-flex search-form"
        role="search"
        onSubmit={handleSubmit}
      >
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)} // Set specialization based on user input
          list="specializations" // Connect the input to the datalist
        />
        {specialization && ( // Show suggestions only if there's at least one letter typed
          <datalist id="specializations">
            {suggestions.map((suggestion, index) => (
              <option key={index} value={suggestion} />
            ))}
          </datalist>
        )}
        <button
          className="btn btn-outline-success"
          type="submit"
          style={{ backgroundColor: "blue", color: "white" }}
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
