import { defineStore } from 'pinia'
import { ref } from 'vue';
import { api } from 'src/boot/axios';


export const useUserStore = defineStore('user',() => {
  const token = ref(null);
  const expiresIn = ref(null);

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
      sessionStorage.setItem('user',true);
      setTime();
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      const res = await api.get("/auth/logout");

    } catch (error) {
      console.log(error);
    } finally {
      sessionStorage.removeItem('user');
      resetStore();
    }
  }


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
      sessionStorage.setItem('user',true);
      console.log(res.data);
      setTime();
    } catch (error) {
      console.log(error);
      sessionStorage.removeItem('user');
    }
  };

  const resetStore = () => {
    token.value = null;
    expiresIn.value = null;

  }

  return {
    token,
    expiresIn,
    access,
    refreshToken,
    logout
  }
})
