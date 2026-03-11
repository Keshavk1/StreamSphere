import React, { useEffect, useState } from 'react';
import { commentAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import '../styles/CommentBox.css';

const CommentBox = ({ videoId, onCommentAdded }) => {
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId]);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const res = await commentAPI.getComments(videoId);
      // Backend returns array directly
      setComments(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error('Failed to fetch comments', err);
      setComments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('Please login to comment');
      return;
    }
    if (!text.trim()) return;

    try {
      await commentAPI.addComment(videoId, { text });
      setText('');
      fetchComments();
      if (onCommentAdded) onCommentAdded();
    } catch (err) {
      console.error('Failed to add comment', err);
    }
  };

  const handleLike = async (commentId) => {
    try {
      await commentAPI.likeComment(commentId);
      fetchComments();
    } catch (err) {
      console.error('Failed to like comment', err);
    }
  };

  return (
    <div className="comment-box">
      <h3>Comments</h3>

      <form className="comment-form" onSubmit={handleAddComment}>
        <textarea
          placeholder={user ? 'Add a public comment...' : 'Login to comment'}
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={!user}
        />
        <div className="comment-actions">
          <button type="submit" className="comment-submit" disabled={!user || !text.trim()}>
            Comment
          </button>
        </div>
      </form>

      {loading && <div className="comments-loading">Loading comments...</div>}

      <div className="comments-list">
        {comments.length === 0 && !loading && <p className="no-comments">No comments yet.</p>}

        {comments.map((c) => (
          <div className="comment-item" key={c._id}>
            <div className="comment-author">{c.author?.username || 'Anonymous'}</div>
            <div className="comment-text">{c.text}</div>
            <div className="comment-meta">
              <span className="comment-date">{new Date(c.createdAt).toLocaleString()}</span>
              <button className="comment-like" onClick={() => handleLike(c._id)}>👍 {c.likedBy?.length || 0}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentBox;
