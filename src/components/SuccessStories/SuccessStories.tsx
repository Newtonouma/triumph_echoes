'use client'

import React from 'react'
import styles from './SuccessStories.module.css'

const SuccessStories = () => {
  return (
    <section className={styles['success-stories']}>
      <div className={styles['success-container']}>
        {/* Success Stories Label */}
        <div className={styles['success-label']}>
          SUCCESS STORIES
        </div>

        {/* Main Heading */}
        <div className={styles['success-heading']}>
          <h2>
            <span className={styles['heading-dark']}>Real students, real growth.</span><br />
            <span className={styles['heading-light']}>Here's how </span>
            <span className={styles['heading-highlight']}>we've helped</span><br />
            <span className={styles['heading-light']}>speakers like yours.</span>
          </h2>
          
          <div className={styles['view-all']}>
            <span>View all Success Stories</span>
            <span className={styles['arrow']}>↗</span>
          </div>
        </div>

        {/* Success Stories Grid */}
        <div className={styles['stories-grid']}>
          {/* Story 1 - Student Confidence Building */}
          <div className={styles['story-card']}>
            <div className={styles['story-image']}>
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                alt="Young student presenting confidently"
              />
            </div>
            <div className={styles['story-content']}>
              <h3>Student Confidence Building</h3>
              <p>Transforming a shy 12-year-old into a confident school debate champion through our year-long program.</p>
              <div className={styles['read-more']}>
                <span>Read More</span>
                <span className={styles['arrow']}>↗</span>
              </div>
            </div>
          </div>

          {/* Story 2 - Professional Communication Skills */}
          <div className={styles['story-card']}>
            <div className={styles['story-image']}>
              <img
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                alt="Professional giving presentation"
              />
            </div>
            <div className={styles['story-content']}>
              <h3>Professional Communication Skills</h3>
              <p>Enhancing leadership presentation abilities for executive team meetings and client interactions.</p>
              <div className={styles['read-more']}>
                <span>Read More</span>
                <span className={styles['arrow']}>↗</span>
              </div>
            </div>
          </div>

          {/* Story 3 - Career Advancement */}
          <div className={styles['story-card']}>
            <div className={styles['story-image']}>
              <img
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                alt="Team celebrating success"
              />
            </div>
            <div className={styles['story-content']}>
              <h3>Career Advancement</h3>
              <p>Developing strategic communication skills that enhanced career growth and long-term professional success.</p>
              <div className={styles['read-more']}>
                <span>Read More</span>
                <span className={styles['arrow']}>↗</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SuccessStories