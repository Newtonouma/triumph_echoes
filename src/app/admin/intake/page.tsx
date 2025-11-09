'use client';

import { useState } from 'react';

interface Intake {
  id: number;
  name: string;
  startMonth: string;
  endMonth: string;
  year: number;
  status: 'active' | 'enrolling' | 'complete' | 'awaiting' | 'delayed';
  studentsEnrolled: number;
  capacity: number;
}

export default function IntakeManagement() {
  const [intakes, setIntakes] = useState<Intake[]>([
    {
      id: 1,
      name: 'Spring Youth Speaking Program',
      startMonth: 'March',
      endMonth: 'May',
      year: 2024,
      status: 'complete',
      studentsEnrolled: 25,
      capacity: 30
    },
    {
      id: 2,
      name: 'Summer Adult Communication Skills',
      startMonth: 'June',
      endMonth: 'August',
      year: 2024,
      status: 'complete',
      studentsEnrolled: 18,
      capacity: 20
    },
    {
      id: 3,
      name: 'Fall Professional Presentation',
      startMonth: 'September',
      endMonth: 'November',
      year: 2024,
      status: 'active',
      studentsEnrolled: 22,
      capacity: 25
    },
    {
      id: 4,
      name: 'Winter Teen Leadership Program',
      startMonth: 'December',
      endMonth: 'February',
      year: 2025,
      status: 'enrolling',
      studentsEnrolled: 8,
      capacity: 30
    },
    {
      id: 5,
      name: 'Spring Executive Communication',
      startMonth: 'March',
      endMonth: 'May',
      year: 2025,
      status: 'awaiting',
      studentsEnrolled: 0,
      capacity: 15
    }
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterYear, setFilterYear] = useState<string>('all');

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const statusOptions = ['active', 'enrolling', 'complete', 'awaiting', 'delayed'] as const;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#10b981';
      case 'enrolling': return '#3b82f6';
      case 'complete': return '#6b7280';
      case 'awaiting': return '#f59e0b';
      case 'delayed': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Active';
      case 'enrolling': return 'Enrolling';
      case 'complete': return 'Complete';
      case 'awaiting': return 'Awaiting';
      case 'delayed': return 'Delayed';
      default: return status;
    }
  };

  const filteredIntakes = intakes.filter(intake => {
    const statusMatch = filterStatus === 'all' || intake.status === filterStatus;
    const yearMatch = filterYear === 'all' || intake.year.toString() === filterYear;
    return statusMatch && yearMatch;
  });

  const availableYears = [...new Set(intakes.map(intake => intake.year))].sort((a, b) => b - a);

  const handleCreateIntake = (formData: FormData) => {
    const newIntake: Intake = {
      id: Date.now(),
      name: formData.get('name') as string,
      startMonth: formData.get('startMonth') as string,
      endMonth: formData.get('endMonth') as string,
      year: parseInt(formData.get('year') as string),
      status: formData.get('status') as Intake['status'],
      studentsEnrolled: 0,
      capacity: parseInt(formData.get('capacity') as string) || 30
    };
    setIntakes(prev => [...prev, newIntake]);
    setShowCreateModal(false);
  };

  const handleStatusChange = (intakeId: number, newStatus: Intake['status']) => {
    setIntakes(prev => prev.map(intake => 
      intake.id === intakeId ? { ...intake, status: newStatus } : intake
    ));
  };

  const handleDeleteIntake = (intakeId: number) => {
    if (confirm('Are you sure you want to delete this intake? This action cannot be undone.')) {
      setIntakes(prev => prev.filter(intake => intake.id !== intakeId));
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <h1 style={{ margin: 0, color: '#03111E' }}>
          <i className="fas fa-calendar-alt" style={{ marginRight: '0.5rem' }}></i>
          Intake Management
        </h1>
        <button 
          className="btn btn-primary"
          onClick={() => setShowCreateModal(true)}
        >
          <i className="fas fa-plus" style={{ marginRight: '0.5rem' }}></i>
          Create New Intake
        </button>
      </div>

      {/* Filters */}
      <div style={{ 
        background: 'white', 
        padding: '1.5rem', 
        borderRadius: '0.5rem', 
        border: '1px solid #e2e8f0',
        marginBottom: '1.5rem'
      }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div>
            <label style={{ marginRight: '0.5rem', fontWeight: '500', color: '#374151' }}>Status:</label>
            <select 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)}
              className="form-select"
              style={{ width: 'auto', minWidth: '120px' }}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="enrolling">Enrolling</option>
              <option value="complete">Complete</option>
              <option value="awaiting">Awaiting</option>
              <option value="delayed">Delayed</option>
            </select>
          </div>
          
          <div>
            <label style={{ marginRight: '0.5rem', fontWeight: '500', color: '#374151' }}>Year:</label>
            <select 
              value={filterYear} 
              onChange={(e) => setFilterYear(e.target.value)}
              className="form-select"
              style={{ width: 'auto', minWidth: '100px' }}
            >
              <option value="all">All Years</option>
              {availableYears.map(year => (
                <option key={year} value={year.toString()}>{year}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Intakes Summary Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '1rem', 
        marginBottom: '2rem' 
      }}>
        <div className="dashboard-card" style={{ backgroundColor: '#f0f9ff', border: '1px solid #bae6fd' }}>
          <h3 style={{ color: '#0369a1' }}>Active Intakes</h3>
          <div className="value" style={{ color: '#0369a1' }}>
            {intakes.filter(i => i.status === 'active').length}
          </div>
        </div>
        <div className="dashboard-card" style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0' }}>
          <h3 style={{ color: '#15803d' }}>Enrolling</h3>
          <div className="value" style={{ color: '#15803d' }}>
            {intakes.filter(i => i.status === 'enrolling').length}
          </div>
        </div>
        <div className="dashboard-card" style={{ backgroundColor: '#fefce8', border: '1px solid #fde68a' }}>
          <h3 style={{ color: '#a16207' }}>Awaiting</h3>
          <div className="value" style={{ color: '#a16207' }}>
            {intakes.filter(i => i.status === 'awaiting').length}
          </div>
        </div>
        <div className="dashboard-card" style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
          <h3 style={{ color: '#475569' }}>Total Intakes</h3>
          <div className="value" style={{ color: '#475569' }}>
            {intakes.length}
          </div>
        </div>
      </div>

      {/* Intakes Table */}
      <div className="admin-table">
        <table>
          <thead>
            <tr>
              <th>Intake Name</th>
              <th>Duration</th>
              <th>Year</th>
              <th>Status</th>
              <th>Enrollment</th>
              <th>Progress</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredIntakes.map((intake) => (
              <tr key={intake.id}>
                <td>
                  <div style={{ fontWeight: '500', color: '#374151' }}>{intake.name}</div>
                </td>
                <td style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                  {intake.startMonth} - {intake.endMonth}
                </td>
                <td style={{ fontWeight: '500', color: '#374151' }}>
                  {intake.year}
                </td>
                <td>
                  <select 
                    value={intake.status}
                    onChange={(e) => handleStatusChange(intake.id, e.target.value as Intake['status'])}
                    style={{ 
                      padding: '0.25rem 0.5rem',
                      borderRadius: '0.375rem',
                      fontSize: '0.75rem',
                      fontWeight: '500',
                      backgroundColor: getStatusColor(intake.status) + '20',
                      color: getStatusColor(intake.status),
                      border: '1px solid ' + getStatusColor(intake.status) + '40',
                      cursor: 'pointer'
                    }}
                  >
                    {statusOptions.map(status => (
                      <option key={status} value={status}>
                        {getStatusLabel(status)}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <div style={{ fontWeight: '500', color: '#374151' }}>
                    {intake.studentsEnrolled} / {intake.capacity}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                    {intake.capacity > 0 ? Math.round((intake.studentsEnrolled / intake.capacity) * 100) : 0}% full
                  </div>
                </td>
                <td>
                  <div style={{ 
                    width: '100%', 
                    height: '6px', 
                    backgroundColor: '#e5e7eb', 
                    borderRadius: '3px',
                    overflow: 'hidden'
                  }}>
                    <div style={{ 
                      width: `${intake.capacity > 0 ? (intake.studentsEnrolled / intake.capacity) * 100 : 0}%`, 
                      height: '100%', 
                      backgroundColor: getStatusColor(intake.status),
                      transition: 'width 0.3s ease'
                    }} />
                  </div>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button 
                      style={{ 
                        background: 'none', 
                        border: 'none', 
                        color: '#2563eb', 
                        cursor: 'pointer',
                        padding: '0.25rem',
                        fontSize: '0.875rem'
                      }}
                      title="Edit Intake"
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button 
                      style={{ 
                        background: 'none', 
                        border: 'none', 
                        color: '#10b981', 
                        cursor: 'pointer',
                        padding: '0.25rem',
                        fontSize: '0.875rem'
                      }}
                      title="View Students"
                    >
                      <i className="fas fa-users"></i>
                    </button>
                    <button 
                      style={{ 
                        background: 'none', 
                        border: 'none', 
                        color: '#dc2626', 
                        cursor: 'pointer',
                        padding: '0.25rem',
                        fontSize: '0.875rem'
                      }}
                      title="Delete Intake"
                      onClick={() => handleDeleteIntake(intake.id)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create Intake Modal */}
      {showCreateModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '0.5rem',
            width: '90%',
            maxWidth: '600px',
            maxHeight: '80vh',
            overflow: 'auto'
          }}>
            <h3 style={{ marginTop: 0, marginBottom: '1.5rem', color: '#03111E' }}>
              <i className="fas fa-calendar-plus" style={{ marginRight: '0.5rem' }}></i>
              Create New Intake
            </h3>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              handleCreateIntake(formData);
            }}>
              <div className="form-group">
                <label className="form-label">Intake Name</label>
                <input 
                  type="text" 
                  name="name" 
                  className="form-input" 
                  required 
                  placeholder="e.g., Spring Youth Speaking Program"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Starting Month</label>
                  <select name="startMonth" className="form-select" required>
                    <option value="">Select Month</option>
                    {months.map(month => (
                      <option key={month} value={month}>{month}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Ending Month</label>
                  <select name="endMonth" className="form-select" required>
                    <option value="">Select Month</option>
                    {months.map(month => (
                      <option key={month} value={month}>{month}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Year</label>
                  <input 
                    type="number" 
                    name="year" 
                    className="form-input" 
                    required 
                    min="2024"
                    max="2030"
                    defaultValue={new Date().getFullYear()}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Student Capacity</label>
                  <input 
                    type="number" 
                    name="capacity" 
                    className="form-input" 
                    required 
                    min="1"
                    max="100"
                    defaultValue="30"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Initial Status</label>
                <select name="status" className="form-select" required>
                  <option value="">Select Status</option>
                  <option value="awaiting">Awaiting</option>
                  <option value="enrolling">Enrolling</option>
                  <option value="active">Active</option>
                  <option value="delayed">Delayed</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', marginTop: '2rem' }}>
                <button 
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowCreateModal(false)}
                >
                  <i className="fas fa-times" style={{ marginRight: '0.5rem' }}></i>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <i className="fas fa-plus" style={{ marginRight: '0.5rem' }}></i>
                  Create Intake
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}