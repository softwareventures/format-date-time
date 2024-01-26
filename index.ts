/** @file Convert @softwareventures/date-time to a string in a variety of formats. */

import type {DateTime} from "@softwareventures/date-time";
import {concatMap} from "@softwareventures/array";
import * as formatDate from "@softwareventures/format-date";

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
