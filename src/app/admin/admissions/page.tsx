'use client';

import { useState, useEffect } from 'react';

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

interface Student {
  id: number;
  name: string;
  email: string;
  phone: string;
  intakeId: number;
  intakeName: string;
  status: 'pending' | 'enrolled' | 'declined' | 'discontinued';
  modeOfLearning: 'in-person' | 'online' | 'hybrid';
  applicationDate: string;
  lastUpdated: string;
}

export default function AdmissionManagement() {
  const [students, setStudents] = useState<Student[]>([
    {
      id: 1,
      name: 'John Kamau',
      email: 'john.kamau@example.com',
      phone: '+254 701 234 567',
      intakeId: 3,
      intakeName: 'Fall Professional Presentation',
      status: 'enrolled',
      modeOfLearning: 'in-person',
      applicationDate: '2024-08-15',
      lastUpdated: '2024-09-01'
    },
    {
      id: 2,
      name: 'Sarah Mwangi',
      email: 'sarah.mwangi@gmail.com',
      phone: '+254 722 345 678',
      intakeId: 4,
      intakeName: 'Winter Teen Leadership Program',
      status: 'pending',
      modeOfLearning: 'online',
      applicationDate: '2024-10-20',
      lastUpdated: '2024-10-20'
    },
    {
      id: 3,
      name: 'Peter Ochieng',
      email: 'p.ochieng@company.co.ke',
      phone: '+254 733 456 789',
      intakeId: 5,
      intakeName: 'Spring Executive Communication',
      status: 'enrolled',
      modeOfLearning: 'hybrid',
      applicationDate: '2024-11-01',
      lastUpdated: '2024-11-05'
    },
    {
      id: 4,
      name: 'Grace Wanjiku',
      email: 'grace.w@outlook.com',
      phone: '+254 712 567 890',
      intakeId: 4,
      intakeName: 'Winter Teen Leadership Program',
      status: 'declined',
      modeOfLearning: 'in-person',
      applicationDate: '2024-10-10',
      lastUpdated: '2024-10-25'
    },
    {
      id: 5,
      name: 'David Kiprotich',
      email: 'dkiprotich@email.com',
      phone: '+254 745 678 901',
      intakeId: 3,
      intakeName: 'Fall Professional Presentation',
      status: 'discontinued',
      modeOfLearning: 'online',
      applicationDate: '2024-09-01',
      lastUpdated: '2024-10-15'
    }
  ]);

  // Sample intakes data (in real app, this would come from API/database)
  const [availableIntakes] = useState<Intake[]>([
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
    },
    {
      id: 6,
      name: 'Summer Youth Development',
      startMonth: 'June',
      endMonth: 'August',
      year: 2025,
      status: 'awaiting',
      studentsEnrolled: 0,
      capacity: 25
    }
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterIntake, setFilterIntake] = useState<string>('all');
  const [filterMode, setFilterMode] = useState<string>('all');

  const statusOptions = ['pending', 'enrolled', 'declined', 'discontinued'] as const;
  const modeOptions = ['in-person', 'online', 'hybrid'] as const;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'enrolled': return '#10b981';
      case 'pending': return '#f59e0b';
      case 'declined': return '#ef4444';
      case 'discontinued': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'enrolled': return 'Enrolled';
      case 'pending': return 'Pending';
      case 'declined': return 'Declined';
      case 'discontinued': return 'Discontinued';
      default: return status;
    }
  };

  const getModeLabel = (mode: string) => {
    switch (mode) {
      case 'in-person': return 'In-Person';
      case 'online': return 'Online';
      case 'hybrid': return 'Hybrid';
      default: return mode;
    }
  };

  const getModeColor = (mode: string) => {
    switch (mode) {
      case 'in-person': return '#8b5cf6';
      case 'online': return '#3b82f6';
      case 'hybrid': return '#06b6d4';
      default: return '#6b7280';
    }
  };

  const filteredStudents = students.filter(student => {
    const statusMatch = filterStatus === 'all' || student.status === filterStatus;
    const intakeMatch = filterIntake === 'all' || student.intakeId.toString() === filterIntake;
    const modeMatch = filterMode === 'all' || student.modeOfLearning === filterMode;
    return statusMatch && intakeMatch && modeMatch;
  });

  const handleCreateStudent = (formData: FormData) => {
    const intakeId = parseInt(formData.get('intakeId') as string);
    const selectedIntake = availableIntakes.find(intake => intake.id === intakeId);
    
    const newStudent: Student = {
      id: Date.now(),
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      intakeId: intakeId,
      intakeName: selectedIntake?.name || '',
      status: formData.get('status') as Student['status'],
      modeOfLearning: formData.get('modeOfLearning') as Student['modeOfLearning'],
      applicationDate: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    
    setStudents(prev => [...prev, newStudent]);
    setShowCreateModal(false);
  };

  const handleStatusChange = (studentId: number, newStatus: Student['status']) => {
    setStudents(prev => prev.map(student => 
      student.id === studentId 
        ? { ...student, status: newStatus, lastUpdated: new Date().toISOString().split('T')[0] }
        : student
    ));
  };

  const handleModeChange = (studentId: number, newMode: Student['modeOfLearning']) => {
    setStudents(prev => prev.map(student => 
      student.id === studentId 
        ? { ...student, modeOfLearning: newMode, lastUpdated: new Date().toISOString().split('T')[0] }
        : student
    ));
  };

  const handleDeleteStudent = (studentId: number) => {
    if (confirm('Are you sure you want to delete this student application? This action cannot be undone.')) {
      setStudents(prev => prev.filter(student => student.id !== studentId));
    }
  };

  // Get enrollment-ready intakes (enrolling or awaiting status)
  const enrollmentIntakes = availableIntakes.filter(intake => 
    intake.status === 'enrolling' || intake.status === 'awaiting'
  );

  return (
    <div>
      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <h1 style={{ margin: 0, color: '#03111E' }}>
          <i className="fas fa-user-graduate" style={{ marginRight: '0.5rem' }}></i>
          Admission Management
        </h1>
        <button 
          className="btn btn-primary"
          onClick={() => setShowCreateModal(true)}
        >
          <i className="fas fa-user-plus" style={{ marginRight: '0.5rem' }}></i>
          Add New Student
        </button>
      </div>

      {/* Summary Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '1rem', 
        marginBottom: '2rem' 
      }}>
        <div className="dashboard-card" style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0' }}>
          <h3 style={{ color: '#15803d' }}>Enrolled</h3>
          <div className="value" style={{ color: '#15803d' }}>
            {students.filter(s => s.status === 'enrolled').length}
          </div>
        </div>
        <div className="dashboard-card" style={{ backgroundColor: '#fefce8', border: '1px solid #fde68a' }}>
          <h3 style={{ color: '#a16207' }}>Pending</h3>
          <div className="value" style={{ color: '#a16207' }}>
            {students.filter(s => s.status === 'pending').length}
          </div>
        </div>
        <div className="dashboard-card" style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca' }}>
          <h3 style={{ color: '#dc2626' }}>Declined</h3>
          <div className="value" style={{ color: '#dc2626' }}>
            {students.filter(s => s.status === 'declined').length}
          </div>
        </div>
        <div className="dashboard-card" style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
          <h3 style={{ color: '#475569' }}>Total Applications</h3>
          <div className="value" style={{ color: '#475569' }}>
            {students.length}
          </div>
        </div>
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
              <option value="pending">Pending</option>
              <option value="enrolled">Enrolled</option>
              <option value="declined">Declined</option>
              <option value="discontinued">Discontinued</option>
            </select>
          </div>
          
          <div>
            <label style={{ marginRight: '0.5rem', fontWeight: '500', color: '#374151' }}>Intake:</label>
            <select 
              value={filterIntake} 
              onChange={(e) => setFilterIntake(e.target.value)}
              className="form-select"
              style={{ width: 'auto', minWidth: '200px' }}
            >
              <option value="all">All Intakes</option>
              {availableIntakes.map(intake => (
                <option key={intake.id} value={intake.id.toString()}>
                  {intake.name} ({intake.year})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ marginRight: '0.5rem', fontWeight: '500', color: '#374151' }}>Mode:</label>
            <select 
              value={filterMode} 
              onChange={(e) => setFilterMode(e.target.value)}
              className="form-select"
              style={{ width: 'auto', minWidth: '120px' }}
            >
              <option value="all">All Modes</option>
              <option value="in-person">In-Person</option>
              <option value="online">Online</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>
        </div>
      </div>

      {/* Students Table */}
      <div className="admin-table">
        <table>
          <thead>
            <tr>
              <th>Student Details</th>
              <th>Contact Info</th>
              <th>Intake Program</th>
              <th>Status</th>
              <th>Learning Mode</th>
              <th>Application Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id}>
                <td>
                  <div style={{ fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>
                    {student.name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                    ID: {student.id}
                  </div>
                </td>
                <td>
                  <div style={{ fontSize: '0.875rem', color: '#374151', marginBottom: '0.25rem' }}>
                    <i className="fas fa-envelope" style={{ marginRight: '0.25rem', color: '#6b7280' }}></i>
                    {student.email}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#374151' }}>
                    <i className="fas fa-phone" style={{ marginRight: '0.25rem', color: '#6b7280' }}></i>
                    {student.phone}
                  </div>
                </td>
                <td>
                  <div style={{ fontWeight: '500', color: '#374151', fontSize: '0.875rem' }}>
                    {student.intakeName}
                  </div>
                </td>
                <td>
                  <select 
                    value={student.status}
                    onChange={(e) => handleStatusChange(student.id, e.target.value as Student['status'])}
                    style={{ 
                      padding: '0.25rem 0.5rem',
                      borderRadius: '0.375rem',
                      fontSize: '0.75rem',
                      fontWeight: '500',
                      backgroundColor: getStatusColor(student.status) + '20',
                      color: getStatusColor(student.status),
                      border: '1px solid ' + getStatusColor(student.status) + '40',
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
                  <select 
                    value={student.modeOfLearning}
                    onChange={(e) => handleModeChange(student.id, e.target.value as Student['modeOfLearning'])}
                    style={{ 
                      padding: '0.25rem 0.5rem',
                      borderRadius: '0.375rem',
                      fontSize: '0.75rem',
                      fontWeight: '500',
                      backgroundColor: getModeColor(student.modeOfLearning) + '20',
                      color: getModeColor(student.modeOfLearning),
                      border: '1px solid ' + getModeColor(student.modeOfLearning) + '40',
                      cursor: 'pointer'
                    }}
                  >
                    {modeOptions.map(mode => (
                      <option key={mode} value={mode}>
                        {getModeLabel(mode)}
                      </option>
                    ))}
                  </select>
                </td>
                <td style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                  <div>{new Date(student.applicationDate).toLocaleDateString()}</div>
                  <div style={{ fontSize: '0.75rem' }}>
                    Updated: {new Date(student.lastUpdated).toLocaleDateString()}
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
                      title="Edit Student"
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
                      title="View Details"
                    >
                      <i className="fas fa-eye"></i>
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
                      title="Delete Application"
                      onClick={() => handleDeleteStudent(student.id)}
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

      {/* Create Student Modal */}
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
              <i className="fas fa-user-plus" style={{ marginRight: '0.5rem' }}></i>
              Add New Student Application
            </h3>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              handleCreateStudent(formData);
            }}>
              <div className="form-group">
                <label className="form-label">
                  <i className="fas fa-user" style={{ marginRight: '0.5rem' }}></i>
                  Full Name
                </label>
                <input 
                  type="text" 
                  name="name" 
                  className="form-input" 
                  required 
                  placeholder="e.g., John Kamau"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">
                    <i className="fas fa-envelope" style={{ marginRight: '0.5rem' }}></i>
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    name="email" 
                    className="form-input" 
                    required 
                    placeholder="john@example.com"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <i className="fas fa-phone" style={{ marginRight: '0.5rem' }}></i>
                    Phone Number
                  </label>
                  <input 
                    type="tel" 
                    name="phone" 
                    className="form-input" 
                    required 
                    placeholder="+254 7XX XXX XXX"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">
                  <i className="fas fa-calendar-alt" style={{ marginRight: '0.5rem' }}></i>
                  Select Intake Program
                </label>
                <select name="intakeId" className="form-select" required>
                  <option value="">Choose an intake program</option>
                  {enrollmentIntakes.map(intake => (
                    <option key={intake.id} value={intake.id}>
                      {intake.name} ({intake.startMonth} - {intake.endMonth} {intake.year}) 
                      - {intake.capacity - intake.studentsEnrolled} spots available
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">
                    <i className="fas fa-clipboard-check" style={{ marginRight: '0.5rem' }}></i>
                    Application Status
                  </label>
                  <select name="status" className="form-select" required>
                    <option value="">Select Status</option>
                    <option value="pending">Pending Review</option>
                    <option value="enrolled">Enrolled</option>
                    <option value="declined">Declined</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <i className="fas fa-graduation-cap" style={{ marginRight: '0.5rem' }}></i>
                    Mode of Learning
                  </label>
                  <select name="modeOfLearning" className="form-select" required>
                    <option value="">Select Mode</option>
                    <option value="in-person">In-Person Classes</option>
                    <option value="online">Online Learning</option>
                    <option value="hybrid">Hybrid (Mixed)</option>
                  </select>
                </div>
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
                  <i className="fas fa-user-plus" style={{ marginRight: '0.5rem' }}></i>
                  Add Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}