<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faTrashCanArrowUp, faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
</script>
<template>
  <div
    class="px-6 sm:px-8 lg:px-24 mx-4 mt-8 bg-primary rounded-2xl text-white py-5 lg:py-12 flex flex-col lg:flex-row justify-between items-center gap-y-5">
    <div class="lg:w-1/2">
      <h1 class="text-3xl lg:text-5xl font-semibold leading-normal">
        Selamat datang di DaurIn! John Doe
      </h1>
      <NuxtLink to="/order" class="mt-5 inline-block bg-white text-primary px-4 py-2 rounded-lg">Setor Sampah</NuxtLink>
    </div>
    <div class="w-full lg:w-1/4 grid grid-cols-3 lg:flex gap-4 flex-wrap">
      <NuxtLink to="/order"
        class="lg:w-32 lg:h-32 p-4 lg:p-0 flex flex-col justify-center items-center bg-white rounded-lg">
        <FontAwesomeIcon :icon="faTrashCanArrowUp" class="text-xl lg:text-5xl text-primary" />
        <div class="mt-2 text-center text-black text-sm lg:text-base">Setor <span class="hidden lg:inline">Sampah</span>
        </div>
      </NuxtLink>
      <NuxtLink to="/profile"
        class="lg:w-32 lg:h-32 p-4 lg:p-0 flex flex-col justify-center items-center bg-white rounded-lg">
        <FontAwesomeIcon :icon="faUser" class="text-xl lg:text-5xl text-primary" />
        <div class="mt-2 text-center text-black text-sm lg:text-base">Profil</div>
      </NuxtLink>
      <NuxtLink to="/history"
        class="lg:w-32 lg:h-32 p-4 lg:p-0 flex flex-col justify-center items-center bg-white rounded-lg">
        <FontAwesomeIcon :icon="faClockRotateLeft" class="text-xl lg:text-5xl text-primary" />
        <div class="mt-2 text-center text-black text-sm lg:text-base">Riwayat</div>
      </NuxtLink>
    </div>
  </div>

  <div class="px-8 lg:px-32 xl:px-60 mx-4 mt-8 bg-white-2 rounded-2xl py-6 lg:py-12">
    <div class="">
      <h1 class="text-3xl lg:text-5xl font-semibold leading-normal">
        Merasa kurang dengan DaurIn? Kirim pesan ke kami!
      </h1>
      <NuxtLink to="" class="mt-5 inline-block bg-black text-white px-4 py-2 rounded-lg">Kirim Feedback</NuxtLink>
    </div>
  </div>
</template>