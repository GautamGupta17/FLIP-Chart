import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const SizeChartForm = ({ onSubmit}) => {
  const [gender, setGender] = useState('');
  const [clothingType, setClothingType] = useState('');
  const [formData, setFormData] = useState({
    available_sizes: [],
  });
  const navigate = useNavigate();

  const handleGenderChange = (event) => {
    setGender(event.target.value);
    setClothingType('');
    setFormData({gender: event.target.value,
        age_group:"adult",
        available_sizes: [],
    });
  };

  const handleClothingTypeChange = (event) => {
    setClothingType(event.target.value);
    setFormData((prevData) => ({
        ...prevData,
        product_type:event.target.value,
      }));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSizeChange = (event) => {
    const { value, checked } = event.target;
    setFormData((prevData) => {
      const updatedSizes = checked
        ? [...prevData.available_sizes, value]
        : prevData.available_sizes.filter((size) => size !== value);
      return {
        ...prevData,
        available_sizes: updatedSizes,
      };
    });
  };



  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Form Data:', formData);
    await onSubmit(formData);
    navigate('/size-chart-from/result');
    // Handle form submission, e.g., send data to backend
  };

  const renderFields = () => {
    if (gender === 'Men' && clothingType === 'top') {
      return (
        <>
        <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Description:</label>
        <textarea
          name="description"
          value={formData.description || ''}
          onChange={handleInputChange}
          placeholder="Describe Your Product"
          rows="4"
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
         <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">What type of Top is it? (e.g., T-Shirt, Dress Shirt, Polo, Sweater)</label>
            <input
              type="string"
              name="product_subtype"
              value={formData.product_subtype || ''}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">What's The Collar Type?</label>
            <input
              type="string"
              name="collar_type"
              value={formData.collar_type || ''}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">What's The Sleeve-Length ?</label>
                <input
                  type="string"
                  name="sleeve_type"
                  value={formData.sleeve_type || ''}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">What's The Fit Type ?</label>
            <input
              type="string"
              name="fit_type"
              value={formData.fit_type || ''}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          
          <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Available Sizes:</label>
          <div className="grid grid-cols-2 gap-4">
            {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
              <label key={size} className="flex items-center">
                <input
                  type="checkbox"
                  value={size}
                  checked={formData.available_sizes.includes(size)}
                  onChange={handleSizeChange}
                  className="mr-2"
                />
                {size}
              </label>
            ))}
          </div>
        </div>
        <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Fabric Type</label>
            <input
              type="string"
              name="fabric_type"
              value={formData.fabric_type || ''}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">What is the fabric composition of the product?</label>
            <input
              type="string"
              name="composition"
              value={formData.composition || ''}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Strechable (Yes/No)</label>
            <input
              type="string"
              name="strechable"
              value={formData.strechable || ''}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">WaterProof (Yes/No)</label>
            <input
              type="string"
              name="waterproof"
              value={formData.waterproof || ''}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Whats The Best Season To Wear Your Product ? (Optional)</label>
            <input
              type="string"
              name="season"
              value={formData.season || ''}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Additional Information:</label>
        <textarea
          name="additional_info"
          value={formData.additional_info || ''}
          onChange={handleInputChange}
          placeholder="Enter any additional information about the product"
          rows="4"
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
        </>
      );
    } else if (gender === 'Women' && clothingType === 'top') {
        return (
            <>
            <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Description:</label>
            <textarea
              name="description"
              value={formData.description || ''}
              onChange={handleInputChange}
              placeholder="Describe Your Product"
              rows="4"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
             <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">What type of Top is it? (e.g., T-Shirt, Dress, Tunic, Sweater)</label>
                <input
                  type="string"
                  name="product_subtype"
                  value={formData.product_subtype || ''}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">What's The NeckLine?</label>
                <input
                  type="string"
                  name="collar_type"
                  value={formData.collar_type || ''}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">What's The Fit Type ?</label>
                <input
                  type="string"
                  name="fit_type"
                  value={formData.fit_type || ''}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">What's The Cut Type ?</label>
              <input
                type="string"
                name="cut_style"
                value={formData.cut_style || ''}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">What's The Sleeve-Length ?</label>
                <input
                  type="string"
                  name="sleeve_type"
                  value={formData.sleeve_type || ''}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Available Sizes:</label>
              <div className="grid grid-cols-2 gap-4">
                {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                  <label key={size} className="flex items-center">
                    <input
                      type="checkbox"
                      value={size}
                      checked={formData.available_sizes.includes(size)}
                      onChange={handleSizeChange}
                      className="mr-2"
                    />
                    {size}
                  </label>
                ))}
              </div>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Fabric Type</label>
                <input
                  type="string"
                  name="fabric_type"
                  value={formData.fabric_type || ''}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">What is the fabric composition of the product?</label>
                <input
                  type="string"
                  name="composition"
                  value={formData.composition || ''}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Strechable (Yes/No)</label>
                <input
                  type="string"
                  name="strechable"
                  value={formData.strechable || ''}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">WaterProof (Yes/No)</label>
                <input
                  type="string"
                  name="waterproof"
                  value={formData.waterproof || ''}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Whats The Best Season To Wear Your Product ? (Optional)</label>
                <input
                  type="string"
                  name="season"
                  value={formData.season || ''}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Additional Information:</label>
            <textarea
              name="additional_info"
              value={formData.additional_info || ''}
              onChange={handleInputChange}
              placeholder="Enter any additional information about the product"
              rows="4"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
            </>
        );
      }else if (gender === 'Women' && clothingType === 'jeans') {
        return (
          <>
          <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Description:</label>
          <textarea
            name="description"
            value={formData.description || ''}
            onChange={handleInputChange}
            placeholder="Describe Your Product"
            rows="4"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
           <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">What type of Bottoms is it? (e.g., Jeans, Shorts, Formals, Track Pants,Skirts)</label>
              <input
                type="string"
                name="product_subtype"
                value={formData.product_subtype || ''}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Is it Low, Mid, or High Waist Bottoms?</label>
              <input
                type="string"
                name="waist_type"
                value={formData.waist_type || ''}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">What's The Fit Type ?</label>
              <input
                type="string"
                name="fit_type"
                value={formData.fit_type || ''}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">What's The Cut Type ?</label>
              <input
                type="string"
                name="cut_style"
                value={formData.cut_style || ''}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Available Sizes:</label>
            <div className="grid grid-cols-2 gap-4">
              {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                <label key={size} className="flex items-center">
                  <input
                    type="checkbox"
                    value={size}
                    checked={formData.available_sizes.includes(size)}
                    onChange={handleSizeChange}
                    className="mr-2"
                  />
                  {size}
                </label>
              ))}
            </div>
          </div>
          <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Fabric Type</label>
              <input
                type="string"
                name="fabric_type"
                value={formData.fabric_type || ''}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">What is the fabric composition of the product?</label>
              <input
                type="string"
                name="composition"
                value={formData.composition || ''}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Strechable (Yes/No)</label>
              <input
                type="string"
                name="strechable"
                value={formData.strechable || ''}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">WaterProof (Yes/No)</label>
              <input
                type="string"
                name="waterproof"
                value={formData.waterproof || ''}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Whats The Best Season To Wear Your Product ? (Optional)</label>
              <input
                type="string"
                name="season"
                value={formData.season || ''}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Additional Information:</label>
          <textarea
            name="additional_info"
            value={formData.additional_info || ''}
            onChange={handleInputChange}
            placeholder="Enter any additional information about the product"
            rows="4"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
          </>
        );
      }  else if (gender === 'Men' && clothingType === 'jeans') {
        return (
          <>
          <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Description:</label>
          <textarea
            name="description"
            value={formData.description || ''}
            onChange={handleInputChange}
            placeholder="Describe Your Product"
            rows="4"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
           <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">What type of Pants is it? (e.g., Jeans, Shorts, Formals, Track Pants)</label>
              <input
                type="string"
                name="product_subtype"
                value={formData.product_subtype || ''}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Is it Low, Mid, or High Waist Pants?</label>
              <input
                type="string"
                name="waist_type"
                value={formData.waist_type || ''}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">What's The Fit Type ?</label>
              <input
                type="string"
                name="fit_type"
                value={formData.fit_type || ''}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">What's The Cut Type ?</label>
              <input
                type="string"
                name="cut_style"
                value={formData.cut_style || ''}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Available Sizes:</label>
            <div className="grid grid-cols-2 gap-4">
              {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                <label key={size} className="flex items-center">
                  <input
                    type="checkbox"
                    value={size}
                    checked={formData.available_sizes.includes(size)}
                    onChange={handleSizeChange}
                    className="mr-2"
                  />
                  {size}
                </label>
              ))}
            </div>
          </div>
          <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Fabric Type</label>
              <input
                type="string"
                name="fabric_type"
                value={formData.fabric_type || ''}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">What is the fabric composition of the product?</label>
              <input
                type="string"
                name="composition"
                value={formData.composition || ''}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Strechable (Yes/No)</label>
              <input
                type="string"
                name="strechable"
                value={formData.strechable || ''}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">WaterProof (Yes/No)</label>
              <input
                type="string"
                name="waterproof"
                value={formData.waterproof || ''}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Whats The Best Season To Wear Your Product ? (Optional)</label>
              <input
                type="string"
                name="season"
                value={formData.season || ''}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Additional Information:</label>
          <textarea
            name="additional_info"
            value={formData.additional_info || ''}
            onChange={handleInputChange}
            placeholder="Enter any additional information about the product"
            rows="4"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
          </>
        );
      } else if (gender === 'Men' && clothingType === 'innerwear') {
      return (
        <>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Vest Size:</label>
            <input
              type="number"
              name="vestSize"
              value={formData.vestSize || ''}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Underwear Waist Size:</label>
            <input
              type="number"
              name="underwearWaistSize"
              value={formData.underwearWaistSize || ''}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          
        </>
      );
    } else if (gender === 'Women' && clothingType === 'innerwear') {
      return (
        <>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Bra Size:</label>
            <input
              type="number"
              name="braSize"
              value={formData.braSize || ''}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Panty Size:</label>
            <input
              type="number"
              name="pantySize"
              value={formData.pantySize || ''}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
        </>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 via-yellow-100 to-yellow-200 flex items-center justify-center">
    <div className="max-w-lg w-full p-6 bg-white bg-opacity-90 shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Size Chart Generator Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Select Gender:</label>
          <select
            value={gender}
            onChange={handleGenderChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
          >
            <option value="">Select</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
          </select>
        </div>

        {gender && (
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Select Clothing Type:</label>
            <select
              value={clothingType}
              onChange={handleClothingTypeChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
            >
              <option value="">Select</option>
              <option value="top">Top</option>
              <option value="jeans">Bottoms</option>
              <option value="innerwear">Innerwear</option>
            </select>
          </div>
        )}

        {clothingType && renderFields()}

        {clothingType && (
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
            >
              Submit
            </button>
          </div>
        )}
      </form>
    </div>
  </div>
  );
};

export default SizeChartForm;
