<template>
  <div class="restaurant-list-container">
    <h2>{{ $t('restaurantList.title') }}</h2>
    <ul class="restaurant-list">
      <li v-for="restaurant in restaurants" :key="restaurant.id" class="restaurant-item">
        <h3>{{ restaurant.title }}</h3>
        <img :src="getLink(restaurant.main_image)" alt="Restaurant Image" v-if="restaurant.main_image" />
        <p v-if="restaurant.geo_point">Coordinates: {{ restaurant.geo_point.coordinates.join(', ') }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useAuthStore, useGlobalStore } from '@src/store/index.js';

const globalStore = useGlobalStore();

const restaurants = ref([]);
const authStore = useAuthStore();

const fetchRestaurants = async () => {
  try {
    const response = await axios.get(`${globalStore.baseURL}/items/restaurants`, {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`,
      },
    });

    const restaurantIds = response.data.data.map(restaurant => restaurant.id);
    console.log('Restaurant IDs:', restaurantIds);

    restaurants.value = response.data.data.map(restaurant => ({
      id: restaurant.id,
      title: restaurant.title || 'No title',
      main_image: restaurant.main_image,
      geo_point: restaurant.geo_point,
    }));
  } catch (error) {
    console.error('Ошибка при запросе', error);
  }
};

const getLink = (id) => `${globalStore.baseURL}/assets/${id}`;

onMounted(() => {
  fetchRestaurants();
});
</script>

<style scoped>
@import '../variables/colors.scss';

.restaurant-list-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

h2 {
  font-size: 32px;
  margin-bottom: 20px;
}

.restaurant-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  list-style: none;
  padding: 0;
}

.restaurant-item {
  background-color: $restaurant-item-bg;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.restaurant-item h3 {
  margin: 10px 0;
  font-size: 24px;
}

.restaurant-item img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
}

.restaurant-item p {
  font-size: 14px;
  color: $restaurant-item-text;
}
</style>
