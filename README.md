# Modern Note-Taking Application

A full-stack note-taking application with rich features, real-time collaboration, and advanced search capabilities.

## Features

- 📝 Rich text editing with support for diagrams, pictures, and math equations
- 📁 Folder-based organization
- 🔍 Full-text search functionality
- AI assisted note creation
- Useful tools like create table, create list, create code block, create math block, create link, create blockquote, insert picture, insert video, insert audio, insert formula and others.
- 🔄 Real-time collaboration
- 🎙️ Voice-to-text note creation
- 📱 PWA support for offline access
- 🖼️ OCR for image text extraction
- 🔐 Secure authentication with JWT/Magic Links

## Tech Stack

### Frontend
- Next.js
- TailwindCSS & ShadCN
- Tiptap/Lexical
- Framer Motion

### Backend
- Bun
- Hono
- MongoDB
- Redis
- WebSocket

### Additional Services
- Meilisearch/ElasticSearch
- Tesseract.js
- Whisper API

## Project Structure

.
├── apps/
│   ├── web/           # Next.js frontend application
│   └── server/        # Bun + Hono backend application
├── packages/
│   ├── ui/           # Shared UI components
│   ├── config/       # Shared configuration
│   └── types/        # Shared TypeScript types
└── docker/           # Docker configuration files



## Development

bash
# Install dependencies
npm install

# Start development servers
npm run dev

# Build for production
npm run build

# Start production servers
npm run start



## License

MIT