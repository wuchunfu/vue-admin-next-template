import {MockMethod} from "vite-plugin-mock";
import {mock} from "mockjs";

const listData = mock({
  'list|10': [{
    'id|+1': 0,
    'name': '@cname',
    'status|1': ['published', 'draft', 'deleted'],
    'createTime': '@datetime'
  }]
})

const updateData = mock({
  'list|1': [{
    'id|+1': 0,
    'name': '@cname',
    'status|1': ['published', 'draft', 'deleted'],
    'createTime': '@datetime'
  }]
})

export default [
  {
    url: `/mock/table/list`,
    method: 'get',
    response: ({query}: any) => {
      const {page = 1, pageSize = 10} = query
      let items = listData.list;
      return {
        code: 200,
        data: {
          list: items,
          page: page,
          pageSize: pageSize,
          total: items.length
        },
        msg: 'Get data successful.'
      };
    }
  },
  {
    url: `/mock/table/info/:id`,
    method: 'get',
    response: () => {
      let items = updateData.list;
      return {
        code: 200,
        data: {
          list: items,
          total: items.length
        },
        msg: 'Get data successful.'
      };
    }
  },
  {
    url: `/mock/table/save`,
    method: 'post',
    response: () => {
      return {
        code: 200,
        data: {},
        msg: 'Save data successful.'
      };
    }
  },
  {
    url: `/mock/table/update`,
    method: 'put',
    response: () => {
      return {
        code: 200,
        data: {},
        msg: 'Update data successful.'
      };
    }
  },
  {
    url: `/mock/table/delete/:id`,
    method: 'delete',
    response: () => {
      return {
        code: 200,
        data: {},
        msg: 'Delete data successful.'
      };
    }
  },
] as MockMethod[];
