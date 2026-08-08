import React, { ReactNode } from 'react';

interface ScrollStackProps {
  children: ReactNode;
}

export const ScrollStack: React.FC<ScrollStackProps> = ({ children }) => {
  return (
    <div className="relative w-full flex flex-col gap-12 sm:gap-24 py-12 mb-32">
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { index } as any);
        }
        return child;
      })}
    </div>
  );
};

interface ScrollStackItemProps {
  children: ReactNode;
  index?: number;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({ children, index = 0 }) => {
  // We use a sticky position so as the user scrolls, each card sticks to the top.
  return (
    <div 
      className="sticky w-full flex justify-center origin-top"
      style={{ 
        top: `calc(15vh + ${index * 30}px)`, // Stacks them with a 30px offset
      }}
    >
      <div 
        className="w-full bg-background border border-border rounded-[2rem] p-6 sm:p-12 shadow-2xl"
      >
        {children}
      </div>
    </div>
  );
};

export default ScrollStack;
