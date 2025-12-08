import { cn } from "@/lib/utils";
import { DayData, DayStatus } from "./types";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface DayCardProps {
  day: DayData;
  onClick?: (day: DayData) => void;
}

const statusStyles: Record<DayStatus, string> = {
  present: "bg-status-present-light border-status-present/30 hover:border-status-present",
  absent: "bg-status-absent-light border-status-absent/30 hover:border-status-absent",
  leave: "bg-status-leave-light border-status-leave/30 hover:border-status-leave",
  weekend: "bg-status-weekend border-muted-foreground/10 cursor-default",
  empty: "bg-transparent border-transparent cursor-default pointer-events-none",
};

const statusLabels: Record<DayStatus, string> = {
  present: "Present",
  absent: "Absent",
  leave: "On Leave",
  weekend: "Weekend",
  empty: "",
};

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const DayCard = ({ day, onClick }: DayCardProps) => {
  if (day.status === "empty") {
    return <div className="aspect-square" />;
  }

  const isWeekend = day.status === "weekend";
  const isInteractive = !isWeekend;

  const card = (
    <button
      onClick={() => isInteractive && onClick?.(day)}
      disabled={!isInteractive}
      className={cn(
        "aspect-square rounded-lg border-2 p-2 sm:p-3 transition-all duration-200 flex flex-col items-center justify-center gap-0.5 sm:gap-1 w-full",
        statusStyles[day.status],
        isInteractive && "hover:shadow-card-hover hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
      )}
    >
      <span className={cn(
        "text-xs font-medium",
        isWeekend ? "text-muted-foreground/60" : "text-muted-foreground"
      )}>
        {dayNames[day.dayOfWeek]}
      </span>
      <span className={cn(
        "text-lg sm:text-xl font-semibold",
        isWeekend ? "text-muted-foreground/60" : "text-foreground"
      )}>
        {day.date}
      </span>
      {day.hours !== undefined && !isWeekend && (
        <span className="text-xs text-muted-foreground">
          {day.hours}h
        </span>
      )}
    </button>
  );

  if (isInteractive) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{card}</TooltipTrigger>
        <TooltipContent className="animate-scale-in">
          <div className="text-sm">
            <p className="font-medium">{statusLabels[day.status]}</p>
            {day.hours !== undefined && (
              <p className="text-muted-foreground">{day.hours} hours worked</p>
            )}
            {day.notes && (
              <p className="text-muted-foreground mt-1">{day.notes}</p>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    );
  }

  return card;
};

export default DayCard;
