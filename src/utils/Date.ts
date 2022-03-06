import moment from "moment";

/**
 * @param date given a date string with format MM-DD-YYYY
 * @returns years beetwen date and current date
 */
export const getAgeFromDate = (date: string): number | undefined => {
  if (!date || date === "Unknown") return undefined;
  return moment().diff(moment(date, "MMDDYYYY"), "years");
};
