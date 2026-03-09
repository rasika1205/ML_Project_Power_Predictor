import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Loader2 } from "lucide-react";

interface PredictionFormProps {
  onPredict: (temp: number, humidity: number, wind: number) => Promise<{
    prediction: number;
    futurePredictions?: Array<{ hour: number; power: number }>;
  }>;
}

export function PredictionForm({ onPredict }: PredictionFormProps) {
  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");
  const [windSpeed, setWindSpeed] = useState("");
  const [result, setResult] = useState<{
    prediction: number;
    futurePredictions?: Array<{ hour: number; power: number }>;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const prediction = await onPredict(
        parseFloat(temperature),
        parseFloat(humidity),
        parseFloat(windSpeed)
      );
      setResult(prediction);
    } catch (error) {
      console.error("Prediction error:", error);
    } finally {
      setLoading(false);
    }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border p-3 rounded-lg shadow-lg">
          <p className="text-sm font-medium">Hour {label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value.toFixed(2)} kW
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center mb-12">Power Consumption Prediction</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Input Climate Variables</CardTitle>
              <CardDescription>Enter current climate conditions to predict power consumption</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="temperature">Temperature (°C)</Label>
                  <Input
                    id="temperature"
                    type="number"
                    step="0.1"
                    value={temperature}
                    onChange={(e) => setTemperature(e.target.value)}
                    placeholder="e.g., 25.5"
                    required
                    className="bg-input-background"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="humidity">Humidity (%)</Label>
                  <Input
                    id="humidity"
                    type="number"
                    step="0.1"
                    value={humidity}
                    onChange={(e) => setHumidity(e.target.value)}
                    placeholder="e.g., 65.0"
                    required
                    className="bg-input-background"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="windSpeed">Wind Speed (m/s)</Label>
                  <Input
                    id="windSpeed"
                    type="number"
                    step="0.1"
                    value={windSpeed}
                    onChange={(e) => setWindSpeed(e.target.value)}
                    placeholder="e.g., 3.2"
                    required
                    className="bg-input-background"
                  />
                </div>
                
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Predicting...
                    </>
                  ) : (
                    "Predict Power Consumption"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Prediction Result</CardTitle>
              <CardDescription>Forecasted power consumption based on input variables</CardDescription>
            </CardHeader>
            <CardContent>
              {result ? (
                <div className="space-y-6">
                  <div className="text-center p-6 bg-blue-600/10 rounded-lg border border-blue-600/20">
                    <p className="text-sm text-muted-foreground mb-2">Predicted Power Consumption</p>
                    <p className="text-4xl font-bold text-blue-400">{result.prediction.toFixed(2)} kW</p>
                  </div>
                  
                  {result.futurePredictions && result.futurePredictions.length > 0 && (
                    <div>
                      <h4 className="mb-4">Future Predictions (Next 24 Hours)</h4>
                      <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={result.futurePredictions}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                          <XAxis dataKey="hour" stroke="#888" />
                          <YAxis stroke="#888" />
                          <Tooltip content={<CustomTooltip />} />
                          <Line type="monotone" dataKey="power" stroke="#3b82f6" strokeWidth={2} dot={false} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-center h-64 text-muted-foreground">
                  Enter climate variables and click predict to see results
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
