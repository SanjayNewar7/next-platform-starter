
"use client"

import React, { useEffect, useState } from "react"
import { BarChart3, TrendingUp } from "lucide-react"
import { Bar, BarChart as RechartsBarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { type AggregatedStats, allBoundaryTypes, BoundaryTypeName } from '@/lib/userData';

interface ProgressChartProps {
  currentStats: AggregatedStats;
}

// Define colors for the chart bars
const chartColors = {
  defined: "hsl(var(--chart-1))",     // Primary blue
  successful: "hsl(var(--chart-2))",  // Lighter blue
  challenged: "hsl(var(--chart-3))",  // Even lighter blue / or a contrasting color
};

const chartConfig = {
  defined: {
    label: "Defined",
    color: chartColors.defined,
  },
  successful: {
    label: "Successful",
    color: chartColors.successful,
  },
  challenged: {
    label: "Challenged",
    color: chartColors.challenged,
  }
} satisfies Record<string, { label: string; color: string }>;


export default function ProgressChart({ currentStats }: ProgressChartProps) {
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    if (currentStats && currentStats.byType) {
      const data = allBoundaryTypes.map(type => ({
        name: type,
        defined: currentStats.byType[type]?.defined || 0,
        successful: currentStats.byType[type]?.successful || 0,
        challenged: currentStats.byType[type]?.challenged || 0,
      }));
      setChartData(data);
    }
  }, [currentStats]);

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          <BarChart3 className="h-6 w-6 text-primary" />
          Boundary Activity by Type
        </CardTitle>
        <CardDescription>Counts of defined, successful, and challenged boundaries for each category based on your logged experiences.</CardDescription>
      </CardHeader>
      <CardContent>
        {chartData.length > 0 ? (
          <ChartContainer config={chartConfig} className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart data={chartData} margin={{ top: 5, right: 20, left: -15, bottom: 50 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  tickLine={false} 
                  axisLine={false} 
                  tickMargin={10} 
                  angle={-30} 
                  textAnchor="end"
                  height={60} // Adjust height to accommodate angled labels
                  interval={0} // Show all labels
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  stroke="hsl(var(--foreground))" 
                  tickLine={false} 
                  axisLine={false}
                  tickMargin={8}
                  allowDecimals={false}
                  label={{ value: 'Count', angle: -90, position: 'insideLeft', fill: 'hsl(var(--muted-foreground))', dy: 40 }}
                />
                <Tooltip cursor={{fill: 'hsl(var(--muted))', radius: 4}} content={<ChartTooltipContent />} />
                <Legend wrapperStyle={{paddingTop: '20px'}}/>
                <Bar dataKey="defined" fill="var(--color-defined)" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="successful" fill="var(--color-successful)" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="challenged" fill="var(--color-challenged)" radius={[4, 4, 0, 0]} barSize={20} />
              </RechartsBarChart>
            </ResponsiveContainer>
          </ChartContainer>
        ) : (
          <div className="flex items-center justify-center h-[350px]">
            <p className="text-muted-foreground">No data to display yet. Start by defining boundaries with the AI Assistant!</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="text-muted-foreground">
          This chart updates as you log your boundary-setting experiences. Consistent effort helps clarify your journey.
        </div>
      </CardFooter>
    </Card>
  )
}
