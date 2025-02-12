import React, { useState, useEffect } from "react";

interface LocalDateProps {
  utcDate: string;
  dateOnly?: boolean;
}

const dateTimeFormatOptions: Intl.DateTimeFormatOptions = {
  month: "long",
  day: "numeric",
  hourCycle: "h24",
  hour: "numeric",
  minute: "numeric",
};

const dateFormatOptions: Intl.DateTimeFormatOptions = {
  month: "long",
  day: "numeric",
};

const locale = "en-US";
const localDateTimeIntl = new Intl.DateTimeFormat(
  locale,
  dateTimeFormatOptions,
);
const localDateIntl = new Intl.DateTimeFormat(locale, dateFormatOptions);

const LocalDate: React.FC<LocalDateProps> = ({ utcDate, dateOnly }) => {
  const [localDate, setLocalDate] = useState<string | null>(null);

  useEffect(() => {
    const date = new Date(utcDate);
    setLocalDate(
      dateOnly ? localDateIntl.format(date) : localDateTimeIntl.format(date),
    );
  }, [utcDate]);

  return (
    <span>
      {localDate ? localDate : `${new Date(utcDate).toUTCString()} UTC`}
    </span>
  );
};

export default LocalDate;
