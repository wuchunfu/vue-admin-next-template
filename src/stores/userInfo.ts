import { defineStore } from 'pinia';
import Cookies from 'js-cookie';
import { UserInfosStates } from './interface';
import { Session } from '/@/utils/storage';

/**
 * 用户信息
 * @methods setUserInfos 设置用户信息
 */
export const useUserInfo = defineStore('userInfo', {
  state: (): UserInfosStates => ({
    userInfos: {
      userName: '',
      photo: '',
      time: 0,
      roles: [],
      authBtnList: [],
    },
  }),
  actions: {
    async setUserInfos() {
      // 存储用户信息到浏览器缓存
      if (Session.get('userInfo')) {
        this.userInfos = Session.get('userInfo');
      } else {
        this.userInfos = await this.getApiUserInfo() as any;
      }
    },
    // 模拟接口数据
    async getApiUserInfo() {
      return new Promise((resolve) => {
        setTimeout(() => {
          // 模拟数据，请求接口时，记得删除多余代码及对应依赖的引入
          const userName = Cookies.get('userName');
          // 用户信息模拟数据
          const userInfos: any = {
            userName: userName,
            photo: '/logo.png',
            time: new Date().getTime(),
            roles: ['admin', 'common'],
          };
          resolve(userInfos);
        }, 3000);
      });
    },
  },
});
