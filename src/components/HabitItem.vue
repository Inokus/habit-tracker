<script setup>
import { useHabitsStateStore } from '../store/habitsState';

defineProps({
  habit: {
    type: Object,
    required: true
  }
});

const habitsStateStore = useHabitsStateStore();

defineEmits([
  'toggle-completed',
  'edit-habit',
  'update-habit',
  'resume-habit',
  'stop-habit',
  'remove-habit'
]);
</script>

<template>
  <!-- eslint-disable vuejs-accessibility/form-control-has-label -->
  <input
    type="text"
    v-if="habit.isEditing"
    :value="habit.name"
    @input="$emit('update-habit', $event.target.value)"
  />
  <span v-else>{{ habit.name }}</span>
  <input
    type="checkbox"
    v-if="habitsStateStore.habitsState[habitsStateStore.selectedDate]"
    :checked="habitsStateStore.habitsState[habitsStateStore.selectedDate][habit.id]"
    @change="$emit('toggle-completed')"
  />
  <button type="button" v-if="habit.isEditing" @click="$emit('edit-habit')">Save</button>
  <button type="button" v-else @click="$emit('edit-habit')">Edit</button>
  <button type="button" v-if="habit.stoppedAt" @click="$emit('resume-habit')">Resume</button>
  <button type="button" v-else @click="$emit('stop-habit')">Stop</button>
  <button type="button" @click="$emit('remove-habit')">Delete</button>
</template>
