'use client';

import { useState } from 'react';
import { heroData, aboutUsData, programsData, testimonialsData, footerData } from '@/data';

type ContentSection = 'hero' | 'about' | 'programs' | 'testimonials' | 'footer';

// Enhanced testimonial interface
interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  email?: string;
  phone?: string;
  approved: boolean;
  featured: boolean;
  submittedDate: Date;
  approvedDate?: Date;
  reviewNotes?: string;
}

export default function ContentManagement() {
  const [activeSection, setActiveSection] = useState<ContentSection>('hero');
  const [isEditing, setIsEditing] = useState(false);
  
  // Enhanced testimonials state
  const [testimonials, setTestimonials] = useState<Testimonial[]>([
    {
      id: 1,
      name: "Sarah Kimani",
      role: "University Student",
      content: "Triumph Echoes Academy completely transformed my confidence. I went from being terrified of speaking in class to leading student debates. The instructors are incredibly supportive!",
      rating: 5,
      email: "sarah.kimani@email.com",
      phone: "+254712345678",
      approved: true,
      featured: true,
      submittedDate: new Date('2024-09-15'),
      approvedDate: new Date('2024-09-16')
    },
    {
      id: 2,
      name: "Michael Ochieng",
      role: "Corporate Manager",
      content: "The Adult Communication Mastery program gave me the skills I needed to excel in my leadership role. My presentations are now clear, engaging, and impactful.",
      rating: 5,
      email: "michael.ochieng@email.com",
      approved: true,
      featured: true,
      submittedDate: new Date('2024-10-02'),
      approvedDate: new Date('2024-10-03')
    },
    {
      id: 3,
      name: "Grace Wanjiku",
      role: "High School Student",
      content: "I joined the Teen Leadership program and it was amazing! I learned so much about confidence and leadership. Now I'm the head of our school's debate club.",
      rating: 5,
      email: "grace.wanjiku@email.com",
      approved: true,
      featured: false,
      submittedDate: new Date('2024-10-20'),
      approvedDate: new Date('2024-10-21')
    },
    {
      id: 4,
      name: "John Doe",
      role: "Student",
      content: "This academy is okay I guess. The classes are fine but I expected more from the instructors. Maybe it will get better.",
      rating: 3,
      email: "john.doe@email.com",
      approved: false,
      featured: false,
      submittedDate: new Date('2024-11-08'),
      reviewNotes: "Needs review - lukewarm feedback"
    },
    {
      id: 5,
      name: "Jane Muthoni",
      role: "Business Owner",
      content: "Outstanding program! The personalized coaching helped me improve my client presentations dramatically. My business has grown significantly since I started applying what I learned. Highly recommend!",
      rating: 5,
      email: "jane.muthoni@email.com",
      phone: "+254701234567",
      approved: false,
      featured: false,
      submittedDate: new Date('2024-11-09'),
      reviewNotes: "Pending approval - excellent feedback"
    }
  ]);

  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [testimonialFilter, setTestimonialFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  const sections = [
    { id: 'hero' as ContentSection, name: 'Homepage Banner', icon: 'bullseye' },
    { id: 'about' as ContentSection, name: 'About Our Academy', icon: 'users' },
    { id: 'programs' as ContentSection, name: 'Classes & Programs', icon: 'graduation-cap' },
    { id: 'testimonials' as ContentSection, name: 'Testimonials & Reviews', icon: 'comments' },
    { id: 'footer' as ContentSection, name: 'Contact Information', icon: 'phone' },
  ];

  const handleSave = () => {
    // Here you would typically save to a database or API
    setIsEditing(false);
    alert('Changes saved successfully!');
  };

  // Testimonial management functions
  const handleApproveTestimonial = (id: number, approved: boolean, reviewNotes?: string) => {
    setTestimonials(prev => prev.map(testimonial => 
      testimonial.id === id 
        ? { 
            ...testimonial, 
            approved, 
            approvedDate: approved ? new Date() : undefined,
            reviewNotes 
          }
        : testimonial
    ));
    setShowApprovalModal(false);
    setSelectedTestimonial(null);
  };

  const handleToggleFeatured = (id: number) => {
    setTestimonials(prev => prev.map(testimonial => 
      testimonial.id === id 
        ? { ...testimonial, featured: !testimonial.featured }
        : testimonial
    ));
  };

  const handleDeleteTestimonial = (id: number) => {
    if (confirm('Are you sure you want to delete this testimonial? This action cannot be undone.')) {
      setTestimonials(prev => prev.filter(testimonial => testimonial.id !== id));
    }
  };

  const openApprovalModal = (testimonial: Testimonial) => {
    setSelectedTestimonial(testimonial);
    setShowApprovalModal(true);
  };

  const getFilteredTestimonials = () => {
    switch (testimonialFilter) {
      case 'pending':
        return testimonials.filter(t => !t.approved);
      case 'approved':
        return testimonials.filter(t => t.approved);
      case 'rejected':
        return testimonials.filter(t => t.approved === false && t.reviewNotes?.includes('rejected'));
      default:
        return testimonials;
    }
  };

  const renderHeroEditor = () => (
    <div className="admin-form">
      <h2 style={{ marginBottom: '1.5rem', color: '#03111E' }}>Edit Homepage Banner</h2>
      <p style={{ marginBottom: '1.5rem', color: '#6b7280', fontSize: '0.9rem' }}>
        This is the first thing visitors see when they visit your website. Make it compelling and welcoming!
      </p>
      
      <div className="form-group">
        <label className="form-label">Main Headline</label>
        <p style={{ fontSize: '0.8rem', color: '#6b7280', margin: '0 0 0.5rem 0' }}>
          This is the big, bold text that grabs attention
        </p>
        <input 
          type="text" 
          className="form-input" 
          placeholder="Enter your main headline"
          disabled={!isEditing}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Subtitle Description</label>
        <p style={{ fontSize: '0.8rem', color: '#6b7280', margin: '0 0 0.5rem 0' }}>
          A brief description that explains what your academy offers
        </p>
        <textarea 
          className="form-textarea" 
          placeholder="Enter your subtitle description"
          disabled={!isEditing}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Main Button Text</label>
        <p style={{ fontSize: '0.8rem', color: '#6b7280', margin: '0 0 0.5rem 0' }}>
          Text for the primary action button (usually enrollment or contact)
        </p>
        <input 
          type="text" 
          className="form-input" 
          placeholder="Enter primary button text"
          disabled={!isEditing}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Secondary Button Text</label>
        <p style={{ fontSize: '0.8rem', color: '#6b7280', margin: '0 0 0.5rem 0' }}>
          Text for the secondary action button (usually learn more)
        </p>
        <input 
          type="text" 
          className="form-input" 
          placeholder="Enter secondary button text"
          disabled={!isEditing}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        {heroData.stats.map((stat, index) => (
          <div key={index}>
            <div className="form-group">
              <label className="form-label">Stat {index + 1} - Number</label>
              <input 
                type="text" 
                className="form-input" 
                defaultValue={stat.number}
                disabled={!isEditing}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Stat {index + 1} - Label</label>
              <input 
                type="text" 
                className="form-input" 
                defaultValue={stat.label}
                disabled={!isEditing}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAboutEditor = () => (
    <div className="admin-form">
      <h2 style={{ marginBottom: '1.5rem', color: '#03111E' }}>Edit About Us Section</h2>
      
      <div className="form-group">
        <label className="form-label">Main Title</label>
        <input 
          type="text" 
          className="form-input" 
          placeholder="Enter main title"
          disabled={!isEditing}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Description</label>
        <textarea 
          className="form-textarea" 
          placeholder="Enter description"
          disabled={!isEditing}
          style={{ minHeight: '150px' }}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Mission Statement</label>
        <textarea 
          className="form-textarea" 
          placeholder="Enter mission statement"
          disabled={!isEditing}
        />
      </div>
    </div>
  );

  const renderProgramsEditor = () => (
    <div className="admin-form">
      <h2 style={{ marginBottom: '1.5rem', color: '#03111E' }}>Edit Programs Section</h2>
      
      <div className="form-group">
        <label className="form-label">Section Title</label>
        <input 
          type="text" 
          className="form-input" 
          placeholder="Enter section title"
          disabled={!isEditing}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Section Subtitle</label>
        <textarea 
          className="form-textarea" 
          placeholder="Enter section subtitle"
          disabled={!isEditing}
        />
      </div>

      {programsData.map((program, index) => (
        <div key={index} style={{ 
          border: '1px solid #e2e8f0', 
          borderRadius: '0.5rem', 
          padding: '1.5rem', 
          marginBottom: '1rem',
          backgroundColor: '#f8fafc'
        }}>
          <h4 style={{ marginBottom: '1rem', color: '#03111E' }}>Program {index + 1}</h4>
          
          <div className="form-group">
            <label className="form-label">Program Title</label>
            <input 
              type="text" 
              className="form-input" 
              defaultValue={program.title}
              disabled={!isEditing}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Program Description</label>
            <textarea 
              className="form-textarea" 
              defaultValue={program.description}
              disabled={!isEditing}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Program Image URL</label>
            <input 
              type="url" 
              className="form-input" 
              defaultValue={program.image}
              disabled={!isEditing}
            />
          </div>
        </div>
      ))}
    </div>
  );

  const renderTestimonialsEditor = () => (
    <div className="admin-form">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ margin: 0, color: '#03111E' }}>Testimonials & Reviews Management</h2>
          <p style={{ margin: '0.5rem 0 0 0', color: '#6b7280', fontSize: '0.9rem' }}>
            Manage student testimonials, approve reviews, and control what appears on your website
          </p>
        </div>
        
        {/* Stats */}
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ 
            backgroundColor: '#dbeafe', 
            padding: '0.5rem 1rem', 
            borderRadius: '0.5rem',
            textAlign: 'center',
            minWidth: '80px'
          }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1d4ed8' }}>
              {testimonials.length}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#1d4ed8' }}>Total</div>
          </div>
          <div style={{ 
            backgroundColor: '#fef3c7', 
            padding: '0.5rem 1rem', 
            borderRadius: '0.5rem',
            textAlign: 'center',
            minWidth: '80px'
          }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#d97706' }}>
              {testimonials.filter(t => !t.approved).length}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#d97706' }}>Pending</div>
          </div>
          <div style={{ 
            backgroundColor: '#d1fae5', 
            padding: '0.5rem 1rem', 
            borderRadius: '0.5rem',
            textAlign: 'center',
            minWidth: '80px'
          }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#059669' }}>
              {testimonials.filter(t => t.approved).length}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#059669' }}>Approved</div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{ 
        display: 'flex', 
        gap: '0.5rem', 
        marginBottom: '1.5rem',
        borderBottom: '1px solid #e5e7eb',
        paddingBottom: '1rem'
      }}>
        {[
          { key: 'all', label: 'All Testimonials', count: testimonials.length },
          { key: 'pending', label: 'Pending Approval', count: testimonials.filter(t => !t.approved).length },
          { key: 'approved', label: 'Approved', count: testimonials.filter(t => t.approved).length }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setTestimonialFilter(tab.key as any)}
            style={{
              padding: '0.5rem 1rem',
              border: 'none',
              borderRadius: '0.375rem',
              backgroundColor: testimonialFilter === tab.key ? '#3b82f6' : '#f3f4f6',
              color: testimonialFilter === tab.key ? 'white' : '#374151',
              fontSize: '0.875rem',
              fontWeight: '500',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            {tab.label}
            <span style={{
              backgroundColor: testimonialFilter === tab.key ? 'rgba(255,255,255,0.3)' : '#d1d5db',
              color: testimonialFilter === tab.key ? 'white' : '#374151',
              fontSize: '0.75rem',
              padding: '0.125rem 0.375rem',
              borderRadius: '9999px',
              minWidth: '1.5rem',
              textAlign: 'center'
            }}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Testimonials List */}
      <div style={{ display: 'grid', gap: '1rem' }}>
        {getFilteredTestimonials().map((testimonial) => (
          <div 
            key={testimonial.id} 
            style={{ 
              border: '1px solid #e5e7eb', 
              borderRadius: '0.75rem', 
              backgroundColor: '#fff',
              overflow: 'hidden',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
            }}
          >
            {/* Header */}
            <div style={{
              padding: '1rem 1.5rem',
              backgroundColor: testimonial.approved ? '#f0f9ff' : '#fffbeb',
              borderBottom: '1px solid #e5e7eb',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div>
                  <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '600', color: '#111827' }}>
                    {testimonial.name}
                  </h4>
                  <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem', color: '#6b7280' }}>
                    {testimonial.role}
                  </p>
                </div>
                
                {/* Status Badge */}
                <div style={{
                  padding: '0.25rem 0.75rem',
                  borderRadius: '9999px',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  backgroundColor: testimonial.approved ? '#dcfce7' : '#fef3c7',
                  color: testimonial.approved ? '#166534' : '#92400e'
                }}>
                  {testimonial.approved ? 'Approved' : 'Pending'}
                </div>

                {/* Featured Badge */}
                {testimonial.featured && (
                  <div style={{
                    padding: '0.25rem 0.75rem',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    backgroundColor: '#e0e7ff',
                    color: '#3730a3'
                  }}>
                    Featured
                  </div>
                )}

                {/* Rating */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  {[...Array(5)].map((_, i) => (
                    <i 
                      key={i}
                      className="fas fa-star"
                      style={{ 
                        color: i < testimonial.rating ? '#fbbf24' : '#d1d5db',
                        fontSize: '0.875rem'
                      }}
                    ></i>
                  ))}
                  <span style={{ fontSize: '0.875rem', color: '#6b7280', marginLeft: '0.25rem' }}>
                    ({testimonial.rating}/5)
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {!testimonial.approved && (
                  <button
                    onClick={() => openApprovalModal(testimonial)}
                    style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: '#3b82f6',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.375rem',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <i className="fas fa-check"></i>
                    Review
                  </button>
                )}

                {testimonial.approved && (
                  <button
                    onClick={() => handleToggleFeatured(testimonial.id)}
                    style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: testimonial.featured ? '#f59e0b' : '#6b7280',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.375rem',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <i className={`fas ${testimonial.featured ? 'fa-star' : 'fa-star-o'}`}></i>
                    {testimonial.featured ? 'Unfeature' : 'Feature'}
                  </button>
                )}

                <button
                  onClick={() => handleDeleteTestimonial(testimonial.id)}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#dc2626',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <i className="fas fa-trash"></i>
                  Delete
                </button>
              </div>
            </div>

            {/* Content */}
            <div style={{ padding: '1.5rem' }}>
              <blockquote style={{
                fontSize: '1rem',
                fontStyle: 'italic',
                color: '#374151',
                margin: '0 0 1rem 0',
                lineHeight: '1.6',
                paddingLeft: '1rem',
                borderLeft: '4px solid #e5e7eb'
              }}>
                "{testimonial.content}"
              </blockquote>

              {/* Meta Info */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem',
                fontSize: '0.875rem',
                color: '#6b7280',
                backgroundColor: '#f9fafb',
                padding: '1rem',
                borderRadius: '0.5rem'
              }}>
                <div>
                  <strong>Submitted:</strong> {testimonial.submittedDate.toLocaleDateString()}
                </div>
                {testimonial.approvedDate && (
                  <div>
                    <strong>Approved:</strong> {testimonial.approvedDate.toLocaleDateString()}
                  </div>
                )}
                {testimonial.email && (
                  <div>
                    <strong>Email:</strong> {testimonial.email}
                  </div>
                )}
                {testimonial.phone && (
                  <div>
                    <strong>Phone:</strong> {testimonial.phone}
                  </div>
                )}
                {testimonial.reviewNotes && (
                  <div style={{ gridColumn: '1 / -1' }}>
                    <strong>Review Notes:</strong> {testimonial.reviewNotes}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {getFilteredTestimonials().length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '3rem 1rem',
          backgroundColor: '#f9fafb',
          borderRadius: '0.75rem',
          color: '#6b7280'
        }}>
          <i className="fas fa-comments" style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.5 }}></i>
          <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.125rem' }}>
            No testimonials found
          </h3>
          <p style={{ margin: 0 }}>
            {testimonialFilter === 'all' 
              ? 'No testimonials have been submitted yet.'
              : `No ${testimonialFilter} testimonials found.`
            }
          </p>
        </div>
      )}
    </div>
  );

  const renderFooterEditor = () => (
    <div className="admin-form">
      <h2 style={{ marginBottom: '1.5rem', color: '#03111E' }}>Edit Footer Section</h2>
      
      {/* TODO: Fix footer sections */}
      {/* {footerData.sections.map((section, index) => (
        <div key={index} style={{ 
          border: '1px solid #e2e8f0', 
          borderRadius: '0.5rem', 
          padding: '1.5rem', 
          marginBottom: '1rem',
          backgroundColor: '#f8fafc'
        }}>
          <h4 style={{ marginBottom: '1rem', color: '#374151' }}>{section.title}</h4>
          
          <div className="form-group">
            <label className="form-label">Section Title</label>
            <input 
              type="text" 
              className="form-input" 
              defaultValue={section.title}
              disabled={!isEditing}
            />
          </div>

          {section.links.map((link, linkIndex) => (
            <div key={linkIndex} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Link {linkIndex + 1} - Text</label>
                <input 
                  type="text" 
                  className="form-input" 
                  defaultValue={link.text}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Link {linkIndex + 1} - URL</label>
                <input 
                  type="text" 
                  className="form-input" 
                  defaultValue={link.href}
                  disabled={!isEditing}
                />
              </div>
            </div>
          ))}
        </div>
      ))} */}

      <div style={{ 
        border: '1px solid #e2e8f0', 
        borderRadius: '0.5rem', 
        padding: '1.5rem', 
        marginBottom: '1rem',
        backgroundColor: '#f8fafc'
      }}>
        <h4 style={{ marginBottom: '1rem', color: '#374151' }}>Contact Information</h4>
        
        <div className="form-group">
          <label className="form-label">Phone</label>
          <input 
            type="text" 
            className="form-input" 
            defaultValue={footerData.contact.phone}
            disabled={!isEditing}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Email</label>
          <input 
            type="email" 
            className="form-input" 
            defaultValue={footerData.contact.email}
            disabled={!isEditing}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Address</label>
          <textarea 
            className="form-textarea" 
            defaultValue={footerData.contact.address}
            disabled={!isEditing}
          />
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'hero':
        return renderHeroEditor();
      case 'about':
        return renderAboutEditor();
      case 'programs':
        return renderProgramsEditor();
      case 'testimonials':
        return renderTestimonialsEditor();
      case 'footer':
        return renderFooterEditor();
      default:
        return renderHeroEditor();
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0, color: '#03111E' }}>
          <i className="fas fa-edit" style={{ marginRight: '0.5rem' }}></i>
          Website Content Management
        </h1>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {!isEditing ? (
            <button 
              className="btn btn-primary"
              onClick={() => setIsEditing(true)}
            >
              <i className="fas fa-pencil-alt" style={{ marginRight: '0.5rem' }}></i>
              Edit Website Content
            </button>
          ) : (
            <>
              <button 
                className="btn btn-secondary"
                onClick={() => setIsEditing(false)}
              >
                <i className="fas fa-times" style={{ marginRight: '0.5rem' }}></i>
                Cancel Changes
              </button>
              <button 
                className="btn btn-primary"
                onClick={handleSave}
              >
                <i className="fas fa-save" style={{ marginRight: '0.5rem' }}></i>
                Save & Publish
              </button>
            </>
          )}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '2rem' }}>
        {/* Sidebar */}
        <div style={{ background: 'white', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0', height: 'fit-content' }}>
          <h3 style={{ margin: '0 0 1rem 0', color: '#374151' }}>Sections</h3>
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              style={{
                width: '100%',
                textAlign: 'left',
                padding: '0.75rem',
                border: 'none',
                background: activeSection === section.id ? '#FC7423' : 'transparent',
                color: activeSection === section.id ? 'white' : '#374151',
                borderRadius: '0.375rem',
                marginBottom: '0.5rem',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <i className={`fas fa-${section.icon}`} style={{ marginRight: '0.75rem' }}></i>
              {section.name}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div>
          {renderContent()}
        </div>
      </div>

      {/* Testimonial Approval Modal */}
      {showApprovalModal && selectedTestimonial && (
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
            borderRadius: '0.75rem',
            width: '90%',
            maxWidth: '600px',
            maxHeight: '90vh',
            overflow: 'auto',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
          }}>
            {/* Modal Header */}
            <div style={{
              padding: '1.5rem',
              borderBottom: '1px solid #e5e7eb',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '600', color: '#111827' }}>
                Review Testimonial
              </h2>
              <button
                onClick={() => setShowApprovalModal(false)}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  color: '#6b7280',
                  padding: '0.25rem'
                }}
              >
                ×
              </button>
            </div>

            {/* Modal Content */}
            <div style={{ padding: '1.5rem' }}>
              {/* Testimonial Details */}
              <div style={{
                backgroundColor: '#f9fafb',
                padding: '1.5rem',
                borderRadius: '0.5rem',
                marginBottom: '1.5rem'
              }}>
                <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.25rem', fontWeight: '600' }}>
                  {selectedTestimonial.name}
                </h3>
                <p style={{ margin: '0 0 1rem 0', color: '#6b7280', fontSize: '0.875rem' }}>
                  {selectedTestimonial.role}
                </p>
                
                {/* Rating */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                  <span style={{ fontWeight: '600' }}>Rating:</span>
                  {[...Array(5)].map((_, i) => (
                    <i 
                      key={i}
                      className="fas fa-star"
                      style={{ 
                        color: i < selectedTestimonial.rating ? '#fbbf24' : '#d1d5db',
                        fontSize: '1rem'
                      }}
                    ></i>
                  ))}
                  <span style={{ color: '#6b7280' }}>({selectedTestimonial.rating}/5)</span>
                </div>

                {/* Content */}
                <blockquote style={{
                  fontSize: '1rem',
                  fontStyle: 'italic',
                  color: '#374151',
                  margin: '0 0 1rem 0',
                  lineHeight: '1.6',
                  paddingLeft: '1rem',
                  borderLeft: '4px solid #e5e7eb'
                }}>
                  "{selectedTestimonial.content}"
                </blockquote>

                {/* Contact Info */}
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1rem',
                  fontSize: '0.875rem',
                  color: '#6b7280'
                }}>
                  {selectedTestimonial.email && (
                    <div>
                      <strong>Email:</strong> {selectedTestimonial.email}
                    </div>
                  )}
                  {selectedTestimonial.phone && (
                    <div>
                      <strong>Phone:</strong> {selectedTestimonial.phone}
                    </div>
                  )}
                </div>
              </div>

              {/* Review Notes */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  fontWeight: '600',
                  fontSize: '0.875rem'
                }}>
                  Review Notes (Optional)
                </label>
                <textarea
                  placeholder="Add any notes about your review decision..."
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    resize: 'vertical',
                    minHeight: '80px',
                    fontFamily: 'inherit'
                  }}
                  defaultValue={selectedTestimonial.reviewNotes || ''}
                  onChange={(e) => setSelectedTestimonial({
                    ...selectedTestimonial,
                    reviewNotes: e.target.value
                  })}
                />
              </div>
            </div>

            {/* Modal Actions */}
            <div style={{
              padding: '1.5rem',
              borderTop: '1px solid #e5e7eb',
              display: 'flex',
              gap: '1rem',
              justifyContent: 'flex-end'
            }}>
              <button
                onClick={() => setShowApprovalModal(false)}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#f3f4f6',
                  color: '#374151',
                  border: 'none',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              
              <button
                onClick={() => handleApproveTestimonial(
                  selectedTestimonial.id, 
                  false, 
                  selectedTestimonial.reviewNotes || 'Rejected by admin'
                )}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#dc2626',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <i className="fas fa-times"></i>
                Reject
              </button>
              
              <button
                onClick={() => handleApproveTestimonial(
                  selectedTestimonial.id, 
                  true, 
                  selectedTestimonial.reviewNotes || 'Approved by admin'
                )}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#059669',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <i className="fas fa-check"></i>
                Approve
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}