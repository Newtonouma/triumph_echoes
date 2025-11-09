'use client';

import { useState } from 'react';

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
  enrollmentDate?: string;
  graduationDate?: string;
}

interface Staff {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: 'instructor' | 'admin' | 'coordinator' | 'assistant';
  status: 'active' | 'inactive' | 'on-leave';
  department: string;
  joinDate: string;
  lastLogin: string;
  specialization?: string;
}

type ViewMode = 'students' | 'staff';

export default function UserManagement() {
  const [viewMode, setViewMode] = useState<ViewMode>('students');
  
  // Student data (integrated from admissions)
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
      lastUpdated: '2024-09-01',
      enrollmentDate: '2024-09-01',
      graduationDate: '2024-11-30'
    },
    {
      id: 2,
      name: 'Sarah Mwangi',
      email: 'sarah.mwangi@gmail.com',
      phone: '+254 722 345 678',
      intakeId: 4,
      intakeName: 'Winter Teen Leadership Program',
      status: 'enrolled',
      modeOfLearning: 'online',
      applicationDate: '2024-10-20',
      lastUpdated: '2024-11-05',
      enrollmentDate: '2024-11-01'
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
      lastUpdated: '2024-11-05',
      enrollmentDate: '2024-11-05'
    },
    {
      id: 4,
      name: 'Grace Wanjiku',
      email: 'grace.w@outlook.com',
      phone: '+254 712 567 890',
      intakeId: 4,
      intakeName: 'Winter Teen Leadership Program',
      status: 'pending',
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
      lastUpdated: '2024-10-15',
      enrollmentDate: '2024-09-01'
    },
    {
      id: 6,
      name: 'Mary Njeri',
      email: 'mary.njeri@email.com',
      phone: '+254 756 789 012',
      intakeId: 3,
      intakeName: 'Fall Professional Presentation',
      status: 'enrolled',
      modeOfLearning: 'in-person',
      applicationDate: '2024-08-20',
      lastUpdated: '2024-09-01',
      enrollmentDate: '2024-09-01',
      graduationDate: '2024-11-30'
    }
  ]);

  // Staff data
  const [staff, setStaff] = useState<Staff[]>([
    {
      id: 1,
      name: 'Dr. Sarah Williams',
      email: 'sarah.williams@triumphechoes.com',
      phone: '+254 701 111 222',
      role: 'instructor',
      status: 'active',
      department: 'Public Speaking',
      joinDate: '2023-08-20',
      lastLogin: '2024-11-09',
      specialization: 'Youth Communication'
    },
    {
      id: 2,
      name: 'James Mutua',
      email: 'james.mutua@triumphechoes.com',
      phone: '+254 722 333 444',
      role: 'admin',
      status: 'active',
      department: 'Administration',
      joinDate: '2023-01-10',
      lastLogin: '2024-11-09'
    },
    {
      id: 3,
      name: 'Patricia Wangari',
      email: 'patricia.w@triumphechoes.com',
      phone: '+254 733 555 666',
      role: 'coordinator',
      status: 'active',
      department: 'Student Affairs',
      joinDate: '2023-06-15',
      lastLogin: '2024-11-08',
      specialization: 'Student Support'
    },
    {
      id: 4,
      name: 'Robert Kimani',
      email: 'robert.kimani@triumphechoes.com',
      phone: '+254 712 777 888',
      role: 'instructor',
      status: 'on-leave',
      department: 'Advanced Programs',
      joinDate: '2023-03-22',
      lastLogin: '2024-10-15',
      specialization: 'Executive Communication'
    },
    {
      id: 5,
      name: 'Lucy Achieng',
      email: 'lucy.achieng@triumphechoes.com',
      phone: '+254 745 999 000',
      role: 'assistant',
      status: 'active',
      department: 'Operations',
      joinDate: '2024-02-01',
      lastLogin: '2024-11-08'
    }
  ]);

  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [filterIntake, setFilterIntake] = useState<string>('all');

  const handleSelectItem = (itemId: number) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleSelectAll = () => {
    const currentData = viewMode === 'students' ? filteredStudents : filteredStaff;
    setSelectedItems(
      selectedItems.length === currentData.length 
        ? [] 
        : currentData.map(item => item.id)
    );
  };

  // Filter students
  const filteredStudents = students.filter(student => {
    const statusMatch = filterStatus === 'all' || student.status === filterStatus;
    const intakeMatch = filterIntake === 'all' || student.intakeName.includes(filterIntake);
    return statusMatch && intakeMatch;
  });

  // Filter staff
  const filteredStaff = staff.filter(staffMember => {
    const statusMatch = filterStatus === 'all' || staffMember.status === filterStatus;
    const roleMatch = filterRole === 'all' || staffMember.role === filterRole;
    return statusMatch && roleMatch;
  });

  // Get unique intakes for filtering
  const uniqueIntakes = [...new Set(students.map(s => s.intakeName))];

  const getStudentStatusColor = (status: string) => {
    switch (status) {
      case 'enrolled': return '#10b981';
      case 'pending': return '#f59e0b';
      case 'declined': return '#ef4444';
      case 'discontinued': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const getStaffStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#10b981';
      case 'inactive': return '#ef4444';
      case 'on-leave': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  const getStaffRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return '#dc2626';
      case 'instructor': return '#2563eb';
      case 'coordinator': return '#8b5cf6';
      case 'assistant': return '#16a34a';
      default: return '#6b7280';
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

  const handleStudentStatusChange = (studentId: number, newStatus: Student['status']) => {
    setStudents(prev => prev.map(student => 
      student.id === studentId 
        ? { ...student, status: newStatus, lastUpdated: new Date().toISOString().split('T')[0] }
        : student
    ));
  };

  const handleStaffStatusChange = (staffId: number, newStatus: Staff['status']) => {
    setStaff(prev => prev.map(staffMember => 
      staffMember.id === staffId 
        ? { ...staffMember, status: newStatus, lastLogin: new Date().toISOString().split('T')[0] }
        : staffMember
    ));
  };

  return (
    <div>
      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <h1 style={{ margin: 0, color: '#03111E' }}>
          <i className="fas fa-users" style={{ marginRight: '0.5rem' }}></i>
          {viewMode === 'students' ? 'Student Management' : 'Staff Management'}
        </h1>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          {/* View Mode Toggle */}
          <div style={{ display: 'flex', backgroundColor: '#f1f5f9', borderRadius: '0.5rem', padding: '0.25rem' }}>
            <button 
              onClick={() => {
                setViewMode('students');
                setSelectedItems([]);
                setFilterStatus('all');
                setFilterRole('all');
                setFilterIntake('all');
              }}
              style={{ 
                marginRight: '0.25rem',
                backgroundColor: viewMode === 'students' ? '#FC7423' : 'transparent',
                color: viewMode === 'students' ? 'white' : '#64748b',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '0.375rem',
                cursor: 'pointer'
              }}
            >
              <i className="fas fa-user-graduate" style={{ marginRight: '0.5rem' }}></i>
              Students
            </button>
            <button 
              onClick={() => {
                setViewMode('staff');
                setSelectedItems([]);
                setFilterStatus('all');
                setFilterRole('all');
                setFilterIntake('all');
              }}
              style={{ 
                backgroundColor: viewMode === 'staff' ? '#FC7423' : 'transparent',
                color: viewMode === 'staff' ? 'white' : '#64748b',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '0.375rem',
                cursor: 'pointer'
              }}
            >
              <i className="fas fa-chalkboard-teacher" style={{ marginRight: '0.5rem' }}></i>
              Staff
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      {viewMode === 'students' ? (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '1rem', 
          marginBottom: '2rem' 
        }}>
          <div className="dashboard-card" style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0' }}>
            <h3 style={{ color: '#15803d' }}>Enrolled Students</h3>
            <div className="value" style={{ color: '#15803d' }}>
              {students.filter(s => s.status === 'enrolled').length}
            </div>
          </div>
          <div className="dashboard-card" style={{ backgroundColor: '#fefce8', border: '1px solid #fde68a' }}>
            <h3 style={{ color: '#a16207' }}>Pending Applications</h3>
            <div className="value" style={{ color: '#a16207' }}>
              {students.filter(s => s.status === 'pending').length}
            </div>
          </div>
          <div className="dashboard-card" style={{ backgroundColor: '#f0f9ff', border: '1px solid #bae6fd' }}>
            <h3 style={{ color: '#0369a1' }}>Online Learners</h3>
            <div className="value" style={{ color: '#0369a1' }}>
              {students.filter(s => s.modeOfLearning === 'online').length}
            </div>
          </div>
          <div className="dashboard-card" style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
            <h3 style={{ color: '#475569' }}>Total Students</h3>
            <div className="value" style={{ color: '#475569' }}>
              {students.length}
            </div>
          </div>
        </div>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '1rem', 
          marginBottom: '2rem' 
        }}>
          <div className="dashboard-card" style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0' }}>
            <h3 style={{ color: '#15803d' }}>Active Staff</h3>
            <div className="value" style={{ color: '#15803d' }}>
              {staff.filter(s => s.status === 'active').length}
            </div>
          </div>
          <div className="dashboard-card" style={{ backgroundColor: '#f0f9ff', border: '1px solid #bae6fd' }}>
            <h3 style={{ color: '#0369a1' }}>Instructors</h3>
            <div className="value" style={{ color: '#0369a1' }}>
              {staff.filter(s => s.role === 'instructor').length}
            </div>
          </div>
          <div className="dashboard-card" style={{ backgroundColor: '#fef7ff', border: '1px solid #e9d5ff' }}>
            <h3 style={{ color: '#7c3aed' }}>Coordinators</h3>
            <div className="value" style={{ color: '#7c3aed' }}>
              {staff.filter(s => s.role === 'coordinator').length}
            </div>
          </div>
          <div className="dashboard-card" style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
            <h3 style={{ color: '#475569' }}>Total Staff</h3>
            <div className="value" style={{ color: '#475569' }}>
              {staff.length}
            </div>
          </div>
        </div>
      )}

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
              {viewMode === 'students' ? (
                <>
                  <option value="enrolled">Enrolled</option>
                  <option value="pending">Pending</option>
                  <option value="declined">Declined</option>
                  <option value="discontinued">Discontinued</option>
                </>
              ) : (
                <>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="on-leave">On Leave</option>
                </>
              )}
            </select>
          </div>
          
          {viewMode === 'students' ? (
            <div>
              <label style={{ marginRight: '0.5rem', fontWeight: '500', color: '#374151' }}>Intake:</label>
              <select 
                value={filterIntake} 
                onChange={(e) => setFilterIntake(e.target.value)}
                className="form-select"
                style={{ width: 'auto', minWidth: '200px' }}
              >
                <option value="all">All Intakes</option>
                {uniqueIntakes.map(intake => (
                  <option key={intake} value={intake}>{intake}</option>
                ))}
              </select>
            </div>
          ) : (
            <div>
              <label style={{ marginRight: '0.5rem', fontWeight: '500', color: '#374151' }}>Role:</label>
              <select 
                value={filterRole} 
                onChange={(e) => setFilterRole(e.target.value)}
                className="form-select"
                style={{ width: 'auto', minWidth: '140px' }}
              >
                <option value="all">All Roles</option>
                <option value="instructor">Instructor</option>
                <option value="admin">Admin</option>
                <option value="coordinator">Coordinator</option>
                <option value="assistant">Assistant</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Action Bar */}
      {selectedItems.length > 0 && (
        <div style={{ 
          background: '#f8fafc', 
          padding: '1rem', 
          borderRadius: '0.5rem', 
          marginBottom: '1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span style={{ fontWeight: '500', color: '#374151' }}>
            {selectedItems.length} {viewMode} selected
          </span>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="btn btn-secondary">
              <i className="fas fa-envelope" style={{ marginRight: '0.5rem' }}></i>
              Send Message
            </button>
            <button className="btn btn-secondary">
              <i className="fas fa-download" style={{ marginRight: '0.5rem' }}></i>
              Export
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      {viewMode === 'students' ? (
        <StudentsTable 
          students={filteredStudents}
          selectedItems={selectedItems}
          onSelectItem={handleSelectItem}
          onSelectAll={handleSelectAll}
          onStatusChange={handleStudentStatusChange}
          getStatusColor={getStudentStatusColor}
          getModeColor={getModeColor}
        />
      ) : (
        <StaffTable 
          staff={filteredStaff}
          selectedItems={selectedItems}
          onSelectItem={handleSelectItem}
          onSelectAll={handleSelectAll}
          onStatusChange={handleStaffStatusChange}
          getStatusColor={getStaffStatusColor}
          getRoleColor={getStaffRoleColor}
        />
      )}
    </div>
  );
}

// Students Table Component
function StudentsTable({ 
  students, 
  selectedItems, 
  onSelectItem, 
  onSelectAll, 
  onStatusChange,
  getStatusColor,
  getModeColor 
}: any) {
  return (
    <div className="admin-table">
      <table>
        <thead>
          <tr>
            <th>
              <input 
                type="checkbox" 
                checked={selectedItems.length === students.length && students.length > 0}
                onChange={onSelectAll}
              />
            </th>
            <th>Student Details</th>
            <th>Contact Information</th>
            <th>Intake Program</th>
            <th>Status</th>
            <th>Learning Mode</th>
            <th>Enrollment Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student: Student) => (
            <tr key={student.id}>
              <td>
                <input 
                  type="checkbox" 
                  checked={selectedItems.includes(student.id)}
                  onChange={() => onSelectItem(student.id)}
                />
              </td>
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
                  onChange={(e) => onStatusChange(student.id, e.target.value)}
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
                  <option value="pending">Pending</option>
                  <option value="enrolled">Enrolled</option>
                  <option value="declined">Declined</option>
                  <option value="discontinued">Discontinued</option>
                </select>
              </td>
              <td>
                <span style={{ 
                  padding: '0.25rem 0.5rem',
                  borderRadius: '0.375rem',
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  backgroundColor: getModeColor(student.modeOfLearning) + '20',
                  color: getModeColor(student.modeOfLearning)
                }}>
                  {student.modeOfLearning === 'in-person' ? 'In-Person' : 
                   student.modeOfLearning === 'online' ? 'Online' : 'Hybrid'}
                </span>
              </td>
              <td style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                {student.enrollmentDate ? new Date(student.enrollmentDate).toLocaleDateString() : 'N/A'}
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
                    title="View Student Profile"
                  >
                    <i className="fas fa-eye"></i>
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
                    title="Send Message"
                  >
                    <i className="fas fa-envelope"></i>
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
                    title="Remove Student"
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
  );
}

// Staff Table Component
function StaffTable({ 
  staff, 
  selectedItems, 
  onSelectItem, 
  onSelectAll, 
  onStatusChange,
  getStatusColor,
  getRoleColor 
}: any) {
  return (
    <div className="admin-table">
      <table>
        <thead>
          <tr>
            <th>
              <input 
                type="checkbox" 
                checked={selectedItems.length === staff.length && staff.length > 0}
                onChange={onSelectAll}
              />
            </th>
            <th>Staff Details</th>
            <th>Contact Information</th>
            <th>Role & Department</th>
            <th>Status</th>
            <th>Join Date</th>
            <th>Last Login</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {staff.map((staffMember: Staff) => (
            <tr key={staffMember.id}>
              <td>
                <input 
                  type="checkbox" 
                  checked={selectedItems.includes(staffMember.id)}
                  onChange={() => onSelectItem(staffMember.id)}
                />
              </td>
              <td>
                <div style={{ fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>
                  {staffMember.name}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                  {staffMember.specialization && `Specialization: ${staffMember.specialization}`}
                </div>
              </td>
              <td>
                <div style={{ fontSize: '0.875rem', color: '#374151', marginBottom: '0.25rem' }}>
                  <i className="fas fa-envelope" style={{ marginRight: '0.25rem', color: '#6b7280' }}></i>
                  {staffMember.email}
                </div>
                <div style={{ fontSize: '0.875rem', color: '#374151' }}>
                  <i className="fas fa-phone" style={{ marginRight: '0.25rem', color: '#6b7280' }}></i>
                  {staffMember.phone}
                </div>
              </td>
              <td>
                <div style={{ marginBottom: '0.25rem' }}>
                  <span style={{ 
                    padding: '0.25rem 0.5rem',
                    borderRadius: '0.375rem',
                    fontSize: '0.75rem',
                    fontWeight: '500',
                    backgroundColor: getRoleColor(staffMember.role) + '20',
                    color: getRoleColor(staffMember.role),
                    textTransform: 'capitalize'
                  }}>
                    {staffMember.role}
                  </span>
                </div>
                <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                  {staffMember.department}
                </div>
              </td>
              <td>
                <select 
                  value={staffMember.status}
                  onChange={(e) => onStatusChange(staffMember.id, e.target.value)}
                  style={{ 
                    padding: '0.25rem 0.5rem',
                    borderRadius: '0.375rem',
                    fontSize: '0.75rem',
                    fontWeight: '500',
                    backgroundColor: getStatusColor(staffMember.status) + '20',
                    color: getStatusColor(staffMember.status),
                    border: '1px solid ' + getStatusColor(staffMember.status) + '40',
                    cursor: 'pointer'
                  }}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="on-leave">On Leave</option>
                </select>
              </td>
              <td style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                {new Date(staffMember.joinDate).toLocaleDateString()}
              </td>
              <td style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                {staffMember.lastLogin !== 'Never' ? 
                  new Date(staffMember.lastLogin).toLocaleDateString() : 
                  'Never'
                }
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
                    title="View Staff Profile"
                  >
                    <i className="fas fa-eye"></i>
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
                    title="Edit Staff"
                  >
                    <i className="fas fa-edit"></i>
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
                    title="Remove Staff"
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
  );
}