<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import DatePicker from '../components/DatePicker.vue';
import HabitItem from '../components/HabitItem.vue';
import { useHabitsStore } from '../store/habits';
import { useHabitsStateStore } from '../store/habitsState';

const props = defineProps({
  date: {
    type: String,
    required: true
  }
});

const router = useRouter();
const habitsStore = useHabitsStore();
const habitsStateStore = useHabitsStateStore();

habitsStateStore.selectedDate = props.date;

watch(
  router.currentRoute,
  () => {
    if (habitsStore.habits.length > 0) {
      habitsStateStore.addHabitsState(habitsStore.habits);
    }
  },
  { immediate: true }
);

const habit = ref('');

const addHabit = () => {
  if (habit.value) {
    habitsStore.addHabit(habit.value);
    habit.value = '';
  }
};
</script>

<template>
  <main>
    <DatePicker />
    <label for="habit"></label>
    <input type="text" id="habit" v-model="habit" />
    <button type="button" @click="addHabit">Add</button>
    <div>
      <div v-for="habit in habitsStore.habits" :key="habit.id">
        <HabitItem
          :habit="habit"
          @toggle-completed="habitsStateStore.toggleCompletedState(habit.id)"
        />
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
