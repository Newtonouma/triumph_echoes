'use client'

import React from 'react'
import { testimonialsData } from '@/data'
import styles from './Testimonials.module.css'

const Testimonials = () => {
  return (
    <section className={styles['testimonials']}>
      <div className={styles['testimonials-container']}>
        {/* Testimonials Label */}
        <div className={styles['testimonials-label']}>
          TESTIMONIALS
        </div>

        {/* Main Heading */}
        <div className={styles['testimonials-heading']}>
          <h2>
            <span className={styles['heading-dark']}>Trusted by </span>
            <span className={styles['heading-light']}>students</span><br />
            <span className={styles['heading-light']}>worldwide</span>
          </h2>
        </div>

        {/* Content Grid */}
        <div className={styles['testimonials-grid']}>
          {testimonialsData.map((testimonial) => (
            <div key={testimonial.id} className={styles['testimonial-card']}>
              <div className={styles['rating']}>
                <span>{testimonial.rating}</span>
                <span className={styles['star']}>★</span>
              </div>
              
              <div className={styles['testimonial-header']}>
                <div className={styles['testimonial-avatar']}>
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                  />
                </div>
                <div className={styles['testimonial-info']}>
                  <h3>{testimonial.name}</h3>
                </div>
              </div>
              
              <h4>{testimonial.title}</h4>
              <p>
                {testimonial.content}
                <span className={styles['text-light']}>{testimonial.contentLight}</span>
              </p>
              
              <div className={styles['testimonial-date']}>
                {testimonial.date}
              </div>
            </div>
          ))}
        </div>

        {/* Read More Button */}
        <div className={styles['read-more-container']}>
          <div className={styles['read-more']}>
            <span>Read More Reviews</span>
            <span className={styles['arrow']}>↗</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials