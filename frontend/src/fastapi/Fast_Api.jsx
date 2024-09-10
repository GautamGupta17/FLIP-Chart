import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SizeChart from "./SizeChart";
import SizeChartForm from "./SizeChartForm";
import Cube from "./assets/Cube.svg";

function Fast_Api() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  const handleSubmit2 = async (formData) => {
    setIsLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/predict/form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log("Prediction Response:", result.prediction);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const jsonData = {
    XS: {
      "To Fit Bust": "32.0in",
      "To Fit Waist": "26.0in",
      "Front Length": "45.0in",
      "To Fit Hip": "36.0in",
    },
    S: {
      "To Fit Bust": "34.0in",
      "To Fit Waist": "28.0in",
      "Front Length": "45.5in",
      "To Fit Hip": "38.0in",
    },
    M: {
      "To Fit Bust": "36.0in",
      "To Fit Waist": "30.0in",
      "Front Length": "46.0in",
      "To Fit Hip": "40.0in",
    },
    L: {
      "To Fit Bust": "38.0in",
      "To Fit Waist": "32.0in",
      "Front Length": "46.5in",
      "To Fit Hip": "42.0in",
    },
    XL: {
      "To Fit Bust": "40.0in",
      "To Fit Waist": "34.0in",
      "Front Length": "47.0in",
      "To Fit Hip": "44.0in",
    },
  };

  return (
    //     <BrowserRouter>
    //     <Routes>
    //     <Route
    //               path="/"
    //               element={
    //                 isLoading ? (
    // <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 via-yellow-100 to-yellow-200">
    //   <div className="flex justify-center items-center rounded-lg">
    //     <img src={Cube} alt="Loading..."  />
    //   </div>
    // </div>
    //                 ) : (
    //                   <SizeChartForm onSubmit={handleSubmit2} />
    //                 )
    //               }
    //             />
    //       <Route path="" element={<SizeChart/>} />
    //     </Routes>
    //   </BrowserRouter>
    <>
      {isLoading ? (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 via-yellow-100 to-yellow-200">
          <div className="flex justify-center items-center rounded-lg">
            <img src={Cube} alt="Loading..." />
          </div>
        </div>
      ) : (
        <SizeChartForm onSubmit={handleSubmit2} />
      )}
    </>
  );
}

export default Fast_Api;
