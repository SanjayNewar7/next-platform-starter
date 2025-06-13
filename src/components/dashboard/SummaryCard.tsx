
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react";

interface SummaryCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  description?: string;
  trend?: string; // e.g., "+5% from last month"
  trendColor?: 'text-green-600' | 'text-red-600'; // Tailwind classes for trend color
}

export default function SummaryCard({ title, value, icon: Icon, description, trend, trendColor }: SummaryCardProps) {
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium font-body">{title}</CardTitle>
        <Icon className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-primary">{value}</div>
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
        {trend && <p className={`text-xs ${trendColor || 'text-muted-foreground'} mt-1`}>{trend}</p>}
      </CardContent>
    </Card>
  )
}
