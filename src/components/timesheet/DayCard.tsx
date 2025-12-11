import { DayData } from "./types";
import { cn } from "@/lib/utils";

interface DayCardProps {
  day: DayData;
  onClick?: (day: DayData) => void;
}

const DayCard = ({ day, onClick }: DayCardProps) => {
  const handleClick = () => {
    if (onClick && day.date !== 0) {
      onClick(day);
    }
  };

  // Determine background color based on status
  const statusBg = {
    worked: "bg-status-working",
    "not-worked": "bg-status-leave",
    weekend: "bg-status-weekend",
    empty: "bg-transparent",
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        "cursor-pointer rounded-lg flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12",
        statusBg[day.status]
      )}
    >
      {day.date !== 0 ? day.date : ""}
    </div>
  );
};

export default DayCard;
