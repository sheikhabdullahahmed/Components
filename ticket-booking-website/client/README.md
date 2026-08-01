# 🎫 Ticket Booking Website (Client)

A modern, high-performance, and visually stunning client-side application for a **Ticket Booking Platform**. Built from the ground up utilizing the latest React 19 ecosystem, Vite, Redux Toolkit, and Tailwind CSS v4.

---

## 🚀 Key Features

*   **Premium Visuals & Dark Mode:** Fluid typography, modern color palettes, and glassmorphic components.
*   **State Management:** Robust, predictable global state powered by **Redux Toolkit**.
*   **Highly Responsive UI:** Smoothly scales from mobile screens to extra-large desktop monitors.
*   **Component Architecture:** Clean, reusable components built using **shadcn/ui** primitives.
*   **Path Aliases:** Simplified imports using `@/*` mapping (e.g. `@/components/ui/table`).

---

## 🛠️ Tech Stack & Dependencies

*   **Core:** [React 19](https://react.dev/) & [TypeScript](https://www.typescriptlang.org/)
*   **Build Tool:** [Vite 8](https://vite.dev/) for lightning-fast HMR and building
*   **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) (using the new `@tailwindcss/vite` compiler plugin)
*   **State Management:** [@ReduxJS/Toolkit](https://redux-toolkit.js.org/) & `react-redux`
*   **UI Primitives:** Custom Tailwind utility integration using `clsx` and `tailwind-merge` via the `cn()` helper.

---

## 📂 Project Structure

```text
client/
├── public/                 # Static assets (favicons, manifest, etc.)
├── src/
│   ├── assets/             # Images, fonts, and media assets
│   ├── components/         # Reusable React components
│   │   ├── navbar/         # Navigation elements
│   │   └── ui/             # Shadcn UI primitives (Table, Skeleton, etc.)
│   ├── lib/                # Utility modules (e.g., cn class merger in utlis.ts)
│   ├── store/              # Redux Toolkit store definition and hooks
│   │   ├── hook.ts         # Typed useSelector and useDispatch wrappers
│   │   └── index.tsx       # Store configuration
│   ├── styles/             # Global styles and tailwind directives
│   ├── App.tsx             # Main App layout & routing
│   └── main.tsx            # Application entrypoint
├── package.json            # Scripts and dependencies config
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite bundler configuration
```

---

## ⚡ Getting Started

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed (version 18+ recommended).

### 2. Installation
Clone the repository, navigate to the `client` directory, and install dependencies:
```bash
npm install
```

### 3. Running Locally
Start the development server with Hot Module Replacement (HMR):
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### 4. Building for Production
To build a highly-optimized production bundle:
```bash
npm run build
```
This generates the static assets in the `dist` folder. To preview the production build locally:
```bash
npm run preview
```

### 5. Linting
Run ESLint to check for code quality and syntax standards:
```bash
npm run lint
```

---

## 🔧 Helper Utilities

### The `cn` Class Merger
Located in [`src/lib/utlis.ts`](file:///c:/Users/abdul/OneDrive/Desktop/x%20components/ticket-booking-website/client/src/lib/utlis.ts), this helper combines `clsx` and `tailwind-merge` to let you combine and override Tailwind CSS utility classes conditionally without conflicts.

**Usage:**
```tsx
import { cn } from "@/lib/utlis";

function Button({ className }) {
  return (
    <button className={cn("px-4 py-2 bg-blue-600 text-white rounded", className)}>
      Click Me
    </button>
  );
}
```
