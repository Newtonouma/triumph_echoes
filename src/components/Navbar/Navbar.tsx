'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import styles from './Navbar.module.css'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className={styles.navbar}>
      <div className={styles['navbar-container']}>
        <div className={styles['navbar-content']}>
          {/* Logo */}
          <div className={styles['navbar-logo']}>
            <Link href="/">
              <img
                src="/images/logo.png"
                alt="Triumph Echoes Academy of Public Speaking"
                className="h-8 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className={styles['navbar-desktop']}>
            <div className={styles['navbar-nav']}>
              <Link
                href="/"
                className={styles['navbar-link']}
              >
                Home
              </Link>
              <Link
                href="/about"
                className={styles['navbar-link']}
              >
                About
              </Link>
              <Link
                href="/programs"
                className={styles['navbar-link']}
              >
                Programs
              </Link>
              <Link
                href="/case-studies"
                className={styles['navbar-link']}
              >
                Success Stories
              </Link>
              <Link
                href="/contact"
                className={styles['navbar-link']}
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className={styles['navbar-mobile-btn']}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={styles['navbar-mobile-btn']}
            >
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className={styles['navbar-mobile']}>
            <div className={styles['navbar-mobile-content']}>
              <Link
                href="/"
                className={styles['navbar-mobile-link']}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/about"
                className={styles['navbar-mobile-link']}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/programs"
                className={styles['navbar-mobile-link']}
                onClick={() => setIsMenuOpen(false)}
              >
                Programs
              </Link>
              <Link
                href="/case-studies"
                className={styles['navbar-mobile-link']}
                onClick={() => setIsMenuOpen(false)}
              >
                Success Stories
              </Link>
              <Link
                href="/contact"
                className={styles['navbar-mobile-link']}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar