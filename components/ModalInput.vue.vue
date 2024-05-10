<template>
  <div class="mb-4">
    <label :for="id">{{label}}</label>
    <input :type="type" :name="id" :id="id"
      class="block w-full p-2.5 rounded-lg border focus:outline-none"
      :class="formEl?.getErrors(id).length ? 'border-red-600' : 'border-dark-2'" :placeholder="placeholder"
      @input="event => $emit('update:modelValue', event.target.value)">
    <div class="mt-1 text-red-600" v-if="formEl?.getErrors(id).length">{{
      formEl?.getErrors(id)[0].message }}</div>
  </div>
</template>

<script setup>
defineProps(['formEL', 'label', 'id', 'type', 'placeholder'])
defineEmits(['update:modelValue'])
</script>

<style>

</style>