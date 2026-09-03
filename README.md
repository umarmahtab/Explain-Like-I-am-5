<div align="center">

# 🧠 Explain Like I'm 5 (ELI5)

**Complex topics, simplified.** An AI-powered application that breaks down complicated subjects into easy-to-understand explanations using Google's Generative AI.

[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Express.js](https://img.shields.io/badge/Express.js-5.2-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Google GenAI](https://img.shields.io/badge/Google_GenAI-API-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)

</div>

---

## ✨ Features

- 🤖 **AI-Powered Explanations:** Utilizes Google GenAI to instantly simplify complex queries.
- 🎨 **Beautiful UI:** Built with Tailwind CSS and Framer Motion for a smooth, animated, and responsive user experience.
- 💾 **History Tracking:** Saves your previous queries and explanations using MongoDB so you can revisit them anytime.
- ⚡ **Blazing Fast:** Powered by Vite and React for snappy frontend performance, paired with a lightweight Express backend.

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 19 + Vite
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React

### Backend
- **Server:** Node.js + Express (v5.2)
- **Database:** MongoDB (via Mongoose)
- **AI Integration:** `@google/genai` SDK

---

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine. You'll also need a MongoDB database and a Google Gemini API key.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/explain-like-im-5.git
   cd explain-like-im-5
   ```

2. **Setup the Backend:**
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend` directory and add your keys:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   GEMINI_API_KEY=your_google_genai_api_key
   ```

3. **Setup the Frontend:**
   ```bash
   cd ../frontend
   npm install
   ```
   Create a `.env` file in the `frontend` directory (if needed for API URLs):
   ```env
   VITE_API_URL=http://localhost:5000
   ```

### Running the App

For your convenience, a batch script is included to start both the frontend and backend simultaneously on Windows.

Simply double-click or run:
```bash
Run.bat
```
*(This will start the backend server, the Vite frontend server, and automatically open `http://localhost:5173` in your default browser).*

Alternatively, run them manually:
- **Backend:** `cd backend && npm run dev`
- **Frontend:** `cd frontend && npm run dev`

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/yourusername/explain-like-im-5/issues).

## 📝 License

This project is licensed under the ISC License.
