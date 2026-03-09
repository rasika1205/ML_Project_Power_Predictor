
import { useEffect, useState } from "react";
import { MetricCards } from "./MetricCards";
import { Charts } from "./Charts";
import { Loader2 } from "lucide-react";

export function Dashboard() {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Hardcoded metrics
  const metrics = {
    mae: 4.23,
    rmse: 6.15,
    r2: 0.9345
  };

  useEffect(() => {
    fetch("http://localhost:5000/dashboard-data")
      .then(res => res.json())
      .then(result => {
        setData(result);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-20 text-muted-foreground">
        Failed to load dashboard data
      </div>
    );
  }

  return (
    <div className="py-16 px-6" id="dashboard">
      <div className="max-w-7xl mx-auto">

        <div className="mb-12">
          <h2 className="mb-2">Analytics Dashboard</h2>
          <p className="text-muted-foreground">
            Model performance metrics and data insights
          </p>
        </div>

        {/* Hardcoded metrics */}
        <MetricCards metrics={metrics} />

        {/* Backend data */}
        <Charts
          powerTrend={data.powerTrend}
          tempPower={data.tempPower}
          humidityPower={data.humidityPower}
          windPower={data.windPower}
          correlation={data.correlation}
          actualVsPredicted={data.actualVsPredicted}
          errorDistribution={data.errorDistribution}
        />

      </div>
    </div>
  );
}
