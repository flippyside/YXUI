<template>
  <div :class="[bem.b()]">
    <div :class="bem.e('header')">
      <div :class="bem.e('title')">{{ currentDate }}</div>
      <div :class="bem.e('button-group')">
        <yx-button @click="($event) => seleceDate('prev-year')"
          >前一年</yx-button
        >
        <yx-button @click="($event) => seleceDate('prev-month')"
          >上个月</yx-button
        >
        <yx-button @click="($event) => seleceDate('today')">今天</yx-button>
        <yx-button @click="($event) => seleceDate('next-month')"
          >下个月</yx-button
        >
        <yx-button @click="($event) => seleceDate('next-year')"
          >下一年</yx-button
        >
      </div>
    </div>
    <div :class="[bem.e('body')]">
      <table :class="[bem_table.b()]" cellpadding="0" cellspacing="0">
        <thead>
          <tr>
            <th v-for="day in weekDays" :key="day">
              {{ day }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rid) in rows" :key="rid">
            <td
              v-for="(cell, cid) in row"
              :key="cid"
              :class="[bem_day.b(), getCellClass(cell)]"
              @click="($event) => handlePick(cell)"
            >
              <slot name="date-cell" :data="getSlotData(cell)">
                {{ cell.text }}
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { createNamespace } from "@yx/utils/create";
import YxButton from "@yx/components/button";
import dayjs from "dayjs";
import { Dayjs } from "dayjs";
import { computed, ref } from "vue";
import {
  CalendarDateCell,
  CalendarDateCellType,
  CalendarDateType,
  calendarEmits,
  calendarProps,
} from "./calendar";

defineOptions({ name: "yx-calendar" });

const bem = createNamespace("calendar");
const bem_table = createNamespace("calendar-table");
const bem_day = createNamespace("calendar-day");

const props = defineProps(calendarProps);
const now = dayjs();
// 根据用户传的属性计算日期
const date = computed(() => {
  if (props.modelValue) {
    return dayjs(props.modelValue);
  } else {
    return now;
  }
});
// 表头
// 0 - 6  0:周日  6:周六
// const firstDayofWeek = dayjs().startOf("week").day();
const firstDayofWeek = 1;
const weekMapping = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
const weekDays = computed(() => {
  return [
    ...weekMapping.slice(firstDayofWeek),
    ...weekMapping.slice(0, firstDayofWeek),
  ];
});

// 面板

const rows = computed(() => {
  // 根据用户提供的日期，渲染出 6行7列的 42格表格
  // 根据月份找到当前这一天是周几(前面补上对应的天数) + 下个月的
  let list: CalendarDateCell[] = [];
  // 1. 本月的第一天是周几
  const firstDay = date.value.startOf("month").day();
  const lastDay = date.value.subtract(1, "month").endOf("month").date();
  const count = firstDay - firstDayofWeek;

  // 上个月的
  const prevMonthDays: CalendarDateCell[] = Array.from({ length: count })
    .map((_, idx) => lastDay - (count - idx - 1))
    .map((_) => ({
      text: _,
      type: "prev",
    }));
  // console.log(prevMonthDays);

  // 获取当前月的天数
  const days = date.value.daysInMonth();
  const currentMonthDays: CalendarDateCell[] = Array.from({ length: days }).map(
    (_, idx) => ({
      text: idx + 1,
      type: "current",
    })
  );
  // console.log(currentMonthDays);
  list = [...prevMonthDays, ...currentMonthDays];

  // 剩余的填充下个月
  let remains = 42 - list.length;
  const nextMonthDays: CalendarDateCell[] = Array.from({
    length: remains,
  }).map((_, idx) => ({
    text: idx + 1,
    type: "next",
  }));
  list.push(...nextMonthDays);

  return Array.from({ length: 6 }).map((_, idx) => {
    const start = idx * 7;
    return list.slice(start, start + 7);
  });
});

// console.log(rows.value);

const prevMonthDays = computed(() => date.value.subtract(1, "month").date(1));
const nextMonthDays = computed(() => date.value.add(1, "month").date(1));
const prevYearDays = computed(() => date.value.subtract(1, "year").date(1));
const nextYearDays = computed(() => date.value.add(1, "year").date(1));

const emits = defineEmits(calendarEmits);
const pickDay = (day: Dayjs) => {
  selectDay.value = day; // 选中保存
  emits("update:modelValue", day.toDate());
};

const seleceDate = (type: CalendarDateType) => {
  const dateMap: Record<CalendarDateType, Dayjs> = {
    "prev-month": prevMonthDays.value,
    "next-month": nextMonthDays.value,
    "prev-year": prevYearDays.value,
    "next-year": nextYearDays.value,
    today: now,
  };
  const day = dateMap[type];
  pickDay(day);
};

const formatter = (text: number, type: CalendarDateCellType) => {
  switch (type) {
    case "prev":
      return date.value.startOf("month").subtract(1, "month").date(text);
    case "current":
      return date.value.date(text);
    case "next":
      return date.value.startOf("month").add(1, "month").date(text);
  }
};

const selectDay = ref<Dayjs>();

const handlePick = ({ text, type }: CalendarDateCell) => {
  // 根据text和type获取日期来更新date
  let day = formatter(text, type);
  pickDay(day);
};

function getCellClass({ text, type }: CalendarDateCell) {
  const clazz: string[] = [type];

  const date = formatter(text, type);
  if (date.isSame(selectDay.value, "day")) {
    // 选中的日期和当前循环的日期相同
    clazz.push(bem_day.is("selected", true));
  }

  if (date.isSame(now, "day")) {
    clazz.push(bem_day.is("today", true));
  }
  return clazz;
}

const currentDate = computed(() => {
  // console.log(date.value);
  return `${date.value.year()}年${
    date.value.month() + 1
  }月${date.value.date()}日`;
});

const getSlotData = ({ text, type }: CalendarDateCell) => {
  let day = formatter(text, type);
  return {
    isSelected: day.isSame(selectDay.value),
    day: day.format("YYYY-MM-DD"),
    date: day.toDate(),
    type,
  };
};
</script>
