import React, { useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (email: string, username: string) => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 
    onSubmit(email, username);
    setEmail('');
    setUsername('');
    onClose(); 
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Sign Up</h3>
          <div className="mt-2 px-7 py-3">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered input-primary w-full mb-2"
              />
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input input-bordered input-primary w-full mb-2"
              />
              <button type="submit" className="btn btn-primary w-full mt-2">Submit</button>
            </form>
          </div>
          <div className="items-center px-4 py-3">
            <button onClick={onClose} className="btn btn-error btn-outline">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
