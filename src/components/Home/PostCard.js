import React from "react";
import styled from "styled-components";

export const PostCardStyle = styled.div`
  background-color: white;
  padding: 0.7rem 1.25rem 1.375rem;
  border-radius: 0.25rem;
  h2 {
    font-weight: 700;
    font-size: 1.375rem;
    line-height: 1.875rem;
  }
  p {
    font-weight: 400;
    line-height: 1.5rem;
    margin: 0.75rem 0 1.25rem;

    & > span {
      display: inline-block;
    }

    & > span:last-child::before {
      content: "";
      display: inline-block;
      width: 1px;
      height: 1.25rem;
      background-color: black;
      margin: 0 1.5rem;
    }

    @media (min-width: 37.5rem) {
      img {
        padding: 0;
      }
      
    }

    @media (max-width: 43.75rem) and (min-width: 37.5rem) {
      span {
        display: block;
      }
      & > span:last-child::before {
        display: block;
        height: 1px;
        width: 1.25rem;
      }
    }

    @media (min-width: 62.5rem) {
  
    }

    @media (max-width: 350px) {
      span {
        display: block;
      }
      & > span:last-child::before {
        display: block;
        height: 1px;
        width: 1.25rem;
      }
    }
  }
`;

function PostCard({ title, date, topic, text }) {
  return (
    <PostCardStyle>
      <h2>{title}</h2>
      <p>
        <span>{date}</span>
        <span>{topic}</span>
      </p>
      <p>{text}</p>
    </PostCardStyle>
  );
}

export default PostCard;
