"use client";
import { useState } from "react";
import { Input, Button } from "@headlessui/react";
import { addToWaitlist } from "./api";
import SuccessScreen from "./SuccessScreen";

const isValidEmail = (email: string): boolean => {
    // This is the same basic regex used in the backend
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    return emailRegex.test(email);
};

export default function Home() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(''); 
  const [errorStatus, setErrorStatus] = useState(''); 
  const [isSignedUp, setIsSignedUp] = useState(false); 
  const [submittedEmail, setSubmittedEmail] = useState(''); 

  const resetForm = () => {
    setIsSignedUp(false);
    setEmail('');        // Clear the form input for the next user
    setStatus('');       // Clear success message
    setErrorStatus('');  // Clear any residual errors
    setSubmittedEmail('');
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!email) {
        setErrorStatus('Email address cannot be empty.');
        return;
    }
    
    if (!isValidEmail(email)) {
        setErrorStatus('Please enter a valid email format (e.g., user@domain.com).');
        return; 
    }

    try {
        const result = await addToWaitlist(email); 
        setStatus(result.message || 'Successfully joined the waitlist!');
        setSubmittedEmail(email);
        setIsSignedUp(true);
    } catch (error) {
        setErrorStatus((error as Error).message || 'An unexpected server error occurred.');
        setStatus(''); // Clear status message
    }
  }

  return (
    <div className="font-sans grid grid-row items-center justify-items-center min-h-screen p-8 pb-20 gap-2 sm:p-20">
      <h1 className="text-4xl sm:text-6xl font-extrabold text-center">
        Join The Waiting List
      </h1>
      
      {isSignedUp ? (
        <SuccessScreen message={status} email={submittedEmail} onClose={resetForm}/>
      ) : (
      <form onSubmit={handleSubmit}>
          <div className="w-full max-w-lg items-center justify-items-center grid grid-cols-1 gap-2 mt-2">  
            <Input 
              name="email" 
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
              required
              className={`w-full md:w-[400px] max-w-lg px-4 py-2 h-10 border rounded-md 
                            ${errorStatus ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-[#021b03]'}`} 
              />
              <div className="w-full md:w-[400px] max-w-md text-center mt-3">
                {/* Display Error in red*/}
                {errorStatus && (
                    <p className="text-red-500 font-medium">{errorStatus}</p>
                )}
            </div>
            <Button type="submit" className="w-full md:w-[400px] max-w-lg h-10 bg-radial from-[#021b03] via-[#001202] to-[#000201] text-white rounded-md focus:ring-2 focus:ring-[[#021b03]>">
              Join Now
            </Button>
          </div>
      </form>
      )}

      <footer className="text-center text-sm text-gray-500">
        Be one of the first people to know when we launch!
      </footer>
    </div>
  );
}
