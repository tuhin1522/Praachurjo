# 🌏 Praachurjo: Accelerating Smart Bangladesh through an Ecosystem for Collaborative SME Expansion

> Empowering SMEs with AI, collaboration, and data — building the foundation of a Smart Bangladesh 🇧🇩  

<p align="center">
  <img src="https://i.postimg.cc/WbpSD57k/banner-Praachurjo.png" alt="Praachurjo Banner" width="800"/>
</p>


---

## 🚀 Overview

**Praachurjo** is an AI-powered digital ecosystem designed to transform Bangladesh’s **Small and Medium Enterprises (SMEs)**.  
It bridges the gap between **businesses, suppliers, customers, and community riders**, enabling collaboration, intelligent decision-making, and financial inclusion through data-driven insights.  

By connecting technology, data, and people, Praachurjo drives Bangladesh closer to its **Smart Bangladesh Vision** — fostering innovation, transparency, and inclusive growth.

---

## 🧩 Problem Statement

SMEs are the backbone of Bangladesh’s economy but face key challenges:

- ⚙️ **Limited Market Access** – Difficulty finding verified suppliers and reaching customers.  
- 📉 **Low Digital Adoption** – Most SMEs still operate offline, missing e-commerce opportunities.  
- 💳 **Restricted Credit** – Banks lack reliable SME data for credit evaluation.  
- 🤝 **Weak Negotiation Power** – Individual SMEs cannot compete with corporate giants.

These barriers result in **slow digital transformation**, **limited growth**, and **fragmented operations** — restricting SMEs’ full potential to contribute to Smart Bangladesh.

---

## 💡 Our Solution — Praachurjo

**Praachurjo is a next-gen digital platform that connects and empowers SMEs through an AI-driven collaborative ecosystem.

---

### 🧠 Core Features

#### 🏭 Smart SME Clusters
Organizes SMEs by **product, region, and behavior** to enable:
- Bulk purchasing & knowledge sharing  
- Collective bargaining for better pricing  
- Regional collaboration & resource sharing  

<p align="center">
  <img src="https://i.postimg.cc/HxpYf6KF/categories.png" alt="Smart SME Clusters" width="700"/>
</p>

---

#### 📊 AI-Driven Business Intelligence
- **Demand Forecasting:** Uses LSTM models to predict product demand.  
- **Price Optimization:** Reinforcement Learning suggests best price points.  
- **Interactive Dashboards:** Visualize product performance, sales zones, and trends.  

---

#### 🔗 Supplier & Partner Matching
- AI-driven **supplier recommendations** based on quality, reliability, and proximity.  
- Strengthens local supply chains and builds trust through **verified partnerships**.  

---

#### ✨ Sentiment Analysis for Reviews

Analyze customer review text (positive/negative) using a Python FastAPI microservice backed by your trained TF‑IDF + Naive Bayes model, and store the sentiment with each review.


<img src="https://i.postimg.cc/0y6jkd2j/Screenshot-from-2025-11-14-01-23-19.png" alt="Review Sentiment Analysis" width="700"/>


#### 🤖 AI Business Assistant
- Smart chatbot enables **natural-language ordering**:
  - Chat: “Order 5kg rice & 10 bottles of oil” → AI auto-fills the cart.  
  - Upload handwritten/printed shopping lists → OCR + NLP extract products.  
  - Suggests top-rated product options instantly.
 
  <p align="center">
  <img src="https://i.postimg.cc/hjr3rJjB/wmremove-transformed.webp" alt="Community Rider System" width="500"/>
</p>

---

#### 🛵 Community Rider Network
A decentralized **delivery system** connecting local riders:
- Any verified user can become a rider (using NID, address proof).  
- System notifies nearby riders for intercity product delivery.  
- Riders earn money while traveling, reducing delivery time and cost.  

<p align="center">
  <img src="https://i.postimg.cc/s2PnjB5K/delivery-1836.gif" alt="Community Rider System" width="700"/>
</p>

---

## ⚙️ Technical Architecture

| Component | Technology |
|------------|-------------|
| **Frontend** | React.js + Tailwind CSS |
| **Backend** | FastAPI (Python) + Node.js + Express.js| 
| **Database** | MySQL |
| **AI/ML Models** | LSTM, HDBSCAN, XGBoost, GNNs, Autoencoders |
| **Integrations** | Firebase Auth, Payment APIs |
| **Deployment** | AWS / Google Cloud / Vercel |


### 🧬 AI/ML Highlights
- **Clustering:** HDBSCAN + Autoencoders  
- **Forecasting:** LSTM-based demand prediction  
- **Price Optimization:** Reinforcement Learning  
- **Supplier Recommendation:** Graph Neural Networks  
- **Credit Scoring:** Gradient Boosted Trees (XGBoost)  
- **Chatbot Intelligence:** Fine-tuned LLM integrated via RAG pipeline

  <p align="center">
  <img src="https://i.postimg.cc/CLNwpj0c/Whats-App-Image-2025-11-10-at-03-36-30-fbbf1d57-Recovered-1.jpg" alt="System Architecture" width="800"/>
</p>

---

## 📦 Installation & Setup

Follow these steps to run **Praachurjo** locally.

### 🔹 Prerequisites
- Node.js (v18+)
- Python (v3.10+)
- MongoDB running locally or remotely
- Git

---

### 🖥️ Frontend Setup

```bash
# Clone the repository
git clone https://github.com/tuhin1522/Praachurjo.git

# Navigate to frontend
cd Praachurjo/frontend

# Install dependencies
npm install

# Run development server
npm run dev
```
---

## 📂 Project Structure

```bash
Praachurjo/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── assets/
│   │   ├── context/
│   │   └── utils/
│   ├── package.json
│   └── tailwind.config.js
│
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── ai/
│   ├── requirements.txt
│   └── config.py
│
├── docs/
│   ├── assets/
│   └── readme_media/
│
└── README.md

```

## 📈 Potential Impact

### 💰 Economic Empowerment
- SMEs increase profitability by **15–25%** through optimized pricing and supplier access.  
- Reduces waste and logistics costs via smart clustering and rider delivery.  

### 🤝 Enhanced Collaboration
- Data insights enable **collective bargaining**, shared logistics, and better cooperation.  

### 🏦 Financial Inclusion
- Credit access for small retailers and riders through verified digital trading history.  

### 🌐 Digital Transformation
- Introduces SMEs to **AI-driven tools**, analytics, and automation.  

### 🇧🇩 Smart Bangladesh Alignment
- Promotes **innovation**, **data-driven governance**, and **inclusive growth** — core to the **Smart Bangladesh Vision**.

---

## 📫 Contact
For collaboration or inquiries:  
📧 **noornabinoor1770@gmail.com**  
🌐 [GitHub Repository](https://github.com/tuhin1522/Praachurjo)  

---

> “Praachurjo — Empowering every entrepreneur to be part of Smart Bangladesh.”
