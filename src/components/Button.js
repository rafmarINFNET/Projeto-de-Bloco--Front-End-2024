// src/components/Button.js
import React from "react";
import styled from "styled-components";
import { FaHeart } from "react-icons/fa";

const StyledButton = styled.button`
  padding: 10px 10px;
  font-size: 16px;
  color: white;
  background-color: ${(props) => (props.primary ? "#e50914" : "#555")};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;

  &:hover {
    background-color: ${(props) => (props.primary ? "#f40612" : "#777")};
  }

  @media (max-width: 768px) {
    font-size: 13px;
    padding: 8px 8px; /* Diminuindo o padding para telas menores */
  }

  @media (max-width: 480px) {
    font-size: 12px; /* Tamanho ainda menor em telas pequenas */
    padding: 6px 6px; /* Ajustando o padding para telas muito pequenas */
  }
`;

const Button = ({ children, primary, onClick, icon: Icon }) => {
  return (
    <StyledButton primary={primary} onClick={onClick}>
      {Icon && <Icon style={{ marginRight: "8px", fontSize: "18px" }} />}
      {children}
    </StyledButton>
  );
};

export default Button;
