import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const CallToAction = ({ linkTo, text }) => {
  return (
    <CallToActionWrapper>
      <Link to={linkTo}>
        <p>{text}</p>
      </Link>
    </CallToActionWrapper>
  );
};

export default CallToAction;

const CallToActionWrapper = styled.div`
  position: relative;
  height: 60px;
  width: 180px;
  background: white;
  border-radius: 20px;
  background-color: var(--text-primary-color);
  transition: all ease 1s;
  &:hover {
    background-color: white;
    p {
      color: var(--text-primary-color);
    }
  }
  p {
    margin: 0;
    position: relative;
    top: 25%;
    text-align: center;
    color: white;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 20px;
  }
`;
