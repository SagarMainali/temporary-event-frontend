"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { formatDate } from "@/utils/utils";

export default function DatePicker({ value, onSelect }) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState(value ? new Date(value) : new Date());
  const [month, setMonth] = React.useState(date);
  const [inputValue, setInputValue] = React.useState(formatDate(date));

  const handleDateChange = (newDate) => {
    setDate(newDate);
    const formattedDate = formatDate(newDate);
    setInputValue(formattedDate);
    if (onSelect) {
      onSelect(newDate); // Notify parent component of the date change
    }
    setOpen(false); // Close the calendar popup
  };

  return (
    <div>
      <div className="relative flex gap-2">
        <Input
          id="date"
          value={inputValue}
          placeholder="Enter event date"
          className="bg-background pr-10"
          readOnly
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setOpen(true);
            }
          }}
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              id="date-picker"
              variant="ghost"
              className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
            >
              <CalendarIcon className="size-3.5" />
              <span className="sr-only">Select date</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto overflow-hidden p-0"
            align="end"
            alignOffset={-8}
            sideOffset={10}
          >
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              month={month}
              onMonthChange={setMonth}
              onSelect={handleDateChange}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
