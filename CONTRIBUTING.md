# Contributing to Chat LLM

Thank you for your interest in contributing to Chat LLM! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

We welcome contributions from the community! Here are several ways you can help:

- 🐛 **Report bugs** and issues
- 💡 **Suggest new features** and improvements
- 📝 **Improve documentation**
- 🔧 **Fix bugs** and implement features
- 🎨 **Enhance the UI/UX**
- ⚡ **Optimize performance**

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git
- Google AI Studio API Key (for testing)

### Development Setup

1. **Fork the repository**
   ```bash
   # Click the "Fork" button on GitHub, then clone your fork
   git clone https://github.com/your-username/chatLLM.git
   cd chatLLM
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env.local file
   echo "GOOGLE_API_KEY=your_api_key_here" > .env.local
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📋 Development Workflow

### 1. Create a Branch

```bash
# Create and switch to a new branch
git checkout -b feature/your-feature-name

# Or for bug fixes
git checkout -b fix/issue-description
```

### 2. Make Changes

- Write clean, readable code
- Follow the existing code style
- Add comments for complex logic
- Test your changes thoroughly

### 3. Test Your Changes

```bash
# Run the linter
npm run lint

# Build the project
npm run build

# Test the production build
npm start
```

### 4. Commit Your Changes

```bash
# Add your changes
git add .

# Commit with a descriptive message
git commit -m "feat: add new feature description"
```

### 5. Push and Create Pull Request

```bash
# Push to your fork
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub.

## 📝 Code Style Guidelines

### TypeScript/JavaScript

- Use **TypeScript** for all new code
- Follow **ESLint** rules (configured in the project)
- Use **meaningful variable names**
- Add **type annotations** where helpful
- Use **const** and **let** instead of **var**

```typescript
// Good
const handleSubmit = async (message: string, image?: string): Promise<string> => {
  // implementation
};

// Avoid
function handleSubmit(msg, img) {
  // implementation
}
```

### React Components

- Use **functional components** with hooks
- Use **TypeScript interfaces** for props
- Follow **React best practices**
- Use **meaningful component names**

```typescript
// Good
interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isUser, timestamp }) => {
  return (
    <div className={`message ${isUser ? 'user' : 'bot'}`}>
      {message}
    </div>
  );
};
```

### CSS/Styling

- Use **Tailwind CSS** classes
- Follow **mobile-first** approach
- Use **semantic class names**
- Keep styles **consistent** with the design system

```tsx
// Good
<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
  <h1 className="text-2xl font-bold text-center mb-4">Chat with AI</h1>
</div>

// Avoid
<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
  <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Chat with AI</h1>
</div>
```

## 🧪 Testing Guidelines

### Manual Testing

Before submitting a PR, please test:

1. **Core functionality**:
   - Send text messages
   - Upload and analyze images
   - API key management
   - Responsive design

2. **Edge cases**:
   - Empty messages
   - Large images
   - Invalid API keys
   - Network errors

3. **Browser compatibility**:
   - Chrome (latest)
   - Firefox (latest)
   - Safari (latest)
   - Edge (latest)

### Automated Testing

We're working on adding automated tests. For now, please ensure:

- Code builds without errors (`npm run build`)
- Linting passes (`npm run lint`)
- No TypeScript errors

## 📋 Pull Request Guidelines

### Before Submitting

- [ ] Code follows the style guidelines
- [ ] All tests pass
- [ ] Documentation is updated (if needed)
- [ ] No console errors or warnings
- [ ] Responsive design works on mobile

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tested locally
- [ ] All existing tests pass
- [ ] New tests added (if applicable)

## Screenshots (if applicable)
Add screenshots to help explain your changes

## Checklist
- [ ] My code follows the style guidelines
- [ ] I have performed a self-review
- [ ] I have commented my code where necessary
- [ ] I have made corresponding changes to documentation
```

### Commit Message Format

Use conventional commits format:

```
type(scope): description

Examples:
feat(chat): add image upload functionality
fix(api): handle invalid API key errors
docs(readme): update installation instructions
style(ui): improve button hover effects
refactor(components): extract reusable chat message component
```

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

## 🐛 Bug Reports

When reporting bugs, please include:

1. **Clear description** of the issue
2. **Steps to reproduce**
3. **Expected behavior**
4. **Actual behavior**
5. **Screenshots** (if applicable)
6. **Browser and OS** information
7. **Console errors** (if any)

### Bug Report Template

```markdown
## Bug Description
Clear and concise description of the bug

## Steps to Reproduce
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

## Expected Behavior
What you expected to happen

## Actual Behavior
What actually happened

## Screenshots
If applicable, add screenshots

## Environment
- OS: [e.g., Windows 10, macOS 12.0, Ubuntu 20.04]
- Browser: [e.g., Chrome 91, Firefox 89, Safari 14]
- Node.js version: [e.g., 18.0.0]

## Additional Context
Any other context about the problem
```

## 💡 Feature Requests

When suggesting new features:

1. **Clear description** of the feature
2. **Use case** and benefits
3. **Implementation ideas** (if you have any)
4. **Screenshots or mockups** (if applicable)

### Feature Request Template

```markdown
## Feature Description
Clear and concise description of the feature

## Use Case
Describe the problem this feature would solve

## Proposed Solution
Describe your proposed solution

## Alternatives Considered
Describe any alternative solutions you've considered

## Additional Context
Any other context, mockups, or screenshots
```

## 🏗️ Project Structure

Understanding the project structure will help you contribute effectively:

```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   └── chat/          # Chat API endpoint
│   ├── settings/          # Settings page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main chat page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── app-sidebar.tsx   # Navigation sidebar
│   └── chat.tsx          # Chat component
├── hooks/                # Custom React hooks
└── lib/                  # Utility functions
```

## 🎯 Areas for Contribution

### High Priority

- 🧪 **Testing**: Add unit and integration tests
- 📱 **Mobile UX**: Improve mobile experience
- ⚡ **Performance**: Optimize bundle size and loading
- 🔒 **Security**: Enhance security measures
- 🌐 **Internationalization**: Add multi-language support

### Medium Priority

- 🎨 **UI/UX**: Design improvements
- 📊 **Analytics**: Add usage analytics
- 💾 **Persistence**: Save chat history
- 🔍 **Search**: Add chat search functionality
- 📤 **Export**: Export chat conversations

### Low Priority

- 🎭 **Themes**: Multiple theme options
- 🔊 **Audio**: Voice input/output
- 📁 **File Upload**: Support for other file types
- 🔗 **Sharing**: Share chat conversations
- 📈 **Statistics**: Chat usage statistics

## 🤔 Questions?

If you have questions about contributing:

1. **Check existing issues** and discussions
2. **Read the documentation** thoroughly
3. **Ask in discussions** or create an issue
4. **Join our community** (if we have one)

## 📜 Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive environment for all contributors.

### Expected Behavior

- Use welcoming and inclusive language
- Be respectful of differing viewpoints
- Accept constructive criticism gracefully
- Focus on what's best for the community
- Show empathy towards other community members

### Unacceptable Behavior

- Harassment, trolling, or discrimination
- Personal attacks or political discussions
- Public or private harassment
- Publishing private information without permission
- Other unprofessional conduct

## 📄 License

By contributing to this project, you agree that your contributions will be licensed under the same license as the project (MIT License).

## 🙏 Recognition

Contributors will be recognized in:

- README.md contributors section
- Release notes
- Project documentation

Thank you for contributing to Chat LLM! 🎉
