# UdemAI Website

This is the official website for UdemAI, the AI club at the University of Montreal. The website is built using Next.js, TypeScript, TailwindCSS, and Sanity CMS.

## Features

- Responsive design for all screen sizes
- Dark mode support with user preference detection
- Server-side rendering and static generation for optimal performance
- Dynamic content management through Sanity CMS
- Accessible UI components with proper ARIA attributes
- SEO optimization with meta tags and structured data

## Tech Stack

- **Frontend**: Next.js with TypeScript
- **Styling**: TailwindCSS with Shadcn UI components
- **CMS**: Sanity.io
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/udemai-website.git
   cd udemai-website
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the project root and add your Sanity credentials:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_TOKEN=your_sanity_api_token
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── components/         # UI components
│   ├── About/          # About section components
│   ├── Activities/     # Activities section components
│   ├── BlogPosts/      # Blog post components
│   ├── Footer/         # Footer components
│   ├── GetInvolved/    # Get involved section components
│   ├── Hero/           # Hero section components
│   ├── Layout/         # Layout components including SEO and ErrorBoundary
│   ├── Nav/            # Navigation components
│   ├── Resources/      # Resources section components
│   └── ui/             # Shared UI components (buttons, cards, etc.)
├── lib/                # Utility functions and types
│   ├── controllers/    # Business logic controllers
│   ├── sanity/         # Sanity client and queries
│   ├── services/       # API services
│   ├── utils/          # Helper utilities
│   └── types.ts        # TypeScript types
├── pages/              # Next.js pages
│   ├── _app.tsx        # Main app component
│   ├── _document.tsx   # Custom document component
│   ├── api/            # API routes
│   ├── about.tsx       # About page
│   ├── activities/     # Activities pages
│   ├── blog/           # Blog pages
│   ├── resources/      # Resources pages
│   └── index.tsx       # Home page
├── public/             # Static assets
│   └── images/         # Images
└── styles/             # Global styles
```

## Development Guidelines

- Follow TypeScript best practices with proper type definitions
- Use functional components with hooks
- Implement proper error handling and loading states
- Ensure accessibility with ARIA attributes
- Optimize for performance with code splitting and lazy loading
- Write descriptive commit messages

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

UdemAI - [udemai@umontreal.ca](mailto:udemai@umontreal.ca)

Project Link: [https://github.com/yourusername/udemai-website](https://github.com/yourusername/udemai-website)
