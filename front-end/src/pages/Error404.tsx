import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button/Button';

const Error404: React.FC = () => {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      
      <video src='/Error.mp4' autoPlay muted loop style={{ maxWidth: '100%', height: 'auto' }}></video>
      <br />
      <Link to="/">
        <Button variant="primary">Go back to home</Button>
      </Link>
    </div>
  );
};

export default Error404;