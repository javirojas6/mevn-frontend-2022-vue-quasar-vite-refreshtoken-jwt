<template>
  <q-page padding>
    <q-btn @click="access">Ingresar</q-btn>
    <q-btn @click="createLink">Crear Link</q-btn>
    {{ token }} - {{ expiresIn }}
  </q-page>
</template>

<script setup>
import axios from "axios";
import { api } from "src/boot/axios";
import { ref } from "vue";

const token = ref("");
const expiresIn = ref("");

const access = async () => {
  try {
    const res = await api.post("/auth/login", {
      email: "javirojas6@test.com",
      password: "123456",
    });
    console.log(res.data);
    console.log(res.data.token);
    token.value = res.data.token;
    expiresIn.value = res.data.expiresIn;
    setTime();
  } catch (error) {
    console.log(error);
  }
};
console.log("--------");

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

const setTime = () => {
  setTimeout(() => {
    refreshToken();
    console.log("se refrescó");
  }, expiresIn.value * 1000 - 6000);
};

const refreshToken = async () => {
  try {
    console.log("hola");
    const res = await api.get("/auth/refresh");
    token.value = res.data.token;
    expiresIn.value = res.data.expiresIn;
    console.log(res.data);
    setTime();
  } catch (error) {
    console.log(error);
  }
};
refreshToken();
</script>
