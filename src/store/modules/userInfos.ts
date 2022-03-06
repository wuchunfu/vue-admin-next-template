import { Module } from 'vuex';
import { Session } from '/@/utils/storage';
import { RootStateTypes, UserInfosState } from '/@/store/interface';

const userInfosModule: Module<UserInfosState, RootStateTypes> = {
  namespaced: true,
  state: {
    userInfos: {
      authBtnList: [],
      photo: '',
      roles: [],
      time: 0,
      userName: '',
    },
  },
  mutations: {
    // 设置用户信息
    getUserInfos(state: any, data: any) {
      state.userInfos = data;
    },
  },
  actions: {
    // 设置用户信息
    async setUserInfos({ commit }, data: UserInfosState) {
      if (data) {
        commit('getUserInfos', data);
      } else {
        if (Session.get('userInfo')) {
          commit('getUserInfos', Session.get('userInfo'));
        }
      }
    },
  },
};

export default userInfosModule;
