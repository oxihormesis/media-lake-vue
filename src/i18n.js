import Vue from 'vue';
import store from './store'
import VueI18n from 'vue-i18n';
import en from './assets/i18n/en.json'
import es from './assets/i18n/es.json'
import fr from './assets/i18n/fr.json'
import ru from './assets/i18n/ru.json'

Vue.use(VueI18n);

export default new VueI18n({
    locale: store.state.Lang || 'en',
    messages: {
        en: en,
        es: es,
        fr: fr,
        ru: ru
    }
})