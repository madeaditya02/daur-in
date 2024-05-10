<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faArrowRightArrowLeft, faMapPin, faShapes, faClockRotateLeft, faSeedling, faRecycle, faHandHoldingHeart, faDollarSign, } from "@fortawesome/free-solid-svg-icons";
import { faInstagram, faTiktok, faFacebook, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
useHead({
  htmlAttrs: {
    class: 'scroll-smooth'
  }
})
</script>
<template>
  <div
    class="px-6 md:px-12 lg:px-24 mx-4 mt-8 bg-primary rounded-2xl text-white py-12 flex flex-col lg:flex-row justify-between items-center gap-y-8">
    <div class="">
      <h1 class="text-3xl lg:text-5xl font-bold leading-tight">
        Solusi sampah usaha dan rumah tangga anda
      </h1>
      <NuxtLink to="/auth" class="mt-5 inline-block bg-white text-primary px-4 py-2 rounded-lg">Coba Sekarang</NuxtLink>
    </div>
    <img src="/img/hero-img.png" alt="" class="" />
  </div>

  <div class="py-6 md:py-12 px-5 sm:px-6 md:px-10 lg:px-20 scroll-pt-20" id="about">
    <h2 class="font-semibold text-2xl lg:text-[32px] text-center text-primary-dark max-w-72 mx-auto">
      Dengan DaurIn semua jadi mudah
    </h2>
    <div class="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
      <div class="px-4 py-6 rounded-lg shadow">
        <FontAwesomeIcon :icon="faArrowRightArrowLeft" class="text-3xl" />
        <h3 class="mt-3 text-2xl font-semibold text-dark">Pilah Sampah</h3>
        <p class="mt-2 text-dark-2">
          Proses pemilahan sampah yang sudah disesuaikan dengan agen pengelola
          sampah di sekitar anda
        </p>
      </div>
      <div class="px-4 py-6 rounded-lg shadow">
        <FontAwesomeIcon :icon="faMapPin" class="text-3xl" />
        <h3 class="mt-3 text-2xl font-semibold text-dark">Pilih Lokasi</h3>
        <p class="mt-2 text-dark-2">
          Pilih lokasi pengepul sampah yang paling dekat dengan anda
        </p>
      </div>
      <div class="px-4 py-6 rounded-lg shadow">
        <FontAwesomeIcon :icon="faShapes" class="text-3xl" />
        <h3 class="mt-3 text-2xl font-semibold text-dark">Ragam Jenis</h3>
        <p class="mt-2 text-dark-2">
          Mulai dari sampah rumah tangga, bahkan sampai sampah usaha kios
          anda, ada di <span class="text-primary">DaurIn</span>
        </p>
      </div>
      <div class="px-4 py-6 rounded-lg shadow">
        <FontAwesomeIcon :icon="faClockRotateLeft" class="text-3xl" />
        <h3 class="mt-3 text-2xl font-semibold text-dark">Lacak Riwayat</h3>
        <p class="mt-2 text-dark-2">
          Lihat riwayat sampah yang sudah anda setorkan
        </p>
      </div>
    </div>
  </div>

  <div class="py-6 md:py-12 px-5 sm:px-10 lg:px-20 mx-4 bg-primary rounded-2xl">
    <h2 class="font-semibold text-[32px] text-center text-white">
      <span class="block text-center">Langkah Mudah</span>Setor Sampahmu di
      DaurIn
    </h2>
    <div class="flex flex-col gap-14 mt-10">
      <div class="rounded-full w-full max-w-[640px] p-3 font-semibold text-lg bg-white text-primary text-center">
        1. Buat setoran sampah di aplikasi DaurIn
      </div>
      <div
        class="rounded-full w-full max-w-[640px] p-3 font-semibold text-lg bg-white text-primary text-center self-end">
        2. Pilih apakah sampah diambil atau diantar
      </div>
      <div class="rounded-full w-full max-w-[640px] p-3 font-semibold text-lg bg-white text-primary text-center">
        3. Sampah diambil agen atau diantar pengguna
      </div>
      <div
        class="rounded-full w-full max-w-[640px] p-3 font-semibold text-lg bg-white text-primary text-center self-end">
        4. Agen mengecek dan membayar sampah anda
      </div>
    </div>
  </div>

  <div class="px-5 sm:px-10 md:px-20 py-12">
    <h2 class="font-semibold text-primary text-[32px] text-center">
      Misi & Tujuan Kami
    </h2>
    <div class="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="px-6 py-8 rounded-2xl bg-primary text-white">
        <div class="text-center">
          <FontAwesomeIcon :icon="faSeedling" class="text-5xl" />
        </div>
        <h3 class="text-center text-2xl font-semibold mt-8 mb-4">
          Kelestarian Alam
        </h3>
        <p>
          Proses pemilahan sampah yang sudah disesuaikan dengan agen pengelola
          sampah di sekitar anda
        </p>
      </div>
      <div class="px-6 py-8 rounded-2xl bg-primary text-white">
        <div class="text-center">
          <FontAwesomeIcon :icon="faRecycle" class="text-5xl" />
        </div>
        <h3 class="text-center text-2xl font-semibold mt-8 mb-4">
          Wujudkan 3R
        </h3>
        <p>
          Proses pemilahan sampah yang sudah disesuaikan dengan agen pengelola
          sampah di sekitar anda
        </p>
      </div>
      <div class="px-6 py-8 rounded-2xl bg-primary text-white">
        <div class="text-center">
          <FontAwesomeIcon :icon="faHandHoldingHeart" class="text-5xl" />
        </div>
        <h3 class="text-center text-2xl font-semibold mt-8 mb-4">
          Kemanusiaan
        </h3>
        <p>
          Proses pemilahan sampah yang sudah disesuaikan dengan agen pengelola
          sampah di sekitar anda
        </p>
      </div>
      <div class="px-6 py-8 rounded-2xl bg-primary text-white">
        <div class="text-center">
          <FontAwesomeIcon :icon="faDollarSign" class="text-5xl" />
        </div>
        <h3 class="text-center text-2xl font-semibold mt-8 mb-4">
          Ekonomi UMKM
        </h3>
        <p>
          Proses pemilahan sampah yang sudah disesuaikan dengan agen pengelola
          sampah di sekitar anda
        </p>
      </div>
    </div>
  </div>

  <div
    class="px-6 sm:px-12 lg:px-32 py-6 mx-4 bg-primary text-white rounded-2xl flex flex-wrap justify-between gap-8 items-center">
    <img src="/img/Waste management-amico 1.png" alt="" class="" />
    <div class="md:w-1/2">
      <h1 class="text-4xl font-bold leading-normal">
        Ayo Gunakan DaurIn dan Setor Sampahmu Sekarang
      </h1>
      <p class="mt-5 text-lg">
        Demi lingkungan yang bersih dan perekonomian yang berkembang
      </p>
      <NuxtLink to="/auth" class="mt-6 inline-block bg-white text-primary px-4 py-2 rounded-lg">Coba Sekarang</NuxtLink>
    </div>
  </div>

  <footer class="text-white mt-8" id="contact">
    <div class="py-8 px-6 sm:px-12 lg:px-32 flex flex-wrap justify-between bg-primary-dark">
      <div>
        <NuxtLink to="/">
          <img src="/img/logo-white.png" alt="" />
        </NuxtLink>
      </div>
      <div class="flex gap-12 flex-wrap">
        <div>
          <h4 class="text-xl font-medium mb-4">Quick Links</h4>
          <NuxtLink to="/" class="mt-2 block">Beranda</NuxtLink>
          <NuxtLink to="/auth" class="mt-2 block">Aplikasi</NuxtLink>
          <NuxtLink to="#about" class="mt-2 block">Tentang Kami</NuxtLink>
          <!-- <NuxtLink to="#contact" class="mt-2 block">Kontak</NuxtLink> -->
        </div>
        <div>
          <h4 class="text-xl font-medium mb-4">Aplikasi</h4>
          <NuxtLink to="/auth/register" class="mt-2 block">Daftar</NuxtLink>
          <NuxtLink to="/auth" class="mt-2 block">Masuk</NuxtLink>
        </div>
        <div>
          <h4 class="text-xl font-medium mb-4">Sosial</h4>
          <div class="flex gap-6">
            <a href="">
              <FontAwesomeIcon :icon="faInstagram" class="text-xl" />
            </a>
            <a href="">
              <FontAwesomeIcon :icon="faFacebook" class="text-xl" />
            </a>
            <a href="">
              <FontAwesomeIcon :icon="faTiktok" class="text-xl" />
            </a>
            <a href="">
              <FontAwesomeIcon :icon="faWhatsapp" class="text-xl" />
            </a>
          </div>
        </div>
      </div>
      <!-- <div>
        <h4 class="text-xl font-medium mb-4">Langganan</h4>
        <div class="flex">
          <input type="text"
            class="rounded-l-lg bg-white text-primary px-3 py-2 focus:outline-none placeholder:text-primary-light"
            placeholder="example@gmail.com" />
          <button class="px-3 py-2 bg-primary text-white rounded-r-lg">
            Langganan
          </button>
        </div>
      </div> -->
    </div>
    <div class="py-4 text-center bg-[#0b534e]">Copyright &copy; 2024</div>
  </footer>
</template>