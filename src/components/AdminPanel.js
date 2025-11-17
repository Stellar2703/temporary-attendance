import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPanel = ({ onLogout }) => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [summary, setSummary] = useState({ total: 0, present: 0, absent: 0 });

  useEffect(() => {
    fetchAllAttendance();
  }, []);

  const fetchAllAttendance = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/admin/attendance`
      );
      setAttendanceData(response.data.data);
      setSummary(response.data.summary);
    } catch (error) {
      console.error('Error fetching attendance:', error);
      setAttendanceData([]);
      setSummary({ total: 0, present: 0, absent: 0 });
    } finally {
      setLoading(false);
    }
  };

  const fetchAttendance = async () => {
    fetchAllAttendance();
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/admin/attendance/${id}`, {
        status: newStatus,
      });

      // Update local state
      const updatedData = attendanceData.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item
      );
      setAttendanceData(updatedData);

      // Recalculate summary
      const newSummary = {
        total: updatedData.length,
        present: updatedData.filter((s) => s.status === 'present').length,
        absent: updatedData.filter((s) => s.status === 'absent').length,
      };
      setSummary(newSummary);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleExport = () => {
    // Create CSV content
    const headers = ['Registration ID', 'Phone Number', 'Name', 'College Name', 'Title', 'Category', 'Time', 'Status'];
    const rows = attendanceData.map((item) => [
      item.registration_id,
      item.phone_number,
      item.name,
      item.college_name,
      item.title,
      item.category,
      item.time_recorded,
      item.status,
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.join(',')),
    ].join('\n');

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `attendance-all-dates.csv`;
    link.click();
  };

  return (
    <div className="admin-panel-container">
      <div className="admin-header">
        <h2>📊 Event Attendance Dashboard</h2>
      </div>

      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="summary-card">
          <h3>Total Students</h3>
          <div className="number">{summary.total}</div>
        </div>
        <div className="summary-card present">
          <h3>Present</h3>
          <div className="number">{summary.present}</div>
        </div>
        <div className="summary-card absent">
          <h3>Absent</h3>
          <div className="number">{summary.absent}</div>
        </div>
      </div>

      {/* Refresh and Export Controls */}
      <div className="date-filter">
        <button onClick={fetchAttendance}>🔄 Refresh</button>
        <button onClick={handleExport} style={{ marginLeft: 'auto' }}>
          📥 Export CSV (All)
        </button>
      </div>

      {/* Attendance Table */}
      {loading ? (
        <div className="loading">Loading attendance data...</div>
      ) : attendanceData.length === 0 ? (
        <div className="no-data">No attendance records found</div>
      ) : (
        <table className="attendance-table">
          <thead>
            <tr>
              <th>Registration ID</th>
              <th>Phone Number</th>
              <th>Name</th>
              <th>College Name</th>
              <th>Title</th>
              <th>Category</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((item) => (
              <tr key={item.id}>
                <td className="registration-id-cell">{item.registration_id}</td>
                <td>{item.phone_number}</td>
                <td>{item.name}</td>
                <td>{item.college_name}</td>
                <td>{item.title}</td>
                <td>{item.category}</td>
                <td>{item.time_recorded}</td>
                <td>
                  <div
                    className={`status-badge ${item.status}`}
                    onClick={() =>
                      handleStatusChange(
                        item.id,
                        item.status === 'present' ? 'absent' : 'present'
                      )
                    }
                    title="Click to toggle status"
                  >
                    {item.status.toUpperCase()}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminPanel;
