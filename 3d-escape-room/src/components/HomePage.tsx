import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to the 3D Escape Room</h1>
      <button onClick={() => navigate('/room')} style={{ padding: '10px 20px', fontSize: '16px' }}>
        Enter Room
      </button>
    </div>
  );
};

export default HomePage;
