"use client"
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const SettingsPage = () => {
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    const storedApiKey = localStorage.getItem('apiKey');
    if (storedApiKey) {
      setApiKey(storedApiKey);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('apiKey', apiKey);
    alert('API key saved!');
  };

  const handleRemove = () => {
    localStorage.removeItem('apiKey');
    setApiKey('');
    alert('API key removed!');
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 flex flex-col items-center h-full">
      <h1 className="text-2xl font-bold mb-8">Settings</h1>
      <div className="flex flex-col space-y-4 w-full max-w-md">
        <div className='flex items-center space-x-3'>
          <h2 className="text-lg font-semibold">Add Your API Key</h2>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className='w-4 h-4' />
              </TooltipTrigger>
              <TooltipContent>
                <p>Your API key is stored securely in your browser's local storage and is never sent to any server.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
          <Input
            type="password"
            placeholder="Enter your API key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="w-full"
          />
          <div className="flex space-x-2">
            <Button className="md:w-full w-[50%]" onClick={handleSave}>Save</Button>
            <Button className="md:w-full w-[50%]" onClick={handleRemove} variant="destructive">Remove</Button>
          </div>
        </div>
        <div className='my-5'>
          <p>
            <a
              href="https://aistudio.google.com/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Get your API key
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;