import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { TrendingDown, Activity, Target } from "lucide-react";



export function MetricCards() {
    const metrics = {
    mae: 3.87,
    rmse: 5.88,
    r2: 0.9354
  };
  const metricData = [
    {
      title: "MAE",
      value: metrics.mae.toFixed(2),
      description: "Mean Absolute Error",
      icon: TrendingDown,
      color: "text-green-400"
    },
    {
      title: "RMSE",
      value: metrics.rmse.toFixed(2),
      description: "Root Mean Square Error",
      icon: Activity,
      color: "text-blue-400"
    },
    {
      title: "R² Score",
      value: metrics.r2.toFixed(4),
      description: "Coefficient of Determination",
      icon: Target,
      color: "text-purple-400"
    }
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6 mb-8">
      {metricData.map((metric) => {
        const Icon = metric.icon;
        return (
          <Card key={metric.title} className="bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <Icon className={`h-5 w-5 ${metric.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{metric.description}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
