import React, { useState, useEffect } from 'react';
import { Review } from '../interfaces/Review'; 

interface EditReviewModalProps {
  isOpen: boolean;
  review: Review | null;
  onSave: (updatedReview: Review) => void;
  onClose: () => void;
}

const EditReviewModal: React.FC<EditReviewModalProps> = ({ isOpen, review, onSave, onClose }) => {
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState<number>(0);

  useEffect(() => {
    if (review) {
      setDescription(review.description);
      setRating(review.rating);
    }
  }, [review]);

  const handleSave = async () => {
    const BE_BASE_URL = "http://192.9.242.103:8000";

    if (!review) {
      alert("No review to edit!");
      return;
    }
  
    const updatedReview = {
      description: description,
      rating: rating,
    };
  
    try {
      const response = await fetch(`${BE_BASE_URL}/reviews/${review.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedReview),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to update review: ${response.status}`);
      }
  
      const savedReview = await response.json();
  
      onSave(savedReview);
  
      onClose();
    } catch (error) {
      console.error("Error updating review:", error);
      alert("Failed to update the review. Please try again.");
    }
};


  if (!isOpen) return null;  // If modal is not open

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Review</h2>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label htmlFor="rating">Rating:</label>
        <input
          type="number"
          id="rating"
          value={rating}
          onChange={(e) => setRating(parseInt(e.target.value) || 0)}
          min="1"
          max="5"
        />
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default EditReviewModal;
