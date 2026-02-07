import { useEffect, useState } from "react";
import api from "../api/axios";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("employees/")
      .then(res => setEmployees(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="card">
      <h2>Employees</h2>

      {loading && <p>Loading...</p>}
      {!loading && employees.length === 0 && <p>No employees yet.</p>}

      {!loading && employees.length > 0 && (
        <ul>
          {employees.map(emp => (
            <li key={emp.id}>
              <strong>{emp.full_name}</strong> — {emp.department}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default EmployeeList;
