import { useState } from "react";
import api from "../api/axios";

function EmployeeForm() {
  const [form, setForm] = useState({ employee_id: "", full_name: "", email: "", department: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");

    if (!form.employee_id || !form.full_name || !form.email || !form.department) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);
      await api.post("employees/", form);
      setSuccess("Employee added successfully");
      setForm({ employee_id: "", full_name: "", email: "", department: "" });
    } catch {
      setError("Failed to add employee (duplicate or invalid email)");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Add Employee</h2>
      <form onSubmit={handleSubmit}>
        <input name="employee_id" value={form.employee_id} placeholder="Employee ID" onChange={handleChange} />
        <input name="full_name" value={form.full_name} placeholder="Full Name" onChange={handleChange} />
        <input name="email" value={form.email} placeholder="Email" onChange={handleChange} />
        <input name="department" value={form.department} placeholder="Department" onChange={handleChange} />
        <button disabled={loading}>{loading ? "Saving..." : "Add"}</button>
      </form>

      {error && <p className="error">{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
}

export default EmployeeForm;
