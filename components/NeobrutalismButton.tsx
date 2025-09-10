import React from 'react';

interface NeobrutalismButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const NeobrutalismButton: React.FC<NeobrutalismButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      className={`w-full px-6 py-3 text-lg font-bold text-black bg-lime-300 border-4 border-black shadow-[4px_4px_0_0_#000] transition-all
                 hover:shadow-none hover:translate-x-1 hover:translate-y-1
                 active:translate-x-0 active:translate-y-0 active:shadow-[1px_1px_0_0_#000]
                 disabled:bg-gray-400 disabled:text-gray-600 disabled:cursor-not-allowed disabled:shadow-none
                 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default NeobrutalismButton;