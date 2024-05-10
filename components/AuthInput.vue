<template>
  <div>
    <input
      :type="type"
      class="block w-full py-2 px-4 sm:py-3 mt-7 rounded-lg border focus:border-primary focus:outline-none transition duration-200"
      :class="formEl?.getErrors(id).length ? 'border-red-600' : 'border-dark-2'" :placeholder="placeholder"
      @input="event => $emit('update:modelValue', event.target.value)"
    />
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