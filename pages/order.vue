<script setup>
import debounce from 'debounce'
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faBookmark, faImage } from '@fortawesome/free-regular-svg-icons';
import { faMagnifyingGlass, faPlus, faBasketShopping, faXmark, faStar } from '@fortawesome/free-solid-svg-icons';
import ModalInputVue from '~/components/ModalInput.vue.vue';
definePageMeta({
  layout: 'default',
  middleware: 'auth'
})
const loggedUser = useState('loggedUser')
const { user: userToken } = useUserSession()
console.log(loggedUser.value);
console.log(userToken.value);
let addresses = await $fetch('https://daurin-api-production.up.railway.app/order/addresses', {
  headers: {
    "Authorization": "Bearer " + loggedUser.value.token
  }
});
function filterAddresses(value, index, array) {
  return array.indexOf(value) === index && value != loggedUser.value.address
}
// addresses = addresses.filter((value, index, array) => array.indexOf(value) === index && value != loggedUser.value.address)
// console.log(addresses);
const dataAgen = await $fetch('https://daurin-api-production.up.railway.app/agencies', {
  headers: {
    "Authorization": "Bearer " + loggedUser.value.token
  }
});
console.log(dataAgen);
const step = ref(1);
// const dataAgen = ref([
//   {
//     id: 1,
//     name: 'Agen Madura Sejahtera',
//     location: 'Jalan Cendrawasih XVII',
//     items: [
//       {
//         id: 8,
//         name: 'Botol Plastik',
//         estimatedPrice: 10000,
//         unit: 'kg'
//       },
//       {
//         id: 9,
//         name: 'Kaleng Bekas',
//         estimatedPrice: 10000,
//         unit: 'kg'
//       },
//     ]
//   },
//   {
//     id: 2,
//     name: 'Agen Jaya Wijaya',
//     location: 'Jalan Merpati XVII',
//     items: [
//       {
//         id: 10,
//         name: 'Botol Plastik',
//         estimatedPrice: 10000,
//         unit: 'kg'
//       },
//       {
//         id: 11,
//         name: 'Kaleng Bekas',
//         estimatedPrice: 10000,
//         unit: 'kg'
//       },
//     ]
//   },
// ]);
const data = reactive({
  step1: {
    alamat: '',
    kota: '',
    provinsi: ''
  },
  step2: {
    agen: null,
  },
  step3: {
    cart: [],
    formDetail: {
      // barang: null,
      berat: null,
      gambar: null,
      preview: null
    },
    barangActive: null,
    openFormBarang: false,
    openCart: false,
    search: '',
  },
  step4: {
    dibawa: null,
  }
});

const priceList = computed(() => {
  const sum = data.step3.cart.reduce((acc, c) => acc + (c.berat * c.barang.estimatedPrice), 0)
  return {
    sum,
    layanan: sum * 10 / 100,
    total: sum - (sum * 10 / 100)
  };
})

function selectAgen(agen) {
  data.step2.agen = agen
  data.step3.cart = []
  data.step4.dibawa = null
}

function resetDetailForm() {
  // data.step3.formDetail.barang = null;
  data.step3.barangActive = null;
  data.step3.formDetail.berat = null;
  data.step3.formDetail.gambar = null;
  data.step3.formDetail.preview = null;
}

function openFormBarang(barang) {
  // data.step3.formDetail.barang = barang;
  // console.log(barang);
  resetDetailForm();
  if (barang.id != data.step3.barangActive?.id) {
    data.step3.barangActive = barang;
  }
  data.step3.openFormBarang = true;
}

const detailFormEl = ref(null)
function validate(state) {
  const errors = [];
  if (!state.berat) errors.push({ path: 'berat', message: 'Masukkan data berat terlebih dahulu' });
  if (!state.gambar) errors.push({ path: 'gambar', message: 'Masukkan gambar terlebih dahulu' });
  return errors;
}
function detailFormSubmit(e) {
  data.step3.cart.push({ ...data.step3.formDetail, barang: data.step3.barangActive });
  // console.log(data.step3.cart);
  data.step3.openFormBarang = false
  console.log(priceList.value);
  // resetDetailForm();
}

function fileChange(files) {
  data.step3.formDetail.gambar = files[0];
  data.step3.formDetail.preview = URL.createObjectURL(files[0]);
}

function deleteItemCart(item) {
  data.step3.cart = data.step3.cart.filter(c => c.barang.id != item.barang.id);
  if (data.step3.cart.length == 0) {
    data.step3.openCart = false;
  }
}

async function nextStep() {
  if (step.value + 1 == 6) {
    await new Promise((resolve) => {
      setTimeout(() => resolve(), 3000)
    })
    const orderData = {
      image: data.step3.cart.map(c => c.gambar),
      deliveryOptions: data.step4.dibawa,
      customerId: loggedUser.value.id,
      agencyId: data.step2.agen.id,
      address: data.step1.alamat,
      items: data.step3.cart.map(c => ({
        itemId: c.barang.id,
        amount: c.berat
      }))
    }
    const postData = new FormData()
    postData.append('deliveryOptions', data.step4.dibawa)
    postData.append('customerId', loggedUser.value.id)
    postData.append('agencyId', data.step2.agen.id)
    postData.append('address', data.step1.alamat)
    postData.append('items', JSON.stringify(data.step3.cart.map(c => ({
      itemId: c.barang.id,
      amount: c.berat
    }))))
    data.step3.cart.forEach(c => postData.append('image', c.gambar))
    for (const pair of postData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }
    // console.log(postData.values());
    try {
      const res = await $fetch('https://daurin-api-production.up.railway.app/order', {
        method: 'POST',
        body: postData,
        headers: {
          "Authorization": "Bearer " + loggedUser.value.token
        }
      });
      console.log(res);
    } catch (error) {
      console.log(error.data);
    }
    Swal.fire({
      title: "Pesanan berhasil ditambahkan",
      text: "Silahkan tunggu konfirmasi dari agen",
      icon: "success",
      confirmButtonColor: '#14B8A6'
    }).then(() => navigateTo('/'));
  } else {
    step.value++;
  }
}

function filterBarang(barang) {
  return barang.name.toLowerCase().includes(data.step3.search) && !data.step3.cart.find(c => c.barang.id == barang.id)
}

</script>
<template>
  <div class="px-4 sm:px-16 md:px-24 py-8">
    <!-- <div class="flex justify-center gap-4 text-center">
      <div class="w-24" :class="step == 1 ? 'text-primary' : 'text-light'">
        <button class="w-10 h-10 flex justify-center items-center font-semibold mb-2 border rounded-full mx-auto"
          :class="step == 1 ? 'border-primary' : 'border-light border-dashedt'" @click="step = 1">
          1
        </button>
        <div>Input Alamat</div>
      </div>
      <div class="w-24" :class="step == 2 ? 'text-primary' : 'text-light'">
        <button class="w-10 h-10 flex justify-center items-center font-semibold mb-2 border rounded-full mx-auto"
          :class="step == 2 ? 'border-primary' : 'border-light border-dashedt'" @click="step = 2">
          2
        </button>
        <div>Pilih & Input Barang</div>
      </div>
      <div class="w-24" :class="step == 3 ? 'text-primary' : 'text-light'">
        <button class="w-10 h-10 flex justify-center items-center font-semibold mb-2 border rounded-full mx-auto"
          :class="step == 3 ? 'border-primary' : 'border-light border-dashedt'" @click="step = 3">
          3
        </button>
        <div>Pilih Agen</div>
      </div>
      <div class="w-24" :class="step == 4 ? 'text-primary' : 'text-light'">
        <button class="w-10 h-10 flex justify-center items-center font-semibold mb-2 border rounded-full mx-auto"
          :class="step == 4 ? 'border-primary' : 'border-light border-dashedt'" @click="step = 4">
          4
        </button>
        <div>Pilih Cara Ambil</div>
      </div>
    </div> -->
    <div class="lg:mt-12 w-full rounded-2xl bg-white-2 pt-8 px-6 md:px-16 pb-8 mb-12 sm:mb-0">
      <!-- Step 1 -->
      <div class="w-full mx-auto">
        <div v-if="step == 1" class="sm:w-[440px] mx-auto">
          <h2 class="text-2xl md:text-3xl text-center font-semibold">
            Masukin alamat dulu yuk
          </h2>
          <div class="mt-8 relative">
            <input type="text"
              class="block w-full rounded-lg bg-white text-light pl-5 pr-12 py-3 focus:outline-none border border-transparent focus:border-light transition"
              placeholder="Alamat kamu..." v-model="data.step1.alamat" />
            <button class="px-5 text-light absolute right-0 top-1/2 -translate-y-1/2">
              <FontAwesomeIcon :icon="faMagnifyingGlass"></FontAwesomeIcon>
            </button>
          </div>
          <div class="bg-white p-4 rounded-2xl mt-8">
            <h3 class="text-xl font-semibold px-2">Alamat Rumah</h3>
            <div class="p-2 hover:bg-gray-50 cursor-pointer rounded-md mb-4"
              @click="data.step1.alamat = loggedUser.address">
              <h4 class="font-medium">{{ loggedUser.address }}</h4>
              <p class="mt-1 text-sm">{{ loggedUser.city }}, {{ loggedUser.provinces }}</p>
            </div>
            <hr v-if="addresses.length">
            <h3 class="text-xl font-semibold px-2 mt-4 mb-2" v-if="addresses.length">Terbaru</h3>
            <div class="p-2 hover:bg-gray-50 cursor-pointer rounded-md"
              v-for="address in addresses.filter(val => val !== loggedUser.address)"
              @click="data.step1.alamat = address.address">
              <h4 class="font-medium">{{ address.address }}</h4>
            </div>
          </div>
        </div>
        <div v-if="step == 2">
          <h2 class="text-3xl text-center font-semibold">
            Pilih Agen
          </h2>
          <!-- <div class="w-9/12 mx-auto mt-6"></div> -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-4 mt-6">
            <div v-for="agen in dataAgen.filter(a => a.items.length > 0)" :key="agen.id"
              class="p-3 bg-white rounded-md cursor-pointer hover:shadow-lg transition"
              :class="agen.id == data.step2.agen?.id ? 'border border-primary' : ''" @click="selectAgen(agen)">
              <div class="flex gap-3">
                <img src="https://source.unsplash.com/64x64" alt="" class="w-16 h-16 rounded-md">
                <div class="overflow-hidden">
                  <h3 class="font-semibold text-lg truncate text-ellipsis">{{ agen.name }}</h3>
                  <p class="mt-2">{{ agen.location }}</p>
                </div>
              </div>
              <div class="mt-3">
                <FontAwesomeIcon :icon="faStar" class="text-yellow-500 mr-2" />
                {{ agen.rate }}
              </div>
              <div class="flex flex-wrap gap-1 text-xs text-white mt-3">
                <div class="px-2 py-0.5 rounded-md bg-primary font-medium" v-for="item in agen.items">{{ item.name }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="step == 3">
          <h2 class="text-3xl text-center font-semibold">
            Pilih Barang
          </h2>
          <div class="mt-8 sm:w-[440px] mx-auto flex gap-3 items-center">
            <div class="relative flex-grow">
              <input type="text"
                class="block w-full rounded-lg bg-white text-light pl-5 pr-12 py-3 focus:outline-none border border-transparent focus:border-light transition"
                placeholder="Cari barang" v-model="data.step3.search" />
              <button type="button" class="px-5 text-light absolute right-0 top-1/2 -translate-y-1/2">
                <FontAwesomeIcon :icon="faMagnifyingGlass"></FontAwesomeIcon>
              </button>
            </div>
            <button type="button"
              class="w-[44px] h-[44px] rounded bg-primary-dark text-white flex justify-center items-center"
              v-if="data.step3.cart.length" @click="data.step3.openCart = true">
              <FontAwesomeIcon :icon="faBasketShopping" />
            </button>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 mt-5 gap-2.5">
            <div class="p-3 bg-white flex justify-between items-center"
              v-for="barang in data.step2.agen.items.filter(filterBarang)">
              <div>
                <h3 class="text-lg font-semibold mb-1">{{ barang.name }}</h3>
                <p>{{ numberFormat(barang.estimatedPrice) }}/{{ barang.unit }}</p>
              </div>
              <button type="button"
                class="w-8 h-8 sm:w-10 sm:h-10 text-lg rounded-full bg-primary-dark text-white flex justify-center items-center"
                @click.prevent="() => openFormBarang(barang)">
                <FontAwesomeIcon :icon="faPlus" class="text-sm sm:text-base" />
              </button>
            </div>
          </div>
          <div class="mt-3 px-3 text-center text-gray-600" v-if="!data.step2.agen.items.filter(filterBarang).length">
            Tidak ada
            barang yang bisa dipilih</div>
        </div>
        <div v-if="step == 4">
          <h2 class="text-3xl text-center font-semibold">
            Pilih Opsi Penjemputan
          </h2>
          <div class="mt-8 sm:w-[800px] mx-auto grid grid-cols-2 gap-8">
            <div class="bg-white px-4 py-2 rounded shadow hover:shadow-lg cursor-pointer"
              :class="data.step4.dibawa == false ? 'border border-primary' : ''" @click="data.step4.dibawa = false">
              <h3 class="font-semibold text-2xl">Diantar</h3>
              <p class="text-light">Petugas dari <span class="font-bold">{{ data.step2.agen.name }}</span> yang datang
                untuk mengantar barang kamu.</p>
            </div>
            <div class="bg-white px-4 py-2 rounded shadow hover:shadow-lg cursor-pointer"
              :class="data.step4.dibawa == true ? 'border border-primary' : ''" @click="data.step4.dibawa = true">
              <h3 class="font-semibold text-2xl">Dibawa Langsung</h3>
              <p class="text-light">Kamu yang antar ke <span class="font-bold">{{ data.step2.agen.name }}</span></p>
            </div>
          </div>
        </div>
        <div v-if="step == 5" class="flex gap-6 flex-col lg:flex-row lg:px-20">
          <div class="bg-white rounded-2xl p-5 lg:w-[400px] w-full">
            <h2 class="text-xl sm:text-2xl font-semibold mb-1 sm:mb-2">Alamat anda</h2>
            <p class="mb-3">{{ data.step1.alamat }}</p>
            <hr>
            <h2 class="text-xl sm:text-2xl font-semibold mb-1 sm:mb-2 mt-3">{{ data.step2.agen.name }}</h2>
            <p class="mb-3">{{ data.step2.agen.location }}</p>
            <hr>
            <h2 class="text-xl sm:text-2xl font-semibold mb-1 sm:mb-2 mt-3">Opsi Penjemputan</h2>
            <p class="">{{ data.step4.dibawa ? 'Dibawa Langsung' : 'Diantar' }}</p>
          </div>
          <!-- <div class="bg-white rounded-2xl p-5 max-w-[400px]">
            <h2 class="text-xl sm:text-2xl font-semibold mb-2.5">Opsi Penjemputan</h2>
            <p v-if="data.step4.dibawa">
              <span class="font-bold">Dibawa Langsung</span>,
              Kamu yang antar barangnya ke <span class="font-medium">{{ data.step2.agen.nama }}</span>
            </p>
            <p v-else>
              <span class="font-bold">Diantar</span>,
              Petugas dari <span class="font-medium">{{ data.step2.agen.nama }}</span> yang datang
              untuk mengambil barang kamu
            </p>
          </div> -->
          <div class="bg-white rounded-2xl p-5 flex-grow">
            <h2 class="text-xl sm:text-2xl font-semibold mb-2.5">Detail Setoran</h2>
            <div style="display: grid; grid-template-columns: 1fr auto;">
              <template v-for="item in data.step3.cart">
                <h4 class="font-semibold text-lg sm:text-xl py-2.5 border-b first:border-t">{{ item.barang.name }} ({{
                  item.berat
                }}
                  {{ item.barang.unit }})</h4>
                <!-- <div>{{ item.berat }} kg</div> -->
                <div class="sm:text-lg font-semibold py-2.5 border-b [&:nth-child(2)]:border-t">Rp. {{
                  numberFormat(item.barang.estimatedPrice *
                    item.berat)
                }},00</div>
              </template>
              <div class="font-semibold text-lg sm:text-xl pb-2 pt-3">Jumlah</div>
              <div class="font-semibold sm:text-lg pb-2 pt-3">Rp. {{ numberFormat(priceList.sum) }},00</div>
              <div class="font-semibold text-lg sm:text-xl py-2">Biaya Layanan</div>
              <div class="font-semibold sm:text-lg border-b py-2">Rp. {{ numberFormat(priceList.layanan) }},00</div>
              <div class="font-semibold text-lg sm:text-xl pb-2 pt-3">Total</div>
              <div class="font-semibold sm:text-lg pb-2 pt-3">Rp. {{ numberFormat(priceList.total) }},00</div>
            </div>
            <div class="text-gray-500 text-sm">Total estimasi harga yang didapatkan</div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex py-4 sm:py-8 px-5 fixed bottom-0 left-0 right-0 bg-white sm:static border-t sm:shadow-none"
      :class="step > 1 ? 'justify-between' : 'justify-end'">
      <button type="button"
        class="px-2 py-1.5 sm:px-3 sm:py-2 rounded-md border border-primary text-primary text-sm sm:text-base"
        v-show="step > 1" @click="step--">Kembali</button>
      <button type="button"
        class="px-2 py-1.5 sm:px-3 sm:py-2 rounded-md border bg-primary text-white text-sm sm:text-base"
        @click="nextStep"
        :disabled="(step == 1 && !data.step1.alamat) || (step == 2 && !data.step2.agen) || (step == 3 && !data.step3.cart.length) || (step == 4 && data.step4.dibawa == null)">{{
          step
            < 5 ? 'Lanjut' : 'Kirim' }}</button>
    </div>
  </div>

  <UModal v-model="data.step3.openFormBarang">
    <UForm :validate="validate" :state="data.step3.formDetail" @submit="detailFormSubmit" ref="detailFormEl"
      class="px-8 py-6 rounded-2xl">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl sm:text-3xl font-semibold">Detail Setoran</h2>
        <button type="button" class="px-3 py-2 hover:bg-gray-50 active:bg-gray-100 rounded-md"
          @click="data.step3.openFormBarang = false">
          <FontAwesomeIcon :icon="faXmark" class="text-xl" />
        </button>
      </div>
      <div class="mb-4">
        <label for="berat-barang">Estimasi berat barang ({{ data.step3.barangActive.unit }})</label>
        <input type="number" name="berat-barang" id="berat-barang"
          class="block w-full p-2.5 rounded-lg border focus:outline-none"
          :class="detailFormEl?.getErrors('berat').length ? 'border-red-600' : 'border-dark-2'" placeholder="cth : 10"
          v-model="data.step3.formDetail.berat">
        <div class="mt-1 text-red-600" v-if="detailFormEl?.getErrors('berat').length">{{
          detailFormEl?.getErrors('berat')[0].message }}</div>
      </div>
      <div class="mb-4">
        <label for="berat-barang">Upload gambar</label>
        <DropFile class="w-full h-[90px] rounded-lg border text-center text-light cursor-pointer"
          :class="detailFormEl?.getErrors('gambar').length ? 'border-red-600' : 'border-dark-2'"
          @files-dropped="fileChange">
          <FontAwesomeIcon :icon="faImage" />
          <div class="mt-2">Cari/tarik gambar</div>
        </DropFile>
        <div class="mt-1 text-red-600" v-if="detailFormEl?.getErrors('gambar').length">{{
          detailFormEl?.getErrors('gambar')[0].message }}</div>
      </div>
      <div class="mb-4">
        <label for="berat-barang">Preview gambar</label>
        <div class="w-full rounded-lg border overflow-hidden border-dark-2">
          <img v-if="data.step3.formDetail.preview" :src="data.step3.formDetail.preview" alt=""
            class="w-full max-h-[200px] object-cover">
          <div v-else class="w-full h-[200px] flex justify-center items-center text-light">
            <FontAwesomeIcon :icon="faImage" />
          </div>
        </div>
      </div>
      <div class="text-end">
        <button type="submit" class="px-3 py-2 rounded text-white bg-primary">Tambah</button>
      </div>
    </UForm>
  </UModal>

  <UModal v-model="data.step3.openCart">
    <div class="px-6 py-6 rounded-2xl">
      <h2 class="text-3xl font-semibold">List Barang</h2>
      <div class="mt-3 px-3 py-2 rounded-lg border flex justify-between items-center" v-for="item in data.step3.cart">
        <div>
          <h3 class="text-lg"><span class="font-semibold">{{ item.barang.name }}</span> ({{ item.berat }}
            {{ item.barang.unit }})</h3>
          <div>{{ numberFormat(item.barang.estimatedPrice * item.berat) }}</div>
        </div>
        <button type="button" @click="() => deleteItemCart(item)"
          class="w-8 h-8 rounded-full bg-primary-dark text-white flex justify-center items-center">
          <FontAwesomeIcon :icon="faXmark" />
        </button>
      </div>
    </div>
  </UModal>
</template>