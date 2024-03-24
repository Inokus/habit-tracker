<script setup>
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Icon } from '@iconify/vue';
import { useHabitsStore } from '../store/habits';
import { useHabitsStateStore } from '../store/habitsState';
import formatDate from '../utils/utils';

const router = useRouter();
const habitsStore = useHabitsStore();
const habitsStateStore = useHabitsStateStore();

const displayedWeekDay = ref(habitsStateStore.currentDate);

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

const getMonday = date => {
  const day = date.getDay();
  const monday = date.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(date.getFullYear(), date.getMonth(), monday);
};

const displayedWeek = computed(() => {
  const displayedWeekMonday = getMonday(displayedWeekDay.value);
  const dates = [];
  const month = displayedWeekMonday.getMonth();
  const year = displayedWeekMonday.getFullYear();

  for (let i = 0; i < 7; i += 1) {
    const date = new Date(displayedWeekMonday);
    date.setDate(displayedWeekMonday.getDate() + i);
    dates.push(formatDate(date));
  }
  return { dates, month, year };
});

const changeWeek = next => {
  const newDate = new Date(displayedWeekDay.value);
  const offset = next ? 7 : -7;
  newDate.setDate(newDate.getDate() + offset);
  displayedWeekDay.value = newDate;
};

const selectDate = day => {
  router.push({ path: `/day/${day}` });
  habitsStateStore.selectedDate = new Date(day);
  habitsStore.turnOffEditing();
};

const changeToToday = () => {
  displayedWeekDay.value = habitsStateStore.currentDate;
  selectDate(habitsStateStore.formattedCurrentDate);
};

watch(
  router.currentRoute,
  () => {
    // Make sure date route is not in the future and is valid
    if (
      habitsStateStore.selectedDate > habitsStateStore.currentDate ||
      !Date.parse(habitsStateStore.formattedSelectedDate)
    ) {
      changeToToday();
      return;
    }
    if (habitsStore.habits.length > 0) {
      habitsStateStore.addHabitsState(habitsStore.habits);
    }
  },
  { immediate: true }
);
</script>

<template>
  <div class="date-picker">
    <div class="info">
      <div>
        {{ months[displayedWeek.month] }}
      </div>
      <div>
        {{ displayedWeek.year }}
      </div>
      <div>
        <button type="button" @click="changeToToday">Today</button>
      </div>
    </div>
    <div class="dates">
      <button type="button" @click="changeWeek(false)">
        <Icon icon="material-symbols:chevron-left-rounded" />
      </button>
      <div class="date-item" v-for="(date, index) in displayedWeek.dates" :key="date">
        <button
          type="button"
          :class="{
            today: date === habitsStateStore.formattedCurrentDate,
            selected: date === habitsStateStore.formattedSelectedDate
          }"
          :disabled="new Date(date) > habitsStateStore.currentDate"
          @click="selectDate(date)"
        >
          {{ daysOfWeek[index] }}
          <br />
          {{ date.slice(8) }}
        </button>
      </div>
      <button
        type="button"
        :disabled="displayedWeek.dates.includes(habitsStateStore.formattedCurrentDate)"
        @click="changeWeek(true)"
      >
        <Icon icon="material-symbols:chevron-right-rounded" />
      </button>
    </div>
  </div>
</template>

<style scoped>
button {
  background-color: inherit;
  border: none;
}

.date-picker {
  display: flex;
  flex-direction: column;
  text-align: center;
}

.info {
  display: flex;
  padding: 0 0.5rem 1rem;
}

.info > * {
  flex: 1;
}

.info button {
  font-weight: 700;
}

.info div:first-child {
  text-align: left;
}

.info div:last-child {
  text-align: right;
}

.dates {
  flex: 1;
  display: flex;
  justify-content: space-evenly;
}

.dates button {
  height: 3rem;
  min-width: 2rem;
  padding: 0;
  border-radius: 6px;
}

.dates > button {
  font-size: 1.5rem;
  line-height: 0;
}

.date-item > button {
  width: 100%;
}

.dates button:hover {
  background-color: var(--secondary-color);
}

.date-item {
  flex: 1;
}

.today {
  background-color: var(--primary-color);
}

.selected {
  border: 1px solid var(--base-text-color);
  font-weight: 700;
}

.invisible {
  visibility: hidden;
}
</style>
