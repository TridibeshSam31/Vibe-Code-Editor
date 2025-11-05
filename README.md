🧠 Vibecode Editor — where code meets AI, voice, and speed.
Vibecode Editor is a blazing-fast, AI-integrated web IDE built entirely in the browser using Next.js App Router, WebContainers, Monaco Editor, and local LLMs via Ollama. It offers real-time code execution, an AI-powered chat assistant, and support for multiple tech stacks — all wrapped in a stunning developer-first UI.

🌟 Features
🔐 Authentication
OAuth login with Google and GitHub using NextAuth.
Session management and secure authentication flow.

🎨 Modern UI
Built using TailwindCSS + ShadCN UI for a sleek developer experience.
Light/Dark Mode toggle with persistent theme memory.

🗂️ File Management

Fully functional File Explorer — create, rename, delete, and manage files/folders.
Real-time syncing between file tree and editor.

🧠 AI-Powered Features

AI Autocomplete: Trigger with <kbd>Ctrl + Space</kbd> or double <kbd>Enter</kbd>.
Accept with <kbd>Tab</kbd>.

AI Chat Assistant: Share code files directly with AI for debugging, explanations, or refactors.
Ollama Integration: Works with local LLMs running via Docker — completely offline.
AI Code Suggestions: Context-aware completion and inline hinting for multiple languages.

🎤 Voice Command Support (NEW)

AI Speech Commands: Control your IDE hands-free.
Example commands:

🗣️ “Save” → Saves the current file
🗣️ “Run” → Executes the current project in WebContainers
🗣️ “Open terminal” → Opens the built-in terminal
🗣️ “Create new file” → Generates a blank file instantly
🗣️ “Stop” → Halts running processes

Built using the Web Speech API with real-time feedback through the AI Assistant.

💻 Code Execution

WebContainers Integration: Run full-stack apps directly in the browser (React, Next.js, Express, Hono, Vue, Angular).
Built-in xterm.js Terminal for interactive commands and debugging.

✍️ Monaco Editor

Syntax highlighting for 20+ languages
Code formatting, linting, and custom keybindings
Line-level AI autocompletion with inline hints

🧱 Tech Stack
| Layer              | Technology                       |
| ------------------ | -------------------------------- |
| **Framework**      | Next.js 15 (App Router)          |
| **Styling**        | TailwindCSS + ShadCN UI          |
| **Language**       | TypeScript                       |
| **Authentication** | NextAuth (Google + GitHub OAuth) |
| **Editor**         | Monaco Editor                    |
| **AI Integration** | Ollama (local LLMs via Docker)   |
| **Runtime**        | WebContainers                    |
| **Terminal**       | xterm.js                         |
| **Voice Commands** | Web Speech API                   |
| **Database**       | MongoDB (via `DATABASE_URL`)     |


🛠️ Getting Started
1. Clone the Repo
git clone https://github.com/your-username/vibecode-editor.git
cd vibecode-editor
2.Install Dependencies
Create a .env.local file using the template:
cp .env.example .env.local
Then, fill in your credentials:
AUTH_SECRET=your_auth_secret
AUTH_GOOGLE_ID=your_google_client_id
AUTH_GOOGLE_SECRET=your_google_secret
AUTH_GITHUB_ID=your_github_client_id
AUTH_GITHUB_SECRET=your_github_secret
DATABASE_URL=your_mongodb_connection_string
NEXTAUTH_URL=http://localhost:3000

4. Start Local Ollama Model
Make sure Ollama and Docker are installed, then run:
ollama run codellama
Or use your preferred model that supports code generation.

5. Run the Development Server
   npm run dev
Visit http://localhost:3000 in your browser.

🎯 Keyboard Shortcuts
Ctrl + Space or Double Enter: Trigger AI suggestions
Tab: Accept AI suggestion
/: Open Command Palette (if implemented)

🙏 Acknowledgements
Monaco Editor
Ollama – for offline LLMs
WebContainers
xterm.js
NextAuth.js
   
