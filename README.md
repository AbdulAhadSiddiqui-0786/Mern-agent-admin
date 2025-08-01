# 🧑‍💼 MERN Agent Distribution App

A full-stack MERN application for managing agents and distributing CSV/Excel data among them. Admins can log in, add agents, upload files, and view distributed tasks — all through a clean, responsive dashboard.

---

##  Tech Stack

###  Frontend
- **React** (with Vite)
- **Tailwind CSS**
- **React Router**
- **React Hook Form**
- **React Toastify / Hot Toast**
- **Lucide React** (icons)
- **React Phone Number Input**
- **pnpm** for package management

### Backend
- **Express.js** with **Node.js**
- **MongoDB** via **Mongoose**
- **JWT** for authentication
- **Multer** for file uploads
- **XLSX** for parsing Excel/CSV files
- **Bcrypt** for password hashing

---

##  Features

-  Admin login with JWT
-  Add agents with secure password hashing
-  Upload and distribute CSV/Excel files
-  View distributed tasks per agent
-  Dark/light theme toggle
-  Toast notifications for feedback
- Responsive and accessible UI

---

##  Project Structure
---
```tree
Mern-agent-app/
│
├── frontend/
│   ├── public/
│   │   ├── logo.png
│   │   └── index.html
│   ├── .env
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── AgentForm.jsx
│   │   │   ├── CSVUpload.jsx
│   │   │   ├── DistributedList.jsx
│   │   │   └── LoginForm.jsx
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── ErrorPage.jsx
│   │   │   └── Login.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   └── vite.config.js
│
├── server/
│   ├── models/
│   │   ├── Agent.js
│   │   ├── DistributedList.js
│   │   └── User.js
│   ├── controllers/
│   │   ├── agentController.js
│   │   ├── authController.js
│   │   └── listController.js
│   ├── middlewares/
│   │   └── authMiddleware.js
│   ├── routes/
│   │   ├── agentRoutes.js
│   │   ├── authRoutes.js
│   │   └── listRoutes.js
│   ├── uploads/
│   ├── seedAdmin.js
│   ├── index.js
│   └── .env
│
├── utils/
│   └── sample.csv

```
---

##  Authentication

- Admin logs in via `/auth/login`
- JWT token stored in `localStorage`
- Protected routes use `Authorization: Bearer <token>`

---

##  CSV Distribution Logic

- Admin uploads `.csv`, `.xlsx`, or `.xls` file
- File is parsed and validated for required fields: `firstName`, `phone`, `notes`
- Data is evenly distributed among 5 agents
- Each agent's data is stored in `DistributedList` model

---

##  Setup Instructions (Using `pnpm`)

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/mern-agent-app.git
cd mern-agent-app
```

Note :makesure pnpm is installed:
```bash
npm install -g pnpm@latest-10
```
2. Backend Setup
```bash
cd server
pnpm install
```
Create a .env file:/or use my env which i was provided for demo purpose
MONGO_URI=mongodb://localhost:27017/mern_agent_app
JWT_SECRET=your_jwt_secret

Seed admin user:
```bash
pnpm exec node seedAdmin.js`
```
Start server:
```bash
pnpm run dev
```
3. Frontend Setup
```bash
cd frontend
pnpm install
```
Create a .env file:
VITE_API_URL=http://localhost:5000/api

Start frontend:
```bash
pnpm run dev
```

 ## Notes
Ensure MongoDB is running locally or use a cloud provider like Atlas.

At least 5 agents must be added before uploading files.

CSV/Excel files must include firstName, phone, and notes columns.


## Video demo
[DemoVideo](https://drive.google.com/drive/folders/1Uqq6gJywSEvxCqXdcsqvHW9VKXo7Eig1)



## Author
Abdul Ahad Siddiqui
[Github](https://github.com/AbdulAhadSiddiqui-0786/)

# Licence
This project is open-source and available under the MIT License.

