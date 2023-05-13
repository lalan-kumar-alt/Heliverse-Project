import React, { useEffect, useState } from "react";
import axios from "axios";

function Viewteam() {
  const [datat, setDatat] = useState([]);
  const myArray = [];
  const domains = new Set();
  useEffect( () => {
 
      const response = axios.get("http://localhost:5000/users");console.log(response);
      const datal = response.data; console.log("response"+response)
      setDatat(datal);
      console.log(datat);
      datat.map((ele, index) => {
        domains.add(ele.domain);
      });

      for (const ite of domains) {
        const filteredData = datat.filter((item) => item.domain === ite);
        myArray.push(filteredData[0]);
      }
      console.log(myArray);
    
  }, []);
  return (
    <> <div>Hello</div>
      {myArray.map((ele, key) => {
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
    </>
  );
}

export default Viewteam;
