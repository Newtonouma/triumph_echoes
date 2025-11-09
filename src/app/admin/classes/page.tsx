'use client';

import { useState } from 'react';

// Class interface
interface Class {
  id: number;
  title: string;
  programId: number;
  programName: string;
  venue: 'online' | 'physical';
  address: string; // URL for online, physical address for physical
  status: 'pending' | 'completed' | 'postponed' | 'canceled';
  createdAt: Date;
}

// Form data interface
interface ClassFormData {
  title: string;
  programId: string;
  venue: 'online' | 'physical';
  address: string;
  status: 'pending' | 'completed' | 'postponed' | 'canceled';
}

// Attendance interface
interface AttendanceRecord {
  id: number;
  classId: number;
  studentId: number;
  studentName: string;
  date: string;
  present: boolean;
}

// Student interface for attendance
interface Student {
  id: number;
  name: string;
  email: string;
  phone: string;
  studentId: string;
}

// Available programs (this would come from the programs/courses API in real implementation)
const availablePrograms = [
  { id: 1, name: "Youth Speaking Foundation" },
  { id: 2, name: "Teen Leadership Communication" },
  { id: 3, name: "Adult Communication Mastery" },
  { id: 4, name: "Personalized Executive Coaching" },
  { id: 5, name: "Corporate Training Programs" },
  { id: 6, name: "Public Speaking Masterclass" },
  { id: 7, name: "Debate and Argumentation Skills" },
  { id: 8, name: "Holiday Speaking Camps" }
];

// Sample students data (this would come from the students API in real implementation)
const sampleStudents: Student[] = [
  { id: 1, name: "Alice Johnson", email: "alice.johnson@email.com", phone: "+254712345678", studentId: "ST001A" },
  { id: 2, name: "Bob Smith", email: "bob.smith@email.com", phone: "+254723456789", studentId: "ST002B" },
  { id: 3, name: "Carol Davis", email: "carol.davis@email.com", phone: "+254734567890", studentId: "ST003C" },
  { id: 4, name: "David Wilson", email: "david.wilson@email.com", phone: "+254745678901", studentId: "ST004D" },
  { id: 5, name: "Eva Brown", email: "eva.brown@email.com", phone: "+254756789012", studentId: "ST005E" },
  { id: 6, name: "Frank Miller", email: "frank.miller@email.com", phone: "+254767890123", studentId: "ST006F" },
  { id: 7, name: "Grace Taylor", email: "grace.taylor@email.com", phone: "+254778901234", studentId: "ST007G" },
  { id: 8, name: "Henry Clark", email: "henry.clark@email.com", phone: "+254789012345", studentId: "ST008H" },
  { id: 9, name: "Ivy Anderson", email: "ivy.anderson@email.com", phone: "+254790123456", studentId: "ST009I" },
  { id: 10, name: "Jack Thomas", email: "jack.thomas@email.com", phone: "+254701234567", studentId: "ST010J" }
];

// Status styling helper
const getStatusStyle = (status: 'pending' | 'completed' | 'postponed' | 'canceled') => {
  switch (status) {
    case 'pending':
      return { 
        backgroundColor: '#ffc107', 
        color: '#333', 
        icon: 'clock' 
      };
    case 'completed':
      return { 
        backgroundColor: '#28a745', 
        color: 'white', 
        icon: 'check-circle' 
      };
    case 'postponed':
      return { 
        backgroundColor: '#fd7e14', 
        color: 'white', 
        icon: 'pause-circle' 
      };
    case 'canceled':
      return { 
        backgroundColor: '#dc3545', 
        color: 'white', 
        icon: 'times-circle' 
      };
    default:
      return { 
        backgroundColor: '#6c757d', 
        color: 'white', 
        icon: 'question-circle' 
      };
  }
};

export default function ClassesPage() {
  // View state management
  const [currentView, setCurrentView] = useState<'classes' | 'attendance'>('classes');
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [showAttendanceView, setShowAttendanceView] = useState(false);
  const [selectedAttendanceDate, setSelectedAttendanceDate] = useState<string>(new Date().toISOString().split('T')[0]);
  
  // Existing state
  const [classes, setClasses] = useState<Class[]>([
    {
      id: 1,
      title: "Beginner Youth Speaking - Morning Session",
      programId: 1,
      programName: "Youth Speaking Foundation",
      venue: "physical",
      address: "Triumph Echoes Academy, Westlands Center, 1st Floor, Nairobi",
      status: "pending",
      createdAt: new Date('2024-01-15')
    },
    {
      id: 2,
      title: "Teen Leadership Workshop - Weekend Intensive",
      programId: 2,
      programName: "Teen Leadership Communication",
      venue: "physical",
      address: "Triumph Echoes Academy, Westlands Center, 1st Floor, Nairobi",
      status: "completed",
      createdAt: new Date('2024-02-10')
    },
    {
      id: 3,
      title: "Professional Communication - Evening Class",
      programId: 3,
      programName: "Adult Communication Mastery",
      venue: "online",
      address: "https://meet.google.com/triumph-echoes-evening",
      status: "pending",
      createdAt: new Date('2024-03-05')
    },
    {
      id: 4,
      title: "Executive Coaching - VIP Session",
      programId: 4,
      programName: "Personalized Executive Coaching",
      venue: "physical",
      address: "Triumph Echoes Academy, Private Coaching Room, Westlands Center, Nairobi",
      status: "postponed",
      createdAt: new Date('2024-03-20')
    },
    {
      id: 5,
      title: "Corporate Team Building - Safaricom",
      programId: 5,
      programName: "Corporate Training Programs",
      venue: "physical",
      address: "Safaricom House, Waiyaki Way, Westlands, Nairobi",
      status: "canceled",
      createdAt: new Date('2024-04-01')
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<Class | null>(null);
  const [formData, setFormData] = useState<ClassFormData>({
    title: '',
    programId: '',
    venue: 'physical',
    address: '',
    status: 'pending'
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'completed' | 'postponed' | 'canceled'>('all');
  const [programSearchTerm, setProgramSearchTerm] = useState('');
  const [showProgramDropdown, setShowProgramDropdown] = useState(false);
  const [errors, setErrors] = useState<Partial<ClassFormData>>({});

  // Attendance management state
  const [attendanceDate, setAttendanceDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [classStudents, setClassStudents] = useState<Student[]>([]);
  
  // Sample students data
  const students: Student[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', studentId: 'ST001', phone: '+254712000001' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', studentId: 'ST002', phone: '+254712000002' },
    { id: 3, name: 'Michael Johnson', email: 'michael@example.com', studentId: 'ST003', phone: '+254712000003' },
    { id: 4, name: 'Emily Brown', email: 'emily@example.com', studentId: 'ST004', phone: '+254712000004' },
    { id: 5, name: 'David Wilson', email: 'david@example.com', studentId: 'ST005', phone: '+254712000005' },
    { id: 6, name: 'Sarah Davis', email: 'sarah@example.com', studentId: 'ST006', phone: '+254712000006' },
    { id: 7, name: 'Robert Miller', email: 'robert@example.com', studentId: 'ST007', phone: '+254712000007' },
    { id: 8, name: 'Lisa Garcia', email: 'lisa@example.com', studentId: 'ST008', phone: '+254712000008' },
    { id: 9, name: 'Thomas Anderson', email: 'thomas@example.com', studentId: 'ST009', phone: '+254712000009' },
    { id: 10, name: 'Jessica Martinez', email: 'jessica@example.com', studentId: 'ST010', phone: '+254712000010' }
  ];

  const filteredClasses = classes.filter(classItem => {
    const matchesSearch = classItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      classItem.programName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      classItem.address.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || classItem.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const filteredPrograms = availablePrograms.filter(program =>
    program.name.toLowerCase().includes(programSearchTerm.toLowerCase())
  );

  const validateForm = (): boolean => {
    const newErrors: Partial<ClassFormData> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Class title is required';
    }
    if (!formData.programId) {
      newErrors.programId = 'Program selection is required';
    }
    if (!formData.address.trim()) {
      newErrors.address = formData.venue === 'online' 
        ? 'Meeting link is required for online classes'
        : 'Physical address is required';
    } else if (formData.venue === 'online') {
      // Basic URL validation for online classes
      try {
        new URL(formData.address);
      } catch {
        newErrors.address = 'Please enter a valid URL for online classes';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    const selectedProgram = availablePrograms.find(p => p.id === parseInt(formData.programId));
    
    const classData = {
      title: formData.title.trim(),
      programId: parseInt(formData.programId),
      programName: selectedProgram?.name || '',
      venue: formData.venue,
      address: formData.address.trim(),
      status: formData.status,
      createdAt: new Date()
    };

    if (editingClass) {
      // Edit existing class
      setClasses(classes.map(classItem =>
        classItem.id === editingClass.id
          ? { ...classItem, ...classData }
          : classItem
      ));
    } else {
      // Add new class
      const newClass: Class = {
        id: Math.max(...classes.map(c => c.id), 0) + 1,
        ...classData
      };
      setClasses([...classes, newClass]);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      programId: '',
      venue: 'physical',
      address: '',
      status: 'pending'
    });
    setErrors({});
    setProgramSearchTerm('');
    setShowProgramDropdown(false);
    setEditingClass(null);
    setIsModalOpen(false);
  };

  const handleEdit = (classItem: Class) => {
    setEditingClass(classItem);
    setFormData({
      title: classItem.title,
      programId: classItem.programId.toString(),
      venue: classItem.venue,
      address: classItem.address,
      status: classItem.status
    });
    setProgramSearchTerm(classItem.programName);
    setErrors({});
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this class?')) {
      setClasses(classes.filter(classItem => classItem.id !== id));
    }
  };

  const openAddModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const handleProgramSelect = (program: { id: number; name: string }) => {
    setFormData({ ...formData, programId: program.id.toString() });
    setProgramSearchTerm(program.name);
    setShowProgramDropdown(false);
  };

  const handleVenueChange = (venue: 'online' | 'physical') => {
    setFormData({
      ...formData,
      venue,
      address: '' // Clear address when venue changes
    });
  };

  const getStatusBadge = (status: 'pending' | 'completed' | 'postponed' | 'canceled') => {
    const style = getStatusStyle(status);
    return (
      <div style={{
        backgroundColor: style.backgroundColor,
        color: style.color,
        padding: '4px 8px',
        borderRadius: '12px',
        fontSize: '12px',
        fontWeight: '600',
        textTransform: 'uppercase',
        display: 'flex',
        alignItems: 'center',
        gap: '4px'
      }}>
        <i className={`fas fa-${style.icon}`}></i>
        {status}
      </div>
    );
  };

  // Attendance management functions
  const handleClassSelect = (classItem: Class) => {
    setSelectedClass(classItem);
    setCurrentView('attendance');
    
    // Load students for this class (simulate API call)
    // In real implementation, this would filter students based on class enrollment
    setClassStudents(sampleStudents.slice(0, 8)); // Simulate 8 students per class
    
    // Load existing attendance for the selected date
    loadAttendanceForDate(classItem.id, selectedAttendanceDate);
  };

  const loadAttendanceForDate = (classId: number, date: string) => {
    // Simulate loading attendance records for the date
    // In real implementation, this would be an API call
    const existingRecords = attendanceRecords.filter(
      record => record.classId === classId && record.date === date
    );
    
    if (existingRecords.length === 0) {
      // Create initial attendance records for all students
      const initialRecords: AttendanceRecord[] = classStudents.map((student, index) => ({
        id: Date.now() + index,
        classId,
        studentId: student.id,
        studentName: student.name,
        date,
        present: false
      }));
      setAttendanceRecords(prev => [...prev, ...initialRecords]);
    }
  };

  const handleAttendanceToggle = (studentId: number, present: boolean) => {
    if (!selectedClass) return;
    
    setAttendanceRecords(prev => 
      prev.map(record => 
        record.classId === selectedClass.id && 
        record.studentId === studentId && 
        record.date === attendanceDate
          ? { ...record, present }
          : record
      )
    );
  };

  const handleDateChange = (newDate: string) => {
    setAttendanceDate(newDate);
    if (selectedClass) {
      loadAttendanceForDate(selectedClass.id, newDate);
    }
  };

  const saveAttendance = () => {
    // Simulate saving attendance to backend
    console.log('Saving attendance records:', attendanceRecords.filter(
      record => record.classId === selectedClass?.id && record.date === attendanceDate
    ));
    alert('Attendance saved successfully!');
  };

  const getCurrentAttendanceRecords = () => {
    if (!selectedClass) return [];
    return attendanceRecords.filter(
      record => record.classId === selectedClass.id && record.date === attendanceDate
    );
  };

  const getAttendanceStats = () => {
    const currentRecords = getCurrentAttendanceRecords();
    const present = currentRecords.filter(record => record.present).length;
    const total = currentRecords.length;
    return { present, absent: total - present, total };
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {currentView === 'classes' ? (
        // Classes Management View
        <div>
          {/* Header */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '30px',
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <div>
              <h1 style={{ margin: 0, color: '#333', fontSize: '28px', fontWeight: 'bold' }}>
                <i className="fas fa-chalkboard-teacher" style={{ marginRight: '10px', color: '#007bff' }}></i>
                Class Management
              </h1>
              <p style={{ margin: '5px 0 0 0', color: '#666' }}>
                Manage individual classes and their schedules. Click a class to manage attendance.
              </p>
            </div>
            <button
              onClick={openAddModal}
              style={{
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <i className="fas fa-plus"></i>
              Add Class
            </button>
          </div>

      {/* Search and Filters */}
      <div style={{ 
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        marginBottom: '20px'
      }}>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: '1', minWidth: '300px' }}>
            <input
              type="text"
              placeholder="Search classes by title, program, or venue..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e1e5e9',
                borderRadius: '6px',
                fontSize: '16px'
              }}
            />
          </div>
          <div style={{ minWidth: '180px' }}>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e1e5e9',
                borderRadius: '6px',
                fontSize: '14px',
                backgroundColor: 'white'
              }}
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="postponed">Postponed</option>
              <option value="canceled">Canceled</option>
            </select>
          </div>
          <div style={{ color: '#666', fontSize: '14px' }}>
            Found {filteredClasses.length} class{filteredClasses.length !== 1 ? 'es' : ''}
          </div>
        </div>
      </div>

      {/* Classes Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
        gap: '20px',
        marginBottom: '20px'
      }}>
          {filteredClasses.map(classItem => (
            <div 
              key={classItem.id} 
              onClick={() => handleClassSelect(classItem)}
              style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                padding: '20px',
                transition: 'transform 0.2s, box-shadow 0.2s',
                cursor: 'pointer',
                position: 'relative'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
              }}>
              
              {/* Click indicator */}
              <div style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                backgroundColor: '#007bff',
                color: 'white',
                padding: '4px 8px',
                borderRadius: '12px',
                fontSize: '10px',
                fontWeight: '600'
              }}>
                <i className="fas fa-mouse-pointer" style={{ marginRight: '4px' }}></i>
                CLICK FOR ATTENDANCE
              </div>            {/* Class Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
              <h3 style={{ margin: 0, color: '#333', fontSize: '18px', fontWeight: '600', flex: 1, marginRight: '10px' }}>
                {classItem.title}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end' }}>
                {/* Status Badge */}
                {getStatusBadge(classItem.status)}
                
                {/* Venue Badge */}
                <div style={{
                  backgroundColor: classItem.venue === 'online' ? '#17a2b8' : '#28a745',
                  color: 'white',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: '600',
                  textTransform: 'uppercase'
                }}>
                  {classItem.venue === 'online' ? (
                    <>
                      <i className="fas fa-video" style={{ marginRight: '4px' }}></i>
                      Online
                    </>
                  ) : (
                    <>
                      <i className="fas fa-map-marker-alt" style={{ marginRight: '4px' }}></i>
                      Physical
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Program Info */}
            <div style={{ marginBottom: '15px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <i className="fas fa-book" style={{ color: '#007bff', fontSize: '14px' }}></i>
                <span style={{ fontWeight: '600', color: '#333', fontSize: '14px' }}>Program:</span>
                <span style={{ color: '#666', fontSize: '14px' }}>{classItem.programName}</span>
              </div>
            </div>

            {/* Venue Details */}
            <div style={{ marginBottom: '15px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <i className={`fas ${classItem.venue === 'online' ? 'fa-link' : 'fa-map-marker-alt'}`} 
                   style={{ color: '#007bff', fontSize: '14px', marginTop: '2px' }}></i>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '600', color: '#333', fontSize: '14px', marginBottom: '4px' }}>
                    {classItem.venue === 'online' ? 'Meeting Link:' : 'Address:'}
                  </div>
                  {classItem.venue === 'online' ? (
                    <a 
                      href={classItem.address} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{
                        color: '#007bff',
                        textDecoration: 'none',
                        fontSize: '13px',
                        wordBreak: 'break-all'
                      }}
                    >
                      {classItem.address}
                    </a>
                  ) : (
                    <span style={{ color: '#666', fontSize: '13px', lineHeight: '1.4' }}>
                      {classItem.address}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Created Date */}
            <div style={{ 
              fontSize: '12px', 
              color: '#999', 
              marginBottom: '15px',
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}>
              <i className="fas fa-calendar-alt"></i>
              Created: {classItem.createdAt.toLocaleDateString()}
            </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(classItem);
                  }}
                  style={{
                    flex: 1,
                    backgroundColor: '#ffc107',
                    color: '#333',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '5px'
                  }}
                >
                  <i className="fas fa-edit"></i>
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(classItem.id);
                  }}
                  style={{
                    flex: 1,
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '5px'
                  }}
                >
                  <i className="fas fa-trash"></i>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredClasses.length === 0 && (
          <div style={{
            backgroundColor: 'white',
            padding: '60px 20px',
            borderRadius: '8px',
            textAlign: 'center',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <i className="fas fa-chalkboard-teacher" style={{ fontSize: '48px', color: '#ccc', marginBottom: '20px' }}></i>
            <h3 style={{ margin: '0 0 10px 0', color: '#666' }}>
              {searchTerm ? 'No classes found' : 'No classes available'}
            </h3>
            <p style={{ margin: 0, color: '#999' }}>
              {searchTerm 
                ? 'Try adjusting your search criteria' 
                : 'Start by adding your first class to the system'
              }
            </p>
          </div>
        )}
      </div>
      ) : (
        // Attendance Management View
        <div style={{ display: 'flex', height: 'calc(100vh - 40px)' }}>
          {/* Left Sidebar - Class Navigation */}
          <div style={{
            width: '300px',
            backgroundColor: 'white',
            borderRadius: '8px 0 0 8px',
            padding: '20px',
            overflowY: 'auto',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>Classes</h3>
              <button
                onClick={() => setCurrentView('classes')}
                style={{
                  backgroundColor: '#6c757d',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                ← Back to Classes
              </button>
            </div>
            
            {/* Class List */}
            {classes.map((cls) => (
              <div
                key={cls.id}
                onClick={() => handleClassSelect(cls)}
                style={{
                  padding: '15px',
                  margin: '10px 0',
                  backgroundColor: selectedClass?.id === cls.id ? '#007bff' : '#f8f9fa',
                  color: selectedClass?.id === cls.id ? 'white' : '#333',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  border: '1px solid #dee2e6',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ fontWeight: '600', marginBottom: '5px' }}>
                  {cls.title}
                </div>
                <div style={{ fontSize: '12px', opacity: 0.8 }}>
                  {cls.programName} • {cls.venue}
                </div>
                <div style={{ fontSize: '12px', opacity: 0.6, marginTop: '3px' }}>
                  Status: {cls.status}
                </div>
              </div>
            ))}
          </div>

          {/* Right Panel - Attendance Management */}
          <div style={{ 
            flex: 1, 
            backgroundColor: 'white', 
            borderRadius: '0 8px 8px 0',
            padding: '20px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            {selectedClass ? (
              <>
                <div style={{ marginBottom: '30px' }}>
                  <h2 style={{ margin: '0 0 10px 0', fontSize: '24px', fontWeight: '600' }}>
                    Attendance Management
                  </h2>
                  <p style={{ margin: 0, color: '#6c757d', fontSize: '16px' }}>
                    Class: {selectedClass.title} - {selectedClass.programName}
                  </p>
                </div>

                {/* Date Selection */}
                <div style={{ marginBottom: '30px' }}>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '8px', 
                    fontWeight: '600',
                    fontSize: '16px'
                  }}>
                    Select Date:
                  </label>
                  <input
                    type="date"
                    value={selectedAttendanceDate}
                    onChange={(e) => setSelectedAttendanceDate(e.target.value)}
                    style={{
                      width: '200px',
                      padding: '12px',
                      border: '2px solid #dee2e6',
                      borderRadius: '6px',
                      fontSize: '16px'
                    }}
                  />
                </div>

                {/* Students Attendance List */}
                <div style={{
                  backgroundColor: '#f8f9fa',
                  padding: '20px',
                  borderRadius: '8px',
                  maxHeight: '400px',
                  overflowY: 'auto'
                }}>
                  <h3 style={{ 
                    margin: '0 0 20px 0', 
                    fontSize: '18px', 
                    fontWeight: '600',
                    color: '#333'
                  }}>
                    Students ({students.length})
                  </h3>
                  
                  <div style={{ display: 'grid', gap: '15px' }}>
                    {students.map((student) => {
                      const isPresent = attendanceRecords.some(record => 
                        record.classId === selectedClass.id && 
                        record.studentId === student.id && 
                        record.date === selectedAttendanceDate
                      );

                      return (
                        <div
                          key={student.id}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '15px',
                            padding: '15px',
                            backgroundColor: 'white',
                            borderRadius: '8px',
                            border: '1px solid #dee2e6'
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={isPresent}
                            onChange={(e) => handleAttendanceToggle(student.id, e.target.checked)}
                            style={{
                              width: '18px',
                              height: '18px',
                              cursor: 'pointer'
                            }}
                          />
                          
                          <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: '600', fontSize: '16px', marginBottom: '3px' }}>
                              {student.name}
                            </div>
                            <div style={{ fontSize: '14px', color: '#6c757d' }}>
                              ID: {student.studentId} • {student.email}
                            </div>
                          </div>
                          
                          <div style={{
                            padding: '4px 12px',
                            borderRadius: '12px',
                            fontSize: '12px',
                            fontWeight: '600',
                            backgroundColor: isPresent ? '#d4edda' : '#f8d7da',
                            color: isPresent ? '#155724' : '#721c24'
                          }}>
                            {isPresent ? 'Present' : 'Absent'}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Save Attendance Button */}
                <div style={{ 
                  marginTop: '30px',
                  display: 'flex',
                  justifyContent: 'flex-end'
                }}>
                  <button
                    onClick={() => {
                      alert('Attendance saved successfully!');
                      // Here you would typically save to backend
                    }}
                    style={{
                      backgroundColor: '#28a745',
                      color: 'white',
                      border: 'none',
                      padding: '12px 24px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '16px',
                      fontWeight: '600'
                    }}
                  >
                    Save Attendance
                  </button>
                </div>
              </>
            ) : (
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                height: '100%',
                color: '#6c757d'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <i className="fas fa-chalkboard-teacher" style={{ fontSize: '48px', marginBottom: '20px' }}></i>
                  <h3>Select a class to manage attendance</h3>
                  <p>Choose a class from the sidebar to start marking attendance</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '30px',
            width: '90%',
            maxWidth: '600px',
            maxHeight: '90vh',
            overflow: 'auto'
          }}>
            <h2 style={{ margin: '0 0 20px 0', color: '#333' }}>
              {editingClass ? 'Edit Class' : 'Add New Class'}
            </h2>

            {/* Class Title */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600', color: '#333' }}>
                Class Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: `2px solid ${errors.title ? '#dc3545' : '#e1e5e9'}`,
                  borderRadius: '6px',
                  fontSize: '16px'
                }}
                placeholder="Enter class title"
              />
              {errors.title && (
                <div style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px' }}>
                  {errors.title}
                </div>
              )}
            </div>

            {/* Program Selection */}
            <div style={{ marginBottom: '20px', position: 'relative' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600', color: '#333' }}>
                Program *
              </label>
              <input
                type="text"
                value={programSearchTerm}
                onChange={(e) => {
                  setProgramSearchTerm(e.target.value);
                  setShowProgramDropdown(true);
                }}
                onFocus={() => setShowProgramDropdown(true)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: `2px solid ${errors.programId ? '#dc3545' : '#e1e5e9'}`,
                  borderRadius: '6px',
                  fontSize: '16px'
                }}
                placeholder="Search and select a program"
              />
              
              {/* Program Dropdown */}
              {showProgramDropdown && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  backgroundColor: 'white',
                  border: '2px solid #e1e5e9',
                  borderTop: 'none',
                  borderRadius: '0 0 6px 6px',
                  maxHeight: '200px',
                  overflowY: 'auto',
                  zIndex: 1000
                }}>
                  {filteredPrograms.map(program => (
                    <div
                      key={program.id}
                      onClick={() => handleProgramSelect(program)}
                      style={{
                        padding: '12px',
                        cursor: 'pointer',
                        borderBottom: '1px solid #f0f0f0'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                    >
                      {program.name}
                    </div>
                  ))}
                  {filteredPrograms.length === 0 && (
                    <div style={{ padding: '12px', color: '#666', textAlign: 'center' }}>
                      No programs found
                    </div>
                  )}
                </div>
              )}
              
              {errors.programId && (
                <div style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px' }}>
                  {errors.programId}
                </div>
              )}
            </div>

            {/* Status Selection */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600', color: '#333' }}>
                Class Status *
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as ClassFormData['status'] })}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e1e5e9',
                  borderRadius: '6px',
                  fontSize: '16px',
                  backgroundColor: 'white'
                }}
              >
                <option value="pending">
                  Pending
                </option>
                <option value="completed">
                  Completed
                </option>
                <option value="postponed">
                  Postponed
                </option>
                <option value="canceled">
                  Canceled
                </option>
              </select>
            </div>

            {/* Venue Selection */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600', color: '#333' }}>
                Venue Type *
              </label>
              <div style={{ display: 'flex', gap: '15px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    value="physical"
                    checked={formData.venue === 'physical'}
                    onChange={(e) => handleVenueChange(e.target.value as 'physical')}
                    style={{ marginRight: '5px' }}
                  />
                  <i className="fas fa-map-marker-alt" style={{ color: '#28a745' }}></i>
                  Physical Location
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    value="online"
                    checked={formData.venue === 'online'}
                    onChange={(e) => handleVenueChange(e.target.value as 'online')}
                    style={{ marginRight: '5px' }}
                  />
                  <i className="fas fa-video" style={{ color: '#17a2b8' }}></i>
                  Online Meeting
                </label>
              </div>
            </div>

            {/* Address/Link */}
            <div style={{ marginBottom: '30px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600', color: '#333' }}>
                {formData.venue === 'online' ? 'Meeting Link *' : 'Physical Address *'}
              </label>
              {formData.venue === 'online' ? (
                <input
                  type="url"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: `2px solid ${errors.address ? '#dc3545' : '#e1e5e9'}`,
                    borderRadius: '6px',
                    fontSize: '16px'
                  }}
                  placeholder="https://meet.google.com/your-meeting-link"
                />
              ) : (
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: `2px solid ${errors.address ? '#dc3545' : '#e1e5e9'}`,
                    borderRadius: '6px',
                    fontSize: '16px',
                    resize: 'vertical'
                  }}
                  placeholder="Enter the physical address where the class will be held"
                />
              )}
              {errors.address && (
                <div style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px' }}>
                  {errors.address}
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end' }}>
              <button
                onClick={resetForm}
                style={{
                  backgroundColor: '#6c757d',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                style={{
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: '600'
                }}
              >
                {editingClass ? 'Update Class' : 'Add Class'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Click outside to close dropdown */}
      {showProgramDropdown && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999
          }}
          onClick={() => setShowProgramDropdown(false)}
        />
      )}
    </div>
  );
}