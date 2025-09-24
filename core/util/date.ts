import { addDays } from "date-fns";
import { format } from "date-fns/format";

export class DateHelper {
    static getCurrentEpochTime(): number {
        const now = new Date();
        return now.getTime();
    }

    static getFormattedDate(formattedDate: string): string {
        const now = new Date();
        return format(now, formattedDate);
    }

    static getFutureDate(daysToAdd: number, formatPattern: string): string {
        return format(addDays(new Date(), daysToAdd), formatPattern);
    }
}