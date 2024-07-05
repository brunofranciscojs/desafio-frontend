import React from 'react';

interface ButtonProps {
  title: string;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  disabled?:boolean;
}

const Button: React.FC<ButtonProps> = ({ className, title, onClick, style, disabled }) => {
    return (
      <button className={className} onClick={onClick} style={style} disabled={disabled}>
        <span>{title}</span>
      </button>
    );
};

export default Button;


