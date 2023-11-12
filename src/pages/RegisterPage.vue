<script setup>
import { ref } from 'vue';
import { useUserStore } from '../stores/user-store'
import { useQuasar } from 'quasar';
import {useRouter} from 'vue-router';
const $q = useQuasar();
const userStore = useUserStore();
const router = useRouter();
const email = ref('');
const password = ref('');
const repassword = ref('');
const handleSubmit = async() => {
  try {
    console.log(email.value)
    await userStore.register(email.value,password.value,repassword.value);
    router.push("/");
    email.value = '';
    password.value='';
  } catch (error) {
    if (error.error){
      alertDialogBackend(error.error);
    } else if (error.errors[0].msg){
      alertDialogBackend(error.error[0].msg);
    } else {
      alertDialogBackend();
    }
    console.log(error)

  }
}

const alertDialogBackend = (message = 'Error en el servidor') => {
  $q.dialog({
      title:"Alert",
      message:message
  })
}

</script>

<template>
  <q-page class="row justify-center">
    <div class="col-12 col-sm-6 col-md-5">
      <h3>Register</h3>
      <q-form
        @submit.prevent="handleSubmit"
      >
        <q-input
          v-model="email"
          label="Ingrese email"
          type="text"
          :rules="[
             (val) => (val && /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(val)) || 'Formato de email incorrecto'
             ]"
        >
        </q-input>
        <q-input
          v-model="password"
          label="Ingrese contraseña"
          type="password"
          :rules="[
             val => val && val.length > 5 || 'Contraseña mínimo 6 caracteres'
             ]"
        >
        </q-input>

        <q-input
          v-model="repassword"
          label="Repita la contraseña"
          type="password"
          :rules="[
            (val) =>
             (val && val === password) || 'No coinciden las contraseñas'
             ]"
        >
        </q-input>
        <div>
          <q-btn label="Login" type="submit">

          </q-btn>
        </div>
      </q-form>
    </div>

  </q-page>

</template>


<style>

</style>
