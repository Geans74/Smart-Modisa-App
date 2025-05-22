# AgriTech Platform

An AI-integrated AgriTech platform to manage animal health, sensor data, consultations, and marketplace.

## Features

- Animal records & profiles
- Sensor data monitoring & alerts
- Veterinary consultations
- Animal auctions/marketplace
- Farmer profiles and dashboards

## Backend Setup

1. Navigate to `backend` folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Setup environment variables by creating `.env` file (use `.env.example` as a template):

```
MONGO_URI=your_mongodb_connection_string
```

4. Start the backend server:

```bash
npm run dev
```

## Frontend Setup

1. Navigate to `frontend` folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the React development server:

```bash
npm start
```

## Deployment

- Backend: Deploy on Heroku, Render, or similar with environment variables set (MongoDB Atlas recommended)
- Frontend: Deploy on Vercel or Netlify, configure API base URL accordingly
- CORS is enabled on backend for frontend requests

## API Endpoints

- GET /animals - Get all animals
- GET /animals/:tagId - Get single animal by tag ID
- POST /sensor-update/:tagId - Update sensor data for animal
- GET /consultations - Get all vet consultations
- POST /consultation - Request a consultation
- GET /market - Get market listings
- POST /market - Add market listing

---

## Contact

For help or questions, please contact [your-email@example.com].
"# Smart-Modisa-App" 
