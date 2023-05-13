import React, { useState, useEffect } from "react";
import axios from "axios";
import Viewteam from "./Viewteam";
import "./App.css";
import Filter from "./Filter";
import {
  MDBPagination,
  MDBPaginationItem,
  MDBPaginationLink,
  MDBBtn,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
function App() {
  const [data, setData] = useState([]);
  const [firstNameValue, setfirstNameValue] = useState("");
  const [domainValue, setDomainValue] = useState("");
  const [genderValue, setGenderValue] = useState("");
  const [availabilityValue, setAvailabilityValue] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [pageLimit] = useState(20);
  const [sortFilterValue, setsortFilterValue] = useState("");
  const [operation, setoperation] = useState("");
  const [fordomain, setfordomain] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    loadUserData(0, 20, 0, operation);
  }, []);

  const loadUserData = async (start, end, increase, optType) => {
    console.log(optType);
    switch (optType) {
      case "search":
        setoperation(optType);
        setfirstNameValue("");
        return await axios
          .get(
            `http://localhost:5000/users?first_name=${firstNameValue}&_start=${start}&_end=${end}`
          )
          .then((response) => {
            setData(response.data);
            setCurrentPage(currentPage + increase);
          })
          .catch((err) => console.log(err));
        break;
      case "filter":
        setoperation(optType);
        axios
          .get(
            `http://localhost:5000/users?domain=${domainValue}&gender=${genderValue}&availability=${availabilityValue}&_start=${start}&_end=${end}`
          )
          .then((response) => {
            setData(response.data);
          })
          .catch((err) => console.log(err));
      default:
        return await axios
          .get(`http://localhost:5000/users?_start=${start}&_end=${end}`)
          .then((response) => {
            setData(response.data);
            setCurrentPage(currentPage + increase);
          })
          .catch((err) => console.log(err));
        break;
    }
  };
  const handleReset = () => {
    console.log("reseting...");
    setoperation("");
    setfirstNameValue("");
    loadUserData(0, 20, 0, "");
  };
  const handleSearch = async () => {
    console.log("searching...");
    loadUserData(0, 20, 0, "search");
    // return await axios
    //   .get(`http://localhost:5000/users?first_name=${firstNameValue}`)
    //   .then((response) => {
    //     setData(response.data);
    //     setfirstNameValue("");
    //   })
    //   .catch((err) => console.log(err));
  };
  const handleFilter = () => {
    loadUserData(0, 20, 0, "filter");
    // axios
    //   .get(
    //     `http://localhost:5000/users?domain=${domainValue}&gender=${genderValue}&availability=${availabilityValue}`
    //   )
    //   .then((response) => {
    //     setData(response.data);
    //   })
    //   .catch((err) => console.log(err));
  };

  const renderPagination = () => {
    if (data.length < 20 && currentPage === 0) return null;
    if (currentPage === 0) {
      return (
        <MDBPagination className="mb-0">
          <MDBPaginationItem>
            <MDBPaginationLink>1</MDBPaginationLink>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBBtn onClick={() => loadUserData(20, 40, 1, operation)}>
              Next
            </MDBBtn>
          </MDBPaginationItem>
        </MDBPagination>
      );
    } else if (currentPage < pageLimit - 1 && data.length === pageLimit) {
      return (
        <MDBPagination className="mb-0">
          <MDBPaginationItem>
            <MDBBtn
              onClick={() =>
                loadUserData(
                  (currentPage - 1) * 20,
                  currentPage * 20,
                  -1,
                  operation
                )
              }
            >
              Prev
            </MDBBtn>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBPaginationLink>{currentPage + 1}</MDBPaginationLink>
          </MDBPaginationItem>

          <MDBPaginationItem>
            <MDBBtn
              onClick={() =>
                loadUserData(
                  (currentPage + 1) * 20,
                  (currentPage + 2) * 20,
                  1,
                  operation
                )
              }
            >
              Next
            </MDBBtn>
          </MDBPaginationItem>
        </MDBPagination>
      );
    } else {
      return (
        <MDBPagination className="mb-0">
          <MDBPaginationItem>
            <MDBBtn
              onClick={() =>
                loadUserData(
                  (currentPage - 1) * 20,
                  currentPage * 20,
                  -1,
                  operation
                )
              }
            >
              Prev
            </MDBBtn>
          </MDBPaginationItem>{" "}
          <MDBPaginationItem>
            <MDBPaginationLink>{currentPage + 1}</MDBPaginationLink>
          </MDBPaginationItem>
        </MDBPagination>
      );
    }
  };

  return (
    <div className="App">
      
      <div>
       
        <button onClick={()=>{navigate("/viewteam")}}>View Team</button>
      </div>
      <div>
        <input
          type="text"
          className="form-control"
          placeholder="Search"
          value={firstNameValue}
          onChange={(e) => setfirstNameValue(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={handleReset}>Reset</button>
      </div>
      <div className="container">
        {data.map((ele, key) => {
          return (
            <div className="elements" key={key}>
              <div>{ele.id}</div>
              <div>
                {ele.first_name} {ele.last_name}
              </div>

              <div>{ele.email}</div>
              <div>{ele.gender}</div>
              <img src={ele.avatar} />
              <div>{ele.domain}</div>
              <div>{ele.available}</div>
            </div>
          );
        })}
      </div>
      <div
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
      >
        {renderPagination()}
      </div>
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
      </div>
    </div>
  );
}

export default App;
