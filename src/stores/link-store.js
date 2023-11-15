import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { useUserStore } from './user-store'
import { ref } from 'vue';

export const useLinkStore = defineStore('link', () => {

  const userStore = useUserStore();

  const links = ref([]);

  const createLink = async (longLink) => {
    try {
      const res = await api({
        method: "POST",
        url:'/links',
        headers:{
          Authorization: "Bearer " + userStore.token
        },
        data: {
          longLink:longLink
        }
      })
      console.log(res.data)
      links.value.push(res.data.newLink);
    } catch (error) {
      console.log(error.response.data || error)
      throw error.response.data || error
    }
  }

  const getLinks = async () => {
    try {
      console.log('llamando a todos los links!!')
      const res = await api({
        url:'/links',
        method:'GET',
        headers: {
          Authorization: "Bearer " + userStore.token,
        }
      })
      console.log(res.data.links)
      links.value = res.data.links.map(item => item);
      // links.value = [...res.data.links]; SPREAD OPERATOR
    } catch (error) {
      // console.log(error.response.data || error)
      throw error.response.data || error
    }
  };

  getLinks();

  return {
    createLink,
    links
  }
})
