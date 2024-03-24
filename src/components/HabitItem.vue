<script setup>
// eslint-disable-next-line import/no-extraneous-dependencies
import { Icon } from '@iconify/vue';
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
  <div class="habit" v-if="habitsStateStore.habitsState[habitsStateStore.formattedSelectedDate]">
    <div class="status">
      <button
        type="button"
        class="success"
        title="Completed"
        aria-label="mark as not completed"
        v-if="habitsStateStore.habitsState[habitsStateStore.formattedSelectedDate][habit.id]"
        @click="$emit('toggle-completed')"
      >
        <Icon icon="material-symbols:check-box-outline-rounded" />
      </button>
      <button
        type="button"
        class="success-hover"
        title="Not completed"
        aria-label="mark as completed"
        v-else
        @click="$emit('toggle-completed')"
      >
        <Icon icon="material-symbols:check-box-outline-blank" />
      </button>
    </div>

    <div class="name">
      <input
        type="text"
        name="habit-name"
        aria-label="habit name"
        v-if="habit.isEditing"
        :value="habit.name"
        @input="$emit('update-habit', $event.target.value)"
      />
      <p v-else>{{ habit.name }}</p>
    </div>

    <div class="options">
      <button
        type="button"
        class="edit-hover"
        title="Edit habit"
        aria-label="edit habit"
        @click="$emit('edit-habit')"
      >
        <Icon icon="material-symbols:save-as-rounded" v-if="habit.isEditing" />
        <Icon icon="material-symbols:edit-rounded" v-else />
      </button>
      <button
        type="button"
        class="warning-hover"
        title="Resume habit"
        aria-label="resume habit"
        v-if="habit.stoppedAt"
        @click="$emit('resume-habit')"
      >
        <Icon icon="material-symbols:resume-rounded" />
      </button>
      <button
        type="button"
        class="warning-hover"
        title="Stop habit"
        aria-label="stop habit"
        v-else
        @click="$emit('stop-habit')"
      >
        <Icon icon="material-symbols:stop-circle-rounded" />
      </button>
      <button
        type="button"
        class="danger-hover"
        title="Remove habit"
        aria-label="remove habit"
        @click="$emit('remove-habit')"
      >
        <Icon icon="material-symbols:delete-forever-rounded" />
      </button>
    </div>
  </div>
</template>

<style scoped>
button {
  width: 2rem;
  height: 2rem;
  padding: 0;
  border: none;
  background-color: inherit;
  font-size: 1.5rem;
  line-height: 0;
  cursor: pointer;
}

button:hover {
  transform: scale(1.2);
}

.habit {
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: var(--primary-color);
  border-radius: 6px;
}

.habit:hover {
  outline: 1px solid var(--base-text-color);
}

.info {
  display: flex;
  align-items: center;
  column-gap: 0.5rem;
}

.name {
  width: 100%;
  overflow: hidden;
}

.name > input[type='text'] {
  border-radius: 3px;
  background-color: var(--secondary-color);
}

.name > input[type='text'],
.name > p {
  width: 100%;
  text-align: center;
  display: inline-block;
  word-wrap: break-word;
}

.options {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
