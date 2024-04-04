// DeleteUserModal.tsx
import React, { useState } from 'react';

interface DeleteUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDeleteUser: (email: string) => void;
}

const DeleteUserModal: React.FC<DeleteUserModalProps> = ({ isOpen, onClose, onDeleteUser }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onDeleteUser(email);
  };

  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', zIndex: 100 }}>
      <h2>Delete User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="delete-email">Email:</label>
          <input
            id="delete-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Delete</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default DeleteUserModal;
