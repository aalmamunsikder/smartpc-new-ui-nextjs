# SmartPC - Cloud PC Management Platform

A modern, responsive web application built with Next.js 14 for managing cloud PCs, storage, and user accounts.

## Features

- 🖥️ **Cloud PC Management**
  - Create, start, stop, and manage virtual machines
  - Monitor resource usage (CPU, Memory, Storage)
  - Schedule auto-start/stop for cost optimization
  - Assign users to specific PCs

- 💾 **Smart Storage**
  - Cloud storage management
  - File upload/download
  - Storage analytics

- 👥 **User Management**
  - User roles and permissions
  - Team collaboration
  - Access control

- 💳 **Billing & Subscription**
  - Usage tracking
  - Cost management
  - Subscription plans

- 📱 **Responsive Design**
  - Mobile-friendly interface
  - Dark/Light mode support
  - Modern UI components

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **UI Library**: React 18
- **Styling**: Tailwind CSS
- **Components**: Shadcn/ui
- **State Management**: React Hooks
- **Form Handling**: React Hook Form
- **Validation**: Zod
- **Icons**: Lucide React
- **Charts**: Recharts
- **Animations**: Framer Motion

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/aalmamunsikder/smartpc-new-ui-nextjs.git
cd smartpc-new-ui-nextjs
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── dashboard/         # Dashboard pages
│   ├── auth/             # Authentication pages
│   └── layout.tsx        # Root layout
├── components/            # Reusable components
│   ├── ui/               # UI components
│   └── dashboard/        # Dashboard-specific components
├── lib/                  # Utility functions
└── styles/              # Global styles
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn/ui](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/) 