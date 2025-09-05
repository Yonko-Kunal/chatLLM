'use client';

import { useState } from 'react';
import { Textarea } from './ui/textarea';
import Image from 'next/image';

export function Chat() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  const handleImageSelect = (dataUrl: string) => {
    setImage(dataUrl);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setResponse('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, image }),
      });

      if (res.ok) {
        const data = await res.json();
        setResponse(data.text);
      } else {
        setResponse('Error fetching response.');
      }
    } catch (error) {
      console.error(error);
      setResponse('Error fetching response.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl p-4 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-4">Chat with AI</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your query here..."
            onImageSelect={handleImageSelect}
          />
          {image && (
            <div className="mt-4">
              <Image src={image} alt="Selected" width={400} height={300} className="max-w-full h-auto" />
            </div>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
          >
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </form>
        {response && (
          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <h2 className="text-lg font-semibold">Response:</h2>
            <p>{response}</p>
          </div>
        )}
      </div>
    </div>
  );
}