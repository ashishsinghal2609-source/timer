"use client";

import React from 'react';


export function Button({ children, variant = 'primary', className = '', ...props }) {
  const base =
    'inline-flex items-center justify-center rounded-md font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-400 disabled:opacity-50 disabled:pointer-events-none select-none';

  const variants = {
    primary: 'bg-pink-500 text-indigo-900 hover:bg-pink-600 focus:ring-pink-400',
    secondary: 'bg-indigo-700 text-pink-300 hover:bg-indigo-600 focus:ring-indigo-500',
    danger: 'bg-pink-700 text-pink-100 hover:bg-pink-800 focus:ring-pink-600',
  };

  return (
    <button
      {...props}
      type={props.type || 'button'}
    >
      {children}
    </button>
  );
}

export default Button;
