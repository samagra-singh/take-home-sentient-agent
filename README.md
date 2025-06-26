# Sentient Agent

## Dev Notes

Thank you for everybody's assistance with the process so far.

You can check out the project [here](https://sentient-agent-samagra-singh.vercel.app/).

Key features implemented:
- Dynamic response for realistic chat experience. You can chat with the model as long as you like for testing.
- Stop response functionality.
- Accessibility for buttons and overall app via tooltips.
- Next.js supported error boundaries, loading states, and 404.

Due to time constraints, I was unable to implement some goals like:
- Text show animation for agent response.
- Unit testing.
- Accessibility for nav bar, side bar, and chat area.
- Better semantic HTML.

There are some known bugs, only one comes to my mind right now. 😅
- User messages can be hard to read on large devices when they are too short.

Please feel free to reach out with any questions or feedback at [hey@samagrasingh.com](mailto:hey@samagrasingh.com).

---

## Setup

### Prerequisites

- Node.js (LTS version - see `.nvmrc`)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server with Turbopack
npm run dev
```

The app runs on `http://localhost:3000` with Turbopack enabled for faster development builds.

### Environment Variables

The app automatically configures `NEXT_PUBLIC_BASE_URL` based on the deployment environment:
- Production: Uses Vercel production URL
- Preview: Uses Vercel preview URL
- Development: `http://localhost:3000`

### Key Dependencies

**Production:**
- Next.js, React 19, TypeScript
- Redis for data storage
- Zod for validation
- React components (textarea-autosize, toastify, tooltip)

**Development:**
- Jest, Testing Library, ESLint
- Husky, lint-staged
- Tailwind CSS, SVGR

### Project Structure

```
src/
├── actions/          # Server actions
├── app/             # Next.js App Router pages
├── components/      # React components
├── contexts/        # React contexts
├── hooks/           # Custom hooks
├── types/           # TypeScript type definitions
└── utils/           # Utility functions
```

## Code Quality

### Linting

```bash
# Run ESLint
npm run lint

# Fix auto-fixable issues
npm run lint:fix
```

**ESLint Configuration:**
- Next.js recommended rules
- TypeScript support
- Import sorting with `simple-import-sort`
- Testing Library rules for test files
- Custom formatting rules (quotes, spacing, etc.)

### Pre-commit Hooks

- Husky configured for pre-commit hooks
- Lint-staged runs ESLint on staged files
- Auto-fixes issues when possible
- Runs tests for test files

## Infrastructure

### Build System

- **Framework**: Next.js 15.3.3 with App Router
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS v4
- **Bundler**: Turbopack for development, Webpack for production

### Deployment

- **Platform**: Vercel (recommended)
- **Domain**: `sentient-agent.samagrasingh.com`
- **Auto-deployment**: Enabled for main branch
- **Preview deployments**: Available for pull requests

## Troubleshooting

### Common Issues

- **Turbopack issues**: Fall back to `next dev` (without `--turbopack`)

### Performance

- Turbopack for faster development builds
- Next.js App Router for optimized routing
- Tailwind CSS for efficient styling
- TypeScript for compile-time error checking
