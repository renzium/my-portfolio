import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const PostCardStyle = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  height: 100%;
  border: 1px solid rgba(0, 0, 0, 0.05);
  cursor: pointer;
  text-decoration: none;
  display: block;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  }

  h2 {
    font-weight: 700;
    font-size: 1.375rem;
    line-height: 1.4;
    margin-bottom: 1rem;
    color: var(--dark);
  }

  .meta-info {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
    font-size: 0.875rem;
    color: var(--light);
  }

  .topic-badge {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 1rem;
    font-size: 0.75rem;
    font-weight: 600;
  }

  p {
    font-weight: 400;
    line-height: 1.6;
    color: #4a5568;
  }
`;

function PostCard({ title, date, topic, text, slug }) {
  // Map post titles to slugs
  const getSlug = (postTitle) => {
    if (postTitle.toLowerCase().includes('cross-platform') || postTitle.toLowerCase().includes('react native')) {
      return '/blog/react-native-development';
    } else if (postTitle.toLowerCase().includes('ai voice') || postTitle.toLowerCase().includes('voice feature')) {
      return '/blog/ai-voice-features';
    }
    return '/blog';
  };

  const postSlug = slug || getSlug(title);

  return (
    <Link to={postSlug} style={{ textDecoration: 'none', color: 'inherit' }}>
      <PostCardStyle>
        <h2>{title}</h2>
        <div className="meta-info">
          <span>{date}</span>
          <span>•</span>
          <span className="topic-badge">{topic}</span>
        </div>
        <p>{text}</p>
        <span style={{ color: '#667eea', fontWeight: 600 }}>Read more →</span>
      </PostCardStyle>
    </Link>
  );
}

export default PostCard;
