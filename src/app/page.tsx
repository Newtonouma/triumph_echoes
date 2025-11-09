'use client'

import React, { useState } from 'react'
import Hero from '@/components/Hero'
import AboutUs from '@/components/AboutUs'
import Programs from '@/components/Programs'
import Testimonials from '@/components/Testimonials'

interface TestimonialFormData {
  name: string;
  image: File | null;
  content: string;
  rating: number;
}

export default function Home() {
  const [showTestimonialModal, setShowTestimonialModal] = useState(false);
  const [formData, setFormData] = useState<TestimonialFormData>({
    name: '',
    image: null,
    content: '',
    rating: 5
  });

  const handleSubmitTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically send the data to your backend API
    console.log('Testimonial submitted:', formData);
    
    // Reset form and close modal
    setFormData({ name: '', image: null, content: '', rating: 5 });
    setShowTestimonialModal(false);
    
    // Show success message
    alert('Thank you for your testimonial! It will be reviewed and published soon.');
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, image: file }));
  };

  const handleRatingChange = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  return (
    <div>
      <Hero />
      <AboutUs />
      <Programs />
      <Testimonials onOpenTestimonialModal={() => setShowTestimonialModal(true)} />
      
      {/* Testimonial Submission Modal */}
      {showTestimonialModal && (
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
          zIndex: 1001,
          padding: '1rem'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '1rem',
            width: '100%',
            maxWidth: '500px',
            maxHeight: '90vh',
            overflow: 'auto',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
          }}>
            {/* Modal Header */}
            <div style={{
              padding: '2rem 2rem 1rem 2rem',
              borderBottom: '1px solid #e5e7eb',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h2 style={{ margin: 0, fontSize: '1.75rem', fontWeight: '600', color: '#111827' }}>
                Share Your Experience
              </h2>
              <button
                onClick={() => setShowTestimonialModal(false)}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  fontSize: '2rem',
                  cursor: 'pointer',
                  color: '#6b7280',
                  padding: '0.25rem',
                  lineHeight: 1
                }}
              >
                ×
              </button>
            </div>

            {/* Modal Content */}
            <form onSubmit={handleSubmitTestimonial} style={{ padding: '2rem' }}>
              {/* Name Field */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  fontWeight: '600',
                  fontSize: '0.875rem',
                  color: '#374151'
                }}>
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter your full name"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    fontSize: '1rem',
                    fontFamily: 'inherit',
                    outline: 'none',
                    transition: 'border-color 0.2s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#1e40af'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                />
              </div>

              {/* Rating Field */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  fontWeight: '600',
                  fontSize: '0.875rem',
                  color: '#374151'
                }}>
                  Rating *
                </label>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleRatingChange(star)}
                      style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        fontSize: '2rem',
                        cursor: 'pointer',
                        color: star <= formData.rating ? '#fbbf24' : '#d1d5db',
                        padding: '0.25rem',
                        transition: 'color 0.2s ease'
                      }}
                    >
                      ★
                    </button>
                  ))}
                  <span style={{ marginLeft: '1rem', color: '#6b7280', fontSize: '0.875rem' }}>
                    {formData.rating} out of 5 stars
                  </span>
                </div>
              </div>

              {/* Image Upload Field */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  fontWeight: '600',
                  fontSize: '0.875rem',
                  color: '#374151'
                }}>
                  Your Photo (Optional)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    fontFamily: 'inherit',
                    backgroundColor: '#f9fafb'
                  }}
                />
                {formData.image && (
                  <p style={{ 
                    marginTop: '0.5rem', 
                    fontSize: '0.875rem', 
                    color: '#059669',
                    margin: '0.5rem 0 0 0'
                  }}>
                    ✓ {formData.image.name}
                  </p>
                )}
              </div>

              {/* Content/Review Field */}
              <div style={{ marginBottom: '2rem' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  fontWeight: '600',
                  fontSize: '0.875rem',
                  color: '#374151'
                }}>
                  Your Review *
                </label>
                <textarea
                  required
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Share your experience with Triumph Echoes Academy..."
                  rows={4}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    fontSize: '1rem',
                    fontFamily: 'inherit',
                    resize: 'vertical',
                    minHeight: '100px',
                    outline: 'none',
                    transition: 'border-color 0.2s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#1e40af'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                />
                <p style={{ 
                  marginTop: '0.5rem', 
                  fontSize: '0.75rem', 
                  color: '#6b7280',
                  margin: '0.5rem 0 0 0'
                }}>
                  Minimum 10 characters ({formData.content.length}/10)
                </p>
              </div>

              {/* Submit Button */}
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setShowTestimonialModal(false)}
                  style={{
                    background: 'transparent',
                    color: 'var(--color-primary)',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    padding: '0.75rem 1.5rem',
                    fontSize: '1rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#f9fafb';
                    e.currentTarget.style.borderColor = 'var(--color-primary)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.borderColor = '#d1d5db';
                  }}
                >
                  Cancel
                </button>
                
                <button
                  type="submit"
                  disabled={!formData.name || !formData.content || formData.content.length < 10}
                  style={{
                    background: formData.name && formData.content && formData.content.length >= 10 
                      ? 'var(--color-secondary)' 
                      : '#9ca3af',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.5rem',
                    padding: '0.75rem 2rem',
                    fontSize: '1rem',
                    fontWeight: '500',
                    cursor: formData.name && formData.content && formData.content.length >= 10 
                      ? 'pointer' 
                      : 'not-allowed',
                    transition: 'all 0.2s ease',
                    boxShadow: formData.name && formData.content && formData.content.length >= 10 
                      ? '0 4px 15px rgba(252, 116, 35, 0.3)' 
                      : 'none'
                  }}
                  onMouseOver={(e) => {
                    if (!e.currentTarget.disabled) {
                      e.currentTarget.style.backgroundColor = '#e55d00';
                      e.currentTarget.style.transform = 'translateY(-1px)';
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(252, 116, 35, 0.4)';
                    }
                  }}
                  onMouseOut={(e) => {
                    if (!e.currentTarget.disabled) {
                      e.currentTarget.style.backgroundColor = 'var(--color-secondary)';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 15px rgba(252, 116, 35, 0.3)';
                    }
                  }}
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
