import { useState } from "react";
import api from "../api/axios";

function AttendanceForm() {
  const [data, setData] = useState({ employee: "", date: "", status: "Present" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!data.employee || !data.date) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);
      await api.post("attendance/", data);
      setSuccess("Attendance marked successfully");
      setData({ employee: "", date: "", status: "Present" });
    } catch {
      setError("Failed to mark attendance");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Mark Attendance</h2>
      <form onSubmit={handleSubmit}>
        <input name="employee" placeholder="Employee ID" value={data.employee} onChange={handleChange} />
        <input type="date" name="date" value={data.date} onChange={handleChange} />
        <select name="status" value={data.status} onChange={handleChange}>
          <option>Present</option>
          <option>Absent</option>
        </select>
        <button disabled={loading}>{loading ? "Saving..." : "Submit"}</button>
      </form>

      {error && <p className="error">{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
}

export default AttendanceForm;
