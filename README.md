# SmartPC - Cloud Computing Platform

A modern Next.js application showcasing SmartPC's cloud computing services with a focus on virtual computers accessible through browsers and smart monitors.

## Features

- Responsive modern UI built with Next.js 14, Tailwind CSS, and Framer Motion
- Light and dark mode support with seamless transitions
- Interactive pricing calculator for custom plans
- Comprehensive dashboard for managing virtual computers
- Smooth animations and transitions

## Dark Mode Enhancements

This project features comprehensive dark mode styling across all sections:
- Custom glass-card components with dark mode adaptations
- Optimized background blur and gradient effects
- Enhanced readability and contrast in dark mode
- Consistent visual hierarchy maintained across both themes

## Technology Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: React Context API
- **UI Components**: Shadcn/UI

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
npm install
```
3. Run the development server:
   ```
npm run dev
```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Build for Production

```
npm run build
npm run start
```

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