<template>
  <q-page padding>
    <!-- <q-btn @click="userStore.access">Ingresar</q-btn> -->
    <q-btn @click="createLink">Crear Link</q-btn>
    <!-- <q-btn @click="userStore.logout">Logout</q-btn> -->
    {{ userStore.token }} - {{ userStore.expiresIn }}
  </q-page>
</template>

<script setup>
// import axios from "axios";
import { api } from "src/boot/axios";
import { useUserStore } from "../stores/user-store";
// import { ref } from "vue";

// const token = ref("");
// const expiresIn = ref("");

const userStore = useUserStore()

userStore.refreshToken();

const createLink = async () => {
  try {
    const res = await api({
      method: "POST",
      url: "/links",
      headers: {
        Authorization: "Bearer " + token.value,
      },
      data: {
        longLink: "https://www.google.es",
      },
    });
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};


// refreshToken();
</script>
