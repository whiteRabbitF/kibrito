import { createI18n } from 'vue-i18n';

const messages = {
    en: {
        auth: {
            login: 'Login',
            username: 'Username',
            password: 'Password',
            loginButton: 'Login',
            forgotPassword: 'Forgot password?'
        },
        profile: {
            title: 'Profile',
            firstName: 'First Name',
            lastName: 'Last Name',
            logout: 'Logout',
            showProfile: 'Show Profile Info',
            closeProfile: 'Close',
        },
        restaurantList: {
            title: 'List of Restaurants',
        },
    },
    ru: {
        auth: {
            login: 'Войти',
            username: 'Имя пользователя',
            password: 'Пароль',
            loginButton: 'Войти',
            forgotPassword: 'Забыли пароль?'
        },
        profile: {
            title: 'Профиль',
            firstName: 'Имя',
            lastName: 'Фамилия',
            logout: 'Выйти',
            showProfile: 'Показать информацию об аккаунте',
            closeProfile: 'Закрыть',
        },
        restaurantList: {
            title: 'Список ресторанов',
        },
    },
};

const i18n = createI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages,
});

export default i18n;


