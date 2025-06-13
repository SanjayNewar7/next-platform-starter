
"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
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

// Mock data
const chartData = [
  { month: "Jan", boundaryStrength: 30, boundariesSet: 5 },
  { month: "Feb", boundaryStrength: 45, boundariesSet: 8 },
  { month: "Mar", boundaryStrength: 50, boundariesSet: 7 },
  { month: "Apr", boundaryStrength: 65, boundariesSet: 10 },
  { month: "May", boundaryStrength: 70, boundariesSet: 12 },
  { month: "Jun", boundaryStrength: 80, boundariesSet: 15 },
]

const chartConfig = {
  boundaryStrength: {
    label: "Boundary Strength",
    color: "hsl(var(--chart-1))",
  },
  boundariesSet: {
    label: "Boundaries Set",
    color: "hsl(var(--chart-2))",
  }
} satisfies Record<string, { label: string; color: string }>;


export default function ProgressChart() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-primary" />
          Boundary Progression
        </CardTitle>
        <CardDescription>Your boundary strength and activity over the past 6 months.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
              <YAxis 
                yAxisId="left" 
                orientation="left" 
                stroke="hsl(var(--foreground))" 
                tickLine={false} 
                axisLine={false}
                tickMargin={8}
                label={{ value: 'Strength Score', angle: -90, position: 'insideLeft', fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis 
                yAxisId="right" 
                orientation="right" 
                stroke="hsl(var(--foreground))" 
                tickLine={false} 
                axisLine={false}
                tickMargin={8}
                label={{ value: 'Count', angle: 90, position: 'insideRight', fill: 'hsl(var(--muted-foreground))' }}
              />
              <Tooltip cursor={{fill: 'hsl(var(--muted))', radius: 4}} content={<ChartTooltipContent />} />
              <Bar dataKey="boundaryStrength" yAxisId="left" fill="var(--color-boundaryStrength)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="boundariesSet" yAxisId="right" fill="var(--color-boundariesSet)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="text-muted-foreground">
          Keep up the great work! Consistent effort leads to stronger boundaries.
        </div>
      </CardFooter>
    </Card>
  )
}
