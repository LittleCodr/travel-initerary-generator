# 🌍 AI Travel Itinerary Generator

<div align="center">
<img width="1200" height="475" alt="AI Travel Itinerary Banner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />

[![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.3.6-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-4285F4?style=for-the-badge&logo=google)](https://ai.google.dev/)

</div>

A modern, AI-powered travel itinerary generator that creates personalized trip plans using Google's Gemini AI. Built with React, TypeScript, and featuring a unique Neobrutalism design aesthetic.

## ✨ Features

### 🤖 AI-Powered Planning
- **Smart Itinerary Generation**: Leverages Google Gemini 2.5 Flash model for intelligent trip planning
- **Personalized Recommendations**: Considers your interests, budget, and trip duration
- **Structured JSON Schema**: Ensures consistent and reliable AI responses
- **Local Cuisine Integration**: Includes breakfast, lunch, and dinner suggestions for each day

### 🎨 Modern UI/UX
- **Neobrutalism Design**: Bold, distinctive visual style with thick borders and vibrant colors
- **Responsive Layout**: Optimized for desktop and mobile devices
- **Interactive Components**: Custom-built form elements and buttons
- **Loading States**: Smooth user experience with loading indicators and error handling

### 📄 Export Functionality
- **PDF Generation**: Export complete itineraries as formatted PDF documents
- **Professional Layout**: Clean, printable format with proper page breaks
- **Custom Filename**: Automatically generates filename based on trip title

### 🔧 Developer Experience
- **TypeScript**: Full type safety and excellent developer experience
- **Component Architecture**: Modular, reusable React components
- **Environment Configuration**: Secure API key management
- **Modern Build Tools**: Vite for fast development and optimized builds

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v16 or higher)
- **Google Gemini API Key** ([Get one here](https://ai.google.dev/))

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-travel-itinerary
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

## 🏗️ Project Structure

```
ai-travel-itinerary/
├── components/                 # React components
│   ├── ErrorDisplay.tsx       # Error message component
│   ├── Footer.tsx             # Application footer
│   ├── Header.tsx             # Application header
│   ├── ItineraryDisplay.tsx   # Main itinerary display with PDF export
│   ├── ItineraryForm.tsx      # Trip planning form
│   ├── LoadingSpinner.tsx     # Loading animation
│   ├── NeobrutalismButton.tsx # Custom button component
│   ├── NeobrutalismCard.tsx   # Custom card component
│   ├── NeobrutalismInput.tsx  # Custom input component
│   └── NeobrutalismSelect.tsx # Custom select component
├── services/
│   └── geminiService.ts       # Google Gemini API integration
├── App.tsx                    # Main application component
├── types.ts                   # TypeScript type definitions
├── index.tsx                  # Application entry point
├── index.html                 # HTML template
├── vite.config.ts            # Vite configuration
├── tsconfig.json             # TypeScript configuration
├── package.json              # Project dependencies
└── README.md                 # This file
```

## 🧩 Core Components

### 📝 ItineraryForm
The main input form where users specify their travel preferences:
- **Destination**: Target location for the trip
- **Duration**: Number of days (1-30)
- **Interests**: Personal preferences and activities
- **Budget**: Budget level (Budget/Mid-Range/Luxury)

### 🎯 ItineraryDisplay
Displays the generated itinerary with:
- **Trip Overview**: Title, destination, and duration
- **Daily Plans**: Structured day-by-day activities
- **Activity Timeline**: Time-based activity scheduling
- **Dining Suggestions**: Meal recommendations for each day
- **PDF Export**: One-click PDF generation

### 🔧 Neobrutalism Components
Custom UI components following the Neobrutalism design philosophy:
- **Bold Borders**: Thick, black borders on all elements
- **Vibrant Colors**: High-contrast color scheme
- **Sharp Shadows**: Distinctive drop shadows
- **Geometric Shapes**: Clean, rectangular designs

## 🤖 AI Integration

### Gemini API Service
The application uses Google's Gemini 2.5 Flash model with:

```typescript
// Structured schema for consistent responses
const itinerarySchema = {
    type: Type.OBJECT,
    properties: {
        destination: { type: Type.STRING },
        duration: { type: Type.INTEGER },
        tripTitle: { type: Type.STRING },
        dailyPlans: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    day: { type: Type.INTEGER },
                    title: { type: Type.STRING },
                    activities: { /* Activity schema */ },
                    foodSuggestions: { /* Food schema */ }
                }
            }
        }
    }
};
```

### Response Processing
- **JSON Validation**: Ensures AI responses match expected schema
- **Error Handling**: Graceful fallbacks for API failures
- **Content Cleaning**: Removes markdown formatting from responses

## 📊 Data Types

### Core Interfaces

```typescript
interface Activity {
  time: string;           // e.g., "Morning", "2:00 PM"
  description: string;    // Activity description
  location?: string;      // Optional location
}

interface FoodSuggestions {
  breakfast?: string;
  lunch?: string;
  dinner?: string;
}

interface DayPlan {
  day: number;
  title: string;          // Thematic day title
  activities: Activity[];
  foodSuggestions: FoodSuggestions;
}

interface Itinerary {
  destination: string;
  duration: number;
  tripTitle: string;      // AI-generated creative title
  dailyPlans: DayPlan[];
}
```

## 🛠️ Tech Stack

### Frontend Framework
- **React 19.1.1**: Latest React with concurrent features
- **TypeScript 5.8.2**: Type-safe JavaScript development
- **Vite 6.3.6**: Fast build tool and development server

### Styling & UI
- **Tailwind CSS**: Utility-first CSS framework
- **Custom Components**: Neobrutalism-styled UI elements
- **Responsive Design**: Mobile-first approach

### AI & APIs
- **@google/genai 1.16.0**: Official Google Gemini SDK
- **Structured Generation**: JSON schema-based responses
- **Environment Variables**: Secure API key management

### PDF Generation
- **jsPDF**: Client-side PDF generation
- **Custom Formatting**: Professional itinerary layout
- **Page Management**: Automatic page breaks and sizing

### Development Tools
- **@vitejs/plugin-react**: React support for Vite
- **@types/node**: Node.js type definitions
- **ESM Modules**: Modern JavaScript module system

## 🎨 Design Philosophy

### Neobrutalism Aesthetic
The application embraces the Neobrutalism design trend:
- **Bold Typography**: Heavy, impactful fonts
- **High Contrast**: Strong color combinations
- **Geometric Shapes**: Clean, rectangular layouts
- **Functional Beauty**: Form follows function

### Color Palette
- **Primary**: Yellow (#FEF3C7) - Warm, inviting background
- **Accent**: Blue (#93C5FD) - Trust and reliability
- **Highlight**: Lime (#BEF264) - Energy and excitement
- **Secondary**: Fuchsia (#F0ABFC) - Creativity and fun
- **Text**: Black (#000000) - Maximum readability

## 🔧 Configuration

### Environment Variables
```env
# Required
GEMINI_API_KEY=your_api_key_here

# Optional (for development)
VITE_APP_TITLE=AI Travel Itinerary
```

### Vite Configuration
```typescript
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
```

## 📱 Usage Guide

### Creating an Itinerary

1. **Enter Destination**: Specify where you want to travel
2. **Set Duration**: Choose trip length (1-30 days)
3. **Add Interests**: Describe your preferences and activities
4. **Select Budget**: Choose your budget level
5. **Generate**: Click "Create My Itinerary"
6. **Export**: Download as PDF when ready

### Example Input
- **Destination**: "Tokyo, Japan"
- **Duration**: "7 days"
- **Interests**: "Anime, Sushi, Traditional temples, Shopping"
- **Budget**: "Mid-Range"

### Generated Output
The AI creates a comprehensive itinerary including:
- Creative trip title
- Daily themes and activities
- Specific timing recommendations
- Local restaurant suggestions
- Cultural experiences
- Transportation tips

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Deployment Platforms
The application can be deployed to:
- **Vercel**: Automatic deployments with environment variables
- **Netlify**: Static site hosting with build optimization
- **GitHub Pages**: Free hosting for public repositories
- **AI Studio**: Direct integration with Google's platform

## 🔍 Troubleshooting

### Common Issues

**API Key Not Working**
- Ensure `GEMINI_API_KEY` is set in `.env.local`
- Verify API key has proper permissions
- Check for typos in environment variable name

**PDF Export Failing**
- Ensure jsPDF is properly loaded
- Check browser console for JavaScript errors
- Verify itinerary data is complete

**Styling Issues**
- Ensure Tailwind CSS is properly configured
- Check for conflicting CSS rules
- Verify component imports are correct

### Development Tips
- Use browser dev tools to inspect API calls
- Check console for detailed error messages
- Ensure Node.js version compatibility

## 🤝 Contributing

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Code Style
- Use TypeScript for all new code
- Follow React best practices
- Maintain component modularity
- Add proper error handling

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🔗 Links

- **AI Studio App**: https://ai.studio/apps/drive/1PfuswzCsCsOfaVGdSpLmXRYcEZS7PmeA
- **Google Gemini API**: https://ai.google.dev/
- **React Documentation**: https://reactjs.org/
- **TypeScript Guide**: https://www.typescriptlang.org/
- **Tailwind CSS**: https://tailwindcss.com/

---

<div align="center">
Made with ❤️ using Google Gemini AI and React
</div>
