import React from "react";
import LocalDate from "./LocalDate";
import { GoogleCalendarButton } from "./GoogleCalendarButton";
import { Countdown } from "./Countdown";
import { ProgressBar } from "./ProgressBar";
import { GatsbyImage, getImage, ImageDataLike } from "gatsby-plugin-image";
import { Chip } from "./Chip";

type CardProps = Partial<{
  title: string;
  shortName: string;
  logo: ImageDataLike;
  currentSeason: Partial<{
    startDate: string;
    endDate: string;
    title: string;
    url: string;
    startDateNotice: string;
    endDateNotice: string;
  }>;
  nextSeason: Partial<{
    startDate: string;
    endDate: string;
    title: string;
    url: string;
    startDateNotice: string;
    endDateNotice: string;
    showCountdown: boolean;
  }>;
  seasonKeyword: string;
  testProps: {
    now?: Date;
    timeLeft?: number;
  };
}>;

const getProgress = (
  startDate: string | undefined,
  endDate: string | undefined,
  currentTime?: Date | undefined,
) => {
  if (!startDate || !endDate) {
    return 0;
  }

  const now = currentTime?.getTime() ?? Date.now();
  const startTimeMs = new Date(startDate).getTime();
  const endTimeMs = new Date(endDate).getTime();

  const totalDuration = endTimeMs - startTimeMs;
  const elapsedTime = now - startTimeMs;

  const progressPercentage = (elapsedTime / totalDuration) * 100;

  return progressPercentage;
};

const Card = (props: CardProps) => {
  const { title, shortName, logo, currentSeason, nextSeason, seasonKeyword } =
    props;

  return (
    <section className="p-6 rounded-md flex flex-col gap-2 md:gap-4 bg-gray-800">
      <div className="relative flex flex-row justify-center h-[100px] w-[140px] max-h-[100px] md:h-[140px] md:w-[200px] md:max-h-[140px] place-self-center">
        <GatsbyImage
          image={getImage(logo!)!}
          alt={`${title} logo`}
          className="my-auto"
        />
      </div>
      <h2 className="sr-only">{title}</h2>
      {currentSeason?.title && (
        <div
          aria-label={`Current ${seasonKeyword}`}
          className="flex flex-col gap-1"
        >
          <div className="flex flex-row gap-2">
            <span className="sr-only">{`What is the current ${title} ${seasonKeyword}?`}</span>
            <div className="flex flex-col md:flex-row md:gap-2">
              <div className="md:my-auto">
                <Chip className="!bg-slate-500">Now</Chip>
              </div>
              <h3 className="text-lg font-semibold">
                <a
                  href={currentSeason.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {currentSeason.title}
                </a>
              </h3>
              {shortName && (
                <span className="sr-only">{`${shortName} ${currentSeason.title} ${seasonKeyword}`}</span>
              )}
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <div className="flex flex-col gap-1 col-span-4">
              <span className="sr-only">{`When did the current ${title} ${seasonKeyword} start?`}</span>
              <div className="flex flex-row gap-2 text-sm">
                {!!currentSeason.startDateNotice || !currentSeason.startDate ? (
                  <span>{currentSeason.startDateNotice}</span>
                ) : (
                  <div>
                    {shortName && (
                      <span className="sr-only">{`${shortName} ${currentSeason.title} ${seasonKeyword} release date`}</span>
                    )}
                    <LocalDate utcDate={currentSeason.startDate} />
                  </div>
                )}
              </div>
            </div>
            <div>
              <span className="sr-only">{`When is the current ${title} ${seasonKeyword} ending?`}</span>
              <div className="flex flex-row-reverse gap-2 text-sm">
                {!!currentSeason.endDateNotice || !currentSeason.endDate ? (
                  <span>{currentSeason.endDateNotice}</span>
                ) : (
                  <LocalDate utcDate={currentSeason.endDate} dateOnly />
                )}
              </div>
            </div>
          </div>
          <ProgressBar
            progress={getProgress(
              currentSeason?.startDate,
              currentSeason?.endDate,
              props.testProps?.now,
            )}
          />
        </div>
      )}
      {nextSeason?.title && (
        <div
          aria-label={`Next ${seasonKeyword}`}
          className="flex flex-col gap-1 mt-auto"
        >
          <div className="flex flex-row gap-2 justify-between">
            <span className="sr-only">{`What is the next ${title} ${seasonKeyword}?`}</span>
            <div className="flex flex-col md:flex-row md:gap-2">
              <div className="md:my-auto">
                <Chip>Next</Chip>
              </div>
              <h3 className="text-lg font-semibold">
                <a
                  href={nextSeason.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {nextSeason.title}
                </a>
              </h3>
              {shortName && (
                <span className="sr-only">{`${shortName} ${nextSeason.title} ${seasonKeyword}`}</span>
              )}
            </div>
            {!!nextSeason.startDate && (
              <div className="mt-auto">
                <GoogleCalendarButton
                  title={`${title} ${seasonKeyword} start`}
                  date={new Date(nextSeason.startDate)}
                />
              </div>
            )}
          </div>
          <div className="flex flex-row justify-between items-baseline min-h-[28px]">
            <span className="sr-only">{`When is the next ${title} ${seasonKeyword} starting?`}</span>
            <div className="flex flex-row gap-2 text-sm">
              {!!nextSeason.startDateNotice || !nextSeason.startDate ? (
                <span>{nextSeason.startDateNotice}</span>
              ) : (
                <div>
                  {shortName && (
                    <span className="sr-only">{`${shortName} ${nextSeason.title} ${seasonKeyword} release date`}</span>
                  )}
                  <LocalDate utcDate={nextSeason.startDate} />
                </div>
              )}
            </div>
            {nextSeason.showCountdown && nextSeason.startDate && (
              <Countdown
                date={new Date(nextSeason.startDate)}
                testProps={
                  props.testProps
                    ? { timeLeft: props.testProps.timeLeft }
                    : undefined
                }
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Card;
