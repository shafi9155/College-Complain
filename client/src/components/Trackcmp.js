import React, { useState, useEffect } from 'react';

function Trackcmp(props) {
  const [staffNames, setStaffNames] = useState([]);

  useEffect(() => {
    const fetchStaffNames = async () => {
      const names = await Promise.all(
        props.assigned.map(async (complaint) => {
          const url = `http://localhost:5000/api/staff/getStaffData/${complaint.assignedto}`;
          const response = await fetch(url);
          const data = await response.json();
          return data.name;
        })
      );
      setStaffNames(names);
    };
    fetchStaffNames();
  }, [props.assigned]);

  return (
    <div className="bg-gray-100 p-20 w-3/4 m-auto mb-20">
      <h1 className="pb-5 text-3xl">Complaint Tracking</h1>
      <ol className="relative text-gray-500 border-l border-gray-200 dark:border-gray-700 ml-5 dark:text-gray-400">
        <li className="mb-10 ml-6">
          <span
            className={`absolute flex items-center justify-center w-4 h-4 bg-green-200 rounded-full -left-2 ring-4 ring-white  ${
              props.status === 'Open' ? 'dark:bg-gray-700' : 'dark:bg-green-700'
            }`}
          ></span>
          <h3 className="font-medium leading-tight">Accepted</h3>
        </li>
        <li className="mb-10 ml-6">
          <span
            className={`absolute flex items-center justify-center w-4 h-4 bg-green-200 rounded-full -left-2 ring-4 ring-white ${
              props.status === 'Open' ? 'dark:bg-gray-700' : 'dark:bg-green-700'
            }`}
          ></span>
          <h3 className="font-medium leading-tight">InProgress</h3>
          <ol className="relative text-gray-500 border-l border-gray-200 dark:border-gray-700 dark:text-gray-400">
            {props.status !== 'Open'
              ? props.assigned.map((complaint, index) => (
                  <li className="m-10 ml-6" key={complaint.assignedto}>
                    <span className="absolute flex items-center justify-center w-4 h-4 bg-gray-100 rounded-full -left-2 ring-4 ring-white  dark:bg-green-700"></span>
                    <p className="text-sm">{complaint.time}</p>
                    <h3 className="font-medium leading-tight text-gray-700">{staffNames[index]}</h3>
                    <p className="text-sm">{complaint.role}</p>
                  </li>
                ))
              : null}
          </ol>
        </li>
        <li className="mb-10 ml-6">
          <span
            className={`absolute flex items-center justify-center w-4 h-4 bg-green-200 rounded-full -left-2 ring-4 ring-white  ${
              props.status !== 'Closed' ? 'dark:bg-gray-700' : 'dark:bg-green-700'
            }`}
          ></span>
          <h3 className="font-medium leading-tight">Closed</h3>
        </li>
        
        </ol>
        </div>
  )};

  export default Trackcmp;

