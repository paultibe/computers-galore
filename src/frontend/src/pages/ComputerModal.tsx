import React, { useState } from 'react';

interface ComputerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (computerData: any) => void;
}

const ComputerModal: React.FC<ComputerModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [computerData, setComputerData] = useState({
    brand: '',
    price: '',
    assembledIn: '',
    cpuModel: '',
    cpuBrand: '',
    cpuClockSpeed: '',
    cpuGeneration: '',
    cpuCoreCount: '',
    gpuBrand: '',
    gpuModel: '',
    gpuMemory: '',
    gpuClockSpeed: ''
  });

  const [errors, setErrors] = useState({
    brand: '',
    price: '',
    assembledIn: '',
    cpuModel: '',
    cpuBrand: '',
    cpuClockSpeed: '',
    cpuGeneration: '',
    cpuCoreCount: '',
    gpuBrand: '',
    gpuModel: '',
    gpuMemory: '',
    gpuClockSpeed: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setComputerData({ ...computerData, [name]: value });
    setErrors({ ...errors, [name]: '' }); 
  };

  const handleAddComputer = () => {
    if (validateForm()) {
      onSubmit(computerData);
      onClose();
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors: any = {};

    // Validation for computer details
    if (!computerData.brand.trim()) {
      newErrors.brand = 'Brand is required';
      isValid = false;
    }
    if (!computerData.price.trim() || isNaN(parseFloat(computerData.price.trim()))) {
      newErrors.price = 'Price must be a number';
      isValid = false;
    }
    if (!computerData.assembledIn.trim()) {
      newErrors.assembledIn = 'Assembled In is required';
      isValid = false;
    }

    // Validation for CPU details
    if (!computerData.cpuModel.trim()) {
      newErrors.cpuModel = 'CPU Model is required';
      isValid = false;
    }
    if (!computerData.cpuBrand.trim() || !['Intel', 'AMD'].includes(computerData.cpuBrand.trim())) {
      newErrors.cpuBrand = 'CPU brand must be Intel or AMD';
      isValid = false;
    }
    const cpuClockSpeed = parseFloat(computerData.cpuClockSpeed.trim());
    if (isNaN(cpuClockSpeed) || cpuClockSpeed <= 0 || cpuClockSpeed > 999.999) {
      newErrors.cpuClockSpeed = 'CPU Clock Speed must be a number between 0 and 999.999';
      isValid = false;
    }
    const cpuGeneration = parseInt(computerData.cpuGeneration.trim());
    if (isNaN(cpuGeneration) || cpuGeneration < 0) {
      newErrors.cpuGeneration = 'CPU Generation must be a non-negative number';
      isValid = false;
    }

    const cpuCoreCount = parseInt(computerData.cpuGeneration.trim());
    if (isNaN(cpuCoreCount) || cpuCoreCount < 0 || cpuCoreCount > 16 ) {
      newErrors.cpuCoreCount = 'CPU core count must be a number between 0 and 16';
      isValid = false;
    }

    // Validation for GPU details
    if (!computerData.gpuBrand.trim() || !['NVIDIA', 'AMD'].includes(computerData.gpuBrand.trim())) {
      newErrors.gpuBrand = 'GPU brand must be NVIDIA or AMD';
      isValid = false;
    }
    const gpuMemory = parseInt(computerData.gpuMemory.trim());
    if (isNaN(gpuMemory) || gpuMemory < 0 || gpuMemory > 16) {
      newErrors.gpuMemory = 'GPU memory must be a number between 0 and 16';
      isValid = false;
    }
    const gpuClockSpeed = parseFloat(computerData.gpuClockSpeed.trim());
    if (isNaN(gpuClockSpeed) || gpuClockSpeed <= 0 || gpuClockSpeed > 999.999) {
      newErrors.gpuClockSpeed = 'GPU Clock Speed must be a number between 0 and 999.999';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h4 className="text-xl mb-4">Add Computer</h4>
        <div className="mb-4">
          <h5>Computer</h5>
          <input
            type="text"
            name="brand"
            value={computerData.brand}
            onChange={handleInputChange}
            placeholder="Brand"
            className={`input ${errors.brand && 'input-error'}`}
          />
          {errors.brand && <p className="text-red-500">{errors.brand}</p>}
          <input
            type="text"
            name="price"
            value={computerData.price}
            onChange={handleInputChange}
            placeholder="Price"
            className={`input ${errors.price && 'input-error'}`}
          />
          {errors.price && <p className="text-red-500">{errors.price}</p>}
          <input
            type="text"
            name="assembledIn"
            value={computerData.assembledIn}
            onChange={handleInputChange}
            placeholder="Assembled In"
            className={`input ${errors.assembledIn && 'input-error'}`}
          />
          {errors.assembledIn && <p className="text-red-500">{errors.assembledIn}</p>}
        </div>
        <div className="mb-4">
          <h5>CPU</h5>
          <input
            type="text"
            name="cpuModel"
            value={computerData.cpuModel}
            onChange={handleInputChange}
            placeholder="CPU Model"
            className={`input ${errors.cpuModel && 'input-error'}`}
          />
          {errors.cpuModel && <p className="text-red-500">{errors.cpuModel}</p>}
          <input
            type="text"
            name="cpuBrand"
            value={computerData.cpuBrand}
            onChange={handleInputChange}
            placeholder="CPU Brand"
            className={`input ${errors.cpuBrand && 'input-error'}`}
          />
          {errors.cpuBrand && <p className="text-red-500">{errors.cpuBrand}</p>}
          <input
            type="text"
            name="cpuClockSpeed"
            value={computerData.cpuClockSpeed}
            onChange={handleInputChange}
            placeholder="CPU Clock Speed"
            className={`input ${errors.cpuClockSpeed && 'input-error'}`}
          />
          {errors.cpuClockSpeed && <p className="text-red-500">{errors.cpuClockSpeed}</p>}
          <input
            type="text"
            name="cpuGeneration"
            value={computerData.cpuGeneration}
            onChange={handleInputChange}
            placeholder="CPU Generation"
            className={`input ${errors.cpuGeneration && 'input-error'}`}
          />
          {errors.cpuGeneration && <p className="text-red-500">{errors.cpuGeneration}</p>}
          <input
            type="text"
            name="cpuCoreCount"
            value={computerData.cpuCoreCount}
            onChange={handleInputChange}
            placeholder="CPU Core Count"
            className={`input ${errors.cpuCoreCount && 'input-error'}`}
          />
          {errors.cpuCoreCount && <p className="text-red-500">{errors.cpuCoreCount}</p>}
        </div>
        <div className="mb-4">
          <h5>GPU</h5>
          <input
            type="text"
            name="gpuBrand"
            value={computerData.gpuBrand}
            onChange={handleInputChange}
            placeholder="GPU Brand"
            className={`input ${errors.gpuBrand && 'input-error'}`}
          />
          {errors.gpuBrand && <p className="text-red-500">{errors.gpuBrand}</p>}
          <input
            type="text"
            name="gpuModel"
            value={computerData.gpuModel}
            onChange={handleInputChange}
            placeholder="GPU Model"
            className={`input ${errors.gpuModel && 'input-error'}`}
          />
          {errors.gpuModel && <p className="text-red-500">{errors.gpuModel}</p>}
          <input
            type="text"
            name="gpuMemory"
            value={computerData.gpuMemory}
            onChange={handleInputChange}
            placeholder="GPU Memory"
            className={`input ${errors.gpuMemory && 'input-error'}`}
          />
          {errors.gpuMemory && <p className="text-red-500">{errors.gpuMemory}</p>}
          <input
            type="text"
            name="gpuClockSpeed"
            value={computerData.gpuClockSpeed}
            onChange={handleInputChange}
            placeholder="GPU Clock Speed"
            className={`input ${errors.gpuClockSpeed && 'input-error'}`}
          />
          {errors.gpuClockSpeed && <p className="text-red-500">{errors.gpuClockSpeed}</p>}
        </div>
        <button onClick={handleAddComputer} className="btn mr-2">Add Computer</button>
        <button onClick={onClose} className="btn btn-secondary">Close</button>
      </div>
    </div>
  );
};

export default ComputerModal;
