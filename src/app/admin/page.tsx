'use client';

export default function AdminDashboard() {
  const stats = [
    {
      title: 'Total Students',
      value: '287',
      change: '+23 this month',
      changeType: 'positive' as const
    },
    {
      title: 'Active Classes',
      value: '12',
      change: '+3 new classes',
      changeType: 'positive' as const
    },
    {
      title: 'This Month\'s Enrollment',
      value: 'KSh 845,000',
      change: '+15% from last month',
      changeType: 'positive' as const
    },
    {
      title: 'Student Success Rate',
      value: '96%',
      change: '+2% improvement',
      changeType: 'positive' as const
    }
  ];

  const recentActivities = [
    {
      id: 1,
      action: 'New student enrolled',
      user: 'Emma Thompson',
      time: '5 minutes ago',
      type: 'enrollment'
    },
    {
      id: 2,
      action: 'Class completed',
      user: 'Youth Speaking Class',
      time: '30 minutes ago',
      type: 'class'
    },
    {
      id: 3,
      action: 'Assignment submitted',
      user: 'Michael Chen',
      time: '1 hour ago',
      type: 'assignment'
    },
    {
      id: 4,
      action: 'Payment received',
      user: 'Sarah Wilson',
      time: '2 hours ago',
      type: 'payment'
    },
    {
      id: 5,
      action: 'Certificate earned',
      user: 'David Rodriguez',
      time: '3 hours ago',
      type: 'achievement'
    }
  ];

  return (
    <div>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '1.5rem', 
        marginBottom: '2rem' 
      }}>
        {stats.map((stat, index) => (
          <div key={index} className="dashboard-card" style={{ minWidth: '200px' }}>
            <h3>{stat.title}</h3>
            <div className="value">{stat.value}</div>
            <div className={`change ${stat.changeType}`}>
              {stat.change}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
        {/* Recent Activities */}
        <div className="dashboard-card">
          <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem', textTransform: 'none', color: '#03111E' }}>
            <i className="fas fa-clock" style={{ marginRight: '0.5rem' }}></i>
            Recent School Activity
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {recentActivities.map((activity) => (
              <div key={activity.id} style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                padding: '0.75rem',
                backgroundColor: '#f8fafc',
                borderRadius: '0.375rem'
              }}>
                <div>
                  <div style={{ fontWeight: '500', color: '#374151' }}>
                    {activity.action}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                    by {activity.user}
                  </div>
                </div>
                <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
                  {activity.time}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="dashboard-card">
          <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem', textTransform: 'none', color: '#03111E' }}>
            <i className="fas fa-bolt" style={{ marginRight: '0.5rem' }}></i>
            Quick Actions
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <button className="btn btn-primary" style={{ justifyContent: 'flex-start' }}>
              <i className="fas fa-user-plus" style={{ marginRight: '0.5rem' }}></i>
              Add New Student
            </button>
            <button className="btn btn-secondary" style={{ justifyContent: 'flex-start' }}>
              <i className="fas fa-chalkboard-teacher" style={{ marginRight: '0.5rem' }}></i>
              Create New Class
            </button>
            <button className="btn btn-secondary" style={{ justifyContent: 'flex-start' }}>
              <i className="fas fa-calendar-plus" style={{ marginRight: '0.5rem' }}></i>
              Manage Intake
            </button>
            <button className="btn btn-secondary" style={{ justifyContent: 'flex-start' }}>
              <i className="fas fa-chart-line" style={{ marginRight: '0.5rem' }}></i>
              View Student Reports
            </button>
            <button className="btn btn-secondary" style={{ justifyContent: 'flex-start' }}>
              <i className="fas fa-bullhorn" style={{ marginRight: '0.5rem' }}></i>
              Send Announcements
            </button>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="dashboard-card" style={{ marginTop: '1.5rem' }}>
        <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem', textTransform: 'none', color: '#03111E' }}>
          <i className="fas fa-school" style={{ marginRight: '0.5rem' }}></i>
          Academy Status
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div style={{ padding: '1rem', backgroundColor: '#f0fdf4', borderRadius: '0.375rem', border: '1px solid #bbf7d0' }}>
            <div style={{ color: '#15803d', fontWeight: '500' }}>
              <i className="fas fa-calendar-check" style={{ marginRight: '0.5rem' }}></i>
              Class Schedules
            </div>
            <div style={{ color: '#166534', fontSize: '0.875rem' }}>All classes scheduled</div>
          </div>
          <div style={{ padding: '1rem', backgroundColor: '#f0fdf4', borderRadius: '0.375rem', border: '1px solid #bbf7d0' }}>
            <div style={{ color: '#15803d', fontWeight: '500' }}>
              <i className="fas fa-file-alt" style={{ marginRight: '0.5rem' }}></i>
              Student Records
            </div>
            <div style={{ color: '#166534', fontSize: '0.875rem' }}>Up to date</div>
          </div>
          <div style={{ padding: '1rem', backgroundColor: '#f0fdf4', borderRadius: '0.375rem', border: '1px solid #bbf7d0' }}>
            <div style={{ color: '#15803d', fontWeight: '500' }}>
              <i className="fas fa-credit-card" style={{ marginRight: '0.5rem' }}></i>
              Payment System
            </div>
            <div style={{ color: '#166534', fontSize: '0.875rem' }}>Working properly</div>
          </div>
          <div style={{ padding: '1rem', backgroundColor: '#fef3c7', borderRadius: '0.375rem', border: '1px solid #fde68a' }}>
            <div style={{ color: '#d97706', fontWeight: '500' }}>
              <i className="fas fa-exclamation-triangle" style={{ marginRight: '0.5rem' }}></i>
              Upcoming Events
            </div>
            <div style={{ color: '#92400e', fontSize: '0.875rem' }}>3 events this week</div>
          </div>
        </div>
      </div>
    </div>
  );
}