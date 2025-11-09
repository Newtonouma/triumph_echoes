'use client';

import { useState } from 'react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('general');
  const [isEditing, setIsEditing] = useState(false);

  const tabs = [
    { id: 'general', name: 'General Settings', icon: 'cog' },
    { id: 'appearance', name: 'Appearance', icon: 'paint-brush' },
    { id: 'notifications', name: 'Notifications', icon: 'bell' },
    { id: 'security', name: 'Security', icon: 'lock' },
    { id: 'integrations', name: 'Integrations', icon: 'plug' },
  ];

  const handleSave = () => {
    setIsEditing(false);
    alert('Settings saved successfully!');
  };

  const renderGeneralSettings = () => (
    <div className="admin-form">
      <h3 style={{ marginBottom: '1.5rem', color: '#03111E' }}>General Settings</h3>
      
      <div className="form-group">
        <label className="form-label">Site Name</label>
        <input 
          type="text" 
          className="form-input" 
          defaultValue="Triumph Echoes Academy"
          disabled={!isEditing}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Site Description</label>
        <textarea 
          className="form-textarea" 
          defaultValue="Transform into a confident communicator at Triumph Echoes Academy of Public Speaking."
          disabled={!isEditing}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Contact Email</label>
        <input 
          type="email" 
          className="form-input" 
          defaultValue="admin@triumphechoes.com"
          disabled={!isEditing}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Contact Phone</label>
        <input 
          type="tel" 
          className="form-input" 
          defaultValue="+1 (555) 123-4567"
          disabled={!isEditing}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Business Address</label>
        <textarea 
          className="form-textarea" 
          defaultValue="123 Speaking Street, Communication City, CC 12345"
          disabled={!isEditing}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Time Zone</label>
        <select className="form-select" disabled={!isEditing}>
          <option value="America/New_York">Eastern Time (ET)</option>
          <option value="America/Chicago">Central Time (CT)</option>
          <option value="America/Denver">Mountain Time (MT)</option>
          <option value="America/Los_Angeles">Pacific Time (PT)</option>
        </select>
      </div>
    </div>
  );

  const renderAppearanceSettings = () => (
    <div className="admin-form">
      <h3 style={{ marginBottom: '1.5rem', color: '#03111E' }}>Appearance Settings</h3>
      
      <div className="form-group">
        <label className="form-label">Primary Color</label>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <input 
            type="color" 
            defaultValue="#FC7423"
            disabled={!isEditing}
            style={{ width: '60px', height: '40px', border: 'none', borderRadius: '0.375rem' }}
          />
          <input 
            type="text" 
            className="form-input" 
            defaultValue="#FC7423"
            disabled={!isEditing}
            style={{ flex: 1 }}
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Secondary Color</label>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <input 
            type="color" 
            defaultValue="#03111E"
            disabled={!isEditing}
            style={{ width: '60px', height: '40px', border: 'none', borderRadius: '0.375rem' }}
          />
          <input 
            type="text" 
            className="form-input" 
            defaultValue="#03111E"
            disabled={!isEditing}
            style={{ flex: 1 }}
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Logo Upload</label>
        <div style={{ 
          border: '2px dashed #e5e7eb', 
          borderRadius: '0.5rem', 
          padding: '2rem', 
          textAlign: 'center',
          backgroundColor: '#f8fafc'
        }}>
          <div style={{ marginBottom: '1rem', fontSize: '2rem', color: '#d1d5db' }}>
            <i className="fas fa-image"></i>
          </div>
          <p style={{ margin: 0, color: '#6b7280' }}>
            Current logo: logo.png
          </p>
          {isEditing && (
            <button className="btn btn-secondary" style={{ marginTop: '1rem' }}>
              <i className="fas fa-upload" style={{ marginRight: '0.5rem' }}></i>
              Upload New Logo
            </button>
          )}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Font Family</label>
        <select className="form-select" disabled={!isEditing}>
          <option value="Inter">Inter</option>
          <option value="Roboto">Roboto</option>
          <option value="Open Sans">Open Sans</option>
          <option value="Poppins">Poppins</option>
        </select>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="admin-form">
      <h3 style={{ marginBottom: '1.5rem', color: '#03111E' }}>Notification Settings</h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '0.5rem' }}>
          <div>
            <div style={{ fontWeight: '500', color: '#374151' }}>New User Registration</div>
            <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Get notified when new users register</div>
          </div>
          <input type="checkbox" defaultChecked disabled={!isEditing} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '0.5rem' }}>
          <div>
            <div style={{ fontWeight: '500', color: '#374151' }}>Program Inquiries</div>
            <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Get notified about new program inquiries</div>
          </div>
          <input type="checkbox" defaultChecked disabled={!isEditing} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '0.5rem' }}>
          <div>
            <div style={{ fontWeight: '500', color: '#374151' }}>Payment Notifications</div>
            <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Get notified about payments and transactions</div>
          </div>
          <input type="checkbox" defaultChecked disabled={!isEditing} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '0.5rem' }}>
          <div>
            <div style={{ fontWeight: '500', color: '#374151' }}>System Updates</div>
            <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Get notified about system maintenance and updates</div>
          </div>
          <input type="checkbox" disabled={!isEditing} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '0.5rem' }}>
          <div>
            <div style={{ fontWeight: '500', color: '#374151' }}>Weekly Reports</div>
            <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Receive weekly analytics reports via email</div>
          </div>
          <input type="checkbox" defaultChecked disabled={!isEditing} />
        </div>
      </div>

      <div className="form-group" style={{ marginTop: '2rem' }}>
        <label className="form-label">Notification Email</label>
        <input 
          type="email" 
          className="form-input" 
          defaultValue="admin@triumphechoes.com"
          disabled={!isEditing}
        />
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="admin-form">
      <h3 style={{ marginBottom: '1.5rem', color: '#03111E' }}>Security Settings</h3>
      
      <div className="form-group">
        <label className="form-label">Current Password</label>
        <input 
          type="password" 
          className="form-input" 
          placeholder="Enter current password"
          disabled={!isEditing}
        />
      </div>

      <div className="form-group">
        <label className="form-label">New Password</label>
        <input 
          type="password" 
          className="form-input" 
          placeholder="Enter new password"
          disabled={!isEditing}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Confirm New Password</label>
        <input 
          type="password" 
          className="form-input" 
          placeholder="Confirm new password"
          disabled={!isEditing}
        />
      </div>

      <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '0.5rem', border: '1px solid #e5e7eb' }}>
        <h4 style={{ marginTop: 0, color: '#374151' }}>Two-Factor Authentication</h4>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontWeight: '500', color: '#374151' }}>Enable 2FA</div>
            <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Add an extra layer of security to your account</div>
          </div>
          <button className={`btn ${isEditing ? 'btn-primary' : 'btn-secondary'}`} disabled={!isEditing}>
            {isEditing ? 'Setup 2FA' : 'Disabled'}
          </button>
        </div>
      </div>

      <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#fef3c7', borderRadius: '0.5rem', border: '1px solid #fde68a' }}>
        <h4 style={{ marginTop: 0, color: '#92400e' }}>Session Management</h4>
        <p style={{ margin: '0 0 1rem 0', color: '#92400e', fontSize: '0.875rem' }}>
          You are currently logged in from 2 devices.
        </p>
        <button className="btn btn-danger" style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}>
          Revoke All Sessions
        </button>
      </div>
    </div>
  );

  const renderIntegrationsSettings = () => (
    <div className="admin-form">
      <h3 style={{ marginBottom: '1.5rem', color: '#03111E' }}>Integrations</h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ border: '1px solid #e5e7eb', borderRadius: '0.5rem', padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h4 style={{ margin: '0 0 0.5rem 0', color: '#374151' }}>
                <i className="fas fa-envelope" style={{ marginRight: '0.5rem' }}></i>
                Email Service
              </h4>
              <p style={{ margin: 0, color: '#6b7280', fontSize: '0.875rem' }}>
                Configure email service for notifications and communications
              </p>
            </div>
            <span style={{ 
              padding: '0.25rem 0.75rem',
              borderRadius: '1rem',
              fontSize: '0.75rem',
              fontWeight: '500',
              backgroundColor: '#10b98120',
              color: '#10b981'
            }}>
              Connected
            </span>
          </div>
          {isEditing && (
            <button className="btn btn-secondary" style={{ marginTop: '1rem' }}>
              Configure
            </button>
          )}
        </div>

        <div style={{ border: '1px solid #e5e7eb', borderRadius: '0.5rem', padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h4 style={{ margin: '0 0 0.5rem 0', color: '#374151' }}>
                <i className="fas fa-chart-line" style={{ marginRight: '0.5rem' }}></i>
                Google Analytics
              </h4>
              <p style={{ margin: 0, color: '#6b7280', fontSize: '0.875rem' }}>
                Track website analytics and user behavior
              </p>
            </div>
            <span style={{ 
              padding: '0.25rem 0.75rem',
              borderRadius: '1rem',
              fontSize: '0.75rem',
              fontWeight: '500',
              backgroundColor: '#6b728020',
              color: '#6b7280'
            }}>
              Not Connected
            </span>
          </div>
          {isEditing && (
            <button className="btn btn-primary" style={{ marginTop: '1rem' }}>
              Connect
            </button>
          )}
        </div>

        <div style={{ border: '1px solid #e5e7eb', borderRadius: '0.5rem', padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h4 style={{ margin: '0 0 0.5rem 0', color: '#374151' }}>
                <i className="fas fa-credit-card" style={{ marginRight: '0.5rem' }}></i>
                Payment Gateway
              </h4>
              <p style={{ margin: 0, color: '#6b7280', fontSize: '0.875rem' }}>
                Stripe integration for processing payments
              </p>
            </div>
            <span style={{ 
              padding: '0.25rem 0.75rem',
              borderRadius: '1rem',
              fontSize: '0.75rem',
              fontWeight: '500',
              backgroundColor: '#10b98120',
              color: '#10b981'
            }}>
              Connected
            </span>
          </div>
          {isEditing && (
            <button className="btn btn-secondary" style={{ marginTop: '1rem' }}>
              Configure
            </button>
          )}
        </div>

        <div style={{ border: '1px solid #e5e7eb', borderRadius: '0.5rem', padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h4 style={{ margin: '0 0 0.5rem 0', color: '#374151' }}>
                <i className="fas fa-share-alt" style={{ marginRight: '0.5rem' }}></i>
                Social Media
              </h4>
              <p style={{ margin: 0, color: '#6b7280', fontSize: '0.875rem' }}>
                Connect social media accounts for sharing and updates
              </p>
            </div>
            <span style={{ 
              padding: '0.25rem 0.75rem',
              borderRadius: '1rem',
              fontSize: '0.75rem',
              fontWeight: '500',
              backgroundColor: '#6b728020',
              color: '#6b7280'
            }}>
              Partial
            </span>
          </div>
          {isEditing && (
            <button className="btn btn-primary" style={{ marginTop: '1rem' }}>
              Setup
            </button>
          )}
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings();
      case 'appearance':
        return renderAppearanceSettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'security':
        return renderSecuritySettings();
      case 'integrations':
        return renderIntegrationsSettings();
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0, color: '#03111E' }}>
          <i className="fas fa-cog" style={{ marginRight: '0.5rem' }}></i>
          Settings
        </h1>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {!isEditing ? (
            <button 
              className="btn btn-primary"
              onClick={() => setIsEditing(true)}
            >
              <i className="fas fa-pencil-alt" style={{ marginRight: '0.5rem' }}></i>
              Edit Settings
            </button>
          ) : (
            <>
              <button 
                className="btn btn-secondary"
                onClick={() => setIsEditing(false)}
              >
                <i className="fas fa-times" style={{ marginRight: '0.5rem' }}></i>
                Cancel
              </button>
              <button 
                className="btn btn-primary"
                onClick={handleSave}
              >
                <i className="fas fa-save" style={{ marginRight: '0.5rem' }}></i>
                Save Changes
              </button>
            </>
          )}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '2rem' }}>
        {/* Sidebar */}
        <div style={{ background: 'white', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0', height: 'fit-content' }}>
          <h3 style={{ margin: '0 0 1rem 0', color: '#374151' }}>Categories</h3>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                width: '100%',
                textAlign: 'left',
                padding: '0.75rem',
                border: 'none',
                background: activeTab === tab.id ? '#FC7423' : 'transparent',
                color: activeTab === tab.id ? 'white' : '#374151',
                borderRadius: '0.375rem',
                marginBottom: '0.5rem',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <i className={`fas fa-${tab.icon}`} style={{ marginRight: '0.75rem' }}></i>
              {tab.name}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}