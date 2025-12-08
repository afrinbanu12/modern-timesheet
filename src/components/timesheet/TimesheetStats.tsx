import { Clock, CheckCircle, XCircle, Palmtree } from "lucide-react";
import { DayData } from "./types";

interface TimesheetStatsProps {
  days: DayData[];
}

const TimesheetStats = ({ days }: TimesheetStatsProps) => {
  const presentDays = days.filter(d => d.status === 'present').length;
  const absentDays = days.filter(d => d.status === 'absent').length;
  const leaveDays = days.filter(d => d.status === 'leave').length;
  const totalHours = days.reduce((acc, d) => acc + (d.hours || 0), 0);

  const stats = [
    {
      icon: CheckCircle,
      label: "Present",
      value: presentDays,
      color: "text-status-present",
      bgColor: "bg-status-present-light",
    },
    {
      icon: XCircle,
      label: "Absent",
      value: absentDays,
      color: "text-status-absent",
      bgColor: "bg-status-absent-light",
    },
    {
      icon: Palmtree,
      label: "Leave",
      value: leaveDays,
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
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
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
