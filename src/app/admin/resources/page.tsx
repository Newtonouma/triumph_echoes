'use client';

import { useState } from 'react';

// Resource interface
interface Resource {
  id: number;
  title: string;
  description: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  fileUrl: string;
  createdAt: Date;
}

// Form data interface
interface ResourceFormData {
  title: string;
  description: string;
  file: File | null;
}

// Errors interface  
interface ResourceFormErrors {
  title?: string;
  description?: string;
  file?: string;
}

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([
    {
      id: 1,
      title: "Public Speaking Guidelines",
      description: "Comprehensive guide for effective public speaking techniques and best practices for beginners.",
      fileName: "public_speaking_guidelines.pdf",
      fileSize: 2450000, // 2.45 MB
      fileType: "application/pdf",
      fileUrl: "/resources/public_speaking_guidelines.pdf",
      createdAt: new Date('2024-01-15')
    },
    {
      id: 2,
      title: "Voice Modulation Exercises",
      description: "Audio exercises to help students practice voice modulation and pronunciation techniques.",
      fileName: "voice_exercises.mp3",
      fileSize: 8900000, // 8.9 MB
      fileType: "audio/mpeg",
      fileUrl: "/resources/voice_exercises.mp3",
      createdAt: new Date('2024-02-10')
    },
    {
      id: 3,
      title: "Debate Preparation Worksheet",
      description: "Structured worksheet to help students prepare for debates with argument mapping and research guidelines.",
      fileName: "debate_worksheet.docx",
      fileSize: 450000, // 450 KB
      fileType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      fileUrl: "/resources/debate_worksheet.docx",
      createdAt: new Date('2024-03-05')
    },
    {
      id: 4,
      title: "Presentation Templates Collection",
      description: "Professional PowerPoint templates designed for various types of presentations and speaking engagements.",
      fileName: "presentation_templates.zip",
      fileSize: 15600000, // 15.6 MB
      fileType: "application/zip",
      fileUrl: "/resources/presentation_templates.zip",
      createdAt: new Date('2024-03-20')
    },
    {
      id: 5,
      title: "Communication Skills Assessment",
      description: "Self-assessment tool for students to evaluate their current communication skills and identify areas for improvement.",
      fileName: "skills_assessment.pdf",
      fileSize: 890000, // 890 KB
      fileType: "application/pdf",
      fileUrl: "/resources/skills_assessment.pdf",
      createdAt: new Date('2024-04-01')
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);
  const [formData, setFormData] = useState<ResourceFormData>({
    title: '',
    description: '',
    file: null
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [errors, setErrors] = useState<ResourceFormErrors>({});
  const [uploading, setUploading] = useState(false);

  const filteredResources = resources.filter(resource =>
    resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.fileName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const validateForm = (): boolean => {
    const newErrors: ResourceFormErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Resource title is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (!formData.file && !editingResource) {
      newErrors.file = 'File is required for new resources';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setUploading(true);

    try {
      // Create FormData for file upload
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title.trim());
      formDataToSend.append('description', formData.description.trim());
      
      if (formData.file) {
        formDataToSend.append('file', formData.file);
      }

      // Simulate API call to backend
      console.log('Uploading resource to backend...');
      
      // For demonstration, we'll create a local URL for the uploaded file
      let fileUrl = '';
      let fileName = '';
      let fileSize = 0;
      let fileType = '';
      
      if (formData.file) {
        fileUrl = URL.createObjectURL(formData.file);
        fileName = formData.file.name;
        fileSize = formData.file.size;
        fileType = formData.file.type;
      }

      const resourceData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        fileName: fileName || (editingResource ? editingResource.fileName : ''),
        fileSize: fileSize || (editingResource ? editingResource.fileSize : 0),
        fileType: fileType || (editingResource ? editingResource.fileType : ''),
        fileUrl: fileUrl || (editingResource ? editingResource.fileUrl : ''),
        createdAt: new Date()
      };

      if (editingResource) {
        // Edit existing resource
        setResources(resources.map(resource =>
          resource.id === editingResource.id
            ? { ...resource, ...resourceData }
            : resource
        ));
        console.log('Resource updated successfully!');
      } else {
        // Add new resource
        const newResource: Resource = {
          id: Math.max(...resources.map(r => r.id), 0) + 1,
          ...resourceData
        };
        setResources([...resources, newResource]);
        console.log('Resource uploaded successfully!');
      }

      resetForm();
    } catch (error) {
      console.error('Error saving resource:', error);
      alert('Failed to save resource. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      file: null
    });
    setErrors({});
    setEditingResource(null);
    setIsModalOpen(false);
    setUploading(false);
  };

  const handleEdit = (resource: Resource) => {
    setEditingResource(resource);
    setFormData({
      title: resource.title,
      description: resource.description,
      file: null // File input will be empty for edit
    });
    setErrors({});
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this resource?')) {
      setResources(resources.filter(resource => resource.id !== id));
    }
  };

  const openAddModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file size (50MB max)
      if (file.size > 50 * 1024 * 1024) {
        alert('File size should be less than 50MB');
        return;
      }

      setFormData({ ...formData, file });
      
      // Clear any previous file error
      if (errors.file) {
        setErrors({ ...errors, file: undefined });
      }
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileType: string): string => {
    if (fileType.includes('pdf')) return 'fas fa-file-pdf';
    if (fileType.includes('word') || fileType.includes('document')) return 'fas fa-file-word';
    if (fileType.includes('excel') || fileType.includes('sheet')) return 'fas fa-file-excel';
    if (fileType.includes('powerpoint') || fileType.includes('presentation')) return 'fas fa-file-powerpoint';
    if (fileType.includes('image')) return 'fas fa-file-image';
    if (fileType.includes('video')) return 'fas fa-file-video';
    if (fileType.includes('audio')) return 'fas fa-file-audio';
    if (fileType.includes('zip') || fileType.includes('archive')) return 'fas fa-file-archive';
    return 'fas fa-file';
  };

  const getFileColor = (fileType: string): string => {
    if (fileType.includes('pdf')) return '#dc3545';
    if (fileType.includes('word') || fileType.includes('document')) return '#007bff';
    if (fileType.includes('excel') || fileType.includes('sheet')) return '#28a745';
    if (fileType.includes('powerpoint') || fileType.includes('presentation')) return '#fd7e14';
    if (fileType.includes('image')) return '#6f42c1';
    if (fileType.includes('video')) return '#e83e8c';
    if (fileType.includes('audio')) return '#20c997';
    if (fileType.includes('zip') || fileType.includes('archive')) return '#ffc107';
    return '#6c757d';
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
            <i className="fas fa-folder-open" style={{ marginRight: '10px', color: '#007bff' }}></i>
            Resources Management
          </h1>
          <p style={{ margin: '5px 0 0 0', color: '#666' }}>
            Manage educational resources and downloadable materials
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
          Add Resource
        </button>
      </div>

      {/* Search */}
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
              placeholder="Search resources by title, description, or filename..."
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
            Found {filteredResources.length} resource{filteredResources.length !== 1 ? 's' : ''}
          </div>
        </div>
      </div>

      {/* Resources Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
        gap: '20px',
        marginBottom: '20px'
      }}>
        {filteredResources.map(resource => (
          <div key={resource.id} style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            padding: '20px',
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
            
            {/* Resource Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
              <h3 style={{ margin: 0, color: '#333', fontSize: '18px', fontWeight: '600', flex: 1, marginRight: '10px' }}>
                {resource.title}
              </h3>
              <div style={{
                backgroundColor: getFileColor(resource.fileType),
                color: 'white',
                padding: '4px 8px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <i className={getFileIcon(resource.fileType)}></i>
                {resource.fileType.split('/').pop()?.toUpperCase() || 'FILE'}
              </div>
            </div>

            {/* Description */}
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
              {resource.description}
            </p>

            {/* File Info */}
            <div style={{ marginBottom: '15px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <i className="fas fa-file" style={{ color: '#007bff', fontSize: '14px' }}></i>
                <span style={{ fontWeight: '600', color: '#333', fontSize: '14px' }}>Filename:</span>
                <span style={{ color: '#666', fontSize: '14px', wordBreak: 'break-all' }}>{resource.fileName}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <i className="fas fa-weight-hanging" style={{ color: '#007bff', fontSize: '14px' }}></i>
                <span style={{ fontWeight: '600', color: '#333', fontSize: '14px' }}>Size:</span>
                <span style={{ color: '#666', fontSize: '14px' }}>{formatFileSize(resource.fileSize)}</span>
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
              Uploaded: {resource.createdAt.toLocaleDateString()}
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <a
                href={resource.fileUrl}
                download={resource.fileName}
                style={{
                  flex: 1,
                  backgroundColor: '#17a2b8',
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
                  gap: '5px',
                  textDecoration: 'none'
                }}
              >
                <i className="fas fa-download"></i>
                Download
              </a>
              <button
                onClick={() => handleEdit(resource)}
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
                onClick={() => handleDelete(resource.id)}
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
      {filteredResources.length === 0 && (
        <div style={{
          backgroundColor: 'white',
          padding: '60px 20px',
          borderRadius: '8px',
          textAlign: 'center',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <i className="fas fa-folder-open" style={{ fontSize: '48px', color: '#ccc', marginBottom: '20px' }}></i>
          <h3 style={{ margin: '0 0 10px 0', color: '#666' }}>
            {searchTerm ? 'No resources found' : 'No resources available'}
          </h3>
          <p style={{ margin: 0, color: '#999' }}>
            {searchTerm 
              ? 'Try adjusting your search criteria' 
              : 'Start by uploading your first educational resource'
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
              {editingResource ? 'Edit Resource' : 'Add New Resource'}
            </h2>

            {/* Title */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600', color: '#333' }}>
                Resource Title *
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
                placeholder="Enter resource title"
              />
              {errors.title && (
                <div style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px' }}>
                  {errors.title}
                </div>
              )}
            </div>

            {/* Description */}
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
                placeholder="Enter resource description"
              />
              {errors.description && (
                <div style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px' }}>
                  {errors.description}
                </div>
              )}
            </div>

            {/* File Upload */}
            <div style={{ marginBottom: '30px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600', color: '#333' }}>
                File {!editingResource && '*'}
              </label>
              
              {/* Current file info for editing */}
              {editingResource && (
                <div style={{
                  backgroundColor: '#f8f9fa',
                  border: '1px solid #dee2e6',
                  borderRadius: '6px',
                  padding: '12px',
                  marginBottom: '10px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <i className={getFileIcon(editingResource.fileType)} style={{ color: getFileColor(editingResource.fileType) }}></i>
                    <span style={{ fontSize: '14px', fontWeight: '600' }}>Current file:</span>
                    <span style={{ fontSize: '14px' }}>{editingResource.fileName}</span>
                    <span style={{ fontSize: '12px', color: '#666' }}>({formatFileSize(editingResource.fileSize)})</span>
                  </div>
                </div>
              )}
              
              <input
                type="file"
                onChange={handleFileChange}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: `2px solid ${errors.file ? '#dc3545' : '#e1e5e9'}`,
                  borderRadius: '6px',
                  fontSize: '16px',
                  backgroundColor: 'white'
                }}
              />
              
              {/* File info */}
              {formData.file && (
                <div style={{
                  backgroundColor: '#e7f3ff',
                  border: '1px solid #b3d7ff',
                  borderRadius: '6px',
                  padding: '10px',
                  marginTop: '10px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <i className={getFileIcon(formData.file.type)} style={{ color: getFileColor(formData.file.type) }}></i>
                    <span style={{ fontSize: '14px', fontWeight: '600' }}>Selected:</span>
                    <span style={{ fontSize: '14px' }}>{formData.file.name}</span>
                    <span style={{ fontSize: '12px', color: '#666' }}>({formatFileSize(formData.file.size)})</span>
                  </div>
                </div>
              )}
              
              <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                Supported formats: PDF, DOC, DOCX, PPT, PPTX, XLS, XLSX, ZIP, MP3, MP4, images. Max size: 50MB
              </div>
              {errors.file && (
                <div style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px' }}>
                  {errors.file}
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end' }}>
              <button
                onClick={resetForm}
                disabled={uploading}
                style={{
                  backgroundColor: '#6c757d',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '6px',
                  cursor: uploading ? 'not-allowed' : 'pointer',
                  fontSize: '16px',
                  opacity: uploading ? 0.6 : 1
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={uploading}
                style={{
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '6px',
                  cursor: uploading ? 'not-allowed' : 'pointer',
                  fontSize: '16px',
                  fontWeight: '600',
                  opacity: uploading ? 0.6 : 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                {uploading ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    {editingResource ? 'Updating...' : 'Uploading...'}
                  </>
                ) : (
                  <>
                    {editingResource ? 'Update Resource' : 'Upload Resource'}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}