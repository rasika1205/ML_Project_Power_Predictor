import { Button } from "./ui/button";
import { Zap } from "lucide-react";

export function HeroSection({ onExplore }: { onExplore: () => void }) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-background py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-600/20 mb-6">
          <Zap className="w-8 h-8 text-blue-400" />
        </div>
        <h1 className="mb-6 text-5xl tracking-tight">
          AI-Powered Climate-Driven Energy Forecasting
        </h1>
        <p className="max-w-3xl mx-auto mb-8 text-muted-foreground text-lg">
          Electricity demand is heavily influenced by climate variables such as temperature, humidity, and wind speed. 
          Our system uses a deep learning model (LSTM) to analyze historical climate data and forecast power consumption patterns 
          with unprecedented accuracy.
        </p>
        <Button onClick={onExplore} size="lg" className="bg-blue-600 hover:bg-blue-700">
          Explore Dashboard
        </Button>
      </div>
    </div>
  );
}
