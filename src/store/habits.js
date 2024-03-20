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
      console.error(`Something went wrong when getting local storage data.`);
    }
  };

  const updateStorage = () => {
    try {
      const habitsData = JSON.stringify(habits.value);
      localStorage.setItem('habits', habitsData);
    } catch {
      console.error(`Something went wrong when storing data to local storage.`);
    }
  };

  const addHabit = habit => {
    const uuid = uuidv4();
    habits.value.push({
      id: uuid,
      name: habit
    });
    habitsStateStore.addHabitState(uuid);
  };

  getStorage();

  watch(habits.value, () => {
    updateStorage();
  });

  return { habits, addHabit };
});
