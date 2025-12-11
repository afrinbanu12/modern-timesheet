import { Clock, CheckCircle, XCircle } from "lucide-react";
import { DayData } from "./types";

interface TimesheetStatsProps {
  days: DayData[];
}

const TimesheetStats = ({ days }: TimesheetStatsProps) => {
  // Calculate statistics
  const workedDays = days.filter(d => d.status === "worked").length;

  const notWorkedDays = days.filter(d => d.status === "not-worked").length;

  const totalHours = days
    .filter(d => d.status === "worked")
    .reduce((acc, d) => acc + (d.hours || 0), 0);

  // Stats array for rendering
  const stats = [
    {
      icon: CheckCircle,
      label: "Worked Days",
      value: workedDays,
      color: "text-status-working",
      bgColor: "bg-status-working-light",
    },
    {
      icon: XCircle,
      label: "Not Worked",
      value: notWorkedDays,
      color: "text-status-leave",
      bgColor: "bg-status-leave-light",
    },
    {
      icon: Clock,
      label: "Total Hours",
      value: totalHours,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-card rounded-xl p-4 shadow-card border border-border/50"
        >
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${stat.color}`} />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TimesheetStats;
