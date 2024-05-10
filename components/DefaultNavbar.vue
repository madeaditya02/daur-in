<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons';
const { clear } = useUserSession();
const items = [
  [{
    label: 'ben@example.com',
    slot: 'account',
    disabled: true
  }], [
    {
      label: 'Profil',
      icon: 'i-heroicons-user'
    },], [{
      label: 'Keluar',
      icon: 'i-heroicons-arrow-left-on-rectangle',
      click() {
        clear()
        navigateTo('/auth')
      }
    }]
]
const position = ref(0);
window.addEventListener('scroll', (event) => {
  position.value = window.scrollY;
})
</script>
<template>
  <nav
    class="px-5 md:px-12 lg:px-[120px] py-3 flex justify-between items-center fixed top-0 left-0 right-0 bg-white z-20 transition duration-150"
    :class="position > 0 ? 'shadow-xl' : ''">
    <NuxtLink to="/">
      <img src="/img/Logo.png" alt="" class="w-[70%] md:w-auto" />
    </NuxtLink>
    <div class="flex items-center gap-6">
      <!-- <a href="#">
        <FontAwesomeIcon :icon="faBell" class="text-primary text-2xl md:text-3xl"></FontAwesomeIcon>
      </a> -->
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
  </nav>
</template>