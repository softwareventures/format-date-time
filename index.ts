/** @file Convert @softwareventures/date-time to a string in a variety of formats. */

import type {DateTime} from "@softwareventures/date-time";
import {concatMap} from "@softwareventures/array";
import * as formatDate from "@softwareventures/format-date";
import * as formatTime from "@softwareventures/format-time";

/** A function that formats a {@link DateTime} or part of a {@link DateTime} as
 * a string. */
export type DateTimeFormatter = (dateTime: DateTime) => string;

/** Constructs a function that formats a {@link DateTime} using the specified
 * template.
 *
 * This function is intended to be used as a template literal tag function.
 *
 * The template may contain placeholders which will be called as functions
 * with the specified {@link DateTime} as their argument.
 *
 * @example
 * const format = dateTimeTemplate`${hours2}:${minutes2}:${seconds2} ${day2}/${month2}/${year2}`;
 * const text = format(dateTime); */
export function dateTimeTemplate(
    texts: TemplateStringsArray,
    ...formatters: readonly DateTimeFormatter[]
): DateTimeFormatter {
    return dateTime => concatMap(texts, (text, i) => [text, formatters[i]?.(dateTime)]).join("");
}

/** Formats the year portion of the specified {@link DateTime} as a numeric
 * string. */
export const year = formatDate.year;

/** Formats the year portion of the specified {@link DateTime} as a numeric
 * string truncated to the last two digits. */
export const shortYear = formatDate.shortYear;

/** Formats the year portion of the specified {@link DateTime} as a numeric
 * string, zero-padded to at least four digits. */
export const year4 = formatDate.year4;

/** Formats the month portion of the specified {@link DateTime} as a numeric
 * string. */
export const month = formatDate.month;

/** Formats the month portion of the specified {@link DateTime} as a 2-digit
 * numeric string. */
export const month2 = formatDate.month2;

export {MonthName} from "@softwareventures/format-date";

/** Formats the name of the month portion of the specified {@link DateTime}
 * as a string, e.g. `"January"`. */
export const monthName = formatDate.monthName;

/** Formats the day portion of the specified {@link DateTime} as a numeric
 * string. */
export const day = formatDate.day;

/** Formats the day portion of the specified {@link DateTime} as a 2-digit
 * numeric string. */
export const day2 = formatDate.day2;

export {DayOfWeek} from "@softwareventures/format-date";

/** Formats the name of the day-of-the-week of the specified {@link DateTime}
 * as a string, e.g. `"Monday"`. */
export const dayOfWeek = formatDate.dayOfWeek;

/** Formats the hours portion of the specified {@link DateTime} as a 24-hour
 * numeric string. */
export const hours = formatTime.hours;

/** Formats the hours portion of the specified {@link DateTime} as a 2-digit
 * 24-hour numeric string. */
export const hours2 = formatTime.hours2;

/** Formats the hours portion of the specified {@link DateTime} as a 12-hour
 * numeric string. */
export const hours12 = formatTime.hours12;

/** Formats the hours portion of the specified {@link DateTime} as a 2-digit
 * 12-hour numeric string. */
export const hours122 = formatTime.hours122;

export {AmPm} from "@softwareventures/format-time";

/** Returns `"AM"` or `"PM"` depending on the hour of the specified
 * {@link DateTime}. */
export const amPm = formatTime.amPm;

/** Formats the minutes portion of the specified {@link DateTime} as a
 * numeric string. */
export const minutes = formatTime.minutes;

/** Formats the minutes portion of the specified {@link DateTime} as a
 * 2-digit numeric string. */
export const minutes2 = formatTime.minutes2;

/** Formats the seconds portion of the specified {@link DateTime} as a
 * numeric string.
 *
 * Note that fractional seconds will not be rounded, so this might produce
 * a result similar to `"2.234"` */
export const seconds = formatTime.seconds;

/** Formats the seconds portion of the specified {@link DateTime} as a
 * numeric string. If necessary, adds a leading zero to the whole part of the
 * seconds to ensure the whole part is at least two digits.
 *
 * Note that fractional seconds will not be rounded, so this might produce
 * a result similar to `"02.234"`. */
export const seconds2 = formatTime.seconds2;

/** Rounds the seconds portion of the specified {@link DateTime} down and
 * formats the result as a numeric string. */
export const floorSeconds = formatTime.floorSeconds;

/** Rounds the seconds portion of the specified {@link Timestamp} down and
 * formats the result as a 2-digit numeric string. */
export const floorSeconds2 = formatTime.floorSeconds2;

/** Rounds the seconds portion of the specified {@link Timestamp} down to the
 * next lower millisecond, and formats the result as a 2.3-digit string. */
export const secondsMs = formatTime.secondsMs;

/** Options for formatting a {@link DateTime} in ISO 8601 format.
 *
 * @see iso8601 */
export interface Iso8601Options {
    /** Whether to use the "basic" or "extended" ISO 8601 format. In the
     * "basic" format, colons and hyphens are omitted.
     *
     * @default "extended" */
    readonly format?: "basic" | "extended" | undefined;

    /** Whether to round the time down before formatting.
     *
     * If set to `"none"`, no rounding is performed.
     *
     * If set to `"seconds"`, the time is rounded down to the next lower
     * second.
     *
     * If set to `"ms"`, the time is rounded down to the next lower
     * millisecond.
     *
     * @default "none" */
    readonly round?: "none" | "seconds" | "ms" | undefined;

    /** Whether to delimit the time portion of the {@link DateTime} with a
     * capital `"T"` or a space `" "`.
     *
     * @default "T" */
    readonly timeDelimiter?: "T" | " " | undefined;
}

/** Returns a {@link DateTimeFormatter} that formats the specified
 * {@link DateTime} as ISO 8601, with the specified options.
 *
 * By default, the {@link DateTime} is formatted in the "extended" ISO 8601
 * format, with the time delimited by `"T"`, and without rounding, for example
 * `"2024-01-26T11:57:23.723615"`.
 *
 * If the `format` option is set to `"basic"`, then the hyphens and colons are
 * omitted, for example `"20240126T115723.723615"`.
 *
 * If the `round` option is set to `"seconds"`, then the time is rounded down
 * to the next lower second, for example `"2024-01-26T11:57:23"`.
 *
 * If the `round` option is set to `"ms"`, then the time is rounded down to
 * the next lower millisecond, for example `"2024-01-26T11:57:23.723"`.
 *
 * If the `timeDelimiter` option is set to `" "`, then the time is delimited by
 * a space instead of by `"T"`, for example `"2024-01-26 11:57:23.363215"`.*/
export function iso8601(options: Iso8601Options = {}): DateTimeFormatter {
    const dateSeparator = {
        basic: () => "",
        extended: () => "-"
    }[options.format ?? "extended"];
    const timeDelimiter = (): string => options.timeDelimiter ?? "T";
    const timeSeparator = {
        basic: () => "",
        extended: () => ":"
    }[options.format ?? "extended"];
    const seconds = {
        none: seconds2,
        seconds: floorSeconds2,
        ms: secondsMs
    }[options.round ?? "none"];
    return dateTimeTemplate`${year4}${dateSeparator}${month2}${dateSeparator}${day2}${timeDelimiter}${hours2}${timeSeparator}${minutes2}${timeSeparator}${seconds}`;
}
