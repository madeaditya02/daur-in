<script setup>
const profileForm = reactive({
  name: '',
  username: '',
  email: '',
  alamat: ''
})
definePageMeta({
  layout: 'default'
})
</script>
<template>
  <div>
    <div class="px-6 md:px-10 lg:px-36 py-4 md:py-8">
      <div class="flex flex-col md:flex-row gap-x-20 gap-y-12">
        <div class="w-full md:w-1/2">
          <h2 class="text-2xl font-semibold mb-3">Profil</h2>
          <hr />
          <div class="mt-4 mb-3">
            <label for="nama">Nama</label>
            <input
              type="text"
              id="nama"
              class="mt-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-green-500 block w-full p-2.5"
              placeholder="Masukkan nama"
              required
            />
          </div>
          <div class="mt-4 mb-3">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              class="mt-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-green-500 block w-full p-2.5"
              placeholder="Masukkan email"
              required
            />
          </div>
          <div class="mt-4 mb-3">
            <label for="nama">Alamat</label>
            <textarea
              type="text"
              id="nama"
              class="mt-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-green-500 block w-full p-2.5"
              placeholder="Masukkan alamat"
              required
            ></textarea>
          </div>
          <button class="px-3 py-2 bg-primary rounded text-white">
            Simpan
          </button>
        </div>
        <div class="w-full md:w-1/2">
          <h2 class="text-2xl font-semibold mb-3">Ubah Password</h2>
          <hr />
          <div class="mt-4 mb-3">
            <label for="old_password">Password Lama</label>
            <input
              type="password"
              id="old_password"
              class="mt-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-green-500 block w-full p-2.5"
              placeholder="Masukkan password lama"
              required
            />
          </div>
          <div class="mt-4 mb-3">
            <label for="new_password">Password Baru</label>
            <input
              type="password"
              id="new_password"
              class="mt-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-green-500 block w-full p-2.5"
              placeholder="Masukkan password baru"
              required
            />
          </div>
          <div class="mt-4 mb-3">
            <label for="confirmation_password">Konfirmasi Password</label>
            <input
              type="password"
              id="confirmation_password"
              class="mt-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-green-500 block w-full p-2.5"
              placeholder="Masukkan kembali password"
              required
            />
          </div>
          <button class="px-3 py-2 bg-primary rounded text-white">
            Ubah Password
          </button>
        </div>
      </div>
    </div>
    <div class="px-6 md:px-10 lg:px-36 py-4 md:pt-8 md:pb-12 mt-4 md:mt-0">
      <h2 class="text-2xl font-semibold mb-3">Hapus Akun</h2>
      <hr />
      <p class="mt-4">
        Jika anda menghapus akun anda, seluruh transaksi anda tidak bisa
        dikembalikan lagi. Apakah anda yakin?
      </p>
      <button
        class="px-3 py-2 bg-red-200 rounded text-red-900 mt-3"
        onclick="alert('AKUN ANDA TERHAPUS')"
      >
        Iya, Hapus Akun Saya
      </button>
    </div>
  </div>
</template>