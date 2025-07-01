# Baatchit

**Check out the project live:** [https://baatchit-frontend.onrender.com/](https://baatchit-frontend.onrender.com/)

A modern, full-stack chat application with real-time messaging, file sharing, emoji support, and AI-powered chat. Built with React, Node.js, Express, MongoDB, and Socket.io.

---

## Features
- **Real-time messaging (DMs & channels):**
  Instantly send and receive messages with friends or groups. Messages appear in real time without needing to refresh the page.
- **File sharing:**
  Share images, documents, and other files directly in your chats. Download files with a single click.
- **Emoji picker:**
  Express yourself with a wide range of emojis using an integrated emoji picker.
- **AI chat bot (Gemini integration):**
  Chat with an AI-powered bot for smart replies, information, or just for fun.
- **User authentication (JWT-based):**
  Secure sign up and login with JSON Web Tokens. Your sessions are protected and persistent.
- **Profile management:**
  Update your profile picture, display name, and other personal information.
- **Responsive UI with shadcn/ui components:**
  Enjoy a modern, mobile-friendly interface built with shadcn/ui and Tailwind CSS. The app works great on both desktop and mobile devices.


---

## Technologies Used
- **Frontend:** React, Vite, Tailwind CSS, shadcn/ui, Axios
- **Backend:** Node.js, Express, MongoDB (Mongoose), Socket.io, JWT
- **AI:** Gemini API

---

## Prerequisites
- Node.js (v16+ recommended)
- npm or yarn
- MongoDB instance (local or cloud)

---

## Getting Started

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

### 3. Environment Variables
Create a `.env` file in the `server/` directory with the following:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```

### 4. Running the App
#### Start the Server
```bash
cd server
npm start
```
#### Start the Client
```bash
cd ../client
npm run dev
```

- Client: [http://localhost:5173](http://localhost:5173)
- Server: [http://localhost:5000](http://localhost:5000)

---

## Usage
- **Sign up / Log in** to your account.
- **Start a chat** with contacts or join channels.
- **Send messages, files, and emojis.**
- **Chat with the AI bot** for smart replies.


---

## Project Structure
```
baatchit/
  client/      # React frontend
  server/      # Express backend
```

---

## Security & Privacy
- All passwords are securely hashed before storage.
- JWT-based authentication ensures only authorized users can access chat features.
- File uploads are stored securely on the server.
- User data is never shared with third parties.
- AI chat is powered by Gemini; no chat data is used for training or shared externally.

---

## Contributing
1. Fork the repo
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

---

## FAQ

**Q: Can I use Baatchit on my phone?**
A: Yes! The UI is fully responsive and works great on mobile devices.


**Q: Is my data private?**
A: Yes. All messages and files are stored securely and are only accessible to authorized users.

**Q: How do I chat with the AI bot?**
A: Start a chat with the "Gemini" contact in your contact list and send messages as usual.

---

## License
MIT
