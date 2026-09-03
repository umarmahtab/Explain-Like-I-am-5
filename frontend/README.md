# Explain Like I'm 5 AI

Simple run guide for this full-stack app.

## Stack

- Frontend: React + Vite + Tailwind + Framer Motion
- Backend: Node.js + Express + MongoDB

## 1) Install dependencies

From project root, run:

```powershell
cd backend
npm install

cd ../frontend
npm install
```

## 2) Configure environment files

Create these files from the examples:

- `backend/.env` from `backend/.env.example`
- `frontend/.env` from `frontend/.env.example`

Minimum backend values:

```env
PORT=5000
CLIENT_URL=http://localhost:5173
MONGODB_URI=mongodb://127.0.0.1:27017/explain-like-im-5-ai
GEMINI_API_KEY=your_gemini_api_key_here
```

Frontend value:

```env
VITE_API_BASE_URL=http://localhost:5000
```

## 3) Start MongoDB

Make sure MongoDB is running locally on `mongodb://127.0.0.1:27017`.

## 4) Run the app

Open two terminals.

Terminal 1 (backend):

```powershell
cd backend
npm run dev
```

Terminal 2 (frontend):

```powershell
cd frontend
npm run dev
```

## 5) Open in browser

Go to:

`http://localhost:5173`

## API endpoints

- `POST /explain` (also available as `/api/explain`)
- `GET /history` (also available as `/api/history`)
