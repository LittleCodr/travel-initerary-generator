
import React from 'react';
import NeobrutalismCard from './NeobrutalismCard';

interface ErrorDisplayProps {
  message: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => {
  return (
    <NeobrutalismCard className="bg-red-400 border-red-800 my-8">
      <div className="p-6 text-center text-red-900">
        <h3 className="text-xl font-bold mb-2">Oops! Something went wrong.</h3>
        <p>{message}</p>
      </div>
    </NeobrutalismCard>
  );
};

export default ErrorDisplay;
