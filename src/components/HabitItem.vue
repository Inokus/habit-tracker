<script setup>
import { useHabitsStateStore } from '../store/habitsState';

defineProps({
  habit: {
    type: Object,
    required: true
  }
});

const habitsStateStore = useHabitsStateStore();

defineEmits(['toggle-completed']);
</script>

<template>
  <!-- eslint-disable vuejs-accessibility/form-control-has-label -->
  {{ habit.name }}
  <input
    type="checkbox"
    v-if="habitsStateStore.habitsState[habitsStateStore.selectedDate]"
    :checked="habitsStateStore.habitsState[habitsStateStore.selectedDate][habit.id]"
    @change="$emit('toggle-completed')"
  />
</template>
