<template>
  <a-card :bordered="false">
    <!--搜索条件-->
    <a-form class="searchForm">
      <a-row :gutter="24">
        <a-col :span="8" :lg="6">
          <a-form-item
            label="规则名称"
            :labelCol="searchFormLayout.labelCol"
            :wrapperCol="searchFormLayout.wrapperCol">
            <a-input  placeholder="请输入规则名称"/>
          </a-form-item>
        </a-col>
        <!--规则名称-->
        <a-col :span="8" :lg="6">
          <a-form-item
            label="规则名称"
            :labelCol="searchFormLayout.labelCol"
            :wrapperCol="searchFormLayout.wrapperCol">
            <a-select showSearch :style="{width: '100%'}" placeholder="选择一个规则">
              <a-select-option value="jack">Jack</a-select-option>
              <a-select-option value="lucy">Lucy</a-select-option>
              <a-select-option value="tom">Tom</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <!--更新日期-->
        <a-col :span="8" :lg="6">
          <a-form-item
            label="更新日期"
            :labelCol="searchFormLayout.labelCol"
            :wrapperCol="searchFormLayout.wrapperCol">
            <a-date-picker :style="{width: '100%'}"/>
          </a-form-item>
        </a-col>
        <a-col :span="24" :lg="6" class="action">
          <a-button type="primary">查询</a-button>
          <a-button>重置</a-button>
        </a-col>
      </a-row>
    </a-form>
    <!--操作按钮-->
    <div class="table-operations">
      <a-button type="primary" icon="plus">新建</a-button>
      <a-button type="primary" icon="file-excel">导出</a-button>
      <a-button type="primary" icon="printer">打印</a-button>
    </div>
    <!--选择信息-->
    <a-alert
      class="table-operations"
      :message="`已选择 ${selectedUsers.length} 项, 公调用 ${getSelectedCalls} 次`"
      description=""
      showIcon></a-alert>

    <a-spin :spinning="loading">
      <!--表格数据-->
      <a-table :dataSource="users" :rowSelection="rowSelection" :columns="columns" rowKey="id">
        <!--操作slot-->
        <div slot="user" slot-scope="text">
          <router-link :to="`/admin/users/${text.id}`">编辑</router-link>
          <a-divider type="vertical"/>
          <a href="" @click.prevent="deleteUser(text)">删除</a>
        </div>
      </a-table>
    </a-spin>
  </a-card>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator';
import { observer } from 'mobx-vue';
import UserService from '../../services/User';

const us = new UserService();

@observer
@Component
export default class Users extends Vue {
  searchFormLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  columns = [{
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    scopedSlots: {
      filterDropdown: 'filterDropdown',
      filterIcon: 'filterIcon',
      customRender: 'customRender',
    },
  }, {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
    sorter: (a, b) => a.age - b.age,
  }, {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
    width: '25%',
    filters: [{
      text: '安徽',
      value: '安徽',
    }, {
      text: '浙江',
      value: '浙江',
    }],
    onFilter: (value, record) => record.address.indexOf(value) === 0,
  }, {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
  }, {
    align: 'right',
    title: '调用次数(次)',
    dataIndex: 'call',
    key: 'call',
    sorter: (a, b) => a.call - b.call,
  }, {
    align: 'center',
    title: '操作',
    key: 'x',
    scopedSlots: { customRender: 'user' },
  }];

  users = [];
  loading = false;
  confirmLoading = false;
  selectedUsers = [];

  /**
   * 获取选中用户的total次数
   * @returns {*|number}
   */
  get getSelectedCalls() {
    return this.selectedUsers.reduce((pre, cur) => pre + cur.call, 0);
  }

  /**
   * 设置选择的props
   * @returns {{onChange: onChange}}
   */
  get rowSelection() {
    return {
      onChange: (selectedRowKeys, selectedRows) => {
        this.selectedUsers = selectedRows;
      },
    };
  }

  deleteUser(uesr) {
    this.$confirm({
      title: `确认删除用户 ${uesr.name}`,
      okType: 'danger',
      content: '删除用户后将不能再恢复，请谨慎操作！',
      onOk() {},
      onCancel() {},
    });
  }

  load(status) {
    this.loading = status;
  }

  async mounted() {
    const { list } = await us.getUsers();
    this.users = list;
  }
}

</script>

<style lang='less' scoped>
  .searchForm {
    .action {
      text-align: right;
    }
  }

  @media (min-width: 992px) {
    .searchForm {
      .action {
        padding-top: 5px;
        text-align: left;
      }
    }
  }
</style>
