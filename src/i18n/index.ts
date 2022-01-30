import { createI18n } from 'vue-i18n';
import zhCNLocale from 'element-plus/lib/locale/lang/zh-cn';
import enLocale from 'element-plus/lib/locale/lang/en';
import { store } from '/@/store';

import nextZhCN from '/@/i18n/lang/zh-cn';
import nextEn from '/@/i18n/lang/en';

import pagesLoginZhCN from '/@/i18n/pages/login/zh-cn';
import pagesLoginEn from '/@/i18n/pages/login/en';

// 定义语言国际化内容
/**
 * 说明：
 * /src/i18n/lang 下的 ts 为框架的国际化内容
 * /src/i18n/pages 下的 ts 为各界面的国际化内容
 */
const messages = {
  [zhCNLocale.name]: {
    ...zhCNLocale,
    message: {
      ...nextZhCN,
      ...pagesLoginZhCN,
    },
  },
  [enLocale.name]: {
    ...enLocale,
    message: {
      ...nextEn,
      ...pagesLoginEn,
    },
  },
};

// 导出语言国际化
export const i18n = createI18n({
  locale: store.state.themeConfig.themeConfig.globalI18n,
  fallbackLocale: zhCNLocale.name,
  messages,
});
