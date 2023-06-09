import React,{useState} from 'react';
import { useSelector } from 'react-redux';
import './Log.css';

const Log = () => {
  const registrations = useSelector((state) => state.registration);
  const [searchName, setSearchName] = useState('');

  const handleSearchChange = (event) => {
    setSearchName(event.target.value);
  };

  const filteredRegistrations = registrations.filter((registration) =>
    registration.name.toLowerCase().includes(searchName.toLowerCase())
  );

  return (
    (registrations.length!==0)&&(<div className="table-container">
      <h2>Registration Data</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by Name"
          value={searchName}
          onChange={handleSearchChange}
        />
      </div>
      {filteredRegistrations.length === 0 ? (
        <p>No matching registrations found</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>DOB</th>
              <th>City</th>
              <th>Pincode</th>
            </tr>
          </thead>
          <tbody>
            {filteredRegistrations.map((registration) => (
              <tr key={registration.email}>
                <td>{registration.name}</td>
                <td>{registration.email}</td>
                <td>{registration.dob}</td>
                <td>{registration.city}</td>
                <td>{registration.pincode}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>)
  );
};

export default Log;
