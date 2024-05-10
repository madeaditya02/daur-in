<script setup>
definePageMeta({
  layout: 'dashboard',
  middleware: ['auth', 'admin']
})
const loggedUser = useState('loggedUser')
console.log(loggedUser.value);
</script>
<template>
  <div class="p-5 sm:p-8">
    <h1 class="text-5xl font-semibold">Selamat Datang, {{ loggedUser.name }}</h1>
  </div>
</template>