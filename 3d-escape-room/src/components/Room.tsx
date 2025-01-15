import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import Puzzle from './Puzzle';

const Room: React.FC = () => {
  const [solved, setSolved] = useState(false);

  const EscapeRoom = () => {
    const { scene } = useGLTF('/assets/escape-room.glb');
    return <primitive object={scene} />;
  };

  return (
    <>
      <Canvas camera={{ position: [0, 2, 5] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} />
        <OrbitControls />
        <EscapeRoom />
      </Canvas>
      {!solved && <Puzzle onSolve={() => setSolved(true)} />}
      {solved && <div style={{ position: 'absolute', top: '20px', left: '20px' }}>Door Opened!</div>}
    </>
  );
};

export default Room;
