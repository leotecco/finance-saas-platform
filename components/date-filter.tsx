"use client";

import { useState } from "react";

import { ChevronDown } from "lucide-react";
import { format, parse, subDays } from "date-fns";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { formatDateRange } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";

export const DateFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const accountId = params.get("accountId");
  const from = params.get("from") || "";
  const to = params.get("to") || "";

  const defaultTo = new Date();
  const defaultFrom = subDays(defaultTo, 30);

  const paramState = {
    from: from ? parse(from, "yyyy-MM-dd", new Date()) : defaultFrom,
    to: to ? parse(to, "yyyy-MM-dd", new Date()) : defaultTo,
  };

  const [date, setDate] = useState<DateRange | undefined>(paramState);

  const pushToUrl = (dateRange: DateRange | undefined) => {
    const query = {
      accountId,
      from: format(dateRange?.from || defaultFrom, "yyyy-MM-dd"),
      to: format(dateRange?.to || defaultTo, "yyyy-MM-dd"),
    };

    const url = qs.stringifyUrl(
      {
        url: pathname,
        query,
      },
      { skipNull: true, skipEmptyString: true }
    );

    router.push(url);
  };

  const handleReset = () => {
    setDate(undefined);
    pushToUrl(undefined);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="lg:w-auto w-full h-9 rounded-md px-3 font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none focus:ring-offset-0 focus:ring-transparent outline-none text-white focus:bg-white/30 transition"
          disabled={false}
        >
          <span>{formatDateRange(paramState)}</span>
          <ChevronDown className="ml-2 size-4 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="lg:w-auto w-full p-0" align="start">
        <Calendar
          mode="range"
          numberOfMonths={2}
          defaultMonth={date?.from}
          selected={date}
          onSelect={setDate}
          initialFocus
        />

        <div className="p-4 w-full flex items-center gap-x-2">
          <PopoverClose asChild>
            <Button
              variant="outline"
              className="w-full"
              disabled={!date?.from || !date?.to}
              onClick={handleReset}
            >
              Reset
            </Button>
          </PopoverClose>

          <PopoverClose asChild>
            <Button
              className="w-full"
              disabled={!date?.from || !date?.to}
              onClick={() => pushToUrl(date)}
            >
              Apply
            </Button>
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  );
};
