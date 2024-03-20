import { ref, watch } from 'vue';
import { defineStore } from 'pinia';

// eslint-disable-next-line import/prefer-default-export
export const useHabitsStateStore = defineStore('habitsState', () => {
  const habitsState = ref(null);

  const currentDate = ref(new Date().toISOString().slice(0, 10));
  const selectedDate = ref(currentDate.value);

  const getStorage = () => {
    try {
      const habitsStateData = localStorage.getItem('habitsState');
      habitsState.value = habitsStateData ? JSON.parse(habitsStateData) : {};
    } catch {
      habitsState.value = {};
      console.error(`Something went wrong when getting local storage data.`);
    }
  };

  const updateStorage = () => {
    try {
      const habitsStateData = JSON.stringify(habitsState.value);
      localStorage.setItem('habitsState', habitsStateData);
    } catch {
      console.error(`Something went wrong when storing data to local storage.`);
    }
  };

  // This only adds new habit states to already existing dates
  const addHabitState = id => {
    habitsState.value[selectedDate.value] ??= {};
    Object.keys(habitsState.value).forEach(date => {
      habitsState.value[date][id] = false;
    });
  };

  const removeHabitState = id => {
    Object.keys(habitsState.value).forEach(date => {
      delete habitsState.value[date][id];
    });
  };

  // Adds states for all existing habits on the day that was not used before
  const addHabitsState = habits => {
    if (!habitsState.value[selectedDate.value]) {
      habitsState.value[selectedDate.value] = {};
      habits.forEach(habit => {
        habitsState.value[selectedDate.value][habit.id] = false;
      });
    }
  };

  const toggleCompletedState = id => {
    habitsState.value[selectedDate.value][id] = !habitsState.value[selectedDate.value][id];
  };

  getStorage();

  watch(habitsState.value, () => {
    updateStorage();
  });

  return {
    habitsState,
    currentDate,
    selectedDate,
    addHabitState,
    removeHabitState,
    addHabitsState,
    toggleCompletedState
  };
});
