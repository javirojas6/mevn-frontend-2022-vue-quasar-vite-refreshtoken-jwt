import { defineStore } from 'pinia'
import { ref } from 'vue';
import { api } from 'src/boot/axios';


export const useUserStore = defineStore('user',() => {
  const token = ref(null);
  const expiresIn = ref(null);

  const access = async (email,password) => {
    try {
      const res = await api.post("/auth/login", {
        email: email,
        password: password,
      });
      console.log(res.data);
      console.log(res.data.token);
      token.value = res.data.token;
      expiresIn.value = res.data.expiresIn;
      sessionStorage.setItem('user',true);
      setTime();
    } catch (error) {
      if (error.response){
        console.log(error.response.data);
        throw (error.response.data)
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error',error.message);
      }
    }
  };

  const register = async (email,password,repassword) => {
    try {
      const res = await api.post("/auth/register", {
        email: email,
        password: password,
        repassword: repassword,
      });
      console.log(res.data);
      console.log(res.data.token);
      token.value = res.data.token;
      expiresIn.value = res.data.expiresIn;
      sessionStorage.setItem('user',true);
      setTime();
    } catch (error) {
      if (error.response){
        console.log(error.response.data);
        throw (error.response.data)
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error',error.message);
      }
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
    register,
    refreshToken,
    logout
  }
})
