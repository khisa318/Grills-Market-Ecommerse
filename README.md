# EMBER & IRON | Premium Smoker Outfits & Backyard Equipment Store

An enterprise-grade, high-performance e-commerce platform custom-tailored for premium heavy-duty smoker units, grills, and outdoor fabrication gear. Built with an optimized React architecture, complete Role-Based Access Control (RBAC), fluid state handling, and a minimalist industrial aesthetic.

---

## 🛠️ Tech Stack & Architecture Matrix

### Frontend Viewport Layer
* **Framework:** React 18+ (Vite Bundler Node Pipeline)
* **Routing Engine:** React Router DOM v6 (Secure Nested Guards Integration)
* **Styling Framework:** Tailwind CSS (Fluid Mobile-Responsive Layouts)
* **Iconography:** Lucide React

### Backend Infrastructure (Local Control Matrix)
* **Runtime Environment:** Node.js (Express Application Pipeline)
* **Authentication Scheme:** JSON Web Tokens (JWT) & Local Session Management
* **Database Target:** MongoDB / PostgreSQL (Flexible Interface Driver)
* **Port Routing Distribution:**
  * Frontend: `http://localhost:5173` (or `5174`)
  * Backend Server: `http://localhost:5000`

---

## 🔐 Router Protection & Role Architecture

The application implements a secure, modularized traffic controller inside the client router layer to prevent unauthenticated data leaks and infinite redirect deadlocks.


[ Visitor Traffic Entry ]
                         │
          ┌──────────────┴──────────────┐
          ▼                             ▼
   /shop & Catalog                 /account
   (Public Routes)         (Guest-Only Route Guard)
          │                             │
          │              ┌──────────────┴──────────────┐
          │              ▼                             ▼
          │         Authenticated?               Not Logged In?
          │     (Auto-Kick to Dashboard)     (Renders Auth Matrix Forms)
          │              │
          └──────────────┼─────────────────────────────┐
                         │                             │
                         ▼                             ▼
           [ Dynamic Role Verification ]         [ Render View ]
                         │
          ┌──────────────┴──────────────┐
          ▼                             ▼
     is_admin: true               is_admin: false
           │                             │
           ▼                             ▼
   /admin/dashboard              /account/profile
  (Admin Control Hub)          (Customer Dashboard)

### 1. Route Security Layouts (`src/components/ProtectedRoutes.jsx`)
* **`PublicOnlyRoute`:** Intercepts and guards the auth portal. If a user is already authenticated with an active session, it identifies their privilege flag and redirects them directly to their appropriate control center without rendering login forms.
* **`CustomerProtectedRoute`:** Locks down customer order summaries, private details, and tracking modules against unauthorized guest access.
* **`AdminProtectedRoute`:** Enforces a strict validation layer. Normal consumers trying to force their way into `/admin/*` are intercepted at the lifecycle level and rerouted to their private profiles.

---

## 📂 Project Directory Breakdown

```text
grill-website/
├── public/                 # Static asset delivery targets (Logos, SVGs)
├── src/
│   ├── components/         # Global Shared Interface Elements
│   │   ├── Navbar.jsx      # Dynamic navigation controller with dynamic profile logic
│   │   ├── Footer.jsx      # Global interface structural footing
│   │   ├── ProductCard.jsx # Grid view single inventory card controller
│   │   └── ProtectedRoutes.jsx # Access gates (PublicOnly, Admin, Customer)
│   ├── context/
│   │   └── CartContext.jsx # Global shopping inventory state driver
│   ├── pages/              # Viewport Entry Points
│   │   ├── Home.jsx         # Premium storefront splash landing page
│   │   ├── CategoryPage.jsx # Filtering grid catalog layout for grills
│   │   ├── ProductDetail.jsx# High-resolution conversion engine view
│   │   ├── AuthPage.jsx     # Decoupled Login/Register interface (Zero-Loop Hook)
│   │   ├── AdminDashboard.jsx # Admin sales control grid panel
│   │   ├── CustomerProfile.jsx # Customer post-purchase order tracker
│   │   └── NotFoundPage.jsx # Catch-all 404 Route UI
│   ├── App.jsx             # Route maps definition and provider initialization
│   └── main.jsx            # React client DOM mount initialization script
├── package.json            # Manifest file for scripts and dependencies
└── README.md               # Infrastructure operational reference documentation
🚀 Setup & Launch Checklist
To bring up both layers of the local development ecosystem, execute the following setup loops:

1. Environment Preparation
Ensure you have Node.js (v18+) and Git running locally on your workstation machine.

2. Backend Initialization Run
Navigate to your server directory (or keep it in your main split if combined) and spin up the Express API layer:

Bash
# Move into backend execution zone
cd backend-directory

# Install dependency files
npm install

# Run the local server engine
npm run dev
The service should register as active on http://localhost:5000.

3. Frontend App Setup
Open an independent terminal partition and mount the React application workspace:

Bash
# Make sure you are inside the repository root root
cd grill-website

# Clear out and download client packages
npm install

# Fire up the Vite development server pipeline
npm run dev
Open your browser and navigate to the output address (typically http://localhost:5173).

⚡ Active State Protocols
Clear Session / Log Out Routine
Clicking the explicit Log Out interactive action trigger inside the dynamic header menu flushes all stored authentication keys out of the browser cache:

JavaScript
localStorage.clear(); // Wipes tokens, authorization keys, and roles
navigate("/account");  // Re-routes straight back to authentication matrix
This guarantees that any subsequent page load actions hit the default security barriers cleanly.