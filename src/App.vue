<template>
  <Disclosure v-slot="{ open }" as="nav">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <div class="absolute inset-y-0 left-0 flex items-center lg:hidden">
          <DisclosureButton
            class="inline-flex items-center justify-center p-2 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          >
            <span class="sr-only">Open main menu</span>
            <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>

        <div class="flex-1 flex items-center justify-center lg:items-stretch lg:justify-start">
          <div class="flex-shrink-0 flex items-center">
            <router-link :to="{ name: 'home' }">
              <img
                class="h-7 lg:h-8 w-auto"
                :src="`/images/${isDark ? 'logo-large-dark.png' : 'logo-large.png'}`"
                alt="Hive-Engine Logo"
              />
            </router-link>

            <button class="ml-5 p-1" @click.prevent="toggleDark()">
              <sun-icon v-if="isDark" class="h-6 w-6" />
              <moon-icon v-else class="h-6 w-6" />
            </button>
          </div>

          <div class="hidden lg:block lg:ml-auto">
            <div class="flex lg:space-x-4">
              <!-- <a
                class="text-gray-700 dark:text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-bold cursor-pointer"
                @click="$vfm.show('buyCrypto')"
                >Buy Crypto</a
              > -->

              <router-link
                :to="{ name: 'trade', params: { symbol: 'SHARD' } }"
                class="text-gray-700 dark:text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-bold"
                active-class="bg-gray-700 text-white"
                >Market</router-link
              >

              <MenuItem v-slot="{ active }">
                <router-link
                  :to="{ name: 'tokens' }"
                  :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-gray-700']"
                  active-class="bg-gray-700 hover:bg-gray-700 text-white"
                >Tokens</router-link
                >
              </MenuItem>
              <router-link
                :to="{ name: 'tokens'}"
                class="text-gray-700 dark:text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-bold"
                active-class="bg-gray-700 text-white"
                >Tokens</router-link
              >
              <!--
              <a
                v-if="isLoggedIn"
                class="text-gray-700 dark:text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-bold cursor-pointer"
                @click="$vfm.show('swapModal')"
                >Swap</a
              >
              -->
              <a href="https://beeswap.dcity.io/swap?input=SWAP.HIVE&output=SHARD" class="text-gray-700 dark:text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-bold" target="_blank">Swap</a>
              <!-- <router-link
                v-if="isLoggedIn"
                :to="{ name: 'sl-market' }"
                class="text-gray-700 dark:text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-bold"
                active-class="bg-gray-700 text-white"
                >Rentals</router-link
              > -->
              <router-link
                :to="{ name: 'lease' }"
                class="text-gray-700 dark:text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-bold"
                active-class="bg-gray-700 text-white"
                >Lease</router-link
              >

              <Menu as="div" class="relative">
                <MenuButton
                  class="text-gray-700 dark:text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-bold"
                  >More <ChevronDownIcon class="inline -mr-1 h-5 w-5" aria-hidden="true"
                /></MenuButton>

                <MenuItems
                  class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                >

                  <MenuItem v-slot="{ active }">
                    <router-link
                      :to="{ name: 'tokens' }"
                      :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-gray-700']"
                      active-class="bg-gray-700 hover:bg-gray-700 text-white"
                    >Tokens</router-link
                    >
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                    <router-link
                      :to="{ name: 'faq' }"
                      :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-gray-700']"
                      active-class="bg-gray-700 hover:bg-gray-700 text-white"
                      >FAQ</router-link
                    >
                  </MenuItem>

                  <MenuItem v-slot="{ active }">
                    <a
                      href="https://he.dtools.dev"
                      target="_blank"
                      :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-gray-700']"
                      active-class="bg-gray-700 hover:bg-gray-700 text-white"
                      >Explorer</a
                    >
                  </MenuItem>
                </MenuItems>
              </Menu>

              <router-link
                v-if="isLoggedIn"
                :to="{ name: 'wallet', params: { account: username } }"
                class="text-gray-700 dark:text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-bold"
                active-class="bg-gray-700 text-white"
                >Wallet</router-link
              >
            </div>
          </div>
        </div>

        <div class="absolute inset-y-0 right-0 flex items-center md:static md:inset-auto md:ml-1 lg:ml-4 lg:pr-0">
          <Menu v-if="isLoggedIn" as="div" class="relative">
            <MenuButton
              class="bg-gray-800 flex rounded-full border-2 border-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <img class="h-8 w-8 rounded-full" :src="`https://images.hive.blog/u/${username}/avatar`" />
            </MenuButton>

            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <MenuItems
                class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
              >
                <MenuItem>
                  <div class="block font-bold px-4 py-2 text-gray-700 border-b">@{{ username }}</div>
                </MenuItem>

                <MenuItem v-slot="{ active }">
                  <router-link
                    :to="{ name: 'rewards' }"
                    :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-gray-700']"
                    active-class="bg-gray-700 hover:bg-gray-700 text-white"
                    >Rewards</router-link
                  >
                </MenuItem>

                <MenuItem v-slot="{ active }">
                  <router-link
                    :to="{ name: 'orders' }"
                    :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-gray-700']"
                    active-class="bg-gray-700 hover:bg-gray-700 text-white"
                    >Open Orders</router-link
                  >
                </MenuItem>

                <MenuItem v-slot="{ active }">
                  <router-link
                    :to="{ name: 'swaps' }"
                    :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-gray-700']"
                    active-class="bg-gray-700 hover:bg-gray-700 text-white"
                    >Swaps</router-link
                  >
                </MenuItem>

                <MenuItem v-slot="{ active }">
                  <router-link
                    :to="{ name: 'conversion-history' }"
                    :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-gray-700']"
                    active-class="bg-gray-700 hover:bg-gray-700 text-white"
                    >Conversion History</router-link
                  >
                </MenuItem>

                <!-- <MenuItem v-slot="{ active }">
                  <router-link
                    :to="{ name: 'sl-cards', params: { account: userStore.username } }"
                    :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-gray-700']"
                    active-class="bg-gray-700 hover:bg-gray-700 text-white"
                    >Splinterlands Cards</router-link
                  >
                </MenuItem>

                <MenuItem v-slot="{ active }">
                  <router-link
                    :to="{ name: 'sl-active-rentals', params: { account: userStore.username } }"
                    :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-gray-700']"
                    active-class="bg-gray-700 hover:bg-gray-700 text-white"
                    >Active Rentals</router-link
                  >
                </MenuItem> -->

                <MenuItem v-slot="{ active }">
                  <router-link
                    :to="{ name: 'leasing-dashboard', params: { account: userStore.username } }"
                    :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-gray-700']"
                    active-class="bg-gray-700 hover:bg-gray-700 text-white"
                    >Leasing Dashboard</router-link
                  >
                </MenuItem>

                <MenuItem v-slot="{ active }">
                  <a
                    href="#"
                    :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-gray-700']"
                    @click.prevent="userStore.requestLogout"
                    >Logout</a
                  >
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>

          <a
            v-else
            class="text-gray-700 dark:text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-bold cursor-pointer"
            @click="$vfm.show('loginModal')"
            >Login</a
          >
        </div>
      </div>
    </div>

    <DisclosurePanel class="lg:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <!-- <DisclosureButton class="w-full text-left">
          <a
            class="block text-gray-700 dark:text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-bold cursor-pointer"
            @click="$vfm.show('buyCrypto')"
            >Buy Crypto</a
          >
        </DisclosureButton> -->

        <DisclosureButton class="w-full text-left">
          <router-link
            :to="{ name: 'trade', params: { symbol: 'BEE' } }"
            class="block text-gray-700 dark:text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-bold"
            active-class="bg-gray-700 text-white"
            >Market</router-link
          >
        </DisclosureButton>
        <DisclosureButton class="w-full text-left">
          <router-link
            :to="{ name: 'tokens' }"
            :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-gray-700']"
            active-class="bg-gray-700 hover:bg-gray-700 text-white"
          >Tokens</router-link
          >
        </DisclosureButton>

        <DisclosureButton v-if="isLoggedIn" class="w-full text-left">
          <a
            class="block text-gray-700 dark:text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-bold cursor-pointer"
            @click="$vfm.show('swapModal')"
            >Swap</a
          >
        </DisclosureButton>

        <!-- <DisclosureButton class="w-full text-left">
          <router-link
            :to="{ name: 'sl-market' }"
            class="block text-gray-700 dark:text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-bold"
            active-class="bg-gray-700 text-white"
            >Rentals</router-link
          >
        </DisclosureButton> -->

        <DisclosureButton class="w-full text-left">
          <router-link
            :to="{ name: 'lease' }"
            class="block text-gray-700 dark:text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-bold"
            active-class="bg-gray-700 text-white"
            >Lease</router-link
          >
        </DisclosureButton>

        <DisclosureButton class="w-full text-left">
          <router-link
            :to="{ name: 'faq' }"
            class="block text-gray-700 dark:text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-bold"
            active-class="bg-gray-700 text-white"
            >FAQ</router-link
          >
        </DisclosureButton>

        <DisclosureButton class="w-full text-left">
          <a
            href="https://he.dtools.dev"
            target="_blank"
            class="block text-gray-700 dark:text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-bold"
            active-class="bg-gray-700 text-white"
            >Explorer</a
          >
        </DisclosureButton>

        <DisclosureButton v-if="isLoggedIn" class="w-full text-left">
          <router-link
            :to="{ name: 'wallet', params: { account: username } }"
            class="block text-gray-700 dark:text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-bold"
            active-class="bg-gray-700 text-white"
            >Wallet</router-link
          >
        </DisclosureButton>
      </div>
    </DisclosurePanel>
  </Disclosure>

  <Loading v-if="store.loading" />

  <template v-else>
    <RouterView :key="route.fullPath" />

    <LoginModal />

    <Swap />

    <Keychain />

    <notifications :duration="15000" />
  </template>
</template>

<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import { Bars3Icon, MoonIcon, SunIcon, XMarkIcon, ChevronDownIcon } from '@heroicons/vue/24/outline';
import { useDark, useToggle } from '@vueuse/core';
import { computed, onMounted } from 'vue';
import { RouterLink, RouterView, useRoute } from 'vue-router';
import Keychain from './components/modals/Keychain.vue';
import LoginModal from './components/modals/Login.vue';
import Swap from './components/modals/Swap.vue';
import Loading from './components/utilities/Loading.vue';
import { useStore } from './stores';
import { useUserStore } from './stores/user';
// import BuyCrypto from "./components/modals/BuyCrypto.vue";

const route = useRoute();

const isDark = useDark();
const toggleDark = useToggle(isDark);

const store = useStore();
const userStore = useUserStore();

const username = computed(() => userStore.username);
const isLoggedIn = computed(() => userStore.isLoggedIn);

const fetchHivePrice = async () => {
  await store.fetchHivePrice();

  setTimeout(fetchHivePrice, 10 * 60 * 1000);
};

onMounted(async () => {
  await fetchHivePrice();
});
</script>
