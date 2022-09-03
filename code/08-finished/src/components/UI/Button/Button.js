import React from 'react';

import styles from './Button.module.css';
//CSS Module Concept  (To use this change xxx.css file name with xxx.module.css)
//Here importing Button.module.css in to "styles"(any name is fine). 
//This "styles" alias(name upto you) acts as a object and we can acess all styles in that css file using dot(.) like styles.button)

//Install styled component "npm install --save styled-components"
/* import styled from 'styled-components'; */

//In below 'button' is a method in 'styled' component. After 'button' we use back tick i.e JS Template Literal Syntax
//Styles added inside Template Literal applied to 'Button' constant and at the end it's a Button component.
//&.focus is equal to ".button:focus". Means '&' pointing to current button context. 
/*
const Button = styled.button`
  width: 100%;
  font: inherit;
  padding: 0.5rem 1.5rem;
  border: 1px solid #8b005d;
  color: white;
  background: #8b005d;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.26);
  cursor: pointer;

  @media (min-width: 768px) {
    width: auto;
  }

  &:focus {
    outline: none;
  }

  &:hover,
  &:active {
    background: #ac0e77;
    border-color: #ac0e77;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.26);
  }
`;
*/

const Button = props => {
  return (
    <button type={props.type} className={styles.button} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Button;
