import React, { useState } from 'react';
import { useUser } from '../../../context/UserContext';
import "../comment/CommentModal.css";

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
    <div className="cmodal-overlay">
      <div className="cmodal-content">
        <h2>Add Comment</h2>
        <h5>{user}</h5>
        <textarea required
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Comment"/>
        <div className="cmodal-buttons">
          <button onClick={handleSubmit} className='submit'>Send</button>
          <button onClick={onClose} className='closing'>Close</button>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
