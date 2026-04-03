import * as React from "react";

interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export default function GradientButton({ 
  children, 
  className = "", 
  ...props 
}: GradientButtonProps) {
  return (
    <button 
      className={`h-[56px] flex items-center justify-center text-[16px] leading-[24px] font-bold rounded-xl bg-gradient-to-br from-primary to-primary-container text-on-primary-container shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
