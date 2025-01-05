import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    isLogged: false,
    loggedInUser: null,
  }),
  actions: {
    login(userData) {
      const { token, picture, googleToken, ...rest } = userData;
      const userLogged = {
        ...rest,
        token,
        picture,
        googleToken
      };
      this.loggedInUser = { ...rest };
      localStorage.setItem('user', JSON.stringify(userData));
      this.isLogged = true;
      this.loggedInUser = userLogged;
    },
    logout() {
      localStorage.removeItem('user');
      this.isLogged = false;
      this.loggedInUser = null;
      window.location.href = '/';
    },
  },
});