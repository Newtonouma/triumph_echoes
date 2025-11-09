'use client'

import React from 'react'
import { heroData } from '@/data'
import styles from './Hero.module.css'

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles['hero-container']}>
        <div className={styles['hero-content']}>
          {/* Top Heading - Full Width */}
          <div className={styles['hero-heading']}>
            <h1 className={styles['hero-title-1']}>
              EMPOWERING
            </h1>
            <h2 className={styles['hero-title-2']}>
              SPEAKERS TO GROW
            </h2>
          </div>

          {/* Bottom Section - Image Left, Content Right */}
          <div className={styles['hero-grid']}>
            {/* Left - Image */}
            <div className={styles['hero-image-container']}>
              {/* Team image */}
              <div className={styles['hero-image']}>
                <img
                  src={heroData.mainImage}
                  alt="Confident speakers and team at Triumph Echoes Academy"
                />
              </div>
            </div>

            {/* Right - SMARTER and other content */}
            <div className={styles['hero-right-content']}>
              {/* SMARTER Heading */}
              <h3 className={styles['hero-title-3']}>
                SMARTER
              </h3>

              {/* Desktop: Show all content here */}
              <div className="hidden lg:flex lg:flex-col lg:gap-8">
                {/* Stats */}
                <div className={styles['hero-stats']}>
                  {heroData.stats.map((stat, index) => (
                    <div key={index} className={styles['hero-stat']}>
                      <div className={styles['hero-stat-number']}>{stat.number}</div>
                      <div className={styles['hero-stat-label']}>{stat.label}</div>
                    </div>
                  ))}
                  <div className={styles['hero-stat']}>
                    <div className={styles['hero-rating']}>
                      <span className={styles['hero-rating-number']}>4.9</span>
                      <div className={styles['hero-stars']}>
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={styles['hero-star']}
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <div className={styles['hero-stat-label']}>Overall Rating</div>
                  </div>
                </div>

                {/* Description */}
                <p className={styles['hero-description']}>
                  Expert public speaking training that drives real results through proven strategies, 
                  personalized coaching, and confidence-building techniques for speakers of all ages.
                </p>

                {/* CTA Button */}
                <div>
                  <button className={styles['hero-cta']}>
                    <span className={styles['hero-cta-text']}>Book a Consultation</span>
                    <div className={styles['hero-cta-arrow']}>
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H9M17 7v8" />
                      </svg>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile: Content below image and SMARTER */}
          <div className={styles['hero-mobile-content']}>
            {/* Stats */}
            <div className={styles['hero-stats']}>
              <div className={styles['hero-stat']}>
                <div className={styles['hero-stat-number']}>40+</div>
                <div className={styles['hero-stat-label']}>Graduates</div>
              </div>
              <div className={styles['hero-stat']}>
                <div className={styles['hero-rating']}>
                  <span className={styles['hero-rating-number']}>4.9</span>
                  <div className={styles['hero-stars']}>
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={styles['hero-star']}
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <div className={styles['hero-stat-label']}>200+ total participants</div>
              </div>
            </div>

            {/* Description */}
            <p className={styles['hero-description']}>
              Expert public speaking training that drives real results through proven strategies, 
              personalized coaching, and confidence-building techniques for speakers of all ages.
            </p>

            {/* CTA Button */}
            <div>
              <button className={styles['hero-cta']}>
                <span className={styles['hero-cta-text']}>Book a Consultation</span>
                <div className={styles['hero-cta-arrow']}>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H9M17 7v8" />
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero