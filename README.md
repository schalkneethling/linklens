# LinkLens

[![Netlify Status](https://api.netlify.com/api/v1/badges/d1999470-27b2-4258-a3b9-165e9cc666e2/deploy-status)](https://app.netlify.com/projects/link-lens/deploys)

A microservice that accepts a URL and returns the title, description, and social share image (Open Graph image) from the webpage.

## Overview

LinkLens is a lightweight web scraping service built with TypeScript and deployed on Netlify Functions. It extracts essential metadata from web pages, making it ideal for generating link previews, social media cards, or any application that requires displaying webpage information.

## Features

- **Fast and Lightweight**: Built on Netlify Functions for quick response times
- **Rich Metadata Extraction**: Extracts title, description, and Open Graph images
- **TypeScript**: Fully typed for a better development experience
- **Serverless**: No server maintenance required
- **CORS Enabled**: Ready for cross-origin requests

## API Usage

### Endpoint

```
GET /api/link-lens?url={URL}
```

### Request

Send a GET request with the URL as a query parameter:

```
GET /api/link-lens?url=https://example.com
```

### Response

The service returns a JSON response with the extracted metadata:

```json
{
  "title": "Example Page Title",
  "description": "This is the page description or meta description",
  "image": "https://example.com/og-image.jpg"
}
```

### Example Usage

```javascript
const url = encodeURIComponent("https://example.com");
const response = await fetch(`/api/link-lens?url=${url}`);

const data = await response.json();
console.log(data.title, data.description, data.image);
```

## Local Development

### Prerequisites

- Node.js 22+
- npm or yarn

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/schalkneethling/linklens.git
   cd linklens
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

### Available Scripts

- `npm run build` - Build the project for production
- `npm run lint:eslint` - Run ESLint
- `npm run prettier:lint` - Check code formatting
- `npm run prettier:format` - Format code with Prettier
- `npm run build:ts` - Compile TypeScript

## Deployment

This project is configured for deployment on Netlify Functions. The main function is located at `netlify/functions/link-lens.mts`.

### Netlify Deployment

1. Connect your repository to Netlify
2. Set the build command: `npm run build`
3. Set the publish directory: `public` (if applicable)
4. Deploy!

The function will be available at `https://your-site.netlify.app/api/link-lens`

## Contributing

We welcome contributions! Here's how you can help:

### Development Process

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run tests and linting: `npm run lint:eslint && npm run prettier:lint`
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Code Style

- Use TypeScript for all new code
- Follow ESLint configuration
- Format code with Prettier
- Write clear commit messages

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**Schalk Neethling**

## Acknowledgments

- Built with [Cheerio](https://cheerio.js.org/) for HTML parsing
- Deployed on [Netlify Functions](https://www.netlify.com/products/functions/)
- Powered by [TypeScript](https://www.typescriptlang.org/)
