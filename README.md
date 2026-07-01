# 🎮 Vocagame Dashboard — Digital Gaming & Top-Up Management

<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="50" alt="React" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" width="50" alt="TypeScript" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg" width="50" alt="Vite" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" width="50" alt="Tailwind CSS" />
  <img src="https://react-hook-form.com/images/logo/react-hook-form-logo-only.svg" width="50" alt="React Hook Form" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/reactrouter/reactrouter-original.svg" width="50" alt="React Router" />
  <img src="https://raw.githubusercontent.com/TanStack/query/main/media/emblem-light.svg" width="50" alt="TanStack Query" />
  <img src="https://raw.githubusercontent.com/pmndrs/zustand/main/examples/demo/public/favicon.ico" width="50" alt="Zustand" />
  <img src="https://www.chartjs.org/img/chartjs-logo.svg" width="50" alt="Chart.js" />
  <img src="https://ui.shadcn.com/favicon.ico" width="50" alt="Shadcn UI" />
</p>

Vocagame Dashboard is a modern administrative dashboard built for managing digital gaming products, game top-up services, and transaction activities. The platform enables administrators to monitor sales performance, manage product catalogs, track user transactions, and gain real-time business insights through a responsive and user-friendly interface.

## 🚀 Key Features

- 🎮 Manage game top-up products and digital vouchers
- 📊 Real-time dashboard analytics and sales monitoring
- 💰 Track transactions and revenue performance
- 👥 User management and activity tracking
- 🔍 Advanced search and filtering for products and transactions
- 📈 Interactive charts and business insights powered by Chart.js
- ⚡ Fast data fetching and caching with TanStack Query
- 🧩 Modern and accessible UI built with Shadcn/UI and Radix UI
- 📝 Robust form handling using React Hook Form and Zod validation
- 🗂️ Client-side routing with React Router DOM
- 🧠 Lightweight global state management using Zustand
- 📱 Fully responsive design for desktop, tablet, and mobile devices
- 🎨 Clean and scalable component architecture with Tailwind CSS v4
- 🔔 Elegant toast notifications powered by Sonner

## 🛠️ Tech Stack

- **Library**: React 19
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **UI Components**: Shadcn/UI + Radix UI
- **State Management**: Zustand
- **Data Fetching**: TanStack Query
- **Routing**: React Router DOM v7
- **Form Handling**: React Hook Form
- **Schema Validation**: Zod
- **Charts & Analytics**: Chart.js
- **Theme Management**: Next Themes
- **Icons**: Lucide React
- **Utilities**: clsx, tailwind-merge, class-variance-authority
- **Date Utilities**: date-fns
- **Notifications**: Sonner
- **Code Quality**: ESLint + TypeScript ESLint

## 📋 Prerequisites

Before running Vocagame Dashboard App locally, make sure you have installed:

- **Node.js** v18 or higher
- **npm** or **yarn**
- **Git**
- **Modern Browser** (Chrome, Edge, Firefox)
- **Vocagame API** running for full backend integration

## ⚡ Quick Start

### 1. Clone Repository
```bash
git clone https://github.com/radenmasabdul/vocagame.git
cd vocagame
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=YOUR_API_BASE_URL
VITE_AUTH_EMAIL=YOUR_AUTH_EMAIL
VITE_AUTH_PASSWORD=YOUR_AUTH_PASSWORD
VITE_AUTH_TOKEN=YOUR_AUTH_TOKEN
```

### 4. Start Development Server
```bash
npm run dev
```

The application will run at http://localhost:5173

## 📁 Project Structure

```text
vocagame/
├── public/                             # Static assets (favicon, images)
├── src/
│   ├── app/                            # Application configuration and providers
│   ├── assets/                         # Static assets and images
│   ├── components/                     # Shared and reusable components
│   │   ├── common/                     # Business-specific reusable components
│   │   ├── layout/                     # Application layout components
│   │   └── ui/                         # Shadcn/UI component library
│   ├── features/                       # Feature-based modules
│   │   ├── auth/                       # Authentication module
│   │   ├── costumers/                  # Customer analytics and management
│   │   ├── home/                       # Dashboard overview module
│   │   └── transaction/                # Transaction management module
│   ├── hooks/                          # Global custom hooks
│   ├── lib/                            # Core libraries and utilities
│   ├── pages/                          # Route-level pages
│   ├── routes/                         # Routing and route protection
│   ├── stores/                         # Zustand global state stores
│   ├── styles/                         # Global styles
│   ├── types/                          # Shared TypeScript types
│   ├── utils/                          # Global utility functions
│   └── main.tsx                        # Application entry point
├── .env.example                        # Environment variables example
├── .gitignore                          # Git ignored files and directories
├── components.json                     # Shadcn/UI configuration
├── eslint.config.js                    # ESLint configuration
├── index.html                          # Application HTML entry point
├── package-lock.json                   # Locked dependency versions
├── package.json                        # Project dependencies and scripts
├── README.md                           # Project documentation
├── tsconfig.app.json                   # TypeScript configuration for application code
├── tsconfig.json                       # TypeScript configuration
├── tsconfig.node.json                  # TypeScript configuration for Node.js environment
└── vite.config.ts                      # Vite configuration

```

## 🌍 Live Demo

[Vocagame Dashboard](https://vocagame-seven.vercel.app/)

## 👨‍💻 Author

**radenmasabdul**
- GitHub: [@radenmasabdul](https://github.com/radenmasabdul)
