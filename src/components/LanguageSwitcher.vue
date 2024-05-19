<template>
  <div class="language-selector">
    <button
        :class="{ active: locale.value === 'en' }"
        @click="switchLanguage('en')">English</button>
    <button
        :class="{ active: locale.value === 'ru' }"
        @click="switchLanguage('ru')">Русский</button>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

const { locale } = useI18n({ useScope: 'global' });

const switchLanguage = (language) => {
  locale.value = language;
};
</script>

<style lang="scss" scoped>
@import '../variables/colors.scss';

.language-selector {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
  gap: 10px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  border: 2px solid $language-button-text-border;
  border-radius: 5px;
  background-color: $language-button-bg-hover;
  color: $auth-modal-bg;
  cursor: pointer;
  transition: all 0.3s ease;
}

button:hover {
  color: $language-button-bg-hover;
  background-color: $auth-modal-bg;
}

button.active {
  background-color: $language-button-active-bg;
  color: $auth-modal-bg;
}
</style>



