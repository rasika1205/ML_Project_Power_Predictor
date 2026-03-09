import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  LineChart,
  Line,
  ScatterChart,
  Scatter,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  ReferenceLine
} from "recharts";

interface ChartsProps {
  powerTrend: Array<{ date: string; power: number }>;
  tempPower: Array<{ temp: number; power: number }>;
  humidityPower: Array<{ humidity: number; power: number }>;
  windPower: Array<{ wind: number; power: number }>;
  correlation: Array<{ feature: string; temp: number; humidity: number; wind: number; power: number }>;
  actualVsPredicted: Array<{ date: string; actual: number; predicted: number }>;
  errorDistribution: Array<{ error: number; count: number }>;
}

export function Charts({
  powerTrend,
  tempPower,
  humidityPower,
  windPower,
  correlation,
  actualVsPredicted,
  errorDistribution
}: ChartsProps) {
  // Custom tooltip styling for dark mode
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border p-3 rounded-lg shadow-lg">
          <p className="text-sm font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {typeof entry.value === 'number' ? entry.value.toFixed(2) : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Power Consumption Over Time */}
      <Card className="bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Power Consumption Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={powerTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="date" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line type="monotone" dataKey="power" stroke="#3b82f6" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Scatter Plots */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Temperature vs Power</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="temp" stroke="#888" name="Temperature" />
                <YAxis dataKey="power" stroke="#888" name="Power" />
                <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
                <Scatter data={tempPower} fill="#f97316" />
              </ScatterChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Humidity vs Power</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="humidity" stroke="#888" name="Humidity" />
                <YAxis dataKey="power" stroke="#888" name="Power" />
                <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
                <Scatter data={humidityPower} fill="#3b82f6" />
              </ScatterChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Wind Speed vs Power</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="wind" stroke="#888" name="Wind Speed" />
                <YAxis dataKey="power" stroke="#888" name="Power" />
                <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
                <Scatter data={windPower} fill="#06b6d4" />
              </ScatterChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Feature Correlation Heatmap (simplified as bar chart) */}
      <Card className="bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Feature Correlation</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={correlation}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="feature" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="temp" fill="#f97316" name="Temperature" />
              <Bar dataKey="humidity" fill="#3b82f6" name="Humidity" />
              <Bar dataKey="wind" fill="#06b6d4" name="Wind Speed" />
              <Bar dataKey="power" fill="#8b5cf6" name="Power" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Actual vs Predicted */}
      <Card className="bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Actual vs Predicted Power</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={actualVsPredicted}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="date" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line type="monotone" dataKey="actual" stroke="#10b981" strokeWidth={2} dot={false} name="Actual" />
              <Line type="monotone" dataKey="predicted" stroke="#8b5cf6" strokeWidth={2} dot={false} name="Predicted" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Prediction Accuracy Scatter */}
        <Card className="bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Prediction Accuracy</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="actual" stroke="#888" name="Actual Power" />
                <YAxis dataKey="predicted" stroke="#888" name="Predicted Power" />
                <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
                <ReferenceLine y={0} stroke="rgba(255,255,255,0.3)" />
                <ReferenceLine x={0} stroke="rgba(255,255,255,0.3)" />
                <Scatter 
                  data={actualVsPredicted.map(d => ({ actual: d.actual, predicted: d.predicted }))} 
                  fill="#8b5cf6" 
                />
                <Line type="linear" dataKey="actual" stroke="#ffffff" strokeDasharray="5 5" />
              </ScatterChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Error Distribution */}
        <Card className="bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Prediction Error Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={errorDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="error" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" fill="#10b981">
                  {errorDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.error < 0 ? '#ef4444' : '#10b981'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
