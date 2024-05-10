<template>
  <ClientOnly>
    <GuestNavbar />
  </ClientOnly>
  <div class="pt-16 scroll-smooth">
    <slot />
  </div>
</template>