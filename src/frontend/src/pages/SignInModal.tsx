// SignInModal.tsx
import React, { useState } from 'react';

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignIn: (email: string) => void;
}

const SignInModal: React.FC<SignInModalProps> = ({ isOpen, onClose, onSignIn }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSignIn(email);
  };

  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', zIndex: 100 }}>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <button type="submit">Sign In</button>
        <button type="button" onClick={onClose}>Close</button>
      </form>
    </div>
  );
};

export default SignInModal;
