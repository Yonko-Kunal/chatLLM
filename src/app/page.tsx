"use client"
import React, { useState, useRef, useEffect, ChangeEvent, KeyboardEvent } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from '@/components/ui/button';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import 'github-markdown-css/github-markdown.css';
import { Mic, Plus, ImagePlus } from 'lucide-react';
import Image from 'next/image';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Skeleton } from "@/components/ui/skeleton"

const SkeletonLoader = () => (
  <div className="flex items-center space-x-4 my-8">
    <Skeleton className="h-12 w-12 rounded-full" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-4 w-[200px]" />
    </div>
  </div>
);

const Home = () => {
  const [submitted, setSubmitted] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [chatHistory, setChatHistory] = useState<{ user: string; bot: string; image?: string }[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [image, setImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isBotReplying, setIsBotReplying] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [textareaHeight, setTextareaHeight] = useState('10rem');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setTextareaHeight('6rem');
      } else {
        setTextareaHeight('10rem');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          handleImageSelect(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageSelect = (dataUrl: string) => {
    setImage(dataUrl);
  };

  const handleSelectImage = () => {
    fileInputRef.current?.click()
  }

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (inputValue.trim() === '' && !image) return;

    setIsLoading(true);
    setIsBotReplying(true);
    const message = inputValue;
    setInputValue('');
    if (!submitted) {
      setSubmitted(true);
    }

    const apiKey = localStorage.getItem('apiKey');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey || '',
        },
        body: JSON.stringify({ message, image }),
      });

      if (res.ok) {
        const data = await res.json();
        setChatHistory([...chatHistory, { user: message, bot: data.text, image: image || undefined }]);
      } else {
        setChatHistory([...chatHistory, { user: message, bot: 'Please add your API key in the settings and try again.', image: image || undefined }]);
      }
    } catch (error) {
      console.error(error);
      setChatHistory([...chatHistory, { user: message, bot: 'Please add your API key in the settings and try again.', image: image || undefined }]);
    } finally {
      setIsLoading(false);
      setIsBotReplying(false);
      setImage(null);
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory, isBotReplying]);

  return (
    <div
      className={`flex flex-col h-full w-full ${submitted ? 'justify-between' : 'justify-center items-center'}`}
      onDragEnter={handleDragEnter}
      onDragOver={(e) => e.preventDefault()}
    >
      {isDragging && (
        <div
          className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50"
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="text-white text-2xl">Drop image to upload</div>
        </div>
      )}
      {!submitted && (
        <div className="text-center">
          <h1 className='text-2xl font-bold mb-12'>How can i help you ?</h1>
        </div>
      )}

      {submitted && (
        <div ref={chatContainerRef} className="flex-grow w-full max-w-4xl mx-auto p-2 sm:p-4 overflow-y-auto">
          {chatHistory.map((chat, index) => (
            <div key={index} className="my-4 sm:my-8">
              <div className="flex justify-end">
                <div className="my-3 sm:my-6">
                  {chat.image && <Image src={chat.image} alt="user upload" width={192} height={192} className="w-48 h-48 object-cover rounded-lg mb-2" />}
                  {chat.user}
                </div>
              </div>
              <div className="flex justify-start">
                <div className="markdown-body bg-transparent my-3 sm:my-6 max-w-full">
                  <ReactMarkdown
                    components={{
                      code({ className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || '');
                        return match ? (
                          <SyntaxHighlighter
                            style={tomorrow as Record<string, React.CSSProperties>}
                            language={match[1]}
                            PreTag="div"
                          >
                            {String(children).replace(/\n$/, '')}
                          </SyntaxHighlighter>
                        ) : (
                          <code className={className} {...props}>
                            {children}
                          </code>
                        );
                      },
                    }}
                  >
                    {chat.bot}
                  </ReactMarkdown>
                </div>

              </div>
            </div>
          ))}
          {isBotReplying && <SkeletonLoader />}
        </div>
      )}

      <div className={`w-full max-w-4xl mx-auto p-4 sticky bottom-0 bg-[#0A0A0A]`}>
        <form onSubmit={handleSubmit} className="relative">
          <div className="relative flex flex-col w-full bg-zinc-800 rounded-3xl border border-zinc-700 shadow-lg">
            {image && <Image src={image} alt="selected" width={192} height={192} className="w-48 h-48 object-cover rounded-lg m-4" />}
            <Textarea
              placeholder="Type your message here."
              className="w-full bg-transparent border-none text-white resize-none py-4 pl-4 pr-24 focus:ring-0"
              style={{ height: textareaHeight }}
              value={inputValue}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setInputValue(e.target.value)}
              onKeyDown={(e: KeyboardEvent<HTMLTextAreaElement>) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
              onImageSelect={handleImageSelect}
            />
            <div className="absolute right-4 bottom-3.5 flex items-center">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    className="bg-transparent hover:bg-zinc-700 p-2 rounded-full"
                  >
                    <Plus className="text-zinc-400" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-40 flex items-center justify-center gap-2 px-0 py-4">
                  <ImagePlus />
                  <div
                    className="cursor-pointer p-2 text-sm"
                    onClick={handleSelectImage}
                  >
                    Select image
                  </div>
                </PopoverContent>
              </Popover>
              <Button
                type="submit"
                className="bg-transparent hover:bg-zinc-700 p-2 rounded-full"
                disabled={isLoading}
              >
                {isLoading ? <div className="loader" /> : <Mic className="text-zinc-400" />}
              </Button>
            </div>
          </div>
        </form>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) {
              const reader = new FileReader()
              reader.onload = (e) => {
                if (e.target?.result) {
                  handleImageSelect(e.target.result as string)
                }
              }
              reader.readAsDataURL(file)
            }
          }}
        />
      </div>
    </div>
  );
};

export default Home;