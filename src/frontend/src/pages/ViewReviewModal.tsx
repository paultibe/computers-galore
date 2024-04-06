// ViewReviewModal.tsx
import React from 'react';
import { Review } from '../interfaces/Review'; 

interface ViewReviewModalProps {
  isOpen: boolean;
  reviews: Review[];
  onClose: () => void;
  onEdit: (review: Review) => void; 
}

const ViewReviewModal: React.FC<ViewReviewModalProps> = ({
  isOpen,
  reviews,
  onClose,
  onEdit,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>My Reviews</h2>
        {reviews.map((review) => (
          <div key={review.id} className="review">
            <p><strong>Type:</strong> {review.reviewType}</p>
            <p><strong>Description:</strong> {review.description}</p>
            <p><strong>Rating:</strong> {review.rating}</p>
            <button onClick={() => onEdit(review)}>Edit</button>
          </div>
        ))}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ViewReviewModal;
