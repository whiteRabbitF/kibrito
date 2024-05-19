<template>
  <div class="container">
    <RestaurantList />
    <div class="profile-dropdown">
      <button class="profile-button" @click="toggleProfile">{{ $t('profile.showProfile') }}</button>
      <div v-if="isProfileVisible" class="profile-info">
        <Profile @close="closeProfile" class="close"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@src/store/index.js';
import RestaurantList from '@src/views/RestaurantList.vue';
import Profile from '@src/views/Profile.vue';

const isProfileVisible = ref(false);
const authStore = useAuthStore();

const toggleProfile = () => {
  isProfileVisible.value = !isProfileVisible.value;
};

const closeProfile = () => {
  isProfileVisible.value = false;
};
</script>

<style scoped>
@import '../variables/colors.scss';

.container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.profile-dropdown {
  position: absolute;
  top: 20px;
  right: 20px;
}

.profile-button {
  width: 150px;
  height: 70px;
  border-radius: 30px;
  background-color: #2ED2BA;
  border: none;
  color: #FFFFFF;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  position: absolute;
  top: -150px;
  right: 30px;
}

.profile-button:hover {
  background-color: $content-profile-button-bg-hover;
}

.profile-info {
  position: absolute;
  top: -70px;
  right: 0;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 10px;
  width: 200px;
}
</style>







