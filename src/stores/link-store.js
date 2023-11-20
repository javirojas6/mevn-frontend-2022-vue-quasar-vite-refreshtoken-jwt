import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { useUserStore } from './user-store'
import { ref } from 'vue';
import { useQuasar } from 'quasar';

export const useLinkStore = defineStore('link', () => {

  const userStore = useUserStore();

  const links = ref([]);
  const $q = useQuasar();

  const createLink = async (longLink) => {
    $q.loading.show();
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
    } finally {
      $q.loading.hide();
    }
  }

  const getLinks = async () => {
    $q.loading.show();
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
    } finally {
      $q.loading.hide();
    }
  };

  getLinks();

  const removeLink = async(_id) => {
    $q.loading.show();
    try {
      console.log(_id)
      await api({
        url:`/links/${_id}`,
        method:'DELETE',
        headers: {
          Authorization: "Bearer " + userStore.token,
        }
      });
      links.value = links.value.filter(item => item._id != _id);
    } catch (error) {
      console.log(error.response.data || error)
      throw error.response.data || error
    } finally {
      $q.loading.hide();
    }
  }

  const editLink = async(newLink) => {
    $q.loading.show();
    try {
      await api({
        url:`/links/${newLink._id}`,
        method:'PATCH',
        data: {
          longLink: newLink.longLink
        },
        headers: {
          Authorization: "Bearer " + userStore.token,
        }
      });
      console.log('actualizado')
      links.value = links.value.map((item) => item._id === newLink._id ? newLink : item);
    } catch (error) {
      console.log(error.response.data || error)
      throw error.response.data || error
    } finally {
      $q.loading.hide();
    }
  }

  return {
    createLink,
    links,
    getLinks,
    removeLink,
    editLink
  }
})
