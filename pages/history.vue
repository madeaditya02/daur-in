<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faPlus, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';
definePageMeta({
  layout: 'default'
})
const loggedUser = useState('loggedUser')
const { data: riwayat } = await useFetch('https://daurin-api-production.up.railway.app/order/customer/' + loggedUser.value.id, {
  headers: {
    "Authorization": "Bearer " + loggedUser.value.token
  }
})
console.log(riwayat);

const showDetailBarang = ref(false)
const detailBarang = ref([
  {
    item: 'Botol Plastik',
    amount: 2,
    itemUnit: 'kg',
    price: 20000
  },
  {
    item: 'Kaleng Bekas',
    amount: 1,
    itemUnit: 'kg',
    price: 10000
  }
])
function openDetailBarang() {
  showDetailBarang.value = true
}
</script>
<template>
  <div class="bg-gray-100 px-6 sm:px-10 md:px-20 lg:px-32 pt-5 md:pt-12 border-y">
    <div class="flex justify-between items-start flex-wrap gap-4">
      <h2 class="text-3xl font-semibold">Riwayat Pesanan</h2>
      <NuxtLink to="/order" class="px-4 py-2 rounded-md bg-primary text-white">
        <FontAwesomeIcon :icon="faPlus" class="mr-2" /> Setor Sampah
      </NuxtLink>
    </div>
    <div class="mt-8 flex gap-4 md:gap-10 overflow-x-auto">
      <a href="" class="pb-3 font-medium border-b-2 border-blue-500 text-blue-500">Semua</a>
      <a href="" class="pb-3 font-medium">Pending</a>
      <a href="" class="pb-3 font-medium">On Process</a>
      <a href="" class="pb-3 font-medium">Selesai</a>
    </div>
  </div>
  <div class="px-6 sm:px-10 md:px-20 lg:px-32 py-5 md:py-8">
    <div class="rounded-xl border bg-gray-50 px-5 md:px-8 py-3 md:py-5 mt-6 first:mt-0">
      <div class="flex justify-between items-center flex-wrap gap-y-4">
        <div>
          <div class="flex gap-3 md:gap-6 items-center">
            <h3 class="font-semibold text-xl md:text-2xl">Agen Madura Sejahtera</h3>
            <span class="px-2.5 py-1 rounded font-bold text-sm bg-yellow-100 text-yellow-800">Pending</span>
          </div>
          <div class="flex gap-x-10 gap-y-3 flex-wrap flex-col sm:flex-row mt-3 sm:mt-4 text-sm sm:text-base">
            <div class="font-medium">
              <FontAwesomeIcon :icon="faLocationDot" class="mr-2" /> Jalan
              Cendrawasih XVII
            </div>
            <div class="font-medium">
              <FontAwesomeIcon :icon="faPhone" class="mr-2" /> 08973891362
            </div>
          </div>
        </div>
        <div class="text-xl sm:text-2xl font-semibold pr-4">Rp. 30.000</div>
      </div>
      <div class="mt-4 flex gap-3 text-xs">
        <span class="px-3 py-1.5 rounded-full bg-primary/60 text-white">Botol Plastik</span>
        <span class="px-3 py-1.5 rounded-full bg-primary/60 text-white">Kaleng Bekas</span>
      </div>
      <button class="mt-4 px-3 py-1.5 text-sm sm:px-4 sm:py-2 sm:text-base rounded-md bg-primary text-white"
        @click="openDetailBarang">
        Detail Barang
      </button>
    </div>
  </div>
  <UModal v-model="showDetailBarang">
    <div class="px-6 py-6 rounded-2xl">
      <h2 class="text-3xl font-semibold">List Barang</h2>
      <div class="mt-3 px-3 py-2 rounded-lg border flex justify-between items-center" v-for="item in detailBarang">
        <div>
          <h3 class="text-lg"><span class="font-semibold">{{ item.item }}</span> ({{ item.amount }} {{ item.itemUnit }})
          </h3>
          <div>{{ numberFormat(item.price) }}</div>
        </div>
      </div>
    </div>
  </UModal>
</template>
