import React from 'react';

const Footer = () => {
  return (
    <footer
      style={{
        flexShrink: 0,
        marginTop: '4rem',
        padding: '1rem',
        borderTop: '2px solid rgba(34,36,38,.15)',
        textAlign: 'center'
      }}
    >
      <p>
        Developed by
        <a
          href="https://github.com/sethbernard"
          target="_blank"
          rel="noopener noreferrer"
        >
          {' '}
          Seth Bernard
        </a>
      </p>
      <div id="edamam-badge" data-color="white" />
    </footer>
  );
};

export default Footer;
