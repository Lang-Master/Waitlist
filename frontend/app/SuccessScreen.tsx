// src/components/SuccessScreen.tsx (or similar location)

import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface SuccessProps {
    message: string;
    email: string;
    onClose: () => void;
}

const SuccessScreen: React.FC<SuccessProps> = ({ message, email, onClose }) => {
    return (
        <div className="w-full max-w-md p-8 bg-white border border-[[#021b03] rounded-lg shadow-2xl text-center animate-fadeIn">
            <button 
                onClick={onClose} 
                className="ml-[95%] mt-[-10px] p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                aria-label="Close success message"
            >
                {/* Set the size of the icon */}
                <XMarkIcon className="h-6 w-6" /> 
            </button>

            <h2 className="text-3xl font-bold text-[[#021b03] mb-2">You are welcome aboard!</h2>
            
            {/* Display the confirmation message */}
            <p className="text-gray-700">{message}</p>
            
            {/* Optional: Remind the user of the email they signed up with */}
            <p className="text-sm text-gray-500 mt-4">We will notify you at **{email}** when we launch!</p>
        </div>
    );
};

export default SuccessScreen;