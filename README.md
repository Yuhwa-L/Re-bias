# 🎥 Re-Bias: See the Bias, Not Just the Video

**Re-Bias** is an AI-powered web and mobile system that reveals **how biased social media content truly is** — across YouTube, TikTok, and Instagram Reels.  
Instead of trying to remove bias, Re-Bias **visualizes it transparently**, empowering users to understand and rebalance their media perspective.

---

## 🌍 Overview

Modern recommendation algorithms often amplify political or emotional bias.  
Re-Bias quantifies these tendencies by analyzing the **language, tone, and visual mood** of each video — returning a **Bias Index (0–100%)** with interpretive reasoning.  
The system is designed to help users become aware of subtle influence rather than filter it away.

---

## ⚙️ Features

### 🧠 Bias Analysis
- Extracts **transcripts, audio sentiment, and visual cues** from uploaded or linked videos.  
- Detects **political, ideological, and emotional bias** using AI models.  
- Generates a unified **Bias Index** and reasoning summary.

### 📊 Real-Time Visualization
- Displays a **live bias banner** overlay on the video feed (similar to a phone battery icon).  
- Color-coded indicator:  
  - 🟢 Neutral (0–30%)  
  - 🟡 Moderate (31–60%)  
  - 🔴 High (61–100%)  
- Tapping the banner opens the full in-app analysis page.

### 🔄 One-Tap Reset
- Helps users refresh their **YouTube/TikTok algorithm feed** to reduce echo-chamber effects.  

---

## 🧩 Tech Stack

| Layer | Technology | Purpose |
|-------|-------------|----------|
| **Frontend** | HTML, CSS, JavaScript | UI, transcript extraction, bias visualization |
| **Backend (Planned)** | Python (Flask / FastAPI) | API layer, AI model integration |
| **AI Models** | Whisper / BERT / RoBERTa / OpenCV | Speech-to-text, sentiment & bias detection, scene analysis |
| **Tools** | Node.js, GitHub, VS Code | Development environment & collaboration |
| **Hosting (Future)** | Vercel / AWS | Deployment and scalability |

---

## 🚀 How It Works

1. User uploads or links a video (YouTube, TikTok, Instagram Reels).  
2. System extracts **text and audio** data.  
3. AI models analyze **sentiment polarity** and **topic framing**.  
4. The **Bias Index** is calculated.  
5. The result is visualized **directly on the video feed** or via the app dashboard.

---

## 💻 Demo Preview