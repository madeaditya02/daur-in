<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
const openNavbar = ref(false);
const position = ref(0);
window.addEventListener('scroll', (event) => {
  position.value = window.scrollY;
})
</script>
<template>
  <nav
    class="fixed top-0 w-full left-0 right-0 bg-white px-6 md:px-12 lg:px-[120px] py-3 flex justify-between items-center flex-wrap lg:flex-nowrap"
    :class="openNavbar || position > 0 ? 'shadow-xl' :
      ''">
    <NuxtLink to="/">
      <img src="/img/Logo.png" alt="" />
    </NuxtLink>
    <button class="px-3 py-2 lg:hidden" @click="openNavbar = !openNavbar">
      <FontAwesomeIcon :icon="faBars" class="text-2xl" />
    </button>
    <div class="lg:items-center gap-x-10 gap-y-6 w-full lg:w-auto flex-col lg:flex-row my-5 lg:my-0"
      :class="openNavbar ? 'flex' : 'lg:flex hidden'">
      <NuxtLink to="/" class="text-primary">Beranda</NuxtLink>
      <NuxtLink to="/auth" class="text-dark-2">Aplikasi</NuxtLink>
      <NuxtLink to="#about" class="text-dark-2">Tentang Kami</NuxtLink>
      <!-- <NuxtLink to="#contact" class="text-dark-2">Kontak Kami</NuxtLink> -->
    </div>
    <div class="items-center gap-4 w-full lg:w-auto" :class="openNavbar ? 'flex' : 'lg:flex hidden'">
      <NuxtLink to="/auth/register" class="px-4 py-2 rounded bg-primary text-white">Daftar</NuxtLink>
      <NuxtLink to="/auth" class="px-4 py-2 rounded border border-primary text-primary">Masuk</NuxtLink>
    </div>
  </nav>
</template>