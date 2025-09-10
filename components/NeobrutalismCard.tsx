
import React from 'react';

interface NeobrutalismCardProps {
  children: React.ReactNode;
  className?: string;
}

const NeobrutalismCard: React.FC<NeobrutalismCardProps> = ({ children, className }) => {
  return (
    <div className={`border-4 border-black shadow-[8px_8px_0_0_#000] transition-all hover:shadow-[4px_4px_0_0_#000] ${className}`}>
      {children}
    </div>
  );
};

export default NeobrutalismCard;
