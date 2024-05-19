 <template>
  <div class="auth-modal">
    <h2 class="title">{{ $t('auth.login') }}</h2>
    <form @submit.prevent="login">
      <div class="label">
        <label for="email">{{ $t('auth.login') }}</label>
        <input id="email" v-model="email" type="email" placeholder="Email" required />
      </div>
      <div class="label">
        <label for="password">{{ $t('auth.password') }}</label>
        <input id="password" type="password" v-model="password" placeholder="Password" required />
      </div>
      <div class="forgot-password">
        <button @click.prevent="forgotPassword">{{ $t('auth.forgotPassword') }}</button>
      </div>
      <div class="enter">
        <button type="submit" :disabled="!email || !password">{{ $t('auth.loginButton') }}</button>
      </div>
    </form>
    <div v-if="error">{{ error }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore, useGlobalStore } from '@src/store/index.js';
import { useRouter } from 'vue-router';
import axios from 'axios';

const globalStore = useGlobalStore();

const email = ref('');
const password = ref('');
const error = ref('');
const authStore = useAuthStore();
const router = useRouter();

const login = async () => {
  error.value = ''; // Очищаем предыдущие ошибки

  try {
    const response = await axios.post(`${globalStore.baseURL}/auth/login`, {
      email: email.value,
      password: password.value,
    });

    console.log('Login response:', response.data);

    const { access_token, refresh_token } = response.data.data;

    console.log('Access Token:', access_token);
    console.log('Refresh Token:', refresh_token);

    await authStore.login({ access_token, refresh_token });

    console.log('Authentication state:', authStore.isAuthenticated);

    if (authStore.isAuthenticated) {
      await router.push('/content');
    } else {
      error.value = 'Аутентификация не удалась';
    }
  } catch (err) {
    console.error('Login failed', err);
    if (err.response) {
      error.value = err.response.data.message || 'Ошибка запроса';
    } else {
      error.value = 'Произошла ошибка';
    }
  }
};

const forgotPassword = () => {
  console.log('Forgot Password clicked');
};
</script>


<style lang="scss">
.auth-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 430px;
  height: 500px;
  background-color: #FFFFFF;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 6px 8px 5px rgba(0, 0, 0, 0.29);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-family: 'Graphik LCG', sans-serif;
  text-align: left;
}

.label {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

.label label {
  margin-bottom: 7px;
  font-size: 12px;
  color: #999999;
}

.title {
  font-size: 42px;
  font-weight: 600;
  margin-bottom: 10px;
}

.registration-text {
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  span {
    color: black;
    margin-right: 5px;
  }

  button {
    color: #2ED2BA;
    border: none;
    background-color: transparent;
    cursor: pointer;
    padding: 0;
    font-size: 15px;
  }
}

input[type="email"],
input[type="password"] {
  width: 350px;
  height: 30px;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #CCCCCC;
  border-radius: 5px;
  background-color: #F2F1F3;
}

.enter button {
  width: 105px;
  height: 50px;
  margin-bottom: 10px;
  border: none;
  border-radius: 6px;
  padding: 17px 30px;
  color: #CECECF;
  cursor: pointer;
  background-color: #F2F1F3;
  transition: background-color 0.3s ease;

  &:not(:disabled) {
    background-color: #2ED2BA;
    color: #FFFFFF;
  }
  &:hover {
    background-color: #1CA892;
  }
}

.forgot-password button {
  display: flex;
  justify-content: left;
  color: #2ED2BA;
  background-color: #FFFFFF;
  border: none;
  margin-bottom: 80px;
  font-weight: 400;
  font-size: 15px;

  &:hover {
    color: #1CA892;
    text-decoration: underline;
    cursor: pointer;
  }
}

.enter:disabled {
  background-color: #CCCCCC;
  cursor: not-allowed;
}
</style>

