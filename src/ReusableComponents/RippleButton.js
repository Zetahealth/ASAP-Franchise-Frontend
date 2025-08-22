import React from "react";

const RippleButton = ({ children, onClick }) => {
  const handleClick = (e) => {
    const button = e.currentTarget;
    const circle = document.createElement("span");

    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${e.clientY - button.offsetTop - radius}px`;
    circle.classList.add("ripple");

    const ripple = button.getElementsByClassName("ripple")[0];

    if (ripple) {
      ripple.remove();
    }

    button.appendChild(circle);

    if (onClick) onClick(e);
  };

  return (
    <button
      onClick={handleClick}
      className="relative overflow-hidden px-6 py-2 bg-[#943032ff] text-white rounded-full 
                 transition-all duration-300 ease-out 
                 transform hover:scale-105 hover:-translate-y-1 hover:shadow-lg 
                 active:scale-95"
    >
      {children}
    </button>
  );
};

export default RippleButton;
