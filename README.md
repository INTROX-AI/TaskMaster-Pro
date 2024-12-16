# TaskMaster Pro ⚡️🗓

![TaskMaster Pro Logo](https://github.com/INTROX-AI/INTROX-AI/blob/3e06bfc7dd3564c463658265596a9542d9bf3839/assets/taskmasterasset/BANNER%40.png)

TaskMaster Pro is a **modern, feature-rich task management** application designed to help you organize, prioritize, and track your daily tasks with ease. Built with **Electron**, **React**, **TypeScript**, and styled using **Tailwind CSS** and **shadcn/ui**, TaskMaster Pro offers a seamless and responsive experience across all platforms.

---

## 🚀 Features

- **Intuitive Interface**: Clean and user-friendly design that makes task management effortless.
- **Dark/Light Mode**: Switch between themes to suit your preference and reduce eye strain.
- **Subtasks Support**: Break down your tasks into manageable subtasks.
- **Color-Coded Tasks**: Assign colors to tasks for easy categorization and prioritization.
- **Due Dates & Reminders**: Set due dates for your tasks and receive timely reminders.
- **Productivity Stats**: Gain insights into your productivity with comprehensive statistics and charts.
- **Focus Timer**: Enhanced focus sessions with a built-in timer to boost your productivity.
- **Export & Import**: Save your tasks to a file and load them anytime.
- **Cross-Platform**: Available on Windows, macOS, and Linux.

---

## 📸 Screenshots

![Task List](https://github.com/INTROX-AI/INTROX-AI/blob/3e06bfc7dd3564c463658265596a9542d9bf3839/assets/taskmasterasset/dashboard.png)
*Dashboard Overview*

![Focus](https://github.com/INTROX-AI/INTROX-AI/blob/3e06bfc7dd3564c463658265596a9542d9bf3839/assets/taskmasterasset/focus.png)
*Focus with ease*

![Productivity Stats](https://github.com/INTROX-AI/INTROX-AI/blob/3e06bfc7dd3564c463658265596a9542d9bf3839/assets/taskmasterasset/stat.gif)
*Track Your Productivity*

---

## 🛠️ Tech Stack

- **Frontend Framework**: React with TypeScript
- **Build Tool**: Vite
- **Desktop Framework**: Electron
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React & Font Awesome
- **State Management**: React Hooks
- **Date Handling**: date-fns
- **Charts**: Recharts

---

## 📦 Installation

### Prerequisites

- **Node.js** (LTS version recommended)
- **npm** or **yarn**

### Clone the Repository

```bash
git clone https://github.com/yourusername/taskmaster-pro.git
cd taskmaster-pro
```

### Install Dependencies

```bash
npm install
# or
yarn install
```

---

## 🎭 Development

Start the application in development mode with Electron:

```bash
npm run electron:dev
# or
yarn electron:dev
```

This command concurrently runs the Vite development server and the Electron application. Any changes you make will automatically reload the app.

---

## 🏰 Building the Application

To build the application for production:

```bash
npm run electron:build
# or
yarn electron:build
```

The built application will be available in the `dist-electron` directory.

---

## ✯ Scripts

- **`npm run dev`**: Start Vite development server
- **`npm run build`**: Build the web application
- **`npm run preview`**: Preview the built application
- **`npm run electron:dev`**: Run in development mode with Electron
- **`npm run electron:build`**: Build the desktop application
- **`npm run electron:preview`**: Preview the Electron build

---

## 📂 Project Structure

```plaintext
taskmaster-pro/
├── electron/          # Electron main process code
├── src/               # Source code
│   ├── components/    # React components
│   │   ├── stats/     # Statistics and charts components
│   │   ├── ui/        # Reusable UI components
│   │   └── ...        # Other component directories
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Utility functions and types
│   └── styles/        # CSS and Tailwind configurations
├── public/            # Static assets (images, icons, etc.)
├── dist/              # Built files for the web application
├── dist-electron/     # Built files for the Electron application
├── .bolt/             # Configuration files
├── package.json       # Project metadata and dependencies
├── tailwind.config.cjs# Tailwind CSS configuration
├── tsconfig.json      # TypeScript configuration
└── ...                # Other root files
```

---

## 🧱 Contributing

Contributions are welcome! Follow these steps to contribute:

1. **Fork the Repository**

2. **Create a Feature Branch**

   ```bash
   git checkout -b feature/AmazingFeature
   ```

3. **Commit Your Changes**

   ```bash
   git commit -m 'Add some AmazingFeature'
   ```

4. **Push to the Branch**

   ```bash
   git push origin feature/AmazingFeature
   ```

5. **Open a Pull Request**

---

## 🖌️ License

This project is licensed under the [MIT License](LICENSE).

---

## 👤 Author

**INTROX**  
[GitHub](https://github.com/INTROX-AI)

---

## 🎉 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Electron](https://www.electronjs.org/) for enabling cross-platform desktop applications
- [Vite](https://vitejs.dev/) for the fast development experience
- [Lucide React](https://lucide.dev/) for the stunning icons
- [Unsplash](https://unsplash.com/) for high-quality stock photos

---

Feel free to explore the codebase and customize TaskMaster Pro to fit your productivity needs!
