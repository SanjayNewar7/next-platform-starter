
"use client"

import React, { useEffect, useState } from "react"
import { BarChart3 } from "lucide-react"
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
import { type AggregatedStats, allBoundaryTypes } from '@/lib/userData';

interface ProgressChartProps {
  currentStats: AggregatedStats;
}

const chartColors = {
  // defined: "hsl(var(--chart-1))", // Primary blue - 'defined' now includes pending, successful, challenged.
  successful: "hsl(var(--chart-2))",  // Lighter blue
  challenged: "hsl(var(--chart-3))",  // Even lighter blue
  pending: "hsl(var(--chart-4))",     // Grayish blue for pending
};

const chartConfig = {
  // defined: {
  //   label: "Total Defined", // This could represent the total bar height if stacked, or a separate metric
  //   color: chartColors.defined,
  // },
  successful: {
    label: "Successful",
    color: chartColors.successful,
  },
  challenged: {
    label: "Challenged",
    color: chartColors.challenged,
  },
  pending: {
    label: "Pending Log",
    color: chartColors.pending,
  }
} satisfies Record<string, { label: string; color: string }>;


export default function ProgressChart({ currentStats }: ProgressChartProps) {
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    if (currentStats && currentStats.byType) {
      const data = allBoundaryTypes.map(type => ({
        name: type,
        // defined: currentStats.byType[type]?.defined || 0, // This is the total for the type
        successful: currentStats.byType[type]?.successful || 0,
        challenged: currentStats.byType[type]?.challenged || 0,
        pending: currentStats.byType[type]?.pending || 0,
      }));
      setChartData(data);
    }
  }, [currentStats]);

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          <BarChart3 className="h-6 w-6 text-primary" />
          Boundary Outcomes by Type
        </CardTitle>
        <CardDescription>Status of boundaries you've defined with the AI: successful, challenged, or pending log.</CardDescription>
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
                  height={70} // Increased height for angled labels
                  interval={0} 
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
                {/* Bar for 'defined' could be used as a background or stacked total if desired */}
                {/* <Bar dataKey="defined" fill="var(--color-defined)" radius={[4, 4, 0, 0]} barSize={20} /> */}
                <Bar dataKey="successful" stackId="a" fill="var(--color-successful)" radius={[4, 4, 0, 0]} barSize={25} />
                <Bar dataKey="challenged" stackId="a" fill="var(--color-challenged)" radius={[0,0,0,0]} barSize={25} />
                <Bar dataKey="pending" stackId="a" fill="var(--color-pending)" radius={[0,0,4,4]} barSize={25} />
              </RechartsBarChart>
            </ResponsiveContainer>
          </ChartContainer>
        ) : (
          <div className="flex items-center justify-center h-[350px]">
            <p className="text-muted-foreground">No data to display yet. Use the AI Assistant to define some boundaries!</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="text-muted-foreground">
          This chart updates as you define boundaries with the AI and log your experiences.
        </div>
      </CardFooter>
    </Card>
  )
}

