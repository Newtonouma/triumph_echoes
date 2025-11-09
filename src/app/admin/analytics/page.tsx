'use client';

import { useState } from 'react';

export default function Analytics() {
  const [timeframe, setTimeframe] = useState('7d');

  const metrics = [
    {
      title: 'Website Visitors',
      value: '15,234',
      change: '+12.5% this month',
      changeType: 'positive' as const,
      icon: 'users'
    },
    {
      title: 'Class Inquiries',
      value: '89',
      change: '+15.3% this month',
      changeType: 'positive' as const,
      icon: 'phone'
    },
    {
      title: 'Student Enrollment Rate',
      value: '68%',
      change: '+8.2% improvement',
      changeType: 'positive' as const,
      icon: 'bullseye'
    },
    {
      title: 'Class Attendance Rate',
      value: '94%',
      change: '+2% this month',
      changeType: 'positive' as const,
      icon: 'book'
    },
    {
      title: 'Average Session Time',
      value: '4:23',
      change: '+1.2 min increase',
      changeType: 'positive' as const,
      icon: 'clock'
    },
    {
      title: 'Student Satisfaction',
      value: '4.8/5',
      change: '+0.3 improvement',
      changeType: 'positive' as const,
      icon: 'star'
    }
  ];

  const topPages = [
    { page: '/programs', views: 8450, percentage: 18.5, title: 'Programs & Classes' },
    { page: '/', views: 7230, percentage: 15.8, title: 'Homepage' },
    { page: '/about', views: 5670, percentage: 12.4, title: 'About Our Academy' },
    { page: '/testimonials', views: 4890, percentage: 10.7, title: 'Student Success Stories' },
    { page: '/contact', views: 3210, percentage: 7.0, title: 'Contact & Enrollment' }
  ];

  const trafficSources = [
    { source: 'Direct', visitors: 6789, percentage: 44.6 },
    { source: 'Google Search', visitors: 4123, percentage: 27.1 },
    { source: 'Social Media', visitors: 2341, percentage: 15.4 },
    { source: 'Referral', visitors: 1456, percentage: 9.6 },
    { source: 'Email', visitors: 525, percentage: 3.4 }
  ];

  const programInterest = [
    { program: 'Youth Public Speaking (Ages 8-12)', inquiries: 34, conversions: 23 },
    { program: 'Teen Leadership & Speaking', inquiries: 28, conversions: 19 },
    { program: 'Adult Communication Skills', inquiries: 22, conversions: 15 },
    { program: 'Professional Presentation Skills', inquiries: 18, conversions: 12 },
    { program: 'Executive Leadership Communication', inquiries: 12, conversions: 9 }
  ];

  const getSourceColor = (source: string) => {
    const colors = {
      'Direct': '#FC7423',
      'Google Search': '#4285f4',
      'Social Media': '#1877f2',
      'Referral': '#10b981',
      'Email': '#f59e0b'
    };
    return colors[source as keyof typeof colors] || '#6b7280';
  };

  return (
    <div>
      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <h1 style={{ margin: 0, color: '#03111E' }}>
          <i className="fas fa-chart-bar" style={{ marginRight: '0.5rem' }}></i>
          Academy Reports & Analytics
        </h1>
        
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {['7d', '30d', '90d', '1y'].map((period) => (
            <button
              key={period}
              onClick={() => setTimeframe(period)}
              style={{
                padding: '0.5rem 1rem',
                border: '1px solid #e2e8f0',
                borderRadius: '0.375rem',
                background: timeframe === period ? '#FC7423' : 'white',
                color: timeframe === period ? 'white' : '#374151',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: '500'
              }}
            >
              {period === '7d' ? 'Last 7 days' : 
               period === '30d' ? 'Last 30 days' : 
               period === '90d' ? 'Last 90 days' : 
               'Last year'}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '1.5rem',
        marginBottom: '2rem' 
      }}>
        {metrics.map((metric, index) => (
          <div key={index} className="dashboard-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <h3>{metric.title}</h3>
              <span style={{ fontSize: '1.5rem', color: '#FC7423' }}>
                <i className={`fas fa-${metric.icon}`}></i>
              </span>
            </div>
            <div className="value">{metric.value}</div>
            <div className={`change ${metric.changeType}`}>
              {metric.change}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
        {/* Top Pages */}
        <div className="dashboard-card">
          <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem', textTransform: 'none', color: '#03111E' }}>
            <i className="fas fa-file-alt" style={{ marginRight: '0.5rem' }}></i>
            Most Visited Pages
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {topPages.map((page, index) => (
              <div key={index} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                padding: '0.75rem',
                backgroundColor: '#f8fafc',
                borderRadius: '0.375rem'
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>
                    {page.title || page.page}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                    {page.page}
                  </div>
                  <div style={{ 
                    width: '100%', 
                    height: '4px', 
                    backgroundColor: '#e5e7eb', 
                    borderRadius: '2px',
                    overflow: 'hidden'
                  }}>
                    <div style={{ 
                      width: `${page.percentage}%`, 
                      height: '100%', 
                      backgroundColor: '#FC7423',
                      transition: 'width 0.3s ease'
                    }} />
                  </div>
                </div>
                <div style={{ marginLeft: '1rem', textAlign: 'right' }}>
                  <div style={{ fontWeight: '600', color: '#374151' }}>
                    {page.views.toLocaleString()}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                    {page.percentage}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="dashboard-card">
          <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem', textTransform: 'none', color: '#03111E' }}>
            <i className="fas fa-globe" style={{ marginRight: '0.5rem' }}></i>
            Traffic Sources
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {trafficSources.map((source, index) => (
              <div key={index} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                  <div style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: getSourceColor(source.source),
                    marginRight: '0.75rem'
                  }} />
                  <span style={{ fontWeight: '500', color: '#374151' }}>
                    {source.source}
                  </span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: '600', color: '#374151' }}>
                    {source.visitors.toLocaleString()}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                    {source.percentage}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Program Interest */}
        <div className="dashboard-card">
          <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem', textTransform: 'none', color: '#03111E' }}>
            <i className="fas fa-graduation-cap" style={{ marginRight: '0.5rem' }}></i>
            Class Enrollment Performance
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {programInterest.map((program, index) => (
              <div key={index} style={{ 
                padding: '0.75rem',
                backgroundColor: '#f8fafc',
                borderRadius: '0.375rem',
                border: '1px solid #e5e7eb'
              }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginBottom: '0.5rem'
                }}>
                  <span style={{ fontWeight: '500', color: '#374151', fontSize: '0.9rem' }}>
                    {program.program}
                  </span>
                  <span style={{ 
                    fontSize: '0.75rem', 
                    color: '#10b981',
                    fontWeight: '500'
                  }}>
                    {((program.conversions / program.inquiries) * 100).toFixed(1)}% enrollment rate
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: '#6b7280' }}>
                  <span>{program.inquiries} inquiries</span>
                  <span>{program.conversions} enrolled</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mock Chart Area */}
        <div className="dashboard-card">
          <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem', textTransform: 'none', color: '#03111E' }}>
            <i className="fas fa-chart-line" style={{ marginRight: '0.5rem' }}></i>
            Visitor Trends
          </h3>
          <div style={{ 
            height: '200px',
            background: 'linear-gradient(45deg, #f8fafc 25%, transparent 25%), linear-gradient(-45deg, #f8fafc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f8fafc 75%), linear-gradient(-45deg, transparent 75%, #f8fafc 75%)',
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
            borderRadius: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#6b7280',
            fontSize: '0.875rem',
            border: '2px dashed #e5e7eb'
          }}>
            <div style={{ textAlign: 'center' }}>
              <i className="fas fa-chart-area" style={{ fontSize: '2rem', marginBottom: '0.5rem', display: 'block', color: '#d1d5db' }}></i>
              Chart visualization would go here
              <br />
              (Integration with Chart.js or similar library)
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Reports */}
      <div className="dashboard-card" style={{ marginTop: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', textTransform: 'none', color: '#03111E', margin: 0 }}>
            <i className="fas fa-list" style={{ marginRight: '0.5rem' }}></i>
            Recent Activity Log
          </h3>
          <button className="btn btn-secondary" style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}>
            <i className="fas fa-download" style={{ marginRight: '0.5rem' }}></i>
            Export Report
          </button>
        </div>
        
        <div className="admin-table">
          <table>
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Event</th>
                <th>User</th>
                <th>Page</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontSize: '0.875rem', color: '#6b7280' }}>Nov 9, 2024 14:23</td>
                <td>Page View</td>
                <td>Anonymous</td>
                <td>/programs</td>
                <td>2:45</td>
              </tr>
              <tr>
                <td style={{ fontSize: '0.875rem', color: '#6b7280' }}>Nov 9, 2024 14:21</td>
                <td>Form Submission</td>
                <td>john@example.com</td>
                <td>/contact</td>
                <td>-</td>
              </tr>
              <tr>
                <td style={{ fontSize: '0.875rem', color: '#6b7280' }}>Nov 9, 2024 14:18</td>
                <td>Page View</td>
                <td>Anonymous</td>
                <td>/</td>
                <td>1:23</td>
              </tr>
              <tr>
                <td style={{ fontSize: '0.875rem', color: '#6b7280' }}>Nov 9, 2024 14:15</td>
                <td>Program Inquiry</td>
                <td>sarah.j@email.com</td>
                <td>/programs</td>
                <td>-</td>
              </tr>
              <tr>
                <td style={{ fontSize: '0.875rem', color: '#6b7280' }}>Nov 9, 2024 14:12</td>
                <td>Page View</td>
                <td>Anonymous</td>
                <td>/about</td>
                <td>3:12</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}