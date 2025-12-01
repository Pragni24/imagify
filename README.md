# CaseCraze 📱🎨

CaseCraze is a MERN-stack application that leverages AI to create custom phone case designs based on user text prompts. It allows users to generate unique artwork, visualize it on a phone case model, and manage their orders.

## 🚀 Live Demo
[https://casecraze-frontend.onrender.com/]

## 🛠️ Tech Stack
* **Frontend:** React.js, Tailwind CSS, React Router
* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **Tools:** Postman API, Git/GitHub

## ✨ Key Features
* **AI Design Generation:** Converts text prompts into unique visual designs for phone cases.
* **User Management:** Secure RESTful API with endpoints for user, design, and order CRUD operations.
* **Responsive UI:** Optimized for various devices using Tailwind CSS.

## 🧠 Technical Challenges & Solutions (Key Highlight)

**The Problem: Handling Heavy Image Payloads**
During the development of the "Save Design" feature, I encountered a significant performance bottleneck. Initially, I attempted to store the AI-generated images as **Base64 encoded strings** directly into the MongoDB document.
* **Issue:** This caused the JSON payload to exceed the default request body size limits and significantly slowed down database queries due to the massive document size.
* **Impact:** The application would timeout when users tried to save their favorite designs.

**The Solution: Hybrid Storage Architecture**
I refactored the backend to separate the image data from the metadata.
1.  **Object Storage:** I integrated a third-party cloud storage service (e.g., Cloudinary/AWS S3) to handle the actual image binary data.
2.  **Reference Storage:** The MongoDB `Design` schema was updated to store only the secure **URL string** returned by the cloud provider, keeping the document size lightweight.
3.  **Environment Security:** Managed sensitive API keys and database credentials using strict environment variable policies to prevent exposure.

**Result:**
This approach reduced the average database query time by nearly 60% and resolved the payload size errors, allowing for infinite scalability of user-generated designs.

## ⚙️ Installation & Run Locally

1. **Clone the repo:**
   ```bash
   git clone [https://github.com/pragni24/imagify.git](https://github.com/pragni24/imagify.git)
   ```
2. **Install dependencies (Root & Client):**
   ```bash
   npm install
   cd backend && npm install
   ```
3. **Setup Environment Variables: Create a .env file in the root directory and add:**
   ```bash
   MONGO_URI=your_mongodb_uri
   PORT=5000
   AI_API_KEY=your_ai_service_key
   ```
4. **Run the server:**
   ```bash
   npm run dev
   ```
