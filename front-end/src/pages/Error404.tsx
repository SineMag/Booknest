import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button/Button';

const Error404: React.FC = () => {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>

      <h1 style={{ fontSize: '5rem', fontWeight: 'bold' }}>404 PAGE NOT FOUND</h1>
      <br />
      <Link to="/">
        <Button variant="primary">Go back to home</Button>
      </Link>
    </div>
  );
};

export default Error404;