/** @file Convert @softwareventures/date-time to a string in a variety of formats. */

import type {DateTime} from "@softwareventures/date-time";

/** A function that formats a {@link DateTime} or part of a {@link DateTime} as
 * a string. */
export type DateTimeFormatter = (dateTime: DateTime) => string;
