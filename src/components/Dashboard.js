import { useEffect, useState } from "react";
import api from "../api/axios";

function Dashboard() {
  const [summary, setSummary] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("attendance-summary/")
      .then(res => setSummary(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="card">
      <h2>Dashboard</h2>
      <p>Employee Attendance Summary</p>

      {loading && <p>Loading...</p>}
      {!loading && summary.length === 0 && <p>No data yet.</p>}

      {!loading && summary.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Name</th>
              <th>Present Days</th>
            </tr>
          </thead>
          <tbody>
            {summary.map(row => (
              <tr key={row.employee_id}>
                <td>{row.employee_id}</td>
                <td>{row.name}</td>
                <td>{row.present_days}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Dashboard;
