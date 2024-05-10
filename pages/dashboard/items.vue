<script lang="ts" setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPlus, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
const items = [
  [{
    label: 'Edit',
    icon: 'i-heroicons-pencil-square',
    click() {
      // openDetailBarang.value = true
    }
  }, {
    label: 'Hapus',
    icon: 'i-heroicons-minus-circle'
  },]
]
definePageMeta({
  layout: 'dashboard'
})
</script>
<template>
  <div class="p-5 sm:p-8">
    <h1 class="font-semibold text-3xl sm:text-4xl">List Barang</h1>
    <div class="bg-white shadow-md rounded-xl p-5 sm:p-8 mt-6">
      <button class="px-3 py-2 rounded-md bg-primary text-white">
        <FontAwesomeIcon :icon="faPlus" class="mr-2" />
        Tambah Barang
      </button>
      <div class="relative overflow-x-auto mt-6">
        <table class="w-full text-left rtl:text-right text-gray-500">
          <thead class="text-sm text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" class="px-4 sm:px-6 py-3">No.</th>
              <th scope="col" class="px-4 sm:px-6 py-3">Jenis Barang</th>
              <th scope="col" class="px-4 sm:px-6 py-3">Satuan</th>
              <th scope="col" class="px-4 sm:px-6 py-3">Harga Satuan</th>
              <th scope="col" class="px-4 sm:px-6 py-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr class="bg-white border-b">
              <td class="px-4 py-2 sm:px-6 sm:py-4">1</td>
              <th scope="row" class="px-4 py-4 font-medium text-gray-900 whitespace-nowrap">
                Kaleng Bekas
              </th>
              <td class="px-4 py-2 sm:px-6 sm:py-4">kg</td>
              <td class="px-4 py-2 sm:px-6 sm:py-4">Rp. 15.000</td>
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
    </div>
  </div>
</template>