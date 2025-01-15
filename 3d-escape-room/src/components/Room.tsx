import React, { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { PointerLockControls, useGLTF } from '@react-three/drei';
import { Vector3 } from 'three';

const Room: React.FC = () => {
  const [solved, setSolved] = useState(false);

  const EscapeRoom = () => {
    const { scene } = useGLTF('/assets/big_room.glb');
    return <primitive object={scene} />;
  };

  const MovementControls = () => {
    const cameraRef = useRef<any>(null);
    const moveSpeed = 0.1;

    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (!cameraRef.current) return;

        const direction = new Vector3();
        const camera = cameraRef.current;

        // Determine movement direction
        if (event.key === 'ArrowUp' || event.key === 'w') {
          camera.getWorldDirection(direction);
          camera.position.addScaledVector(direction, moveSpeed);
        } else if (event.key === 'ArrowDown' || event.key === 's') {
          camera.getWorldDirection(direction);
          camera.position.addScaledVector(direction, -moveSpeed);
        } else if (event.key === 'ArrowLeft' || event.key === 'a') {
          direction.set(-1, 0, 0).applyQuaternion(camera.quaternion);
          camera.position.addScaledVector(direction, moveSpeed);
        } else if (event.key === 'ArrowRight' || event.key === 'd') {
          direction.set(1, 0, 0).applyQuaternion(camera.quaternion);
          camera.position.addScaledVector(direction, moveSpeed);
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
      <PointerLockControls
        ref={cameraRef}
        makeDefault
        onPointerOver
      />
    );
  };

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <Canvas camera={{ position: [0, 2, 5] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} />
        <MovementControls />
        <EscapeRoom />
      </Canvas>
      {!solved && (
        <div style={{ position: 'absolute', top: '20px', left: '20px', color: 'white' }}>
          Solve the Puzzle!
        </div>
      )}
      {solved && (
        <div style={{ position: 'absolute', top: '20px', left: '20px', color: 'white' }}>
          Door Opened!
        </div>
      )}
    </div>
  );
};

export default Room;
