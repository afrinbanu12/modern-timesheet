import { cn } from "@/lib/utils";

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
      <LegendItem color="bg-status-present" label="Present" />
      <LegendItem color="bg-status-absent" label="Absent" />
      <LegendItem color="bg-status-leave" label="Leave" />
      <LegendItem color="bg-status-weekend" label="Weekend" />
    </div>
  );
};

export default StatusLegend;
