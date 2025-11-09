'use client';

import { useState } from 'react';

// Course interface
interface Course {
  id: number;
  name: string;
  description: string;
  coverPhoto: string;
  fee: number;
  createdAt: Date;
}

// Form data interface
interface CourseFormData {
  name: string;
  description: string;
  coverPhoto: File | null;
  fee: string;
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([
    {
      id: 1,
      name: "Youth Speaking Foundation",
      description: "Building confidence in young speakers aged 6-12 through interactive games, storytelling, and presentation skills. Perfect foundation for lifelong communication excellence.",
      coverPhoto: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      fee: 15000.00,
      createdAt: new Date('2024-01-15')
    },
    {
      id: 2,
      name: "Teen Leadership Communication",
      description: "Empowering teenagers aged 13-17 with advanced speaking skills, leadership qualities, and debate techniques. Preparing future leaders and confident communicators.",
      coverPhoto: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      fee: 20000.00,
      createdAt: new Date('2024-02-10')
    },
    {
      id: 3,
      name: "Adult Communication Mastery",
      description: "Transforming professionals into confident speakers through intensive training. Master boardroom presentations, client meetings, and public speaking anxiety.",
      coverPhoto: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      fee: 30000.00,
      createdAt: new Date('2024-03-05')
    },
    {
      id: 4,
      name: "Personalized Executive Coaching",
      description: "One-on-one coaching for executives and entrepreneurs. Develop strategic communication skills that enhance career growth and long-term professional success.",
      coverPhoto: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      fee: 50000.00,
      createdAt: new Date('2024-03-20')
    },
    {
      id: 5,
      name: "Corporate Training Programs",
      description: "Comprehensive communication training for teams and organizations. Improve workplace communication, presentation skills, and team collaboration.",
      coverPhoto: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      fee: 75000.00,
      createdAt: new Date('2024-04-01')
    },
    {
      id: 6,
      name: "Public Speaking Masterclass",
      description: "Intensive workshop for overcoming stage fright and mastering public speaking. Learn storytelling, voice modulation, and audience engagement techniques.",
      coverPhoto: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      fee: 18000.00,
      createdAt: new Date('2024-04-15')
    },
    {
      id: 7,
      name: "Debate and Argumentation Skills",
      description: "Advanced course in logical reasoning, debate techniques, and persuasive communication. Perfect for students and professionals in law, politics, and business.",
      coverPhoto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      fee: 22000.00,
      createdAt: new Date('2024-05-01')
    },
    {
      id: 8,
      name: "Holiday Speaking Camps",
      description: "Fun and engaging speaking programs during school holidays. Children participate in drama, storytelling, and confidence-building activities.",
      coverPhoto: "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      fee: 12000.00,
      createdAt: new Date('2024-05-15')
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [formData, setFormData] = useState<CourseFormData>({
    name: '',
    description: '',
    coverPhoto: null,
    fee: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [errors, setErrors] = useState<Partial<Record<keyof CourseFormData, string>>>({});
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const filteredCourses = courses.filter(course =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof CourseFormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Program name is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (!formData.coverPhoto && !editingCourse) {
      newErrors.coverPhoto = 'Cover photo is required';
    }
    if (!formData.fee.trim()) {
      newErrors.fee = 'Fee is required';
    } else {
      const feeValue = parseFloat(formData.fee);
      if (isNaN(feeValue) || feeValue < 0) {
        newErrors.fee = 'Fee must be a valid positive number';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    // Create FormData for file upload
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name.trim());
    formDataToSend.append('description', formData.description.trim());
    formDataToSend.append('fee', formData.fee);
    
    if (formData.coverPhoto) {
      formDataToSend.append('coverPhoto', formData.coverPhoto);
    }

    try {
      // Simulate API call to backend
      console.log('Sending program data to backend...');
      
      // For demonstration, we'll create a local URL for the uploaded image
      let coverPhotoUrl = '';
      if (formData.coverPhoto) {
        coverPhotoUrl = URL.createObjectURL(formData.coverPhoto);
      }

      const courseData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        coverPhoto: coverPhotoUrl || (editingCourse ? editingCourse.coverPhoto : ''),
        fee: parseFloat(formData.fee),
        createdAt: new Date()
      };

      if (editingCourse) {
        // Edit existing course
        setCourses(courses.map(course =>
          course.id === editingCourse.id
            ? { ...course, ...courseData }
            : course
        ));
        console.log('Program updated successfully!');
      } else {
        // Add new course
        const newCourse: Course = {
          id: Math.max(...courses.map(c => c.id), 0) + 1,
          ...courseData
        };
        setCourses([...courses, newCourse]);
        console.log('Program added successfully!');
      }

      resetForm();
    } catch (error) {
      console.error('Error saving program:', error);
      alert('Failed to save program. Please try again.');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      coverPhoto: null,
      fee: ''
    });
    setErrors({});
    setImagePreview(null);
    setEditingCourse(null);
    setIsModalOpen(false);
  };

  const handleEdit = (course: Course) => {
    setEditingCourse(course);
    setFormData({
      name: course.name,
      description: course.description,
      coverPhoto: null, // File input will be empty for edit
      fee: course.fee.toString()
    });
    setImagePreview(course.coverPhoto); // Show current image
    setErrors({});
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this program?')) {
      setCourses(courses.filter(course => course.id !== id));
    }
  };

  const openAddModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file');
        return;
      }
      
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      setFormData({ ...formData, coverPhoto: file });
      
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
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
            <i className="fas fa-microphone" style={{ marginRight: '10px', color: '#007bff' }}></i>
            Program Management
          </h1>
          <p style={{ margin: '5px 0 0 0', color: '#666' }}>
            Manage your academy's speaking and communication programs
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
          Add Program
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
              placeholder="Search programs by name or description..."
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
          <div style={{ color: '#666', fontSize: '14px' }}>
            Found {filteredCourses.length} program{filteredCourses.length !== 1 ? 's' : ''}
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: '20px',
        marginBottom: '20px'
      }}>
        {filteredCourses.map(course => (
          <div key={course.id} style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            overflow: 'hidden',
            transition: 'transform 0.2s, box-shadow 0.2s'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
          }}>
            {/* Cover Photo */}
            <div style={{
              height: '200px',
              backgroundImage: course.coverPhoto ? `url(${course.coverPhoto})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundColor: '#f0f2f5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}>
              {!course.coverPhoto && (
                <i className="fas fa-image" style={{ fontSize: '48px', color: '#ccc' }}></i>
              )}
              {course.coverPhoto && (
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  backgroundColor: 'rgba(0,0,0,0.7)',
                  color: 'white',
                  padding: '5px 10px',
                  borderRadius: '12px',
                  fontSize: '12px'
                }}>
                  <i className="fas fa-image" style={{ marginRight: '5px' }}></i>
                  Program Image
                </div>
              )}
            </div>
            
            {/* Course Content */}
            <div style={{ padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <h3 style={{ margin: 0, color: '#333', fontSize: '20px', fontWeight: '600' }}>
                  {course.name}
                </h3>
                <div style={{
                  backgroundColor: '#28a745',
                  color: 'white',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '14px',
                  fontWeight: '600'
                }}>
                  KES {course.fee.toLocaleString('en-KE')}
                </div>
              </div>
              
              <p style={{ 
                margin: '0 0 15px 0', 
                color: '#666',
                lineHeight: '1.5',
                fontSize: '14px',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}>
                {course.description}
              </p>
              
              <div style={{ 
                fontSize: '12px', 
                color: '#999', 
                marginBottom: '15px',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}>
                <i className="fas fa-calendar-alt"></i>
                Created: {course.createdAt.toLocaleDateString()}
              </div>
              
              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => handleEdit(course)}
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
                  onClick={() => handleDelete(course.id)}
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
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredCourses.length === 0 && (
        <div style={{
          backgroundColor: 'white',
          padding: '60px 20px',
          borderRadius: '8px',
          textAlign: 'center',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <i className="fas fa-book" style={{ fontSize: '48px', color: '#ccc', marginBottom: '20px' }}></i>
          <h3 style={{ margin: '0 0 10px 0', color: '#666' }}>
            {searchTerm ? 'No programs found' : 'No programs available'}
          </h3>
          <p style={{ margin: 0, color: '#999' }}>
            {searchTerm 
              ? 'Try adjusting your search criteria' 
              : 'Start by adding your first program to the academy'
            }
          </p>
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
              {editingCourse ? 'Edit Program' : 'Add New Program'}
            </h2>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600', color: '#333' }}>
                Program Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: `2px solid ${errors.name ? '#dc3545' : '#e1e5e9'}`,
                  borderRadius: '6px',
                  fontSize: '16px'
                }}
                placeholder="Enter program name"
              />
              {errors.name && (
                <div style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px' }}>
                  {errors.name}
                </div>
              )}
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600', color: '#333' }}>
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: `2px solid ${errors.description ? '#dc3545' : '#e1e5e9'}`,
                  borderRadius: '6px',
                  fontSize: '16px',
                  resize: 'vertical'
                }}
                placeholder="Enter program description"
              />
              {errors.description && (
                <div style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px' }}>
                  {errors.description}
                </div>
              )}
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600', color: '#333' }}>
                Cover Photo *
              </label>
              
              {/* Image Preview */}
              {imagePreview && (
                <div style={{ marginBottom: '15px' }}>
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    style={{
                      width: '100%',
                      maxWidth: '300px',
                      height: '150px',
                      objectFit: 'cover',
                      borderRadius: '6px',
                      border: '2px solid #e1e5e9'
                    }}
                  />
                </div>
              )}
              
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: `2px solid ${errors.coverPhoto ? '#dc3545' : '#e1e5e9'}`,
                  borderRadius: '6px',
                  fontSize: '16px',
                  backgroundColor: 'white'
                }}
              />
              <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                Accepted formats: JPEG, PNG, GIF. Max size: 5MB
              </div>
              {errors.coverPhoto && (
                <div style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px' }}>
                  {errors.coverPhoto}
                </div>
              )}
            </div>

            <div style={{ marginBottom: '30px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600', color: '#333' }}>
                Program Fee (KES) *
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.fee}
                onChange={(e) => setFormData({ ...formData, fee: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: `2px solid ${errors.fee ? '#dc3545' : '#e1e5e9'}`,
                  borderRadius: '6px',
                  fontSize: '16px'
                }}
                placeholder="15000"
              />
              {errors.fee && (
                <div style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px' }}>
                  {errors.fee}
                </div>
              )}
            </div>

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
                {editingCourse ? 'Update Program' : 'Add Program'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}