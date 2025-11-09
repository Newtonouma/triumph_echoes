'use client'

import React from 'react'
import { aboutUsData } from '@/data'
import styles from './AboutUs.module.css'

const AboutUs = () => {
  return (
    <section className={styles['about-us']}>
      <div className={styles['about-container']}>
        {/* About Us Label */}
        <div className={styles['about-label']}>
          {aboutUsData.label}
        </div>

        <div className={styles['about-grid']}>
          {/* Left Section - Heading and Image */}
          <div className={styles['about-left-section']}>
            <div className={styles['about-heading']}>
              <h2 className={styles['about-title-line1']}>{aboutUsData.heading.line1}</h2>
              <h2 className={styles['about-title-line2']}>{aboutUsData.heading.line2}</h2>
              <h2 className={styles['about-title-line3']}>{aboutUsData.heading.line3}</h2>
            </div>

            {/* Image Section */}
            <div className={styles['about-image-section']}>
              {/* Main Image Container */}
              <div className={styles['about-image-container']}>
                <div className={styles['about-image']}>
                  <img
                    src={aboutUsData.mainImage}
                    alt="Team celebrating success - hands together"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Description */}
          <div className={styles['about-right-section']}>
            {/* Avatars above the description */}
            <div className={styles['about-avatars-top']}>
              {aboutUsData.teamImages.map((image, index) => (
                <div key={index} className={styles['about-avatar']}>
                  <img
                    src={image}
                    alt="Team member"
                  />
                </div>
              ))}
              {/* Arrow with avatars */}
              <div className={styles['about-arrow-right']}>
                ↗
              </div>
            </div>

            <div className={styles['about-description']}>
              <span className={styles['about-description-highlight']}>
                {aboutUsData.description.highlight}
              </span>{' '}
              <span className={styles['about-description-light']}>
                {aboutUsData.description.light}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutUs