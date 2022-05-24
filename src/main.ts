import { createApp } from 'vue';
import App from '/@/App.vue';
import router from '/@/router';
import pinia from '/@/stores/index';
import { directive } from '/@/utils/directive';
import { i18n } from '/@/i18n';
import other from '/@/utils/other';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import '/@/theme/index.scss';
import mitt from 'mitt';

const app = createApp(App);

directive(app);
other.elSvg(app);

app.use(pinia)
  .use(router)
  .use(ElementPlus, { i18n: i18n.global.t })
  .use(i18n)
  .mount('#app');

app.config.globalProperties.mittBus = mitt();
