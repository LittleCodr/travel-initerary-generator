
import React from 'react';

interface NeobrutalismInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
}

const NeobrutalismInput: React.FC<NeobrutalismInputProps> = ({ label, id, ...props }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-lg font-bold mb-2">
        {label}
      </label>
      <input
        id={id}
        className="w-full px-4 py-3 bg-white border-4 border-black text-lg focus:outline-none focus:bg-yellow-100"
        {...props}
      />
    </div>
  );
};

export default NeobrutalismInput;
