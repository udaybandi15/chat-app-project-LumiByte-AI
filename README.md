🌟 Key Features
Responsive Two-Pane UI: A collapsible sidebar for chat history and a main window for the conversation.

Session Management: Conversations are linked to unique URLs (/chat/:sessionId), and past sessions are listed in the sidebar.

Mock Backend API: A simple Express server provides static JSON data to simulate fetching sessions and receiving chat responses.

Structured Data Display: The AI's response includes a custom table, rendered as a separate component.

Light/Dark Theme: A theme toggle in the sidebar persists the theme (light or dark) using localStorage and darkMode: 'class' in Tailwind.

💻 Tech Stack
Frontend
React: For building the user interface.

React Router: For all client-side routing (/ and /chat/:id).

Tailwind CSS: For utility-first styling and responsiveness.

Heroicons: For UI icons.

Backend
Node.js: JavaScript runtime environment.

Express.js: Web framework for creating the mock REST API.

CORS: To allow cross-origin requests from the frontend.

🚀 Getting Started
To run this project locally, you will need to run both the backend server and the frontend client in two separate terminals.

Prerequisites
Node.js (LTS version) installed on your machine.

Installation & Running
Clone the repository to your local machine:

Bash

git clone [your-repository-url]
cd chat-app-project
Start the Backend Server (Terminal 1):

Bash

# Navigate to the backend folder
cd backend

# Install dependencies
npm install

# Start the server
npm start
The backend server will be running at http://localhost:5000.

Start the Frontend Client (Terminal 2): Open a new terminal window or tab.

Bash

# Navigate to the frontend folder
cd frontend

# Install dependencies
npm install

# Start the React development server
npm start
The React application will open automatically in your browser at http://localhost:3000.

📁 Project Structure
/chat-app-project
|
├── /backend
|   ├── server.js         # Express server and API routes
|   ├── mockData.js       # Static JSON data
|   └── package.json
|
└── /frontend
    ├── /public
    ├── /src
    |   ├── /components   # All React components
    |   |   ├── Sidebar.js
    |   |   ├── ChatWindow.js
    |   |   ├── TableResponse.js
    |   |   └── ThemeToggle.js
    |   ├── App.js        # Main layout and routing
    |   ├── index.css     # Tailwind CSS imports
    |   └── index.js      # Root React file
    ├── package.json
    ├── tailwind.config.js
    └── postcss.config.js
⚙️ API Endpoints (Mock Backend)
The backend provides four mock endpoints:

GET /api/sessions

Returns a list of all session titles and IDs for the sidebar.

GET /api/new-chat

Generates a new session ID, adds it to the list, and returns it.

GET /api/session/:id

Returns the full conversation history for a specific sessionId.

POST /api/chat/:id

Accepts a user question.

Adds the user's question and a mock AI (table) response to the conversation history.

Returns the mock AI (table) response.
