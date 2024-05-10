<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { object, string } from 'yup'
definePageMeta({
  layout: false
})
const form = ref()
const schema = object({
  email: string().required('Masukkan email terlebih dahulu'),
  password: string()
    .required('Masukkan password terlebih dahulu')
})
const state = reactive({
  email: undefined,
  password: undefined
})

async function onSubmit(event) {
  // Do something with event.data
  console.log(event.data)
  try {
    const res = await $fetch('https://daurin-api-production.up.railway.app/user/login', {
      method: 'POST',
      body: event.data
    })
    console.log(res);
    await $fetch('/api/auth', {
      method: 'POST',
      body: {
        token: res.refreshToken
      }
    })
    navigateTo('/')
  } catch (error) {
    if (error.data.message == "The credentials you provided doesn't match our records. Please try again") {
      form.value.setErrors([{
        path: 'email',
        message: error.data.message
      }])
    }
    console.log(error.data);
  }
}
</script>
<template>
  <div class="w-full min-h-screen bg-white-2 flex justify-center items-center">
    <div class="w-full max-w-[640px] h-screen md:h-auto bg-white px-6 sm:px-10 py-4 sm:py-6">
      <img src="/img/Logo.png" alt="" />
      <p class="mt-4 text-lg font-medium">
        Masuk ke DaurIn dan mulai menghasilkan cuan
      </p>
      <UForm :schema="schema" ref="form" :state="state" @submit="onSubmit" :validateOn="['submit']">
        <div class="mt-7">
          <UFormGroup name="email">
            <UInput type="email" v-model="state.email" placeholder="Email" size="xl"
              :ui="{ padding: { xl: 'py-2 px-4 sm:py-3' } }" />
          </UFormGroup>
        </div>
        <div class="mt-7">
          <UFormGroup name="password">
            <UInput type="password" v-model="state.password" placeholder="Password" size="xl"
              :ui="{ padding: { xl: 'py-2 px-4 sm:py-3' } }" />
          </UFormGroup>
        </div>
        <!-- <input
            type="email"
            class="block w-full py-2 px-4 sm:py-3 mt-7 rounded-lg border focus:border-primary focus:outline-none transition duration-200"
            placeholder="Masukkan Email"
          /> -->
        <!-- <input
            type="password"
            class="block w-full py-2 px-4 sm:py-3 mt-7 rounded-lg border focus:border-primary focus:outline-none transition duration-200"
            placeholder="Masukkan Password"
            v-model="state.password"
          /> -->
        <button
          class="block w-full py-2 px-4 sm:py-3 mt-7 rounded-lg border transition duration-200 bg-primary text-white text-center hover:bg-primary-dark">
          Masuk
        </button>
      </UForm>
      <div class="mt-6 text-center font-medium text-gray-400">
        <p>Belum Punya Akun? <NuxtLink to="/auth/register" class="text-blue-500">Daftar</NuxtLink>
        </p>
      </div>
      <div class="flex items-center justify-center gap-4 my-6">
        <div class="flex-grow border-t border-black"></div>
        <span>atau</span>
        <div class="flex-grow border-t border-black"></div>
      </div>
      <button class="block w-full py-2 px-4 sm:py-3 rounded-lg border border-black transition duration-200 text-center">
        <FontAwesomeIcon :icon="faGoogle" class=" mr-1" />
        Lanjutkan dengan Google
      </button>
    </div>
  </div>
</template>