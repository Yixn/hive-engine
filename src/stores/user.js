import { defineStore } from 'pinia';
import { emitter } from '../plugins/mitt';
import { useCardStore } from './card';
import { useStore } from '.';

export const useUserStore = defineStore({
  id: 'user',

  state: () => ({
    username: '',
  }),

  getters: {
    isLoggedIn: (state) => Boolean(state.username),
  },

  actions: {
    async requestLogin(username) {
      const ts = Date.now();

      if (window.hive_keychain) {
        emitter.emit('login-awaiting');

        const store = useStore();

        const { success } = await store.requestKeychain('requestSignBuffer', username, `${username}${ts}`, 'Posting');

        if (success) {
          this.username = username;

          localStorage.setItem('username', username);
        }

        emitter.emit('login-done');

        let { redirect } = this.router.currentRoute.value.query;

        if (redirect) {
          try {
            redirect = JSON.parse(atob(redirect));

            if (this.router.hasRoute(redirect.name)) {
              await this.router.push(redirect);
            }
          } catch (e) {
            this.router.replace({ query: {} });
          }
        }
      }
    },

    requestLogout() {
      const cardStore = useCardStore();

      this.username = '';
      cardStore.player = null;

      localStorage.removeItem('username');
      localStorage.removeItem('sl_expiration');
      localStorage.removeItem('sl_token');

      this.router.push('/');
    },
  },
});
