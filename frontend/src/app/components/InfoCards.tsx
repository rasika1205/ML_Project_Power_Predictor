import { Thermometer, Droplets, Wind } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

export function InfoCards() {
  const cards = [
    {
      title: "Temperature Impact",
      description: "Higher temperatures increase cooling demand, leading to higher electricity consumption.",
      icon: Thermometer,
      color: "text-orange-400"
    },
    {
      title: "Humidity Influence",
      description: "High humidity increases the need for cooling systems and affects power usage patterns.",
      icon: Droplets,
      color: "text-blue-400"
    },
    {
      title: "Wind Conditions",
      description: "Wind speed affects atmospheric conditions and can influence renewable energy generation.",
      icon: Wind,
      color: "text-cyan-400"
    }
  ];

  return (
    <div className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center mb-12">Climate & Energy Relationship</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <Card key={index} className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg bg-secondary/50 flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 ${card.color}`} />
                  </div>
                  <CardTitle>{card.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{card.description}</CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
