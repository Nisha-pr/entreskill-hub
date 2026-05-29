# EntreSkill Hub 🚀
### Skill-to-Startup Enablement Platform

EntreSkill Hub is a full-stack web application designed to empower aspiring micro-entrepreneurs by bridging the gap between personal skills and business success.

![EntreSkill Hub](https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80)

---

## 🌟 Live Demo
- **Frontend:** [entreskill-hub.vercel.app](https://entreskill-hub.vercel.app)
- **Backend API:** [entreskill-hub-api.onrender.com](https://entreskill-hub-api.onrender.com)

---

## 📋 About The Project

Many individuals possess practical skills — tailoring, cooking, handicrafts, digital marketing, photography — but lack structured guidance to convert those skills into sustainable micro-businesses.

**EntreSkill Hub** bridges this gap by providing:
- Business idea discovery based on personal skills
- Step-by-step business roadmaps
- Curated learning resources
- Expert mentorship access
- Location-based community

---

## ✨ Features

### For Entrepreneurs (Users)
- 🎯 Skill & interest assessment
- 💡 Personalized business idea recommendations
- 🗺️ Step-by-step business roadmaps with progress tracking
- 📚 Learning resources (videos, articles, checklists)
- 👨‍🏫 Mentor directory with live chat
- 📍 Location-based community discovery
- 📊 Personal progress dashboard
- 🔖 Save & bookmark business ideas

### For Mentors
- 📊 Dedicated mentor dashboard
- 📅 Session request management
- 📤 Upload training resources
- 👥 Track mentee engagement

### For Admins
- 📈 Platform statistics
- 👥 User & mentor management
- ✅ Resource approval & moderation

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js, Tailwind CSS, React Router |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| Auth | JWT, bcryptjs |
| Deployment | Vercel (FE), Render (BE) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- npm v9+
- MongoDB Atlas account

### Installation

1. Clone the repository
```bash
git clone https://github.com/Nisha-pr/entreskill-hub.git
cd entreskill-hub
```

2. Setup Backend
```bash
cd server
npm install
```

3. Create `.env` file in server folder
4. Start Backend
```bash
npm run dev
```

5. Setup Frontend (new terminal)
```bash
cd client
npm install
npm start
```

6. Open browser: `http://localhost:3000`

---

## 📁 Project Structure---

## 🔗 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login user |
| GET | /api/resources | Get all resources |
| GET | /api/admin/stats | Admin statistics |
| POST | /api/mentors/sessions | Request mentor session |
| GET | /api/progress | Get user progress |

---

## 👥 User Roles

| Role | Access |
|------|--------|
| User | Dashboard, Skills, Ideas, Roadmap, Resources, Mentors |
| Mentor | Mentor Dashboard, Session Management, Upload Resources |
| Admin | Admin Dashboard, User Management, Content Moderation |

---

## 🎯 Target Users

Built specifically for **women, youth, and rural entrepreneurs** in India who possess practical skills but lack structured guidance to convert those skills into sustainable income.

---

## 📊 Expected Impact

- Increased self-employment opportunities
- Better utilization of practical skills
- Reduced failure rate of micro-businesses
- Empowerment of grassroots entrepreneurs

---

## 🔮 Future Enhancements

- [ ] AI-based skill-to-business matching
- [ ] Multi-language support (Hindi, regional languages)
- [ ] Mobile application (React Native)
- [ ] Government scheme integration
- [ ] Funding & loan partner onboarding

---

## 👩‍💻 Developer

**Nisha** — Full Stack Developer

---

## 📄 License

This project is licensed under the MIT License.

---

*Built with ❤️ for grassroots entrepreneurs across India*
