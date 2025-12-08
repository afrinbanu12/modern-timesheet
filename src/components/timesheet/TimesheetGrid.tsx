import DayCard from "./DayCard";
import { DayData } from "./types";

interface TimesheetGridProps {
  days: DayData[];
  onDayClick?: (day: DayData) => void;
}

const weekDayHeaders = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const TimesheetGrid = ({ days, onDayClick }: TimesheetGridProps) => {
  return (
    <div className="space-y-3">
      {/* Week day headers */}
      <div className="grid grid-cols-7 gap-2 sm:gap-3">
        {weekDayHeaders.map((day) => (
          <div
            key={day}
            className="text-center text-xs sm:text-sm font-medium text-muted-foreground py-2"
          >
            {day}
          </div>
        ))}
      </div>
      
      {/* Days grid */}
      <div className="grid grid-cols-7 gap-2 sm:gap-3">
        {days.map((day, index) => (
          <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 15}ms` }}>
            <DayCard day={day} onClick={onDayClick} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimesheetGrid;
