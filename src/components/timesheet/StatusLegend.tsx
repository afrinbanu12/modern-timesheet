import { cn } from "@/lib/utils";
import TimesheetHeader from "./TimesheetHeader";
import TimesheetGrid from "./TimesheetGrid";
import TimesheetStats from "./TimesheetStats";
import StatusLegend from "./StatusLegend";

interface LegendItemProps {
  color: string;
  label: string;
}

const LegendItem = ({ color, label }: LegendItemProps) => (
  <div className="flex items-center gap-2">
    <div className={cn("w-3 h-3 rounded-full", color)} />
    <span className="text-sm text-muted-foreground">{label}</span>
  </div>
);

const StatusLegend = () => {
  return (
    <div className="flex flex-wrap items-center gap-4 sm:gap-6">
      <LegendItem color="bg-status-working" label="Worked" />
      <LegendItem color="bg-status-leave" label="Not Worked" />
      <LegendItem color="bg-status-weekend" label="Weekend" />
    </div>
  );
};

export default StatusLegend;
