<script setup>
import { computed } from 'vue';
import DatePicker from '../components/DatePicker.vue';
import HabitInput from '../components/HabitInput.vue';
import HabitItem from '../components/HabitItem.vue';
import { useHabitsStore } from '../store/habits';
import { useHabitsStateStore } from '../store/habitsState';

const props = defineProps({
  date: {
    type: String,
    required: true
  }
});

const habitsStore = useHabitsStore();
const habitsStateStore = useHabitsStateStore();

habitsStateStore.selectedDate = new Date(props.date);

const shouldRenderItem = item => {
  if (item.stoppedAt) {
    if (new Date(item.stoppedAt) < habitsStateStore.selectedDate) {
      return false;
    }
  }
  return true;
};

const filteredHabits = computed(() => {
  return habitsStore.habits.filter(habit => shouldRenderItem(habit));
});
</script>

<template>
  <main>
    <DatePicker />

    <HabitInput />
    <div class="habit-list" :class="{ empty: filteredHabits.length === 0 }">
      <HabitItem
        v-for="habit in filteredHabits"
        :key="habit.id"
        :habit="habit"
        @toggle-completed="habitsStateStore.toggleCompleted(habit.id)"
        @edit-habit="habitsStore.toggleEditing(habit)"
        @update-habit="habitsStore.updateHabit(habit, $event)"
        @resume-habit="habitsStore.resumeHabit(habit)"
        @stop-habit="habitsStore.stopHabit(habit)"
        @remove-habit="habitsStore.removeHabit(habit)"
      />
      <p v-if="filteredHabits.length === 0">No habits to display, please add some</p>
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  margin: 0 auto;
}

main > * {
  width: 100%;
  padding: 1rem 0.5rem;
}

.controls {
  display: flex;
  justify-content: space-evenly;
}

.habit-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
  text-align: center;
}

.habit-list.empty {
  justify-content: center;
}

@media screen and (width >= 768px) {
  main {
    width: 80vw;
    max-width: 1200px;
  }
}
</style>
