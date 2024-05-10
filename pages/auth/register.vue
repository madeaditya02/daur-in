<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faUsers, faShop, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { object, string } from 'yup'
import Swal from "sweetalert2";
definePageMeta({
  layout: false
})

const step = ref(1);

// step 1
const role = ref(null);

// step 2
const schema = object({
  email: string().email('Email tidak valid').required('Masukkan email terlebih dahulu'),
  name: string().min(2, 'Nama minimal 2 karakter').required('Masukkan nama terlebih dahulu'),
  password: string().min(8, 'Password minimal 8 karakter')
    .required('Masukkan password terlebih dahulu')
})
const state = reactive({
  email: undefined,
  name: undefined,
  password: undefined
})
async function onSubmit(event) {
  // Do something with event.data
  step.value = 3
  console.log(event.data)
}

// step 2
const schema2 = object({
  alamat: string().required('Masukkan alamat terlebih dahulu'),
  province: object().required('Masukkan provinsi terlebih dahulu'),
  regency: object().required('Masukkan kota/kabupaten terlebih dahulu')
})
const { pending, data: provinces } = await useFetch('https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json')
const regency = ref([]);
const state2 = reactive({
  alamat: undefined,
  province: undefined,
  regency: undefined
})
watch(() => state2.province, async prov => {
  regency.value = await $fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${prov.id}.json`)
}, { deep: true })
async function onSubmit2(event) {
  console.log({
    role: role.value,
    ...state,
    address: state2.alamat,
    province: state2.province.name,
    city: state2.regency.name
  })
  try {
    const res = await $fetch('https://daurin-api-production.up.railway.app/user/register', {
      method: 'POST',
      body: {
        role: role.value,
        ...state,
        address: state2.alamat,
        province: state2.province.name,
        city: state2.regency.name
      }
    })
    console.log(res);
    if (res.message == 'User successfully created') {
      Swal.fire({
        title: "Pendaftaran berhasil",
        text: role.value == 'Customer' ? "Silahkan mulai gunakan DaurIn" : '"Silahkan aktivasi akun anda terlebih dahulu"',
        icon: "success",
        confirmButtonColor: '#14B8A6'
      }).then(() => navigateTo(role.value == 'Customer' ? '/' : '/dashboard'));
    }
  } catch (error) {
    console.log(error.data);
  }
}
</script>
<template>
  <div class="w-full min-h-screen bg-white-2 flex justify-center items-center">
    <div class="px-6 md:px-12 lg:px-48" v-if="step == 1">
      <h2 class="text-center font-semibold text-3xl">Daftar Sebagai Apa?</h2>
      <div class="mt-8 grid grid-cols-2 gap-4 sm:gap-10">
        <div class="bg-white rounded-lg p-4 sm:p-6 cursor-pointer hover:shadow-lg"
          :class="role == 'Customer' ? 'border border-primary' : ''" @click="role = 'Customer'">
          <div class="text-center">
            <FontAwesomeIcon :icon="faUsers" class="text-3xl sm:text-5xl text-primary" />
          </div>
          <h3 class="text-xl sm:text-4xl font-semibold mt-3 sm:mt-6 text-center">
            Pelanggan
          </h3>
          <div class="mt-2 text-center sm:hidden">
            <button>
              <FontAwesomeIcon :icon="faCircleInfo" class="text-xl text-gray-400" />
            </button>
          </div>
          <p class="hidden sm:block mt-4">
            Pelanggan menyetorkan sampah melalui aplikasi dan mendapatkan uang
            dari agen
          </p>
        </div>
        <div class="bg-white rounded-lg p-4 sm:p-6 cursor-pointer hover:shadow-lg"
          :class="role == 'Agent' ? 'border border-primary' : ''" @click="role = 'Agent'">
          <div class="text-center">
            <FontAwesomeIcon :icon="faShop" class="text-4xl sm:text-5xl text-primary" />
          </div>
          <h3 class="text-xl sm:text-3xl font-semibold mt-3 sm:mt-6 text-center">
            Agen
          </h3>
          <div class="mt-2 text-center sm:hidden">
            <button>
              <FontAwesomeIcon :icon="faCircleInfo" class="text-xl text-gray-400" />
            </button>
          </div>
          <p class="hidden sm:block mt-4">
            Agen menerima sampah yang disetorkan pelanggan dan membayar kepada
            pelanggan lalu mengolah sampah tersebut
          </p>
        </div>
      </div>
      <button
        class="px-4 py-2 block w-[180px] font-medium text-lg mt-6 mx-auto rounded-md disabled:bg-emerald-400 disabled:cursor-not-allowed bg-primary text-white"
        :disabled="!role" @click="step = 2">
        Lanjut
      </button>
    </div>
    <div v-if="step == 2" class="w-full max-w-[640px] h-screen md:h-auto bg-white px-6 sm:px-10 py-4 sm:py-6">
      <img src="/img/Logo.png" alt="" />
      <p class="mt-4 text-lg font-medium">
        Mulai daftarkan dirimu di DaurIn
      </p>
      <UForm :schema="schema" :state="state" @submit="onSubmit" :validateOn="['submit']">
        <div class="mt-7">
          <UFormGroup name="email">
            <UInput type="email" v-model="state.email" placeholder="Email" size="xl"
              :ui="{ padding: { xl: 'py-2 px-4 sm:py-3' } }" />
          </UFormGroup>
        </div>
        <div class="mt-7">
          <UFormGroup name="name">
            <UInput v-model="state.name" placeholder="Nama" size="xl" :ui="{ padding: { xl: 'py-2 px-4 sm:py-3' } }" />
          </UFormGroup>
        </div>
        <div class="mt-7">
          <UFormGroup name="password">
            <UInput type="password" v-model="state.password" placeholder="Password" size="xl"
              :ui="{ padding: { xl: 'py-2 px-4 sm:py-3' } }" />
          </UFormGroup>
        </div>
        <button
          class="block w-full py-2 px-4 sm:py-3 mt-7 rounded-lg border transition duration-200 bg-primary text-white text-center hover:bg-primary-dark">
          Lanjut
        </button>
      </UForm>
      <div class="mt-6 text-center font-medium text-gray-400">
        <p>Sudah Punya Akun? <NuxtLink to="/auth" class="text-blue-500">Masuk</NuxtLink>
        </p>
      </div>
    </div>
    <div v-if="step == 3" class="w-full max-w-[640px] h-screen md:h-auto bg-white px-6 sm:px-10 py-4 sm:py-6">
      <img src="/img/Logo.png" alt="" />
      <p class="mt-4 text-lg font-medium">
        Lanjut lengkapi data dirimu
      </p>
      <UForm :schema="schema2" :state="state2" @submit="onSubmit2" :validateOn="['submit']">
        <div class="mt-7">
          <UFormGroup name="alamat">
            <UInput type="text" v-model="state2.alamat" @change="console.log(state2.province)"
              placeholder="Alamat Lengkap" size="xl" :ui="{ padding: { xl: 'py-2 px-4 sm:py-3' } }" />
          </UFormGroup>
        </div>
        <div class="mt-7">
          <UFormGroup name="province">
            <!-- <UInputMenu v-model="state2.province" :options="provinces" by="id" option-attribute="name"
              :search-attributes="['name']" placeholder="Provinsi" size="xl"
              :ui="{ padding: { xl: 'py-2 px-4 sm:py-3' } }" /> -->
            <USelectMenu searchable searchable-placeholder="Cari Provinsi" size="xl"
              :ui="{ padding: { xl: 'py-2 px-4 sm:py-3' } }" placeholder="Pilih provinsi" option-attribute="name"
              :options="provinces" v-model="state2.province" />
          </UFormGroup>
        </div>
        <div class="mt-7">
          <UFormGroup name="regency">
            <USelectMenu searchable searchable-placeholder="Cari Kabupaten/Kota" size="xl"
              :disabled="regency.length == 0" :ui="{ padding: { xl: 'py-2 px-4 sm:py-3' } }"
              placeholder="Pilih Kabupaten/Kota" option-attribute="name" :options="regency" v-model="state2.regency" />
          </UFormGroup>
        </div>
        <button
          class="block w-full py-2 px-4 sm:py-3 mt-7 rounded-lg border transition duration-200 bg-primary text-white text-center hover:bg-primary-dark">
          Daftar
        </button>
      </UForm>
      <div class="mt-6 text-center font-medium text-gray-400">
        <p>Sudah Punya Akun? <NuxtLink to="/auth" class="text-blue-500">Masuk</NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>