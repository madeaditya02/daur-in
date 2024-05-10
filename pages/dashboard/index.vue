<script lang="ts" setup>
definePageMeta({
  layout: 'dashboard',
  middleware: ['auth']
})
const loggedUser = useState('loggedUser')
console.log(loggedUser.value);
</script>
<template>
  <div class="p-5 sm:p-8">
    <div class="flex"></div>
  </div>
</template>