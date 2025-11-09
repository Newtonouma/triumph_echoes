'use client'

import React from 'react'
import { programsData } from '@/data'
import styles from './Programs.module.css'

const Programs = () => {
  return (
    <section className={styles['programs']}>
      <div className={styles['programs-container']}>
        {/* Programs Label */}
        <div className={styles['programs-label']}>
          OUR PROGRAMS
        </div>

        {/* Main Heading */}
        <div className={styles['programs-heading']}>
          <h2>
            <span className={styles['heading-dark']}>Real programs, real growth.</span><br />
            <span className={styles['heading-light']}>Here's how </span>
            <span className={styles['heading-highlight']}>we've helped</span><br />
            <span className={styles['heading-light']}>speakers like yours.</span>
          </h2>
          
          <div className={styles['view-all']}>
            <span>View all Programs</span>
            <span className={styles['arrow']}>↗</span>
          </div>
        </div>

        {/* Programs Grid */}
        <div className={styles['programs-grid']}>
          {programsData.map((program) => (
            <div key={program.id} className={styles['program-card']}>
              <div className={styles['program-image']}>
                <img
                  src={program.image}
                  alt={program.alt}
                />
              </div>
              <div className={styles['program-content']}>
                <h3>{program.title}</h3>
                <p>{program.description}</p>
                <div className={styles['read-more']}>
                  <span>Read More</span>
                  <span className={styles['arrow']}>↗</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Programs