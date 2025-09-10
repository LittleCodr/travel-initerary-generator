import React, { useState } from 'react';
import { Itinerary, DayPlan, Activity } from '../types';
import NeobrutalismCard from './NeobrutalismCard';
import NeobrutalismButton from './NeobrutalismButton';
import 'jspdf'; // Import for side-effects, it will attach jspdf to the window object

interface ItineraryDisplayProps {
  itinerary: Itinerary;
}

const FoodSuggestionItem: React.FC<{ label: string; suggestion?: string }> = ({ label, suggestion }) => {
  if (!suggestion) return null;
  return (
    <p><span className="font-bold">{label}:</span> {suggestion}</p>
  );
};

const ActivityItem: React.FC<{ activity: Activity }> = ({ activity }) => (
  <div className="border-l-4 border-lime-300 pl-4 mb-4">
    <p className="font-bold text-black">{activity.time}</p>
    <p className="text-gray-700">{activity.description}</p>
    {activity.location && <p className="text-sm text-gray-500">📍 {activity.location}</p>}
  </div>
);

const DayPlanCard: React.FC<{ dayPlan: DayPlan }> = ({ dayPlan }) => (
  <NeobrutalismCard className="bg-white mb-6">
    <div className="p-6">
      <div className="border-b-2 border-black pb-3 mb-4">
        <h3 className="text-2xl font-bold">Day {dayPlan.day}</h3>
        <p className="text-lg text-fuchsia-600 font-semibold">{dayPlan.title}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <h4 className="text-xl font-bold mb-3">Activities</h4>
          {dayPlan.activities.map((activity, index) => (
            <ActivityItem key={index} activity={activity} />
          ))}
        </div>
        <div>
          <h4 className="text-xl font-bold mb-3">Dining</h4>
          <NeobrutalismCard className="bg-yellow-100 !shadow-none border-2 border-gray-900 p-4">
            <FoodSuggestionItem label="Breakfast" suggestion={dayPlan.foodSuggestions.breakfast} />
            <FoodSuggestionItem label="Lunch" suggestion={dayPlan.foodSuggestions.lunch} />
            <FoodSuggestionItem label="Dinner" suggestion={dayPlan.foodSuggestions.dinner} />
          </NeobrutalismCard>
        </div>
      </div>
    </div>
  </NeobrutalismCard>
);


const ItineraryDisplay: React.FC<ItineraryDisplayProps> = ({ itinerary }) => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExportPDF = () => {
    if (isExporting) return;
    setIsExporting(true);

    try {
        const { jsPDF } = (window as any).jspdf;
        const doc = new jsPDF();
        const pageHeight = doc.internal.pageSize.height;
        const margin = 15;
        let y = 20;
        const pageContentWidth = doc.internal.pageSize.width - (margin * 2);

        const checkPageBreak = (neededHeight: number) => {
            if (y + neededHeight > pageHeight - margin) {
                doc.addPage();
                y = margin;
            }
        };

        // Trip Title
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(24);
        const titleLines = doc.splitTextToSize(itinerary.tripTitle, pageContentWidth);
        checkPageBreak(titleLines.length * 10);
        doc.text(titleLines, doc.internal.pageSize.width / 2, y, { align: 'center' });
        y += titleLines.length * 10;

        // Subtitle
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(16);
        const subtitle = `${itinerary.destination} - ${itinerary.duration} Days`;
        checkPageBreak(10);
        doc.text(subtitle, doc.internal.pageSize.width / 2, y, { align: 'center' });
        y += 20;

        // Daily Plans
        itinerary.dailyPlans.forEach(dayPlan => {
            checkPageBreak(15);
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(18);
            doc.text(`Day ${dayPlan.day}: ${dayPlan.title}`, margin, y);
            y += 10;

            // Activities
            if (dayPlan.activities && dayPlan.activities.length > 0) {
              checkPageBreak(10);
              doc.setFont('helvetica', 'bold');
              doc.setFontSize(14);
              doc.text('Activities', margin + 5, y);
              y += 8;

              doc.setFont('helvetica', 'normal');
              doc.setFontSize(12);
              dayPlan.activities.forEach(activity => {
                  const timeText = `${activity.time}:`;
                  const descriptionLines = doc.splitTextToSize(activity.description, pageContentWidth - 45); // Adjust width for indentation
                  const locationHeight = activity.location ? 5 : 0;
                  const blockHeight = (descriptionLines.length * 5) + locationHeight + 5;
                  checkPageBreak(blockHeight);

                  doc.setFont('helvetica', 'bold');
                  doc.text(timeText, margin + 10, y);
                  
                  doc.setFont('helvetica', 'normal');
                  doc.text(descriptionLines, margin + 35, y);
                  y += (descriptionLines.length * 5);

                  if (activity.location) {
                      doc.setFontSize(10);
                      doc.setTextColor(100);
                      doc.text(`📍 ${activity.location}`, margin + 35, y);
                      y += 5;
                      doc.setFontSize(12);
                      doc.setTextColor(0);
                  }
                  y += 5; // space after activity item
              });
            }


            y += 5; // Extra space before dining

            // Food Suggestions
            const { breakfast, lunch, dinner } = dayPlan.foodSuggestions;
            const foodItems = [
                {label: 'Breakfast', suggestion: breakfast},
                {label: 'Lunch', suggestion: lunch},
                {label: 'Dinner', suggestion: dinner}
            ].filter(item => item.suggestion);
            
            if (foodItems.length > 0) {
                const foodBlockHeight = 8 + (foodItems.length * 7);
                checkPageBreak(foodBlockHeight);
                doc.setFont('helvetica', 'bold');
                doc.setFontSize(14);
                doc.text('Dining Suggestions', margin + 5, y);
                y += 8;

                doc.setFont('helvetica', 'normal');
                doc.setFontSize(12);
                
                foodItems.forEach(item => {
                    checkPageBreak(7);
                    const suggestionLines = doc.splitTextToSize(`${item.label}: ${item.suggestion}`, pageContentWidth - 20);
                    doc.text(suggestionLines, margin + 10, y);
                    y += (suggestionLines.length * 5) + 2;
                });
            }
            
            y += 15; // Space between days
        });

        const safeFilename = itinerary.tripTitle.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        doc.save(`${safeFilename}_itinerary.pdf`);

    } catch (error) {
        console.error("Failed to generate PDF", error);
        alert("There was an error creating the PDF. Please try again.");
    } finally {
        setIsExporting(false);
    }
  };

  return (
    <section className="w-full">
        <NeobrutalismCard className="bg-blue-300 text-center p-6 mb-8">
            <h2 className="text-3xl font-extrabold text-black">{itinerary.tripTitle}</h2>
            <p className="text-xl font-semibold mt-1">{itinerary.destination} - {itinerary.duration} Days</p>
        </NeobrutalismCard>
      
        <div className="mb-8 text-center">
            <NeobrutalismButton onClick={handleExportPDF} disabled={isExporting} className="w-auto inline-block">
                {isExporting ? 'Exporting...' : '📄 Export as PDF'}
            </NeobrutalismButton>
        </div>

      {itinerary.dailyPlans.map((day) => (
        <DayPlanCard key={day.day} dayPlan={day} />
      ))}
    </section>
  );
};

export default ItineraryDisplay;