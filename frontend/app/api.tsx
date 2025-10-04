const FULL_SIGNUP_URL = 'http://localhost:3000/api/waitlist/signup';

export async function addToWaitlist(email: string) {
    const response = await fetch(FULL_SIGNUP_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
    });
        
    // Get the response body (which contains success or error message)
    const data = await response.json();

    if (!response.ok) {
        // Throw an Error containing the message from the server (e.g., 'Invalid email format.')
        throw new Error(data.error || 'Failed to add to waitlist due to a server issue.');
    }

    // Return the successful data (which contains result.message)
    return data;
}