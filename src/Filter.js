import React, { useState } from "react";
import axios from "axios";

const Filter = () => {
  const [domainValue, setDomainValue] = useState("");
  const [genderValue, setGenderValue] = useState("");
  const [availabilityValue, setAvailabilityValue] = useState("");
  const [data, setData] = useState([]);

  const handleFilter = () => {
    axios
      .get(
        `http://localhost:5000/users?domain=${domainValue}&gender=${genderValue}&availability=${availabilityValue}`
      )
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <label>
        Domain:
        <input
          type="text"
          value={domainValue}
          onChange={(e) => setDomainValue(e.target.value)}
        />
      </label>
      <label>
        Gender:
        <input
          type="text"
          value={genderValue}
          onChange={(e) => setGenderValue(e.target.value)}
        />
      </label>
      <label>
        Availability:
        <input
          type="text"
          value={availabilityValue}
          onChange={(e) => setAvailabilityValue(e.target.value)}
        />
      </label>
      <button onClick={handleFilter}>Filter</button>
      <ul>
        {data.map((user) => (
          <li key={user.id}>
            {user.name} ({user.domain}, {user.gender}, {user.availabile})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Filter;