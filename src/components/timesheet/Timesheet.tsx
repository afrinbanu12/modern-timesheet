import { useState, useMemo } from "react";
import TimesheetHeader from "./TimesheetHeader";
import TimesheetGrid from "./TimesheetGrid";
import TimesheetStats from "./TimesheetStats";
import StatusLegend from "./StatusLegend";
import { DayData, DayStatus } from "./types";
import { toast } from "sonner";

// Generate mock data for demonstration
const generateMonthData = (year: number, month: number): DayData[] => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startDayOfWeek = firstDay.getDay();

  const days: DayData[] = [];

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < startDayOfWeek; i++) {
    days.push({
      date: 0,
      dayOfWeek: i,
      status: "empty",
    });
  }

  // Generate status for each day
  const statuses: DayStatus[] = ["present", "absent", "leave"];
  
  for (let date = 1; date <= daysInMonth; date++) {
    const dayOfWeek = (startDayOfWeek + date - 1) % 7;
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    let status: DayStatus;
    let hours: number | undefined;

    if (isWeekend) {
      status = "weekend";
    } else {
      // Generate semi-random status based on date for consistency
      const seed = (date * 7 + month * 31 + year) % 10;
      if (seed < 7) {
        status = "present";
        hours = 8 + (seed % 2); // 8 or 9 hours
      } else if (seed < 9) {
        status = "leave";
      } else {
        status = "absent";
      }
    }

    days.push({
      date,
      dayOfWeek,
      status,
      hours,
      notes: status === "leave" ? "Annual leave" : undefined,
    });
  }

  return days;
};

const Timesheet = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const days = useMemo(
    () => generateMonthData(currentYear, currentMonth),
    [currentYear, currentMonth]
  );

  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleDayClick = (day: DayData) => {
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    
    const statusMessages: Record<DayStatus, string> = {
      present: `Worked ${day.hours || 8} hours`,
      absent: "Marked as absent",
      leave: day.notes || "On leave",
      weekend: "Weekend",
      empty: "",
    };

    toast.info(`${monthNames[currentMonth]} ${day.date}, ${currentYear}`, {
      description: statusMessages[day.status],
    });
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">
        {/* Header */}
        <TimesheetHeader
          month={currentMonth}
          year={currentYear}
          onPreviousMonth={handlePreviousMonth}
          onNextMonth={handleNextMonth}
        />

        {/* Stats */}
        <TimesheetStats days={days} />

        {/* Main Card */}
        <div className="bg-card rounded-2xl shadow-card border border-border/50 p-4 sm:p-6 space-y-6">
          {/* Legend */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <StatusLegend />
          </div>

          {/* Calendar Grid */}
          <TimesheetGrid days={days} onDayClick={handleDayClick} />
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-muted-foreground">
          Click on any day to view details
        </p>
      </div>
    </div>
  );
};

export default Timesheet;
