# MedicalQ Project Structure

## 📁 Project Overview

```
MedicalQ/
├── 📂 backend/                    # Node.js/Express API Server
│   ├── 📂 config/                # Configuration files
│   │   └── 📄 firebase.js        # Firebase configuration
│   ├── 📂 controllers/           # Business logic handlers
│   │   └── 📄 authController.js
│   ├── 📂 middleware/            # Custom middleware functions
│   │   ├── 📄 auth.js           # Authentication middleware
│   │   ├── 📄 error.js          # Error handling middleware
│   │   └── 📄 adminMiddleware.js
│   ├── 📂 models/               # Data models & schemas
│   │   ├── 📄 Credential.js
│   │   ├── 📄 DoctorProfile.js
│   │   ├── 📄 Message.js
│   │   ├── 📄 PatientProfile.js
│   │   └── 📄 User.js           # User model
│   ├── 📂 routes/               # API route definitions
│   │   └── 📄 authRoutes.js     # Authentication routes
│   ├── 📂 utils/                # Utility functions
│   │   └── 📄 logger.js         # Logging utilities
│   ├── 📄 .gitignore           # Backend git ignore
│   ├── 📄 package.json         # Backend dependencies only
│   ├── 📄 package-lock.json    # Backend lock file
│   ├── 📄 server.js            # Server entry point
│   ├── 📄 app.js               # Express app configuration
│   ├── 📄 .env
│   └── 📄 README.md            # Backend documentation
│
├── 📂 frontend/                   # React Application
│   ├── 📂 public/               # Static assets
│   │   ├── 📄 logo.png
│   ├── 📂 src/                  # React source files
│   │   ├── 📂 assets/
│   |   │   ├── 📄
│   │   |   ├── 📄
│   │   |   ├── 📄
│   |   │   └── 📄
│   │   ├── 📂 components/       # Reusable UI components
│   │   │   ├── 📂 auth/         # Authentication components
│   │   │   │   └── 📄 AuthModal.tsx
│   │   │   ├── 📂 dashboard/    # Dashboard components
│   │   │   │   └── 📄 UserDashboard.tsx
│   │   │   ├── 📂 home/         # Homepage components
│   │   │   │   ├── 📄 Features.tsx
│   │   │   │   ├── 📄 Hero.tsx
│   │   │   │   └── 📄 Stats.tsx
│   │   │   ├── 📂 layout/       # Layout components
│   │   │   │   ├── 📄 Header.tsx
│   │   │   │   └── 📄 Footer.tsx
│   │   │   ├── 📂 community/    # Community features
│   │   │   │   ├── 📄 CommunityAds.tsx
│   │   │   │   └── 📄 CommunityPlatform.tsx
│   │   │   └── 📂 doctors/      # Doctor-related components
│   │   │       ├── 📄 DoctorPopup.tsx
│   │   │       └── 📄 SpecialistDoctors.tsx
│   │   ├── 📂 contexts/         # React Context providers
│   │   │   ├── 📄 AuthContext.tsx
│   │   │   └── 📄 ThemeContext.tsx
│   │   ├── 📂 config/           # Frontend configuration
│   │   │   ├── 📄 api.ts        # API configuration
│   │   │   └── 📄 firebase.ts   # Firebase configuration
│   │   ├── 📄 App.tsx           # Main React component
│   │   ├── 📄 main.tsx          # React entry point
│   │   ├── 📄 index.css         # Global styles
│   │   └── 📄 vite-env.d.ts     # Vite environment types
│   ├── 📄 .gitignore           # Frontend git ignore
│   ├── 📄 index.html           # HTML template
│   ├── 📄 package.json         # Frontend dependencies
│   ├── 📄 package-lock.json    # Frontend lock file
│   ├── 📄 vite.config.ts       # Vite configuration
│   ├── 📄 tsconfig.json        # TypeScript configuration
│   ├── 📄 tsconfig.app.json    # TypeScript app configuration
│   ├── 📄 tsconfig.node.json   # TypeScript Node configuration
│   ├── 📄 tailwind.config.js   # Tailwind CSS configuration
│   ├── 📄 postcss.config.js    # PostCSS configuration
│   ├── 📄 eslint.config.js     # ESLint configuration
│   └── 📄 README.md            # Frontend documentation
│
├── 📄 .gitignore                 # Root git ignore
├── 📄 README.md                  # Main project documentation
└── 📄 LICENSE                    # License file
```

## 🔄 Application Flow

### System Architecture

```mermaid
graph TB
    subgraph "Frontend (React + TypeScript)"
        A[User Interface] --> B[Components]
        B --> C[Context Providers]
        C --> D[API Calls]
    end
    
    subgraph "Backend (Node.js + Express)"
        E[Server.js] --> F[App.js]
        F --> G[Routes]
        G --> H[Controllers]
        H --> I[Middlewares]
        I --> J[Models]
    end
    
    subgraph "External Services"
        K[Firebase]
        L[Database]
    end
    
    D --> G
    J --> K
    J --> L
    
    style A fill:#e1f5fe
    style E fill:#f3e5f5
    style K fill:#fff3e0
```

## 🏗️ Component Structure

### Frontend Components Hierarchy

```
MedicalQ App Structure:
├── App.tsx (MedicalQ/)
├── AuthContext Provider
├── Header.tsx
├── Main Content
│   ├── Hero.tsx
│   ├── Features.tsx
│   ├── UserDashboard.tsx
│   └── AuthModel.tsx
└── Layout Components

Legacy Frontend Structure (src/):
├── App.tsx
├── ThemeContext Provider
├── Header.tsx & Footer.tsx
├── Main Content
│   ├── Hero.tsx
│   ├── CommunityPlatform.tsx
│   ├── CommunityAds.tsx
│   ├── DoctorPopup.tsx
│   └── SpecialistDoctors.tsx
└── Footer.tsx
```

### Backend API Structure

```
Server Entry Point (server.js)
├── Express App Configuration (app.js)
├── Middleware Stack
│   ├── Authentication (Auth.js)
│   ├── Admin Authorization (adminMiddleware.js)
│   └── Error Handling (Error.js)
├── Route Handlers
│   └── Authentication Routes (authRoutes.js)
├── Controllers
│   └── Auth Controller (authController.js)
├── Frontend Components (src/)
│   ├── Authentication (AuthModel.tsx)
│   ├── Dashboard (UserDashboard.tsx)
│   ├── Home Features (Features.tsx, Hero.tsx, Stats.tsx)
│   ├── Layout (Header.tsx)
│   └── Context Providers (AuthContext.tsx, App.tsx)
├── Utilities
│   └── Logger (logger.js)
└── Data Layer
    ├── User Model (User.js)
    └── Firebase Config (Firebase.js)
```

## 🚀 Data Flow

### Authentication Flow

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant B as Backend
    participant FB as Firebase
    
    U->>F: Login Request
    F->>B: POST /auth/login
    B->>FB: Verify Credentials
    FB-->>B: User Data
    B-->>F: JWT Token
    F-->>U: Login Success
    
    Note over F,B: Subsequent requests include JWT token
    
    U->>F: Protected Action
    F->>B: API Request + JWT
    B->>B: Auth Middleware
    B-->>F: Authorized Response
    F-->>U: Action Completed
```

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 18+ with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Build Tool**: Vite
- **Architecture**: Dual frontend structure (Main MedicalQ app + Legacy components)
- **Configuration**: Multiple TypeScript configs for different environments

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Authentication**: JWT + Firebase Auth
- **Database**: Firebase Firestore
- **Middleware**: Custom auth, error handling, admin controls
- **Frontend Integration**: React components within backend structure
- **Utilities**: Logging system, error handling
- **Development**: ESLint configuration, Vite integration

### Development Tools
- **Version Control**: Git
- **Package Manager**: npm
- **Code Quality**: ESLint, TypeScript
- **Configuration**: Environment variables

## 📋 Key Features

### 🏥 Medical Platform Features
- **Authentication System**: Secure login with AuthModel component
- **User Dashboard**: Comprehensive user management interface
- **Home Page Features**: Hero section, feature highlights, and statistics
- **Doctor Profiles**: Specialist doctor listings and popups
- **Community Platform**: User interaction and community ads
- **Admin Panel**: Administrative controls and middleware
- **Responsive Design**: Mobile-friendly interface with consistent layout
- **Logging System**: Comprehensive backend logging utilities

### 🔒 Security Features
- JWT-based authentication
- Protected routes with middleware
- Admin role-based access control
- Firebase security rules
- Error handling and validation

## 🚦 Getting Started

### Prerequisites
- Node.js (v14+)
- npm or yarn
- Firebase account and project setup

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd MedicalQ
   ```

2. **Backend Setup**
   ```bash
   cd Backend
   npm install
   # Configure Firebase credentials
   npm start
   ```

3. **Frontend Setup**
   ```bash
   cd ../
   npm install
   npm run dev
   ```

4. **Environment Configuration**
   - Set up Firebase configuration
   - Configure environment variables
   - Update API endpoints

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

---

*This structure provides a scalable foundation for a medical platform with robust authentication, community features, and doctor management capabilities.*
