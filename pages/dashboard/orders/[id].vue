<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faCartShopping, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
definePageMeta({
  layout: 'dashboard'
})

const order = ref({
  "id": "1",
  "items": [
    {
      "id": 1,
      "name": "Item 1",
      "unit": "kg",
      "estimatedPrice": "10000",
      "image": "public/upload/image-1715295398337-60017.png",
      "amount": 5
    },
    {
      "id": 2,
      "name": "Item 2",
      "unit": "lembar",
      "estimatedPrice": "50000",
      "image": "public/upload/image-1715295398348-685412.png",
      "amount": 4
    }
  ],
  "agency": {
    "id": 1,
    "name": 1,
    "location": "Somewhere"
  },
  "customer": {
    "id": 1,
    "name": "Pak Abdul",
    "phone": "08973891362"
  },
  "type": "0",
  "status": "Pending",
  "shippingCost": 0,
  "address": "Somewhere"
})

const openDetailBarang = ref(false)
const openGambarBarang = ref(false)
const items = order.value.status == 'Pending' ? [
  [{
    label: 'Ubah Harga',
    icon: 'i-heroicons-pencil-square',
    click() {
      openDetailBarang.value = true
    }
  }, {
    label: 'Lihat Gambar',
    icon: 'i-heroicons-photo',
    click() {
      openGambarBarang.value = true
    }
  },]
] : [
  [{
    label: 'Lihat Gambar',
    icon: 'i-heroicons-photo',
    click() {
      openGambarBarang.value = true
    }
  },]
]
const detailBarang = ref({
  item: 'Botol Plastik',
  amount: 2,
  unit: 'kg',
  price: 20000
});
async function submitOrder(event) {
  event.preventDefault();
  // Submit order, ada 2, submit menuju proses dan menuju selesai
  if (order.value.status == 'Pending') {
    return Swal.fire({
      title: "Pesanan berhasil diproses",
      text: "Lakukan pengambilan barang dan transaksi",
      icon: "success",
      confirmButtonColor: '#14B8A6'
    }).then(() => navigateTo('/dashboard/orders'));
  } else if (order.value.status == 'On Process') {
    return Swal.fire({
      title: "Pesanan telah sukses",
      text: "Pesanan telah selesai",
      icon: "success",
      confirmButtonColor: '#14B8A6'
    }).then(() => navigateTo('/dashboard/orders'));
  }
}
</script>
<template>
  <div class="p-5 sm:p-8">
    <h1 class="font-semibold text-3xl sm:text-4xl">Detail Pesanan</h1>
    <div class="bg-white shadow-md rounded-xl p-5 md:p-8 mt-6">
      <h3 class="text-lg font-semibold">ID Pesanan : #1882</h3>
      <div class="my-2">22 Juli 2023</div>
      <span class="px-2.5 py-1 rounded font-bold text-sm" :class="`badge-${statusColor(order.status)}`">{{ order.status
        }}</span>
      <div class="mt-8 flex gap-4 md:gap-16 flex-wrap">
        <div class="sm:flex gap-3 hidden">
          <div class="w-14 h-14 flex-grow bg-gray-100 rounded-full flex justify-center items-center">
            <FontAwesomeIcon :icon="faUser" class="text-xl sm:text-2xl" />
          </div>
          <div>
            <h3 class="text-2xl font-semibold mb-3">Customer</h3>
            <div class="mt-2">Nama: {{ order.customer.name }}</div>
            <div class="mt-2">Email: imadeaditya4@gmail.com</div>
            <div class="mt-2">No. Telp.: {{ order.customer.phone }}</div>
            <div class="mt-2">
              Alamat: Jalan Gunung Gede gang Melon no. 8
            </div>
          </div>
        </div>
        <div class="sm:hidden">
          <div class="flex gap-3 items-center mb-3">
            <div class="w-14 h-14 bg-gray-100 rounded-full flex justify-center items-center">
              <FontAwesomeIcon :icon="faUser" class="text-xl sm:text-2xl" />
            </div>
            <h3 class="text-2xl font-semibold">Customer</h3>
          </div>
          <div>
            <div class="mt-2">Nama: Made Aditya</div>
            <div class="mt-2">Email: imadeaditya4@gmail.com</div>
            <div class="mt-2">No. Telp.: 08973891362</div>
            <div class="mt-2">
              Alamat: Jalan Gunung Gede gang Melon no. 8
            </div>
          </div>
        </div>
        <div class="hidden sm:flex gap-3">
          <div class="w-14 h-14 bg-gray-100 rounded-full flex justify-center items-center">
            <FontAwesomeIcon :icon="faCartShopping" class="text-2xl" />
          </div>
          <div>
            <h3 class="text-2xl font-semibold mb-3">Pesanan</h3>
            <div class="mt-2">Status: Pending</div>
            <div class="mt-2">Total Jenis Barang: 12</div>
            <div class="mt-2">Penghantaran Barang: Diambil Agen</div>
          </div>
        </div>
        <div class="sm:hidden mt-4">
          <div class="flex gap-3 items-center">
            <div class="w-14 h-14 bg-gray-100 rounded-full flex justify-center items-center">
              <FontAwesomeIcon :icon="faCartShopping" class="text-2xl" />
            </div>
            <h3 class="text-2xl font-semibold">Pesanan</h3>
          </div>
          <div>
            <div class="mt-2">Status: Pending</div>
            <div class="mt-2">Total Jenis Barang: 12</div>
            <div class="mt-2">Penghantaran Barang: Diambil Agen</div>
          </div>
        </div>
      </div>

      <div class="relative overflow-x-auto mt-6">
        <table class="w-full text-left rtl:text-right text-gray-500">
          <thead class="text-sm text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" class="px-4 sm:px-6 py-3">No.</th>
              <th scope="col" class="px-4 sm:px-6 py-3">Jenis Barang</th>
              <th scope="col" class="px-4 sm:px-6 py-3">Harga Satuan</th>
              <th scope="col" class="px-4 sm:px-6 py-3">Jumlah</th>
              <th scope="col" class="px-4 sm:px-6 py-3">Total Harga</th>
              <th scope="col" class="px-4 sm:px-6 py-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr class="bg-white border-b" v-for="i in 2">
              <td class="px-4 py-2 sm:px-6 sm:py-4">{{ i }}</td>
              <th scope="row" class="px-4 py-2 sm:px-6 sm:py-4 font-medium text-gray-900 whitespace-nowrap">
                Botol Plastik
              </th>
              <td class="px-4 py-2 sm:px-6 sm:py-4">Rp. 10.000 / kg</td>
              <td class="px-4 py-2 sm:px-6 sm:py-4">2 kg</td>
              <td class="px-4 py-2 sm:px-6 sm:py-4">Rp. 20.000,00</td>
              <td class="px-4 py-2 sm:px-6 sm:py-4">
                <UDropdown :items="items"
                  :ui="{ item: { disabled: 'cursor-text select-text', size: 'text-base', padding: 'px-3 py-2' } }">
                  <button class="px-3 py-1.5 rounded-md hover:bg-gray-50">
                    <FontAwesomeIcon :icon="faEllipsisVertical" class="text-xl" />
                  </button>
                  <template #item="{ item }">
                    <span class="truncate">{{ item.label }}</span>
                    <UIcon :name="item.icon" class="flex-shrink-0 h-6 w-6 text-gray-400 ms-auto" />
                  </template>
                </UDropdown>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <form class="mt-8" @submit="submitOrder">
        <h3 class="text-xl font-semibold">Order Summary</h3>
        <p class="my-2 text-sm text-gray-500">
          Silahkan input harga final sesuai dengan kondisi barang pada
          gambar. Perhatingan nilai minimal dan maksimal yang bisa
          diberikan.
        </p>
        <div class="inline-grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-lg">
          <div class="font-medium flex items-center">Total Harga</div>
          <div class="" v-if="order.status == 'Pending'">
            <input type="text" class="px-4 py-2 border rounded-md focus:outline-none focus:border-primary transition"
              value="30000" />
          </div>
          <div class="" v-else>Rp. 30.000,00</div>
          <div v-if="order.status == 'Pending'"></div>
          <div class="text-sm text-gray-500" v-if="order.status == 'Pending'">
            Min. 25.000, Maks. 32.0000
          </div>
          <div class="font-medium flex items-center pt-3 sm:pt-4">
            Biaya Penjemputan
          </div>
          <div class="sm:pt-4">Rp. 2.000,00</div>
          <div class="font-medium flex items-center pt-3 sm:pt-4">
            Biaya Layanan
          </div>
          <div class="sm:pt-4">Rp. 3.000,00</div>
          <div></div>
          <div class="border-b relative">
            <div class="w-5 border-b absolute -right-7 top-0"></div>
          </div>
          <div class="font-medium flex items-center pt-3 sm:pt-4">
            Harga Final
          </div>
          <div class="sm:pt-4">Rp. 25.000,00</div>
          <div class="font-medium flex items-center pt-3 sm:pt-4" v-if="order.status != 'Pending'">
            Bukti Transaksi
          </div>
          <div class="sm:pt-4" v-if="order.status != 'Pending'">
            <input
              class="block w-full text-sm text-gray-900 border border-gray-300 rounded cursor-pointer bg-gray-50 focus:outline-none"
              aria-describedby="file_input_help" id="file_input" type="file" />
          </div>
        </div>
        <div>
          <button class="px-5 py-2 rounded-md bg-primary text-white mt-6">
            Proses
          </button>
        </div>
      </form>
    </div>
  </div>
  <UModal v-model="openDetailBarang">
    <div class="px-6 py-6 rounded-2xl">
      <h2 class="text-3xl font-semibold mb-5">{{ detailBarang.item }} ({{ detailBarang.amount }} {{ detailBarang.unit
        }})
      </h2>
      <div>
        <label for="">Harga Barang</label>
        <input type="number" id="nama"
          class="mt-3 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:border-green-500 block w-full p-2.5"
          placeholder="Masukkan harga barang" v-model="detailBarang.price" required />
      </div>
      <p class="mt-2 text-gray-500 text-sm mb-4">Ubah harga sesuai kondisi barang pada gambar</p>
      <button class="px-3 py-2 bg-primary rounded text-white">
        Simpan
      </button>
    </div>
  </UModal>
  <UModal v-model="openGambarBarang">
    <div class="px-6 py-6 rounded-2xl">
      <img src="https://source.unsplash.com/600x400" class="w-full" />
    </div>
  </UModal>
</template>