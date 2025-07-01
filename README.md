# 💬 Baatchit

**Live Demo:** [baatchit-frontend.onrender.com](https://baatchit-frontend.onrender.com)

A sleek, full-stack chat application with **real-time messaging**, **file sharing**, **emoji support**, and an **AI-powered chatbot**. Built using **React**, **Node.js**, **Express**, **MongoDB**, and **Socket.io**.

---

## ✨ Features

- 🔴 **Real-time Messaging (DMs & Channels)**  
  Instantly send and receive messages in private or group chats — no refresh needed.

- 📎 **File Sharing**  
  Upload and download images, documents, and more directly in your chat.

- 😀 **Emoji Picker**  
  Easily insert emojis to express yourself with an intuitive emoji picker.

- 🤖 **AI Chatbot (Gemini Integration)**  
  Talk to an AI assistant powered by Google's Gemini API.

- 🔐 **User Authentication (JWT-based)**  
  Secure sign-up/login flow with token-based authentication.

- 👤 **Profile Management**  
  Edit your profile picture, display name, and personal details.

- 📱 **Responsive UI**  
  Mobile-friendly, modern interface using **shadcn/ui** and **Tailwind CSS**.

---

## 🛠️ Tech Stack

### 🖥️ Frontend

 ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) 
 ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white) 
 ![Tailwind](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white) 
 ![shadcn](https://img.shields.io/badge/shadcn/ui-000000?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyBmaWxsPSJ3aGl0ZSIgdmlld0JveD0iMCAwIDUwIDUwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0xMy41IDQzLjFMMS41IDI1IDM3LjUgNS41bDEyIDxMLjUgMjUgMTMuNSA0My4xeiIvPjwvc3ZnPg==) 
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white) 

### 🧠 Backend

 ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white) 
 ![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white) 
 ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white) 
 ![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white) 
 ![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white) 

### 🤖 AI

 ![Gemini](https://img.shields.io/badge/Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white) 

---

## ⚙️ Prerequisites

- Node.js (v16+)
- npm or yarn
- MongoDB (local or cloud instance)

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repo-url>
cd baatchit
```

### 2. Install Dependencies

#### Client
```bash
cd client
npm install
```

#### Server
```bash
cd ../server
npm install
```

### 3. Setup Environment Variables

Create a `.env` file inside the `server/` directory:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```

### 4. Start the Application

#### Server
```bash
cd server
npm start
```

#### Client
```bash
cd ../client
npm run dev
```

- **Client:** [http://localhost:5173](http://localhost:5173)  
- **Server:** [http://localhost:5000](http://localhost:5000)

---

## 🧪 Usage

1. Sign up or log in to your account.
2. Start a chat with a contact or join a group/channel.
3. Send messages, upload files, and use emojis.
4. Chat with the **Gemini AI bot** like any other user.

---

## 📁 Project Structure

```
baatchit/
├── client/   → React frontend
└── server/   → Express backend
```

---

## 🔒 Security & Privacy

- Passwords are hashed before storage using industry standards.
- JWT ensures secure and persistent authentication.
- Files are stored securely on the server.
- No personal data is shared with third parties.
- AI chat (Gemini) does not store or use chat data for training.

---

## 🤝 Contributing

Contributions are welcome! Here's how:

```bash
1. Fork the repository
2. Create your feature branch: git checkout -b feature/YourFeature
3. Commit your changes: git commit -am 'Add some feature'
4. Push to the branch: git push origin feature/YourFeature
5. Open a pull request 🚀
```

---

## ❓ FAQ

**Q: Can I use Baatchit on my phone?**  
A: Absolutely! The interface is fully responsive and mobile-friendly.

**Q: Is my data private?**  
A: Yes. All messages and files are encrypted and accessible only to authorized users.

**Q: How do I talk to the AI bot?**  
A: Start a chat with the “Gemini” contact — it behaves like any other user.

---

## 📄 License

**MIT License** — feel free to use and modify Baatchit as you like.

---
