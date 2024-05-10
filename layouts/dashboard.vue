<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faTachometerAlt, faShoppingBasket, faUserPen, faBars, faBoxesStacked } from "@fortawesome/free-solid-svg-icons";
useHead({
  bodyAttrs: {
    class: 'bg-gray-100'
  }
})
const items = [
  [{
    label: 'ben@example.com',
    slot: 'account',
    disabled: true
  }], [
    {
      label: 'Pengaturan',
      icon: 'i-heroicons-cog-8-tooth'
    },
    {
      label: 'Profil',
      icon: 'i-heroicons-user'
    },], [{
      label: 'Keluar',
      icon: 'i-heroicons-arrow-left-on-rectangle'
    }]
]
const openSidebar = ref(false);
</script>
<template>
  <div class="">
    <div class="sidebar w-[250px] sm:w-[300px] h-screen bg-primary text-white fixed left-0 top-0 transition-all z-50"
      :class="!openSidebar ? '-ml-[300px] sm:ml-0' : 'ml-0'">
      <NuxtLink to="/" class="block px-12 py-5">
        <img src="/img/logo-white.png" alt="" class="w-[80%] mx-auto">
      </NuxtLink>
      <hr class="mx-4 block opacity-50">
      <div class="mt-4 text-lg">
        <NuxtLink to="/dashboard" class="block px-5 py-4 hover:bg-primary-dark">
          <FontAwesomeIcon :icon="faTachometerAlt" class="mr-2.5" />
          Dashboard
        </NuxtLink>
        <NuxtLink to="/dashboard/orders" class="block px-5 py-4 hover:bg-primary-dark">
          <FontAwesomeIcon :icon="faShoppingBasket" class="mr-2.5" />
          Pesanan
        </NuxtLink>
        <NuxtLink to="/dashboard/items" class="block px-5 py-4 hover:bg-primary-dark">
          <FontAwesomeIcon :icon="faBoxesStacked" class="mr-2.5" />
          Barang
        </NuxtLink>
      </div>
    </div>
    <div class="bg-[rgba(0,0,0,0.5)] fixed inset-0 z-40" v-if="openSidebar" @click="openSidebar = false">
    </div>
    <div class="md:pl-[300px]">
      <div class="bg-white px-12 py-6 shadow-md w-full flex justify-between items-center">
        <button @click="openSidebar = true" class="md:hidden">
          <FontAwesomeIcon :icon="faBars" class="text-xl" />
        </button>
        <h1 class="font-semibold text-xl hidden md:block">Dashboard</h1>
        <UDropdown :items="items" :ui="{ item: { disabled: 'cursor-text select-text', size: 'text-base' } }"
          :popper="{ placement: 'bottom-start' }">
          <UAvatar src="https://source.unsplash.com/60x60" size="md" />

          <template #account="{ item }">
            <div class="text-left">
              <p>
                Signed in as
              </p>
              <p class="truncate font-medium text-gray-900">
                {{ item.label }}
              </p>
            </div>
          </template>

          <template #item="{ item }">

            <span class="truncate">{{ item.label }}</span>

            <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4 text-gray-400 ms-auto" />
          </template>
        </UDropdown>
      </div>
      <slot />
    </div>
  </div>
</template>
