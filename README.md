# 🔐 Secure Pass Manager

A secure, local-first password manager built with **React**, **Tailwind CSS**, and **Vite**. Store your passwords safely on your own device — no account, no server, no data leaving your machine. For users who want cross-device sync, an optional **MongoDB + Express** backend is available as a separate module.

🔗 **Live demo:** [https://mubashir-dev-cyber.github.io/Secure-pass-manager/](https://mubashir-dev-cyber.github.io/Secure-pass-manager/)

---

## ✨ Features

- **Local storage mode (default, free)** — passwords are saved directly in your browser's local storage, never leaving your device
- **Add, view, and delete** saved passwords through a clean UI
- **Toast notifications** for actions (copy, save, delete) via `react-toastify`
- **Unique IDs** for each saved entry using `uuid`
- **Responsive, modern UI** styled with Tailwind CSS
- **Optional cloud sync mode** — connect to a MongoDB database via a companion Express backend (see below) for cross-device access

---

## 🛠️ Tech Stack

**Frontend**
- React 19
- Vite 8
- Tailwind CSS 4 (`@tailwindcss/vite`)
- react-toastify
- uuid
- ESLint

**Backend (optional, separate repo)**
- Express
- MongoDB
- See: [passop-mongo backend](https://github.com/Mubashir-Dev-cyber/Sigma-Web-dev-course/tree/main/Vedio%20130/passop-mongo)

---

## 📦 Getting Started

### Prerequisites
- Node.js and npm installed

### Installation

```bash
git clone https://github.com/Mubashir-Dev-cyber/Secure-pass-manager.git
cd Secure-pass-manager
npm install
```

### Run locally (development)

```bash
npm run dev
```

App will be available at `http://localhost:5173/`

### Build for production

```bash
npm run build
npm run preview
```

### Deploy to GitHub Pages

```bash
npm run deploy
```

---

## ☁️ Using the MongoDB (Cloud Sync) Version

By default, this app runs entirely on local storage — free and requires no setup.

If you'd like passwords synced across devices instead:

1. Clone and set up the backend from the companion repo: [passop-mongo](https://github.com/Mubashir-Dev-cyber/Sigma-Web-dev-course/tree/main/Vedio%20130/passop-mongo)
2. Set up your own MongoDB database (e.g. MongoDB Atlas free tier)
3. Configure the Express server with your MongoDB connection string
4. Point this frontend's API calls to your running backend

> ⚠️ Note: The MongoDB-backed version requires you to host the backend yourself (e.g. Render, Railway) and, if you want a custom domain, purchase and configure one — GitHub Pages only serves static frontend code and cannot run the backend or securely store credentials.

---

## 📁 Project Structure

```
Secure-pass-manager/
├── public/
├── src/
│   ├── components/
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

---

## 📄 License

This project is open source and available for personal and educational use.

---

## 👤 Author

**Muhammad Mubashir**
- GitHub: [@Mubashir-Dev-cyber](https://github.com/Mubashir-Dev-cyber)
- Email: mubashirkhawer555@gmail.com
