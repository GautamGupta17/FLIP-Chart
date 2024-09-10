import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Modal from './Modal'; // Import the Modal component
import Cube from './assets/Cube.svg';
import { useLocation } from 'react-router';

const SizeChart = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading2, setIsLoading2] = useState(true);
  const location = useLocation();
  const [sizeChartData, setSizeChartData] = useState(null);
  const [headers, setHeaders] = useState([]);
  const [error,setError] = useState("")
  useEffect(() => {
    const fetchSizeChart = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/size_chart');
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            const data = await response.json();
            setSizeChartData(data);

            // Update headers based on the fetched data
            const firstKey = Object.keys(data)[0];
            if (firstKey) {
                const headers = Object.keys(data[firstKey]);
                setHeaders(headers);
            }
        } catch (error) {
            setError(error.message);
        } finally {
          setTimeout(() => {
            setIsLoading2(false);
          }, 10000);
        }
    };

    fetchSizeChart();
}, []);

  const handleGoBack = () => {
    window.history.back();
  };

  const handleRegenerate = () => {
    setIsModalOpen(true);
  };



const handleModalSubmit = async (descriptionData) => {
    setIsModalOpen(false); // Close the modal

    try {
      // Send POST request to the FastAPI endpoint
      const response = await fetch('http://localhost:8000/predict/modify', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              regenerate_description: descriptionData.regenerate_description
          }),
      });

      // Check if the response is okay
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }

      // Get JSON data from the response
      const result = await response.json();
      console.log('API Response:', result);

      // Call the onSubmit function if needed


      // Optionally reload the page or update the state
       window.location.reload(); // Uncomment this if you want to reload the page

  } catch (error) {
      console.error('Error submitting description:', error);
  }
};

  const handleDownloadAsPDF = () => {
    const input = document.getElementById('size-chart-table');

    html2canvas(input, { useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');

      pdf.setFontSize(18);
      pdf.setFont('Helvetica', 'bold');
      pdf.text('Your Size Chart', pdf.internal.pageSize.getWidth() / 2, 20, { align: 'center' });

      const imgWidth = 190;
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const margin = 10; 
      const yOffset = (pdfHeight - imgHeight) / 2; 

      pdf.addImage(imgData, 'PNG', margin, yOffset, imgWidth, imgHeight);
      pdf.save('size-chart.pdf');
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 via-yellow-100 to-yellow-200">
      {isLoading2 ? (
        <div className="flex items-center flex-col justify-center absolute inset-0 bg-white bg-opacity-75">
          <img src={Cube} alt="Loading..." className="w-16 h-16" />
          <p className=''>Your Size Chart Is Being Generated</p>
        </div>
      ) : (
        <div className="w-full max-w-4xl p-6 bg-slate-200 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Size Chart</h1>
          <div className="overflow-x-auto">
            <table id="size-chart-table" className="min-w-full border-collapse border border-gray-300 bg-white shadow-lg">
              <thead className="bg-blue-600">
                <tr>
                  <th className="border border-gray-300 p-4 text-left font-semibold text-white">Size</th>
                  {headers.map((header) => (
                    <th key={header} className="border border-gray-300 p-4 text-left font-semibold text-white">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.keys(sizeChartData).map((size, index) => (
                  <tr key={size} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                    <td className="border border-gray-300 p-4 text-gray-800">{size}</td>
                    {headers.map((header) => (
                      <td key={header} className="border border-gray-300 p-4 text-gray-700">
                        {sizeChartData[size][header]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 flex justify-between">
            <button
              onClick={handleGoBack}
              className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Go Back To Shop.
            </button>

            <button
              onClick={handleDownloadAsPDF}
              className="px-4 py-2 bg-green-500 text-white font-bold rounded-lg shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 mx-4"
            >
              Download
            </button>

            <button
  onClick={handleRegenerate}
  className="px-4 py-2 bg-blue-500 text-white font-bold rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
>
  Try Something Else ✨?
</button>
          </div>
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleModalSubmit} />
        </div>
      )}
    </div>
  );
};

export default SizeChart;
