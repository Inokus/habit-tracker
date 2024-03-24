<script setup>
import { ref } from 'vue';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Icon } from '@iconify/vue';
import { useHabitsStore } from '../store/habits';

const habitsStore = useHabitsStore();

const myDialog = ref(null);
const newHabit = ref('');

const closeDialog = () => {
  newHabit.value = '';
  myDialog.value.close();
};

const createHabit = () => {
  if (newHabit.value) {
    habitsStore.addHabit(newHabit.value);
    closeDialog();
  }
};
</script>

<template>
  <!-- eslint-disable vuejs-accessibility/no-autofocus -->
  <div class="add-habit">
    <button
      type="button"
      title="Add new habit"
      aria-label="add new habit"
      @click="myDialog.showModal()"
    >
      <Icon icon="material-symbols:add-task-rounded" />
    </button>
    <dialog ref="myDialog">
      <div class="dialog-content">
        <button
          type="button"
          class="danger-hover"
          title="Close"
          aria-label="close"
          @click="closeDialog"
        >
          <Icon icon="material-symbols:close-rounded" />
        </button>
        <input
          type="text"
          name="new-habit"
          placeholder="Enter new habit"
          aria-label="new habit"
          v-model="newHabit"
          autofocus
        />
        <button
          type="button"
          class="success-hover"
          title="Add"
          aria-label="add"
          @click="createHabit"
        >
          <Icon icon="material-symbols:add-circle-rounded" />
        </button>
      </div>
    </dialog>
  </div>
</template>

<style scoped>
button {
  padding: 0;
  background-color: inherit;
  border: none;
  font-size: 2rem;
  line-height: 0;
  cursor: pointer;
}

.add-habit > button {
  width: 100%;
  padding: 0.5rem 1rem;
  background-color: var(--primary-color);
  border-radius: 6px;
}

.add-habit > button:hover {
  outline: 1px solid var(--base-text-color);
  color: var(--success-color);
}

dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  padding: 3rem;
  border: none;
  border-radius: 6px;
}

dialog::backdrop {
  backdrop-filter: blur(1px);
}

.dialog-content {
  display: flex;
  justify-content: center;
  column-gap: 1rem;
}

.dialog-content button:first-child {
  position: absolute;
  top: 0;
  right: 0;
}

.dialog-content input[type='text'] {
  border-radius: 3px;
  background-color: var(--secondary-color);
  text-align: center;
}
</style>
