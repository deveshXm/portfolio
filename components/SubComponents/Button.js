import React from "react";

const Button = ({ title }) => {
  return (
    <a href="#" class="button nav-link">
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
