import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Brain, ArrowRight } from "lucide-react";

export function ProjectOverview() {
  return (
    <div className="py-16 px-6 bg-secondary/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-purple-600/20 mb-4">
            <Brain className="w-7 h-7 text-purple-400" />
          </div>
          <h2 className="mb-4">Project Overview</h2>
        </div>
        
        <Card className="bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>LSTM-Based Power Forecasting</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground">
              This project uses a multivariate Long Short-Term Memory (LSTM) deep learning model trained on 
              historical climate data from Beijing to forecast electricity power consumption. The model analyzes 
              past weather patterns and predicts future energy demand.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="mb-3 text-foreground">Input Features</h4>
                <div className="space-y-2">
                  {["Temperature", "Humidity", "Wind Speed"].map((feature) => (
                    <Badge key={feature} variant="secondary" className="mr-2 mb-2">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center">
                <ArrowRight className="w-8 h-8 text-blue-400 mr-4" />
                <div>
                  <h4 className="mb-2 text-foreground">Output</h4>
                  <Badge className="bg-blue-600">Predicted Power Consumption</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
