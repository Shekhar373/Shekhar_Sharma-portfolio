import React, {
    createContext,
    useContext,
    useRef,
  } from "react";
  
  const TransitionContext = createContext(null);
  
  export const TransitionProvider = ({ children }) => {
    const pageTransition = useRef(null);
  
    return (
      <TransitionContext.Provider value={{ pageTransition }}>
        {children(pageTransition)}
      </TransitionContext.Provider>
    );
  };
  
  export const useTransition = () => {
    return useContext(TransitionContext);
  };