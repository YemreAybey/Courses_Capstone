import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <span className="footer-element">
        <i className="fas fa-search"></i>
        <div>Search</div>
      </span>
      <span className="footer-element">
        <i className="fas fa-comment"></i>
        <div>Messages</div>
      </span>
      <span className="footer-element">
        <i className="fas fa-plus-circle"></i>
      </span>
      <span className="footer-element">
        <i className="fas fa-bell"></i>
        <div>Notification</div>
      </span>
      <span className="footer-element">
        <i className="fas fa-user"></i>
        <div>Profile</div>
      </span>
    </footer>
  );
};

export default Footer;
