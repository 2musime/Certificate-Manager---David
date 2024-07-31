import React, { useState } from 'react';
import { useUser } from './context/UserContext';
import '../styles/CommentModal.css';

interface CommentModalProps {
  onAddComment: (comment: { text: string; user: string }) => void;
  onClose: () => void;
}

const CommentModal: React.FC<CommentModalProps> = ({ onAddComment, onClose }) => {
  const [commentText, setCommentText] = useState('');
  const { user } = useUser(); 

  const handleSubmit = () => {
    if (commentText.trim()) {
      onAddComment({
        text: commentText,
        user: user || 'Unknown',
      });
      setCommentText('');
      onClose();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add Comment</h2>
        <h5>{user}</h5>
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Comment"/>
        <div className="modal-buttons">
          <button onClick={handleSubmit}>Send</button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
