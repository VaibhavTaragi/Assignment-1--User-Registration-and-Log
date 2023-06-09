import React, { useState } from 'react';
import './Form.css';
import { useDispatch, useSelector } from 'react-redux';
import { addRegistration } from '../utils/registrationSlice';


const Form = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dob: '',
    city: '',
    pincode: '',
  });

  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  const registrations = useSelector((store) => store.registration);


  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name) {
      newErrors.name = 'Name is required';
    } else if (!/^[A-Za-z ]+$/.test(formData.name)) {
      newErrors.name = 'Name must contain only letters';
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = 'Invalid email address';
    } else if (registrations.some((reg) => reg.email === formData.email)) {
      //Validation for unique email
      newErrors.email = 'Email already exists';
    }

    // DOB validation
    if (!formData.dob) {
        newErrors.dob = 'DOB is required';
      } else {
        const currentDate = new Date();
        const dobDate = new Date(formData.dob);
        const ageDiff = currentDate.getFullYear() - dobDate.getFullYear();
        
        //18+ age validation
        if (ageDiff < 18) {
          newErrors.dob = 'You must be at least 18 years old';
        }
      }

    // City validation
    if (!formData.city) {
      newErrors.city = 'City is required';
    }

    // Pincode validation
    if (!formData.pincode) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Pincode must be 6 digits';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      //dispatching action addRegistration for adding form data to registrationSlice of store
      dispatch(addRegistration(formData));
      // console.log('Form submitted:', formData);

      //resetting form fields
      setFormData({
        name: '',
        email: '',
        dob: '',
        city: '',
        pincode: '',
      })
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <form className="registration-form" onSubmit={handleSubmit}>
      <h2>Registration Form</h2>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="dob">DOB:</label>
        <input
          type="date"
          id="dob"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
        />
        {errors.dob && <span className="error">{errors.dob}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="city">City:</label>
        <select
          id="city"
          name="city"
          value={formData.city}
          onChange={handleChange}
        >
          <option value="">Select City</option>
          <option value="delhi">Delhi</option>
          <option value="gurugram">Gurugram</option>
          <option value="noida">Noida</option>
          <option value="jaipur">Jaipur</option>
          <option value="bangalore">Bangalore</option>
        </select>
        {errors.city && <span className="error">{errors.city}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="pincode">Pincode:</label>
        <input
          type="text"
          id="pincode"
          name="pincode"
          value={formData.pincode}
          onChange={handleChange}
        />
        {errors.pincode && <span className="error">{errors.pincode}</span>}
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default Form;
