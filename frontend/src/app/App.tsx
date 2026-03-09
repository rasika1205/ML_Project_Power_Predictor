import { useRef } from "react";
import { HeroSection } from "./components/HeroSection";
import { InfoCards } from "./components/InfoCards";
import { ProjectOverview } from "./components/ProjectOverview";
import { Dashboard } from "./components/Dashboard";
import { PredictionForm } from "./components/PredictionForm";

export default function App() {
  const dashboardRef = useRef<HTMLDivElement>(null);

  const handleExplore = () => {
    dashboardRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handlePredict = async (temp: number, humidity: number, wind: number) => {
  const response = await fetch("http://localhost:5000/predict", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      temperature: temp,
      humidity: humidity,
      wind: wind
    })
  });

  const data = await response.json();
  return data;
};

  return (
    <div className="min-h-screen bg-background">
      <HeroSection onExplore={handleExplore} />
      <InfoCards />
      <ProjectOverview />
      <div ref={dashboardRef}>
        <Dashboard />
      </div>
      <PredictionForm onPredict={handlePredict} />
      
      <footer className="py-8 px-6 border-t border-border bg-secondary/10">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground text-sm">
          <p>Climate-Driven Power Consumption Forecasting Dashboard</p>
          <p className="mt-2">Powered by LSTM Deep Learning Model</p>
        </div>
      </footer>
    </div>
  );
}