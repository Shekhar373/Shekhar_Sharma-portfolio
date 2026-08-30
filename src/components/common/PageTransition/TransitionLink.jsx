import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTransition } from "./TransitionContext";

const TransitionLink = ({ to, children, className = "" }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pageTransition } = useTransition();

  const handleClick = async (e) => {
    e.preventDefault();

    // Don't animate if already on this page
    if (location.pathname === to) return;

    // Cover current page
    await pageTransition.current.cover();

    // Change route
    navigate(to);

    // Scroll to top
    window.scrollTo(0, 0);

    // Small delay so React can render the new page
    requestAnimationFrame(async () => {
      await pageTransition.current.reveal();
    });
  };

  return (
    <a
      href={to}
      onClick={handleClick}
      className={className}
    >
      {children}
    </a>
  );
};

export default TransitionLink;