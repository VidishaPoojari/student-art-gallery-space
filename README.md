Virtual Art Gallery

A simple web platform for students to upload and showcase their artwork online. Built using React and Firebase, the site allows image uploads, real-time comments, and a responsive gallery view.

⸻

Tech Stack

Frontend:
	•	React.js
	•	Vite
	•	Tailwind CSS
	•	React Router

Backend:
	•	Firebase Authentication
	•	Firestore (serverless backend)

DevOps:
	•	Docker
	•	GitHub Actions
	•	Vercel

Testing:
	•	Manual testing
	•	System testing using test.sh

⸻

Features
	•	User authentication with role-based access (Student, Visitor, Owner)
	•	Upload, edit, and delete artworks (with file size and format validation)
	•	Browse artworks with category filters and search functionality
	•	Real-time commenting on artworks using Firebase
	•	Individual artist profile pages showing their uploaded works
	•	Fully responsive design across mobile, tablet, and desktop
	•	Docker-based CI/CD pipeline integrated with GitHub Actions and system test

⸻

CI/CD Pipeline

Every push to the main branch triggers:
	•	Docker image build
	•	System test execution via test.sh
	•	Image push to Docker Hub (vidishapoojari/virtual-art-gallery)
	•	Frontend deployment to Vercel

⸻

