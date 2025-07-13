# ToolNest AI - Professional AI Tools Platform

A privacy-focused web application designed for independent therapists and other professionals to generate documentation using Claude AI. Built with React, TypeScript, and Express.

## 🚀 Features

- **Therapist AI Session Summariser**: Transform rough therapy notes into professional summaries and care plans
- **Privacy-First Design**: No data storage, HIPAA-compliant architecture
- **Professional Export Options**: PDF, TXT, and copy-to-clipboard functionality  
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark Mode Support**: Full theme switching with persistent storage
- **SEO Optimized**: Built for search visibility with professional content

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Vite
- **Backend**: Node.js, Express, TypeScript
- **AI Integration**: Anthropic Claude API
- **UI Components**: Radix UI primitives with shadcn/ui
- **State Management**: TanStack Query
- **Routing**: Wouter (lightweight React router)

## 📦 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/toolnest-ai.git
   cd toolnest-ai
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   # Create .env file
   echo "ANTHROPIC_API_KEY=your_api_key_here" > .env
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

5. **Open in browser:**
   - Navigate to `http://localhost:5000`

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push
   ```

2. **Deploy with Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add `ANTHROPIC_API_KEY` environment variable
   - Deploy!

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## 🎯 Usage

### For Therapists
1. Navigate to the Therapist AI tool
2. Paste your session notes
3. Select tone (clinical, formal, or conversational)
4. Configure output settings
5. Generate professional summaries and care plans
6. Export in your preferred format

### Platform Structure
- **Homepage**: `/` - Overview of all AI tools
- **Therapist Tool**: `/tools/therapist-ai` - Full-featured therapy documentation
- **Future Tools**: Educator AI, Creator AI, and more (coming soon)

## 🔒 Privacy & Security

- **No Data Storage**: Session notes are never stored or logged
- **HIPAA-Compliant Design**: Built with healthcare privacy in mind
- **Stateless Architecture**: Each session is independent
- **Secure API Integration**: Direct communication with Claude AI

## 🎨 Customization

The platform is built for easy expansion:

1. **Add New Tools**: Create new pages in `client/src/pages/`
2. **Update Routes**: Modify `client/src/App.tsx`
3. **Extend API**: Add endpoints in `server/routes.ts`
4. **Theme Customization**: Edit Tailwind config and CSS variables

## 📄 License

MIT License - feel free to use this for your own projects.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📞 Support

For questions about deployment or usage, please refer to the documentation or open an issue.

---

**Built with ❤️ for mental health professionals and other niche industries that need specialized AI tools.**