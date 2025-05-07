# 🧠 AlphaFlow - AI Agent Workflow Engine

AlphaFlow is a visual, modular, and extensible **AI Agent Workflow System** built using **React Flow**. It allows developers and non-technical users to design powerful automated workflows combining logic, integrations, and AI (GPT, APIs, databases...).

---

## 🚀 Features

* 📌 **Visual Node-Based Editor** using [React Flow](https://reactflow.dev/)
* 🧠 **GPT Integration** – generate and analyze content dynamically
* 🌐 **API Requests** – connect to any external RESTful service
* 📅 **User Inputs** – capture inputs from various channels (chat, forms...)
* ⚙️ **Conditionals & Logic** – powerful control flow nodes (If, Switch, Loops...)
* 📂 **Database Access** – read/write to SQL/NoSQL databases
* ⏳ **Delay & Wait Nodes** – async flows with timers and triggers
* 🔐 **Encryption/Decryption** nodes
* 📄 **File Upload/Download** support
* 📊 **Debugging tools** with Log Nodes
* 🧹 Fully **extensible node architecture**

---

## 🧹 Node Types

AlphaFlow supports over 25+ modular node types including:

| Node Type           | Purpose                                 |
| ------------------- | --------------------------------------- |
| `StartNode`         | Workflow entry point                    |
| `MessageNode`       | Send a message (WhatsApp, Telegram...)  |
| `GPTNode`           | Interact with OpenAI/GPT                |
| `IfNode`            | Conditional branching (true/false)      |
| `SwitchNode`        | Multi-path branching                    |
| `APICallNode`       | Call external APIs                      |
| `SaveVariableNode`  | Save context data                       |
| `LoopNode`          | Repeat execution N times or until logic |
| `EndNode`           | Terminate workflow                      |
| `CustomScriptNode`  | Run external Python/JS logic            |
| `FormNode`          | Collect structured input from user      |
| ...and many more... | Full table in the docs                  |


---

## 🏗️ Tech Stack

* [React](https://reactjs.org/)
* [React Flow](https://reactflow.dev/)
* [TypeScript](https://www.typescriptlang.org/)
* [Tailwind CSS](https://tailwindcss.com/)
* \[Node.js / Express (optional)] for backend integrations
* [OpenAI API](https://platform.openai.com/)

---

## 📂 Project Structure

```
alphaflow/
├── src/
│   ├── nodes/               # All node definitions
│   ├── engine/              # Workflow engine logic
│   ├── components/          # React Flow UI components
│   ├── context/             # Global state/context
│   └── App.tsx              # Entry point
├── public/
├── package.json
├── tailwind.config.js
└── README.md
```

---

## 🛠️ Setup & Development

```bash
# 1. Clone the repo
git clone https://github.com/deman404/alphaflow.git
cd alphaflow

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev
```

---

## 🧪 Usage

* Drag and drop nodes from the panel
* Connect them using edges
* Configure node settings in the right sidebar
* Run the workflow with the "Start" node
* Use the log panel to debug outputs

---

## 🧱 Extending

To add a custom node:

1. Create a new file in `src/nodes/MyNewNode.tsx`
2. Define the `type`, `inputs`, `outputs`, and `onExecute()`
3. Register it in the global node registry

---

## 📄 License

MIT License © 2025 \[YourName]

---

## 🤛 Contributions

Contributions, node ideas, and bug reports are welcome!

> Built with love for automating the future. ❤️
