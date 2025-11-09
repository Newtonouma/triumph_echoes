'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Head from 'next/head';
import './admin.css';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: 'home', current: pathname === '/admin' },
    { name: 'Website Content', href: '/admin/content', icon: 'edit', current: pathname === '/admin/content' },
    { name: 'Students & Staff', href: '/admin/users', icon: 'users', current: pathname === '/admin/users' },
    { name: 'Intake Management', href: '/admin/intake', icon: 'calendar-alt', current: pathname === '/admin/intake' },
    { name: 'Admission Management', href: '/admin/admissions', icon: 'user-graduate', current: pathname === '/admin/admissions' },
    { name: 'Program Management', href: '/admin/courses', icon: 'book', current: pathname === '/admin/courses' },
    { name: 'Class Management', href: '/admin/classes', icon: 'chalkboard-teacher', current: pathname === '/admin/classes' },
    { name: 'Payment Management', href: '/admin/payments', icon: 'money-check-alt', current: pathname === '/admin/payments' },
    { name: 'Resources Management', href: '/admin/resources', icon: 'folder-open', current: pathname === '/admin/resources' },
    { name: 'Reports & Analytics', href: '/admin/analytics', icon: 'chart-bar', current: pathname === '/admin/analytics' },
    { name: 'School Settings', href: '/admin/settings', icon: 'cog', current: pathname === '/admin/settings' },
  ];

  return (
    <div className="admin-layout">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
        integrity="sha512-9usAa10IRO0HhonpyAIVpjrylPvoDwiPUiKdWk5t3PyolY1cOd4DSE0Ga+ri4AuTroPR5aQvXU9xC6qOPnzFeg=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />
      
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="sidebar-backdrop"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <h2 className="sidebar-title">Academy Admin</h2>
          <button 
            className="sidebar-close-btn"
            onClick={() => setSidebarOpen(false)}
          >
            ×
          </button>
        </div>

        <nav className="sidebar-nav">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`nav-item ${item.current ? 'nav-item-active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <span className="nav-icon">
                <i className={`fas fa-${item.icon}`}></i>
              </span>
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <Link href="/" className="back-to-site">
            ← Back to School Website
          </Link>
          <button className="logout-btn">
            Sign Out
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="main-content">
        {/* Top header */}
        <header className="admin-header">
          <button 
            className="mobile-menu-btn"
            onClick={() => setSidebarOpen(true)}
          >
            ☰
          </button>
          <h1 className="page-title">
            Triumph Echoes Academy - School Management
          </h1>
          <div className="header-actions">
            <span className="admin-user">School Administrator</span>
          </div>
        </header>

        {/* Page content */}
        <main className="page-content">
          {children}
        </main>
      </div>
    </div>
  );
}