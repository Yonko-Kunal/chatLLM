# API Documentation

## Overview

The Chat LLM application provides a REST API for interacting with Google's Gemini AI model. The API supports both text and image inputs, making it suitable for multimodal AI conversations.

## Base URL

- **Development**: `http://localhost:3000/api`
- **Production**: `https://your-domain.vercel.app/api`

## Authentication

The API uses API key authentication. You can provide your Google AI API key in two ways:

1. **Header** (Recommended): Include `x-api-key` header in your request
2. **Environment Variable**: Set `GOOGLE_API_KEY` in your environment

## Endpoints

### POST /api/chat

Send a message to the AI and receive a response.

#### Request

**URL**: `/api/chat`  
**Method**: `POST`  
**Content-Type**: `application/json`

**Headers**:
```
Content-Type: application/json
x-api-key: your_google_api_key (optional)
```

**Request Body**:
```json
{
  "message": "string (required)",
  "image": "string (optional)"
}
```

**Parameters**:
- `message` (string, required): The text message to send to the AI
- `image` (string, optional): Base64-encoded image data with MIME type prefix (e.g., `data:image/jpeg;base64,/9j/4AAQ...`)

#### Response

**Success Response** (200 OK):
```json
{
  "text": "AI response text here"
}
```

**Error Response** (500 Internal Server Error):
```json
{
  "error": "Internal Server Error"
}
```

#### Example Requests

**Text-only message**:
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -H "x-api-key: your_api_key_here" \
  -d '{
    "message": "Hello, how are you?"
  }'
```

**Message with image**:
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -H "x-api-key: your_api_key_here" \
  -d '{
    "message": "What do you see in this image?",
    "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD..."
  }'
```

#### JavaScript/TypeScript Example

```typescript
const sendMessage = async (message: string, image?: string) => {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': 'your_api_key_here', // or get from localStorage
    },
    body: JSON.stringify({ message, image }),
  });

  if (!response.ok) {
    throw new Error('Failed to send message');
  }

  const data = await response.json();
  return data.text;
};

// Usage
const response = await sendMessage('Hello, AI!');
console.log(response);
```

## Error Handling

### Common Error Scenarios

1. **Invalid API Key**
   - Status: 500
   - Response: `{"error": "Internal Server Error"}`
   - Solution: Verify your Google AI API key is correct

2. **Missing Message**
   - Status: 400 (handled by client)
   - Solution: Ensure the `message` field is provided

3. **Invalid Image Format**
   - Status: 500
   - Response: `{"error": "Internal Server Error"}`
   - Solution: Ensure image is properly base64-encoded with MIME type

4. **Rate Limiting**
   - Status: 429 (from Google API)
   - Solution: Implement retry logic with exponential backoff

### Error Response Format

All error responses follow this format:
```json
{
  "error": "Error description"
}
```

## Rate Limits

The API is subject to Google's Gemini API rate limits:

- **Free Tier**: 15 requests per minute
- **Paid Tier**: Higher limits based on your plan

For production applications, implement:
- Request queuing
- Rate limiting on your end
- Retry logic with exponential backoff

## Image Processing

### Supported Formats

- JPEG/JPG
- PNG
- GIF
- WebP
- SVG

### Image Size Limits

- **Maximum file size**: 10MB
- **Recommended size**: < 5MB for optimal performance
- **Dimensions**: No specific limits, but larger images may take longer to process

### Image Encoding

Images must be base64-encoded with the proper MIME type prefix:

```
data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...
data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...
```

## Best Practices

### Performance

1. **Image Optimization**: Compress images before sending
2. **Caching**: Implement client-side caching for repeated requests
3. **Debouncing**: Debounce user input to avoid excessive API calls

### Security

1. **API Key Protection**: Never expose API keys in client-side code
2. **Input Validation**: Validate and sanitize user inputs
3. **Rate Limiting**: Implement rate limiting to prevent abuse

### Error Handling

1. **Graceful Degradation**: Handle API failures gracefully
2. **User Feedback**: Provide clear error messages to users
3. **Retry Logic**: Implement retry logic for transient failures

## SDK Examples

### React Hook Example

```typescript
import { useState, useCallback } from 'react';

export const useChat = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(async (message: string, image?: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': localStorage.getItem('apiKey') || '',
        },
        body: JSON.stringify({ message, image }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();
      return data.text;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { sendMessage, isLoading, error };
};
```

### Node.js Example

```javascript
const axios = require('axios');

class ChatClient {
  constructor(apiKey, baseURL = 'http://localhost:3000/api') {
    this.apiKey = apiKey;
    this.baseURL = baseURL;
  }

  async sendMessage(message, image = null) {
    try {
      const response = await axios.post(`${this.baseURL}/chat`, {
        message,
        image
      }, {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey
        }
      });

      return response.data.text;
    } catch (error) {
      throw new Error(`API Error: ${error.response?.data?.error || error.message}`);
    }
  }
}

// Usage
const client = new ChatClient('your_api_key_here');
const response = await client.sendMessage('Hello, AI!');
console.log(response);
```

## Changelog

### v1.0.0
- Initial API release
- Support for text and image inputs
- Integration with Google Gemini 2.5 Flash model
- Basic error handling

## Support

For API-related issues:
1. Check the troubleshooting section in the main README
2. Verify your API key is correct
3. Check Google AI Studio documentation
4. Open an issue on GitHub
