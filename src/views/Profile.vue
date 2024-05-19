<template>
  <div class="profile">
    <h2>{{ $t('profile.title') }}</h2>
    <div v-if="profile">
      <p>{{ $t('profile.firstName') }}: {{ profile.first_name }}</p>
      <p>{{ $t('profile.lastName') }}: {{ profile.last_name }}</p>
      <img :src="getLink(profile.avatar)" alt="Profile Image" v-if="profile.avatar" />
    </div>
    <div class="btns">
      <button class="logout-button" @click="logout">{{ $t('profile.logout') }}</button>
      <button class="close-button" @click="$emit('close')">{{ $t('profile.closeProfile') }}</button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useAuthStore, useGlobalStore } from '@src/store/index.js';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const profile = computed(() => authStore.profile);
const router = useRouter();
const globalStore = useGlobalStore();
const logout = async () => {
  await authStore.logout();
  await router.push('/login');
};

const getLink = (id) => `${globalStore.baseURL}/assets/${id}`;
</script>

<style scoped>
.profile {
  display: flex;
  flex-direction: column;
  height: fit-content;
  text-align: center;

  & .btns {
    display: flex;
    flex-direction: row;
    width: 250px;
    gap: 20px;
    align-items: center;
    margin-left: 30px;
  }
}

.close-button {
  background-color: #ccc;
  color: #333;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  //margin-top: 10px;
  transition: background-color 0.3s ease;
}

.close-button:hover {
  background-color: #bbb;
}

.logout-button {
  background-color: #ff4b5c;
  color: #fff;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  //margin-top: 50px;
  transition: background-color 0.3s ease;
}

.logout-button:hover {
  background-color: #ff1c33;
}
</style>
