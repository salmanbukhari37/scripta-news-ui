import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerProps {
  startDate: string;
  endDate: string;
  handleDateChange: (date: Date, type: "startDate" | "endDate") => void;
}

const DatePickerComponent: React.FC<DatePickerProps> = ({
  startDate,
  endDate,
  handleDateChange,
}) => {
  return (
    <div className="space-y-2 pr-4">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        Select Start/End Date
      </h3>
      <div>
        <label
          htmlFor="startDate"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Start Date
        </label>
        <DatePicker
          selected={startDate ? new Date(startDate) : null}
          onChange={(date: Date) => handleDateChange(date, "startDate")}
          dateFormat="yyyy-MM-dd"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          placeholderText="Select a start date"
        />
      </div>
      <div>
        <label
          htmlFor="endDate"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          End Date
        </label>
        <DatePicker
          selected={endDate ? new Date(endDate) : null}
          onChange={(date: Date) => handleDateChange(date, "endDate")}
          dateFormat="yyyy-MM-dd"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          placeholderText="Select an end date"
        />
      </div>
    </div>
  );
};

export default DatePickerComponent;
