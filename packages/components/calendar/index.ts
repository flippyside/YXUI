import { withInstall } from "@yx/utils/withInstall";
import _Calendar from "./src/calendar.vue";

const Calendar = withInstall(_Calendar);

export default Calendar;

export * from "./src/calendar";

declare module "vue" {
  export interface GlobalComponents {
    YxCalendar: typeof Calendar;
  }
}
