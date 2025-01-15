import React, { useState } from 'react';

interface PuzzleProps {
  onSolve: () => void;
}

const Puzzle: React.FC<PuzzleProps> = ({ onSolve }) => {
  const [input, setInput] = useState('');

  const handleSolve = () => {
    if (input === '1234') {
      onSolve();
    } else {
      alert('Wrong pin!');
    }
  };

  return (
    <div style={{ position: 'absolute', top: '20px', left: '20px', background: '#fff', padding: '10px' }}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter pin"
        style={{ marginRight: '10px' }}
      />
      <button onClick={handleSolve}>Submit</button>
    </div>
  );
};

export default Puzzle;
