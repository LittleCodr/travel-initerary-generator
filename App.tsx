
import React, { useState } from 'react';
import Header from './components/Header';
import ItineraryForm from './components/ItineraryForm';
import ItineraryDisplay from './components/ItineraryDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorDisplay from './components/ErrorDisplay';
import Footer from './components/Footer';
import { Itinerary } from './types';
import { generateItinerary } from './services/geminiService';

const App: React.FC = () => {
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (destination: string, duration: string, interests: string, budget: string) => {
    setIsLoading(true);
    setError(null);
    setItinerary(null);

    try {
      const generatedItinerary = await generateItinerary(destination, duration, interests, budget);
      setItinerary(generatedItinerary);
    } catch (err) {
      console.error(err);
      setError('Failed to generate itinerary. The model may be overloaded. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-yellow-50 min-h-screen font-mono text-gray-900 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8 flex flex-col items-center">
        <div className="w-full max-w-4xl">
          <ItineraryForm onSubmit={handleFormSubmit} isLoading={isLoading} />
          {isLoading && <LoadingSpinner />}
          {error && <ErrorDisplay message={error} />}
          {itinerary && <ItineraryDisplay itinerary={itinerary} />}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
