import { createI18n } from 'vue-i18n';
import pinia from '/@/stores/index';
import { storeToRefs } from 'pinia';
import { useThemeConfig } from '/@/stores/themeConfig';
import zhCNLocale from 'element-plus/lib/locale/lang/zh-cn';
import enLocale from 'element-plus/lib/locale/lang/en';

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

// 读取 pinia 默认语言
const stores = useThemeConfig(pinia);
const { themeConfig } = storeToRefs(stores);

// 导出语言国际化
// https://vue-i18n.intlify.dev/guide/essentials/fallback.html#explicit-fallback-with-one-locale
export const i18n = createI18n({
  silentTranslationWarn: true,
  missingWarn: false,
  silentFallbackWarn: true,
  fallbackWarn: false,
  locale: themeConfig.value.globalI18n,
  fallbackLocale: zhCNLocale.name,
  messages,
});
