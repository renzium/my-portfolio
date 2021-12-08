import React from "react";
import styled from "styled-components";
import HomeStyle from "./HomeStyle";

import {PostCardStyle} from "./PostCard";

const FeaturedStyle = styled(PostCardStyle)`
  img {
    width: calc(100% - 2.25rem);
    padding: 0 1.125rem;
    border-radius: 6px;
    margin-bottom: 1rem;
  }
  p > span:first-child {
    font-size: 400;
    background: var(--dark);
    color: white;
    height: 1.5625rem;
    padding: 0 0.75rem;
    border-radius: 0.75rem;
  }
  p > span:last-child {
    color: var(--light);
  }
  p > span:last-child::before {
    background: transparent;
    color: var(--light);
  }
  @media (min-width: 37.5rem) {
    display: grid;
    grid-template-columns: 1fr 2.06fr;

    img {
      grid-column: 1/2;
      grid-row: 1/4;
      display:block;
      width:100%;
      height:100%;
      padding:0;
      margin:0;
      border-radius: 6px;
      box-shadow: -1px -1px 5px var(--light);
    }
    h2,p{
      padding-left:2rem;
    }
    h2:nth-child(2) {
      grid-column: 2/3;
      grid-row: 1/2;
    }
    p:nth-child(3) {
      grid-column: 2/3;
      grid-row: 2/3;
    }

    p:nth-child(4) {
      grid-column: 2/3;
      grid-row: 3/4;
    }
  }
  @media (max-width: 350px) {
    p {
      span {
      display: inline-block;
    }
    span + span{
      margin-left:2rem;
    }
  }
  }
`;

function FeaturedWorksCard({ image, title, year, topic, text }) {
  return (
    <>
      <FeaturedStyle>
        <img src={image} alt={`${image}`} />
        <h2>{ title }</h2>
        <p>
          <span>{ year }</span>
          <span>{ topic }</span>
        </p>
        <p>{ text }</p>
      </FeaturedStyle>
    </>
  );
}

export default FeaturedWorksCard;