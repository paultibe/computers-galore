// ReviewModal.tsx
import React from 'react';

interface Review {
  id: number;
  type: string; // 'Performance' | 'Satisfaction' | 'Design'
  description: string;
  rating: number;
  // Include other review properties as needed
}

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  reviews: Review[];
}

const ReviewModal: React.FC<ReviewModalProps> = ({ isOpen, onClose, reviews }) => {
  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '5px', maxWidth: '600px', maxHeight: '80vh', overflowY: 'auto' }}>
        <button onClick={onClose} style={{ display: 'block', marginBottom: '10px' }}>Close</button>
        <h2>My Reviews</h2>
        {reviews.length > 0 ? (
          <ul>
            {reviews.map((review) => (
              <li key={review.id} style={{ borderBottom: '1px solid #ccc', paddingBottom: '10px', marginBottom: '10px' }}>
                <h4>{review.type} Review</h4>
                <p>Rating: {review.rating}</p>
                <p>Description: {review.description}</p>
                {/* Render other review details as needed */}
              </li>
            ))}
          </ul>
        ) : (
          <p>No reviews found.</p>
        )}
      </div>
    </div>
  );
};

export default ReviewModal;
