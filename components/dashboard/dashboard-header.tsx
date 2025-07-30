"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Moon, 
  Sun, 
  Bell, 
  Settings, 
  RefreshCw,
  Calendar,
  Download,
  BarChart3
} from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

interface DashboardHeaderProps {
  onRefresh?: () => void;
  lastUpdated?: Date;
}

export function DashboardHeader({ onRefresh, lastUpdated }: DashboardHeaderProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate refresh
    onRefresh?.();
    setIsRefreshing(false);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
            <BarChart3 className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
              ADmyBRAND Insights
            </h1>
            <p className="text-muted-foreground">
              Advanced analytics for digital marketing agencies
            </p>
          </div>
        </div>
        <Badge variant="secondary" className="hidden sm:flex items-center gap-1">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          Live Data
        </Badge>
      </div>

      <div className="flex items-center gap-2">
        <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          Last updated: {lastUpdated?.toLocaleTimeString() || 'Never'}
        </div>
        <Separator orientation="vertical" className="hidden md:block h-6" />
        
        <Button
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>

        <Button variant="outline" size="sm" className="gap-2">
          <Download className="h-4 w-4" />
          Export
        </Button>

        <Button variant="outline" size="sm">
          <Bell className="h-4 w-4" />
        </Button>

        <Button variant="outline" size="sm">
          <Settings className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "light" ? (
            <Moon className="h-4 w-4" />
          ) : (
            <Sun className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
}