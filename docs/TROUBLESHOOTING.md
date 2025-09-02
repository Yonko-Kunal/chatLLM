# Troubleshooting Guide

This guide helps you resolve common issues when using or developing the Chat LLM application.

## 🚨 Common Issues

### API Key Issues

#### "Please add your API key in the settings and try again"

**Symptoms:**
- Error message appears when sending messages
- Chat doesn't respond to messages

**Solutions:**
1. **Check API Key in Settings**:
   - Go to Settings page
   - Verify your Google AI API key is entered correctly
   - Click "Save" to store the key

2. **Verify API Key Validity**:
   - Go to [Google AI Studio](https://aistudio.google.com/apikey)
   - Check if your API key is active
   - Generate a new key if needed

3. **Check Environment Variables** (for development):
   ```bash
   # Verify .env.local file exists
   cat .env.local
   
   # Should contain:
   GOOGLE_API_KEY=your_api_key_here
   ```

4. **Clear Browser Storage**:
   - Open Developer Tools (F12)
   - Go to Application/Storage tab
   - Clear localStorage
   - Re-enter your API key

#### "Invalid API Key" Error

**Solutions:**
1. **Regenerate API Key**:
   - Go to [Google AI Studio](https://aistudio.google.com/apikey)
   - Delete old key
   - Create new key
   - Update in settings

2. **Check Key Format**:
   - API key should start with `AIza`
   - Should be 39 characters long
   - No spaces or special characters

### Image Upload Issues

#### Images Not Uploading

**Symptoms:**
- Drag and drop doesn't work
- File selection doesn't work
- Images don't appear in chat

**Solutions:**
1. **Check File Format**:
   - Supported: JPEG, PNG, GIF, WebP, SVG
   - Unsupported: PDF, DOC, TXT, etc.

2. **Check File Size**:
   - Maximum: 10MB
   - Recommended: < 5MB
   - Compress large images

3. **Browser Compatibility**:
   - Enable JavaScript
   - Update browser to latest version
   - Try different browser

4. **Clear Browser Cache**:
   ```bash
   # Chrome/Edge
   Ctrl + Shift + Delete
   
   # Firefox
   Ctrl + Shift + Delete
   
   # Safari
   Cmd + Option + E
   ```

#### "Image too large" Error

**Solutions:**
1. **Compress Image**:
   - Use online tools like TinyPNG
   - Reduce dimensions
   - Lower quality settings

2. **Use Different Format**:
   - Convert to WebP for better compression
   - Use JPEG for photos
   - Use PNG for graphics with transparency

### Build and Development Issues

#### Build Failures

**Symptoms:**
- `npm run build` fails
- TypeScript errors
- ESLint errors

**Solutions:**
1. **Check Node.js Version**:
   ```bash
   node --version
   # Should be 18+ 
   ```

2. **Clear Dependencies**:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Fix TypeScript Errors**:
   ```bash
   npm run build
   # Fix errors shown in output
   ```

4. **Fix ESLint Errors**:
   ```bash
   npm run lint
   # Fix errors shown in output
   ```

#### Development Server Issues

**Symptoms:**
- `npm run dev` fails
- Server won't start
- Port already in use

**Solutions:**
1. **Check Port Availability**:
   ```bash
   # Kill process on port 3000
   npx kill-port 3000
   
   # Or use different port
   npm run dev -- -p 3001
   ```

2. **Clear Next.js Cache**:
   ```bash
   rm -rf .next
   npm run dev
   ```

3. **Check Environment Variables**:
   ```bash
   # Verify .env.local exists
   ls -la .env.local
   ```

### Performance Issues

#### Slow Loading

**Symptoms:**
- App takes long to load
- Images load slowly
- Chat responses are delayed

**Solutions:**
1. **Check Network Connection**:
   - Test internet speed
   - Try different network
   - Check for VPN issues

2. **Optimize Images**:
   - Compress images before upload
   - Use appropriate formats
   - Reduce image dimensions

3. **Clear Browser Cache**:
   - Clear all cached data
   - Restart browser
   - Try incognito/private mode

#### Memory Issues

**Symptoms:**
- Browser becomes slow
- High memory usage
- App crashes

**Solutions:**
1. **Close Other Tabs**:
   - Reduce browser memory usage
   - Close unnecessary applications

2. **Restart Browser**:
   - Close all browser windows
   - Restart browser application

3. **Clear Chat History**:
   - Refresh the page
   - Start new conversation

### UI/UX Issues

#### Layout Problems

**Symptoms:**
- Elements overlap
- Text is cut off
- Responsive design broken

**Solutions:**
1. **Check Browser Zoom**:
   - Reset zoom to 100%
   - Use Ctrl + 0 (Windows) or Cmd + 0 (Mac)

2. **Update Browser**:
   - Install latest browser version
   - Enable hardware acceleration

3. **Check CSS Loading**:
   - Verify Tailwind CSS is loading
   - Check for CSS conflicts

#### Dark Theme Issues

**Symptoms:**
- Theme not applying
- Inconsistent colors
- Text not visible

**Solutions:**
1. **Check CSS Loading**:
   - Verify `globals.css` is loaded
   - Check for CSS conflicts

2. **Browser Compatibility**:
   - Update browser
   - Try different browser

3. **Clear Cache**:
   - Clear browser cache
   - Hard refresh (Ctrl + F5)

## 🔧 Development Issues

### TypeScript Errors

#### Common TypeScript Issues

1. **"Cannot find module"**:
   ```bash
   # Reinstall dependencies
   npm install
   
   # Check import paths
   import { Component } from '@/components/ui/component'
   ```

2. **"Property does not exist"**:
   ```typescript
   // Add proper type annotations
   interface Props {
     message: string;
     isUser: boolean;
   }
   ```

3. **"Unexpected any"**:
   ```typescript
   // Replace any with proper types
   const data: Record<string, unknown> = response.data;
   ```

### ESLint Errors

#### Common ESLint Issues

1. **"Unused variable"**:
   ```typescript
   // Remove unused variables
   // const unusedVar = 'value'; // Remove this line
   ```

2. **"Missing dependency"**:
   ```typescript
   // Add missing dependencies to useEffect
   useEffect(() => {
     // effect
   }, [dependency]); // Add missing dependency
   ```

3. **"No explicit any"**:
   ```typescript
   // Replace any with proper type
   const handleEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
     // handler
   };
   ```

## 🐛 Debugging Tips

### Browser Developer Tools

1. **Console Errors**:
   - Open Developer Tools (F12)
   - Check Console tab for errors
   - Look for red error messages

2. **Network Tab**:
   - Check API requests
   - Verify response status
   - Look for failed requests

3. **Application Tab**:
   - Check localStorage for API key
   - Verify stored data
   - Clear storage if needed

### Logging

1. **Add Console Logs**:
   ```typescript
   console.log('Debug info:', data);
   console.error('Error occurred:', error);
   ```

2. **Use Debugger**:
   ```typescript
   debugger; // Pauses execution
   ```

### Testing

1. **Test in Different Browsers**:
   - Chrome
   - Firefox
   - Safari
   - Edge

2. **Test on Different Devices**:
   - Desktop
   - Mobile
   - Tablet

3. **Test with Different Data**:
   - Empty inputs
   - Large files
   - Special characters

## 📞 Getting Help

### Before Asking for Help

1. **Check this guide** for your issue
2. **Search existing issues** on GitHub
3. **Try common solutions** listed above
4. **Test in different browsers**
5. **Clear cache and restart**

### When Reporting Issues

Include the following information:

1. **Browser and Version**:
   - Chrome 91.0.4472.124
   - Firefox 89.0.2
   - Safari 14.1.1

2. **Operating System**:
   - Windows 10
   - macOS 11.4
   - Ubuntu 20.04

3. **Error Messages**:
   - Copy exact error text
   - Include stack traces
   - Screenshot if helpful

4. **Steps to Reproduce**:
   - Detailed steps
   - Expected vs actual behavior
   - Frequency of issue

5. **Console Output**:
   - Open Developer Tools
   - Copy console errors
   - Include network errors

### Community Support

- **GitHub Issues**: Report bugs and request features
- **GitHub Discussions**: Ask questions and share ideas
- **Documentation**: Check README and other docs

## 🔄 Recovery Steps

### Complete Reset

If nothing else works:

1. **Backup Your Data**:
   - Save your API key
   - Note any important settings

2. **Clean Installation**:
   ```bash
   # Remove all files
   rm -rf node_modules .next package-lock.json
   
   # Reinstall
   npm install
   
   # Restart development server
   npm run dev
   ```

3. **Restore Settings**:
   - Re-enter API key
   - Configure any custom settings

### Browser Reset

1. **Clear All Data**:
   - Clear browsing data
   - Clear cookies and cache
   - Clear localStorage

2. **Disable Extensions**:
   - Disable all browser extensions
   - Test in incognito mode

3. **Reset Browser**:
   - Reset browser to defaults
   - Reinstall browser if needed

---

If you're still experiencing issues after trying these solutions, please [open an issue](https://github.com/Yonko-Kunal/chatLLM/issues) with detailed information about your problem.
