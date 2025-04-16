
# Welcome to your Virtual Art Gallery 

A platform for student artists to showcase their work and gain exposure in the art community.

## Features
- Student artist registration and profile management
- Artwork upload and management
- Gallery viewing and artwork discovery
- Community interaction through comments and likes

## Development

### Local Setup
1. Clone the repository
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`

### Docker
This project includes Docker integration for easy deployment:

```bash
# Build the Docker image
docker build -t virtual-art-gallery .

# Run the container
docker run -p 3000:3000 virtual-art-gallery

# Run tests
./test.sh
```

### CI/CD
This project uses GitHub Actions for automated CI/CD to Docker Hub. When code is pushed to the main branch, it:
1. Builds a Docker image
2. Pushes the image to Docker Hub with the tag: `vidishapoojari/virtual-art-gallery`

## Technologies
- React
- TypeScript
- Firebase (Authentication, Firestore, Storage)
- Tailwind CSS
- Shadcn UI
