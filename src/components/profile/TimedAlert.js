import React, { useState, useEffect } from "react";
import styled from "styled-components";

const TimedAlert = ({ message }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);

        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return <AlertContainer isVisible={isVisible}>{message}</AlertContainer>;
};

export default TimedAlert;

const AlertContainer = styled.div`
  width: 60vw;
  height: auto;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
  background-color: #afe1af;
  text-align: center;
  font-size: 22px;
  color: #333333;
  padding: 20px 30px;
  border-radius: 5px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: opacity 0.5s ease-in-out;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};

  @media (max-width: 460px) {
    font-size: 18px;
  }
`;
