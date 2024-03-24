/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
import { ref, watch } from 'vue';
import { defineStore } from 'pinia';
import { v4 as uuidv4 } from 'uuid';
import { useHabitsStateStore } from './habitsState';

// eslint-disable-next-line import/prefer-default-export
export const useHabitsStore = defineStore('habits', () => {
  const habitsStateStore = useHabitsStateStore();

  const habits = ref(null);

  const getStorage = () => {
    try {
      const habitsData = localStorage.getItem('habits');
      habits.value = habitsData ? JSON.parse(habitsData) : [];
    } catch {
      habits.value = [];
      console.error(`Something went wrong when getting habits data from local storage.`);
    }
  };

  const updateStorage = () => {
    try {
      const habitsData = JSON.stringify(habits.value);
      localStorage.setItem('habits', habitsData);
    } catch {
      console.error(`Something went wrong when storing habits data to local storage.`);
    }
  };

  const addHabit = habit => {
    const uuid = uuidv4();
    habits.value.push({
      id: uuid,
      name: habit,
      isEditing: false,
      stoppedAt: null
    });
    habitsStateStore.addHabitState(uuid);
  };

  const toggleEditing = habit => {
    habit.isEditing = !habit.isEditing;
  };

  const updateHabit = (habit, newName) => {
    habit.name = newName;
  };

  const resumeHabit = habit => {
    habit.stoppedAt = null;
  };

  const stopHabit = habit => {
    habit.stoppedAt = habitsStateStore.formattedSelectedDate;
  };

  const removeHabit = habit => {
    habitsStateStore.removeHabitState(habit.id);
    const index = habits.value.indexOf(habit);
    habits.value.splice(index, 1);
  };

  const turnOffEditing = () => {
    if (habits.value.length) {
      habits.value.forEach(habit => {
        if (habit.isEditing) habit.isEditing = false;
      });
    }
  };

  getStorage();

  watch(habits.value, () => {
    updateStorage();
  });

  turnOffEditing();

  return {
    habits,
    addHabit,
    toggleEditing,
    updateHabit,
    resumeHabit,
    stopHabit,
    removeHabit,
    turnOffEditing
  };
});
