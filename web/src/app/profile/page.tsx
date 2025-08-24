'use client';

import { useState } from 'react';
import { ArrowLeft, User, Shield, Settings, Mail, Phone, Camera, Save, X } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+234 123 456 7890',
    country: 'Nigeria',
    city: 'Lagos'
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Handle save logic here
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset form data
    setFormData({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '+234 123 456 7890',
      country: 'Nigeria',
      city: 'Lagos'
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Link href="/" className="btn btn-ghost btn-sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </div>
        </div>

        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-h1 text-foreground mb-4">My Profile</h1>
          <p className="text-body-lg text-muted max-w-2xl mx-auto">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Profile Header Card */}
          <div className="card mb-8">
            <div className="card-content">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="h-10 w-10 text-primary" />
                  </div>
                  {isEditing && (
                    <button className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground rounded-full p-2 hover:bg-primary-hover transition-colors">
                      <Camera className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <div className="flex-1">
                  <h2 className="text-h2 text-foreground mb-2">
                    {formData.firstName} {formData.lastName}
                  </h2>
                  <p className="text-body text-muted mb-1">{formData.email}</p>
                  <p className="text-body-sm text-muted">Member since January 2024</p>
                </div>
                <div className="flex gap-2">
                  {isEditing ? (
                    <>
                      <button onClick={handleCancel} className="btn btn-outline btn-sm">
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </button>
                      <button onClick={handleSave} className="btn btn-primary btn-sm">
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </button>
                    </>
                  ) : (
                    <button onClick={() => setIsEditing(true)} className="btn btn-primary btn-sm">
                      <Settings className="h-4 w-4 mr-2" />
                      Edit Profile
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Profile Form */}
          <div className="card">
            <div className="card-header">
              <h3 className="text-h3 text-foreground flex items-center">
                <User className="h-5 w-5 mr-2 text-primary" />
                Personal Information
              </h3>
            </div>
            <div className="card-content">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-group">
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="form-input"
                    disabled={!isEditing}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="form-input"
                    disabled={!isEditing}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="form-input pl-10"
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="form-input pl-10"
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Country</label>
                  <select
                    value={formData.country}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                    className="form-select"
                    disabled={!isEditing}
                  >
                    <option value="Nigeria">Nigeria</option>
                    <option value="Kenya">Kenya</option>
                    <option value="Ghana">Ghana</option>
                    <option value="South Africa">South Africa</option>
                    <option value="Egypt">Egypt</option>
                    <option value="Morocco">Morocco</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="form-input"
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="card mt-8">
            <div className="card-header">
              <h3 className="text-h3 text-foreground flex items-center">
                <Shield className="h-5 w-5 mr-2 text-primary" />
                Security Settings
              </h3>
            </div>
            <div className="card-content">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <h4 className="text-h4 text-foreground mb-1">Two-Factor Authentication</h4>
                    <p className="text-body-sm text-muted">Add an extra layer of security to your account</p>
                  </div>
                  <button className="btn btn-outline btn-sm">Enable</button>
                </div>
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <h4 className="text-h4 text-foreground mb-1">Change Password</h4>
                    <p className="text-body-sm text-muted">Update your password regularly for security</p>
                  </div>
                  <button className="btn btn-outline btn-sm">Change</button>
                </div>
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <h4 className="text-h4 text-foreground mb-1">Login History</h4>
                    <p className="text-body-sm text-muted">View your recent login activity</p>
                  </div>
                  <button className="btn btn-outline btn-sm">View</button>
                </div>
              </div>
            </div>
          </div>

          {/* Account Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="card text-center">
              <div className="card-content">
                <div className="text-h3 text-primary font-bold mb-2">156</div>
                <div className="text-body-sm text-muted">Markets Traded</div>
              </div>
            </div>
            <div className="card text-center">
              <div className="card-content">
                <div className="text-h3 text-success font-bold mb-2">$12,450</div>
                <div className="text-body-sm text-muted">Total Winnings</div>
              </div>
            </div>
            <div className="card text-center">
              <div className="card-content">
                <div className="text-h3 text-warning font-bold mb-2">89%</div>
                <div className="text-body-sm text-muted">Win Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
