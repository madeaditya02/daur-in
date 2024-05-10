<script setup>
// const userSession = await useFetch('/api/user');
// const logged = ref(false);
definePageMeta({
  layout: false
})
const loggedUser = useState('loggedUser')
console.log(loggedUser.value);
setPageLayout(loggedUser.value ? 'default' : 'guest');
// console.log(layout);
</script>
<template>
  <Home v-if="loggedUser" />
  <LandingPage v-else />
</template>