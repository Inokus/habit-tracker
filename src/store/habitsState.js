/* eslint-disable no-console */
import { ref, computed, watch } from 'vue';
import { defineStore } from 'pinia';
import formatDate from '../utils/utils';

// eslint-disable-next-line import/prefer-default-export
export const useHabitsStateStore = defineStore('habitsState', () => {
  const habitsState = ref(null);

  const currentDate = new Date();
  const formattedCurrentDate = formatDate(currentDate);
  const selectedDate = ref(currentDate);
  const formattedSelectedDate = computed(() => {
    return formatDate(selectedDate.value);
  });

  const getStorage = () => {
    try {
      const habitsStateData = localStorage.getItem('habitsState');
      habitsState.value = habitsStateData ? JSON.parse(habitsStateData) : {};
    } catch {
      habitsState.value = {};
      console.error(`Something went wrong when getting habits state data from local storage.`);
    }
  };

  const updateStorage = () => {
    try {
      const habitsStateData = JSON.stringify(habitsState.value);
      localStorage.setItem('habitsState', habitsStateData);
    } catch {
      console.error(`Something went wrong when storing habits state data to local storage.`);
    }
  };

  // This only adds new habit states to already existing dates
  const addHabitState = id => {
    habitsState.value[formattedSelectedDate.value] ??= {};
    Object.keys(habitsState.value).forEach(date => {
      habitsState.value[date][id] = false;
    });
  };

  const removeHabitState = id => {
    // Create a copy of the keys to iterate over
    const dates = Object.keys(habitsState.value);
    dates.forEach(date => {
      delete habitsState.value[date][id];
      if (Object.keys(habitsState.value[date]).length === 0) {
        delete habitsState.value[date];
      }
    });
  };

  // Adds states for all existing habits on the day that was not used before
  const addHabitsState = habits => {
    if (!habitsState.value[formattedSelectedDate.value]) {
      habitsState.value[formattedSelectedDate.value] = {};
      habits.forEach(habit => {
        habitsState.value[formattedSelectedDate.value][habit.id] = false;
      });
    }
  };

  const toggleCompleted = id => {
    habitsState.value[formattedSelectedDate.value][id] =
      !habitsState.value[formattedSelectedDate.value][id];
  };

  getStorage();

  watch(habitsState.value, () => {
    updateStorage();
  });

  return {
    habitsState,
    currentDate,
    formattedCurrentDate,
    selectedDate,
    formattedSelectedDate,
    addHabitState,
    removeHabitState,
    addHabitsState,
    toggleCompleted
  };
});
