
import React, { useState } from 'react';
import NeobrutalismCard from './NeobrutalismCard';
import NeobrutalismButton from './NeobrutalismButton';
import NeobrutalismInput from './NeobrutalismInput';
import NeobrutalismSelect from './NeobrutalismSelect';

interface ItineraryFormProps {
  onSubmit: (destination: string, duration: string, interests: string, budget: string) => void;
  isLoading: boolean;
}

const ItineraryForm: React.FC<ItineraryFormProps> = ({ onSubmit, isLoading }) => {
  const [destination, setDestination] = useState('');
  const [duration, setDuration] = useState('7');
  const [interests, setInterests] = useState('');
  const [budget, setBudget] = useState('Mid-Range');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (destination.trim() && duration.trim() && interests.trim()) {
      onSubmit(destination, duration, interests, budget);
    }
  };

  return (
    <NeobrutalismCard className="bg-white mb-8">
      <form onSubmit={handleSubmit} className="space-y-6 p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Plan Your Next Adventure</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <NeobrutalismInput
            label="Destination"
            id="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="e.g., Tokyo, Japan"
            required
          />
          <NeobrutalismInput
            label="Trip Duration (days)"
            id="duration"
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="e.g., 7"
            required
            min="1"
            max="30"
          />
        </div>
        <NeobrutalismInput
          label="Interests"
          id="interests"
          value={interests}
          onChange={(e) => setInterests(e.target.value)}
          placeholder="e.g., History, Sushi, Hiking, Anime"
          required
        />
        <NeobrutalismSelect
          label="Budget"
          id="budget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          options={['Budget', 'Mid-Range', 'Luxury']}
        />
        <NeobrutalismButton type="submit" disabled={isLoading} className="w-full">
          {isLoading ? 'Generating...' : 'Create My Itinerary'}
        </NeobrutalismButton>
      </form>
    </NeobrutalismCard>
  );
};

export default ItineraryForm;
