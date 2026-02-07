import { useEffect, useState } from "react";
import api from "../api/axios";

export default function AttendanceList() {
  const [data, setData] = useState([]);
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await api.get(`attendance/?date=${date}`);
        setData(res.data);
      } catch {
        setError("Failed to load attendance records");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [date]); // re-run whenever date changes

  return (
    <div className="card">
      <h3>Attendance Records</h3>

      <div className="filter-row">
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
        />
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && data.length === 0 && <p>No attendance records found.</p>}

      {!loading && data.length > 0 && (
        <ul>
          {data.map(a => (
            <li key={a.id}>
              Employee #{a.employee} — {a.date} — <strong>{a.status}</strong>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}