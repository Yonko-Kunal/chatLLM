import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: Request) {
  const { message, image, selectedModel } = await req.json();
  const apiKey = req.headers.get('x-api-key');

  const genAI = new GoogleGenerativeAI(apiKey || process.env.GOOGLE_API_KEY!);
  const model = genAI.getGenerativeModel({ model: selectedModel === "Gemini 2.5 Pro" ? 'gemini-2.5-pro' : 'gemini-2.5-flash' });

  try {
    let content;
    if (image) {
      const imagePart = {
        inlineData: {
          data: image.split(',')[1],
          mimeType: image.match(/data:(.*);base64,/)?.[1] || '',
        },
      };
      content = [message, imagePart];
    } else {
      content = message;
    }

    const result = await model.generateContent(content);
    const response = await result.response;
    const text = response.text();
    return new Response(JSON.stringify({ text }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
