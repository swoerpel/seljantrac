import { formatDate } from "@angular/common";
import { DEFAULT_LOCALE, MEDIUM_DATE_FORMAT } from "./constants/date.constants";
import { ServerTimestamp } from "./models/server-timestamp.model";

export const serverTimestampToDate = (st: ServerTimestamp): string => {
    return formatDate(
        st.toDate(),
        MEDIUM_DATE_FORMAT,
        DEFAULT_LOCALE
    );
}