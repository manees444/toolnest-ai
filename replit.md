# Therapist Session Summariser AI Tool

## Overview

This is a modern, stateless web application designed for independent therapists to generate professional session summaries and care plans using AI. The app allows therapists to input rough session notes and receive professionally formatted summaries through Claude AI integration.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes (January 2025)

✅ **Enhanced MVP with Professional Features** (January 13, 2025)
- Added dark mode toggle with persistent theme storage
- Implemented tone description tooltips and enhanced UX
- Added export functionality (PDF, TXT, Copy All)
- Integrated word/character counters for input management
- Created output customization settings (paragraph vs bullet format)
- Added session date input for professional documentation
- Implemented feedback collection system (local, no storage)
- Enhanced mobile responsiveness with sticky buttons
- Added therapist comments placeholder in care plan output
- Improved dark mode support throughout the application

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and building
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management
- **UI Components**: Radix UI primitives with custom styling

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **API Design**: RESTful endpoints with JSON communication
- **AI Integration**: Anthropic Claude API for text generation
- **Validation**: Zod schemas for request/response validation

### Data Storage Solutions
- **Database**: PostgreSQL with Drizzle ORM (configured but not actively used)
- **Session Management**: Stateless design - no user data persistence
- **Privacy-First**: No storage of user session notes or generated content

## Key Components

### Core Application Files
- **`server/index.ts`**: Express server setup with middleware and error handling
- **`server/routes.ts`**: API endpoints for summary generation
- **`client/src/pages/home.tsx`**: Main application interface
- **`shared/schema.ts`**: Shared TypeScript types and Zod validation schemas

### UI Component System
- **Base Components**: Located in `client/src/components/ui/`
- **Design System**: Built on Radix UI primitives with Tailwind styling
- **Theme**: Full dark/light mode support with persistent storage
- **Custom Components**: InfoTooltip, ThemeProvider for enhanced UX
- **Mobile-First**: Responsive design with optimized mobile interactions

### API Integration
- **Claude AI**: Uses latest Claude model (`claude-sonnet-4-20250514`)
- **Tone Customization**: Supports formal, clinical, and conversational tones
- **Error Handling**: Comprehensive error management with user-friendly messages

## Data Flow

1. **User Input**: Therapist enters session notes, selects tone, and configures output settings
2. **Settings Management**: Optional session date, output format (paragraph/bullet), and customization
3. **Validation**: Client-side and server-side validation using Zod schemas
4. **AI Processing**: Notes sent to Claude API with tone-specific prompts and formatting preferences
5. **Response Handling**: Structured response with summary and care plan sections, formatted per user preference
6. **Export Options**: Multiple export formats (TXT, PDF, Copy All) with session metadata
7. **UI Updates**: Real-time loading states, toast notifications, and feedback collection
8. **Professional Output**: Includes therapist comments placeholder and comprehensive documentation structure

## External Dependencies

### Core Dependencies
- **@anthropic-ai/sdk**: Claude AI integration
- **@neondatabase/serverless**: PostgreSQL connection (Neon database)
- **drizzle-orm**: Database ORM and migrations
- **@tanstack/react-query**: Server state management
- **wouter**: Lightweight React router

### UI Dependencies
- **@radix-ui/***: Accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **lucide-react**: Icon library

### Development Dependencies
- **vite**: Build tool and development server
- **typescript**: Type safety and development experience
- **tsx**: TypeScript execution for Node.js

## Deployment Strategy

### Build Process
- **Frontend**: Vite builds optimized React bundle to `dist/public`
- **Backend**: esbuild compiles TypeScript server to `dist/index.js`
- **Assets**: Static assets served from build directory

### Environment Configuration
- **Database**: PostgreSQL connection via `DATABASE_URL` environment variable
- **AI API**: Claude API key via `ANTHROPIC_API_KEY` or `CLAUDE_API_KEY`
- **Development**: Hot reload and error overlays for development experience

### Production Considerations
- **Privacy**: Stateless design ensures no user data retention
- **Security**: Input validation and API key protection
- **Performance**: Optimized builds and efficient API calls
- **Scalability**: Serverless-ready architecture with external AI processing

The application prioritizes user privacy by maintaining a completely stateless design, ensuring that sensitive therapeutic notes are never stored or logged, making it suitable for healthcare professionals who need to maintain strict confidentiality standards.