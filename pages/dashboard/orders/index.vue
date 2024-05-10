<script setup>
definePageMeta({
  layout: 'dashboard'
})
const data = ref([
  {
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
  },
  {
    "id": "2",
    "items": [
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
    "status": "On Process",
    "shippingCost": 0,
    "address": "Somewhere"
  }
]);
function sum(items) {
  return items.reduce((acc, item) => acc + (item.estimatedPrice * item.amount), 0)
}
console.log(data);

</script>
<template>
  <div class="p-5 sm:p-8">
    <div class="bg-white shadow-md rounded-2xl p-8">
      <h1 class="font-semibold text-3xl">List Pesanan</h1>
      <!-- <table class="table table-auto mt-6">
        <tr>
          <th>No.</th>
          <th class="w-full">Customer</th>
          <th>Status</th>
          <th>Harga</th>
          <th>Aksi</th>
        </tr>
        <tr>
          <td>1</td>
          <td class="w-full">
            <div class="font-semibold">I Made Aditya</div>
            <div>08973891362</div>
          </td>
          <td>
            <span class="px-2 py-1 rounded-full bg-primary-light text-primary-dark font-bold text-sm">Delivered</span>
          </td>
          <td>
            Rp. 30.000,00
          </td>
          <td>
            <button class="px-4 py-2 rounded-lg bg-primary text-white">Detail</button>
          </td>
        </tr>
      </table> -->


      <div class="relative overflow-x-auto">
        <table class="w-full mt-6 text-left rtl:text-right text-gray-500">
          <thead class="text-gray-700 uppercase">
            <tr class="hover:bg-gray  -100">
              <th scope="col" class="px-6 py-3">
                No.
              </th>
              <th scope="col" class="px-6 py-3">
                Customer
              </th>
              <th scope="col" class="px-6 py-3">
                Status
              </th>
              <th scope="col" class="px-6 py-3">
                Harga
              </th>
              <th scope="col" class="px-6 py-3">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="bg-white border-b hover:bg-gray-100" v-for="(order, i) in data">
              <td class="px-6 py-4">
                {{ i + 1 }}
              </td>
              <th scope="row" class="px-6 py-4 text-gray-900 whitespace-nowrap">
                <div class="font-semibold text-lg">{{ order.customer.name }}</div>
                <a href="https://wa.me/+6282236204294" target="_blank" class="mt-1 text-sm font-normal">{{
                  order.customer.phone }}</a>
              </th>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="`px-2.5 py-1 rounded font-bold text-sm badge-${statusColor(order.status)}`">{{
                  order.status }}</span>
              </td>
              <td class="px-6 py-4">
                Rp. {{ numberFormat(sum(order.items)) }},00
              </td>
              <td class="px-6 py-4">
                <NuxtLink :to="`/dashboard/orders/${i + 1}`" class="px-5 py-2 rounded-md bg-primary text-white">Detail
                </NuxtLink>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  </div>
</template>
<!-- 
  Waktu/Date
  Nama CUstomer
  Status
  Harga
  Action:
    Detail (page baru)
    Hapus (opsional)
 -->

<!-- 
  Detail
  
  -->