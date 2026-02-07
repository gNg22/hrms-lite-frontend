import Dashboard from "../components/Dashboard";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeList from "../components/EmployeeList";
import AttendanceForm from "../components/AttendanceForm";
import AttendanceList from "../components/AttendanceList";

function Home() {
  return (
    <div className="container">
      <h1>HRMS Lite</h1>
      <Dashboard />
      <EmployeeForm />
      <EmployeeList />
      <AttendanceForm />
      <AttendanceList />
    </div>
  );
}

export default Home;
