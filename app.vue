<script setup>
const logged = ref(true);
const user = ref({
  name: '',
  role: 'Customer'
});
const layout = user.value ? (user.value.role == 'Agency' ? 'dashboard' : 'default') : 'guest';
</script>
<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
