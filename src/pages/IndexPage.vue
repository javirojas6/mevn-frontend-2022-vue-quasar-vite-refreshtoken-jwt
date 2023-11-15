<template>
  <q-page padding>
    <!-- <q-btn @click="userStore.access">Ingresar</q-btn> -->
    <!-- <q-btn @click="createLink">Crear Link</q-btn> -->
    <!-- <q-btn @click="userStore.logout">Logout</q-btn> -->
    <!-- {{ userStore.token }} - {{ userStore.expiresIn }} -->
    <!-- <q-btn @click="useLink.createLink('https://google.cl')">Crear Link</q-btn> -->
  <AddLink />
    <pre>
      {{ useLink.links }}
    </pre>
    <template v-for="link in useLink.links" :key="link._id">
      <LinkCard />
    </template>
  </q-page>
</template>

<script setup>
// import axios from "axios";
// import { api } from "src/boot/axios";
// import { useUserStore } from "../stores/user-store";
// import { ref } from "vue";

// const token = ref("");
// const expiresIn = ref("");

// const userStore = useUserStore()

// userStore.refreshToken();

// const createLink = async () => {
//   try {
//     const res = await api({
//       method: "POST",
//       url: "/links",
//       headers: {
//         Authorization: "Bearer " + token.value,
//       },
//       data: {
//         longLink: "https://www.google.es",
//       },
//     });
//     console.log(res.data);
//   } catch (error) {
//     console.log(error);
//   }
// };


// refreshToken();



import { useLinkStore } from '../stores/link-store.js';
import AddLink from "src/components/AddLink.vue";
import LinkCard from 'src/components/LinkCard.vue';

const useLink = useLinkStore();


</script>
