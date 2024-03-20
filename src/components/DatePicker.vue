<script setup>
import { useRouter } from 'vue-router';
import { useHabitsStateStore } from '../store/habitsState';

const router = useRouter();
const habitsStateStore = useHabitsStateStore();

const handleDateChange = () => {
  router.push({ path: `/day/${habitsStateStore.selectedDate}` });
};
</script>

<template>
  <label for="date">Date</label>
  <input type="date" id="date" v-model="habitsStateStore.selectedDate" @change="handleDateChange" />
</template>
