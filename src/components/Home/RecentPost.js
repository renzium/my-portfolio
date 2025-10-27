import React from 'react'
import styled from "styled-components"
import HomeStyle from './HomeStyle';
import text from "../../text.json"
import PostCard from "./PostCard";

const RecentPostStyle = styled.div`
  padding: 4rem 1.5rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #ffffff 100%);
  position: relative;

  @media (min-width: 37.5rem) {
    padding: 6rem 2.25rem;
  }

  @media (min-width: 56.25rem) {
    padding: 8rem 6.25rem;
  }

  .header-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 3rem;
  }

  h5 {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--dark);
    
    @media (min-width: 37.5rem) {
      font-size: 2rem;
    }
  }

  .view-all {
    color: var(--secondary);
    cursor: pointer;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.3s ease;
    
    &:hover {
      color: var(--primary);
      transform: translateX(4px);
    }
  }

  .posts-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;

    @media (min-width: 37.5rem) {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;

function RecentPost() {
  return (
    <RecentPostStyle>
      <div className="header-wrapper">
        <h5>Recent Posts</h5>
        <a href="/blog" className="view-all">View all →</a>
      </div>
      <div className="posts-grid">
        {text.home.recent_posts.map((item) => (
          <PostCard
            title={item.title}
            date={item.date}
            key={item.date + item.title}
            topic={item.topic}
            text={item.text.substring(0, 250) + "..."}
          />
        ))}
      </div>
    </RecentPostStyle>
  );
}

export default RecentPost
