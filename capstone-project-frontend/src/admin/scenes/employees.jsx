import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const Employees = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fecthAllEmployees = async () => {
      try {
        const res = await axios.get("http://localhost:8080/users/employee");
        setEmployees(res.data.users);

        console.log('-------frontend employee.tsx-------')
        console.log(res.data.users);
      } catch (err) {
        console.log(err);
      }
    };
    fecthAllEmployees();
  }, []);

  return (
    <>
        <div>
          <h1>Employees</h1>
          <br/>
          {employees.map((employee) => (
            <div className="employee" key={employee.id}>
              <h2>Name: {employee.first_name} {employee.last_name}</h2>
              <h2>Phone Number: {employee.phone_number}</h2>
              <h2>Address: {employee.address_id}</h2>
              <h2>Role: {employee.role}</h2>
              <h2>Active: {employee.is_active}</h2>
              <br></br>
            </div>
          ))}
        </div>
    </>
  );
};
export default Employees;
