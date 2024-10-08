import React, { useEffect, useState } from 'react';
import { useUser } from '../../../context/UserContext';
import "../comment/CommentModal.css";

interface CommentModalProps {
  onAddComment: (comment: { text: string; user: string }) => void;
  certificateId?: number;
  onClose: () => void;
}

interface User {
  userId: number;
  name: string;
}

const CommentModal: React.FC<CommentModalProps> = ({ onAddComment, certificateId, onClose }) => {
  const [commentText, setCommentText] = useState('');
  const { user } = useUser();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch('https://localhost:7164/api/Users')
      .then(response => response.json())
      .then(data => {
        setUsers(data.filter((info: User) => info.name === user));
      })
      .catch(err => console.error(err));
  }, [user]);

  const handleCommentSubmit = async () => {
    if (commentText.trim()) {
      const data = {
        userId: users[0]?.userId, 
        userComment: commentText,
      };
      try {
        const response = await fetch(`https://localhost:7164/api/Comments/${certificateId}`, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: { 'accept': 'text/plain', 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        console.log('Comment added:', result);

        // Use text and user to match the expected structure
        onAddComment({
          text: commentText,
          user: user || '',
        });

        setCommentText('');
        onClose();
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    }
  };

  return (
    <div className="cmodal-overlay">
      <div className="cmodal-content">
        <h2>Add Comment</h2>
        <h5>{user}</h5>
        <textarea
          required
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Comment"
        />
        <div className="cmodal-buttons">
          <button onClick={handleCommentSubmit} className="submit">
            Send
          </button>
          <button onClick={onClose} className="closing">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
