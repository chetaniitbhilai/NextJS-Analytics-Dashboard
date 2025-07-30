"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Users, Target, BarChart3 } from "lucide-react";
import { MetricData } from "@/lib/mock-data";

const iconMap = {
  TrendingUp,
  TrendingDown,
  Users,
  Target,
  BarChart3,
};

interface MetricCardProps {
  data: MetricData;
  isLoading?: boolean;
}

export function MetricCard({ data, isLoading }: MetricCardProps) {
  const IconComponent = iconMap[data.icon as keyof typeof iconMap] || TrendingUp;
  
  if (isLoading) {
    return (
      <Card className="relative overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="h-4 w-24 bg-muted animate-pulse rounded" />
              <div className="h-8 w-32 bg-muted animate-pulse rounded" />
              <div className="h-4 w-16 bg-muted animate-pulse rounded" />
            </div>
            <div className="h-12 w-12 bg-muted animate-pulse rounded-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="relative overflow-hidden group hover:shadow-lg transition-all duration-300 hover:scale-[1.02] bg-gradient-to-br from-background to-muted/30">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
              {data.title}
            </p>
            <h3 className="text-2xl font-bold tracking-tight group-hover:text-primary transition-colors">
              {data.value}
            </h3>
            <Badge
              variant={data.changeType === 'positive' ? 'default' : 'destructive'}
              className="text-xs font-medium"
            >
              {data.changeType === 'positive' ? (
                <TrendingUp className="mr-1 h-3 w-3" />
              ) : (
                <TrendingDown className="mr-1 h-3 w-3" />
              )}
              {data.change}
            </Badge>
          </div>
          <div className={cn(
            "flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110",
            data.changeType === 'positive' 
              ? "bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400" 
              : "bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400"
          )}>
            <IconComponent className="h-6 w-6" />
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </CardContent>
    </Card>
  );
}