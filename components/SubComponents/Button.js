import React from "react";

const Button = ({ title , link}) => {
  return (
    <a href={link} class="button nav-link" target="_blank" rel="noreferrer">
      <div class="bottom"></div>
      <div class="top">
        <div class="label">{title}</div>
        <div class="button-border button-border-left"></div>
        <div class="button-border button-border-top"></div>
        <div class="button-border button-border-right"></div>
        <div class="button-border button-border-bottom"></div>
      </div>
    </a>
  );
};

export default Button;
