import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './components.css';

const CollaborationHub = () => {
  const [activeSection, setActiveSection] = useState('opportunities');

  const collaborationOpportunities = [
    {
      id: 1,
      title: "Tech Summit 2025 Partnership",
      organizer: "TechCorp Inc.",
      type: "Sponsorship",
      description: "Looking for event technology partners for our annual tech summit. Great exposure opportunity.",
      skills: ["Event Management", "Technology", "Marketing"],
      budget: "$10,000 - $25,000",
      deadline: "2025-08-15",
      applicants: 12,
      status: "open"
    },
    {
      id: 2,
      title: "Design Workshop Collaboration",
      organizer: "Creative Studios",
      type: "Content Partnership",
      description: "Seeking design experts to co-host a series of UX/UI workshops for designers.",
      skills: ["UX Design", "Teaching", "Workshop Facilitation"],
      budget: "Revenue Share",
      deadline: "2025-08-20",
      applicants: 8,
      status: "open"
    },
    {
      id: 3,
      title: "Startup Pitch Event",
      organizer: "Innovation Hub",
      type: "Venue Partnership",
      description: "Partner with us to provide venue and networking space for monthly startup pitch events.",
      skills: ["Venue Management", "Networking", "Startup Ecosystem"],
      budget: "$5,000 - $8,000",
      deadline: "2025-08-10",
      applicants: 15,
      status: "urgent"
    }
  ];

  const myCollaborations = [
    {
      id: 1,
      title: "AI Conference Series",
      partner: "DataTech Solutions",
      status: "active",
      nextMeeting: "2025-08-05",
      progress: 75,
      tasks: ["Finalize speakers", "Marketing campaign", "Venue setup"]
    },
    {
      id: 2,
      title: "Coding Bootcamp",
      partner: "EduTech Academy",
      status: "planning",
      nextMeeting: "2025-08-08",
      progress: 45,
      tasks: ["Curriculum design", "Instructor recruitment", "Platform setup"]
    }
  ];

  const networkingRequests = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Event Coordinator",
      company: "Global Events Ltd.",
      message: "Hi! I'd love to connect and discuss potential collaboration opportunities.",
      skills: ["Project Management", "Corporate Events", "International Relations"],
      avatar: "👩‍💼"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Tech Entrepreneur",
      company: "StartupLab",
      message: "Interested in partnering for tech-focused events in the Asia-Pacific region.",
      skills: ["Technology", "Startups", "Innovation"],
      avatar: "👨‍💻"
    }
  ];

  return (
    <div className="collaboration-hub bg-gray-50 dark:bg-black">
      <div className="collaboration-header">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="collaboration-title"
        >
          Collaboration Hub 🤝
        </motion.h1>
        <p className="collaboration-subtitle">Connect, collaborate, and create amazing events together</p>
      </div>

      {/* Navigation Tabs */}
      <div className="collaboration-tabs">
        {[
          { id: 'opportunities', name: 'Opportunities', icon: '🎯' },
          { id: 'my-collaborations', name: 'My Collaborations', icon: '🤝' },
          { id: 'networking', name: 'Networking', icon: '🌐' },
          { id: 'create-request', name: 'Create Request', icon: '➕' }
        ].map((tab) => (
          <button
            key={tab.id}
            className={`tab-button ${activeSection === tab.id ? 'active' : ''}`}
            onClick={() => setActiveSection(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            {tab.name}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeSection}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="tab-content"
      >
        {activeSection === 'opportunities' && (
          <div className="opportunities-section">
            <div className="section-header">
              <h2>Collaboration Opportunities</h2>
              <div className="filter-buttons">
                <button className="filter-btn active">All</button>
                <button className="filter-btn">Sponsorship</button>
                <button className="filter-btn">Content Partnership</button>
                <button className="filter-btn">Venue Partnership</button>
              </div>
            </div>
            
            <div className="opportunities-grid">
              {collaborationOpportunities.map((opportunity, index) => (
                <motion.div
                  key={opportunity.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="opportunity-card"
                >
                  <div className="opportunity-header">
                    <h3 className="opportunity-title">{opportunity.title}</h3>
                    <span className={`status-badge ${opportunity.status}`}>
                      {opportunity.status}
                    </span>
                  </div>
                  
                  <div className="opportunity-meta">
                    <span className="organizer">🏢 {opportunity.organizer}</span>
                    <span className="type">📋 {opportunity.type}</span>
                  </div>
                  
                  <p className="opportunity-description">{opportunity.description}</p>
                  
                  <div className="opportunity-skills">
                    <strong>Required Skills:</strong>
                    <div className="skills-tags">
                      {opportunity.skills.map((skill) => (
                        <span key={skill} className="skill-tag">{skill}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="opportunity-details">
                    <div className="detail-item">
                      <span className="label">Budget:</span>
                      <span className="value">{opportunity.budget}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Deadline:</span>
                      <span className="value">{new Date(opportunity.deadline).toLocaleDateString()}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Applicants:</span>
                      <span className="value">{opportunity.applicants}</span>
                    </div>
                  </div>
                  
                  <div className="opportunity-actions">
                    <button className="btn-primary">Apply Now</button>
                    <button className="btn-outline">Learn More</button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'my-collaborations' && (
          <div className="my-collaborations-section">
            <div className="section-header">
              <h2>My Active Collaborations</h2>
              <button className="btn-primary">+ New Collaboration</button>
            </div>
            
            <div className="collaborations-list">
              {myCollaborations.map((collab, index) => (
                <motion.div
                  key={collab.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="collaboration-card"
                >
                  <div className="collaboration-header">
                    <h3>{collab.title}</h3>
                    <span className={`status-badge ${collab.status}`}>{collab.status}</span>
                  </div>
                  
                  <p className="partner">🤝 Partner: {collab.partner}</p>
                  
                  <div className="progress-section">
                    <div className="progress-header">
                      <span>Progress: {collab.progress}%</span>
                      <span>Next Meeting: {new Date(collab.nextMeeting).toLocaleDateString()}</span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${collab.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="tasks-section">
                    <strong>Upcoming Tasks:</strong>
                    <ul className="tasks-list">
                      {collab.tasks.map((task, taskIndex) => (
                        <li key={taskIndex} className="task-item">{task}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="collaboration-actions">
                    <button className="btn-primary">View Details</button>
                    <button className="btn-outline">Schedule Meeting</button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'networking' && (
          <div className="networking-section">
            <div className="section-header">
              <h2>Networking Requests</h2>
              <button className="btn-primary">Find Collaborators</button>
            </div>
            
            <div className="networking-requests">
              {networkingRequests.map((request, index) => (
                <motion.div
                  key={request.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="networking-card"
                >
                  <div className="networking-header">
                    <div className="profile-info">
                      <span className="avatar">{request.avatar}</span>
                      <div className="name-role">
                        <h3>{request.name}</h3>
                        <p>{request.role} at {request.company}</p>
                      </div>
                    </div>
                  </div>
                  
                  <p className="networking-message">"{request.message}"</p>
                  
                  <div className="networking-skills">
                    <strong>Skills:</strong>
                    <div className="skills-tags">
                      {request.skills.map((skill) => (
                        <span key={skill} className="skill-tag">{skill}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="networking-actions">
                    <button className="btn-primary">Accept</button>
                    <button className="btn-secondary">Message</button>
                    <button className="btn-outline">View Profile</button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'create-request' && (
          <div className="create-request-section">
            <h2>Create Collaboration Request</h2>
            <div className="request-form">
              <div className="form-group">
                <label>Project Title</label>
                <input type="text" placeholder="Enter your collaboration project title" />
              </div>
              
              <div className="form-group">
                <label>Collaboration Type</label>
                <select>
                  <option>Select type</option>
                  <option>Sponsorship</option>
                  <option>Content Partnership</option>
                  <option>Venue Partnership</option>
                  <option>Technical Support</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Description</label>
                <textarea rows="4" placeholder="Describe your collaboration opportunity..."></textarea>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Budget Range</label>
                  <select>
                    <option>Select budget</option>
                    <option>$1,000 - $5,000</option>
                    <option>$5,000 - $10,000</option>
                    <option>$10,000 - $25,000</option>
                    <option>$25,000+</option>
                    <option>Revenue Share</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Deadline</label>
                  <input type="date" />
                </div>
              </div>
              
              <div className="form-group">
                <label>Required Skills</label>
                <input type="text" placeholder="e.g., Event Management, Marketing, Design" />
              </div>
              
              <button className="btn-primary submit-btn">Create Collaboration Request</button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default CollaborationHub;
