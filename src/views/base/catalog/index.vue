<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px" class="formItem">
      <el-form-item :label="$t('cataLog.HeadOfficeCode')">
        <el-input v-model="searchInfo.HeadOfficeCode" class="inputWidth" />
      </el-form-item>
      <el-form-item :label="$t('cataLog.CataLogName')">
        <el-input v-model="searchInfo.CateLogName" class="inputWidth" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchCateLog">{{$t('table.search')}}</el-button>
        <el-button type="success" @click="showDialog">{{$t('table.add')}}</el-button>
      </el-form-item>
    </el-form>
    <el-container>
      <el-main style="padding:0px 0px 0px 10px">
        <el-card>
          <!-- table区域 -->
          <el-main>
            <el-row>
              <el-button
                class="buRight"
                type="danger"
                icon="el-icon-delete"
                @click="batchDelete"
              >{{ $t('pmedicines.PDelete') }}</el-button>
              <!-- <el-button
                class="buRight"
                type="primary"
                icon="el-icon-download"
              >{{ $t('pmedicines.Lower') }}</el-button> -->
            </el-row>
            <el-table
              :data="tableData"
              border
              stripe
              style="width: 99.9%;height:100%;overflow:hidden;"
              ref="multipleTable"
            >
              <el-table-column type="selection" align="center" width="55"></el-table-column>
              <!-- 机构名称 -->
              <el-table-column prop="OrgName" :label="$t('cataLog.OrgName')" width="300"></el-table-column>
              <!-- 总部编码 -->
              <el-table-column
                prop="SerialNumber"
                :show-overflow-tooltip="true"
                :label="$t('cataLog.HeadOfficeCode')"
                width="200"
              ></el-table-column>
              <!-- 项目名称 -->
              <el-table-column
                prop="Name"
                :show-overflow-tooltip="true"
                :label="$t('cataLog.CataLogName')"
                width="300"
              ></el-table-column>
              <!-- 英文名称 -->
              <el-table-column
                prop="EnglishName"
                :show-overflow-tooltip="true"
                :label="$t('cataLog.EnglishName')"
                width="200"
              ></el-table-column>
              <!-- 创建时间 -->
              <el-table-column prop="OrgId" :label="$t('cataLog.CreateTime')" width="180"></el-table-column>
              <el-table-column label="操作" width="250">
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    size="small"
                    @click="showDetail(scope.row)"
                  >{{$t('cataLog.ShowDetail')}}</el-button>
                  <el-button
                    type="text"
                    size="small"
                    @click="editCateLog(scope.row)"
                  >{{$t('table.edit')}}</el-button>
                  <el-button
                    type="text"
                    size="small"
                    @click="deleteCateLog(scope.row)"
                  >{{$t('table.delete')}}</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-main>
          <!-- 分页区域 -->
          <el-footer>
            <Pagination
              :total="total"
              :background="true"
              :page="page"
              :limit="limit"
              :pageSizes="pageSizes"
              @pagination="pagination"
            ></Pagination>
          </el-footer>
        </el-card>
      </el-main>
    </el-container>
    <el-dialog :title="$t('cataLog.AddCateLog')" :visible.sync="dialogFormVisible" width="50%">
      <el-form :model="form" :label-width="formLabelWidth">
        <el-form-item :label="$t('cataLog.HeadOfficeCode')">
          <el-input v-model="form.name" class="inputWidth" />
        </el-form-item>
        <el-form-item :label="$t('cataLog.CataLogName')">
          <el-input v-model="form.name" class="inputWidth" />
        </el-form-item>
        <el-form-item :label="$t('cataLog.EnglishName')">
          <el-input v-model="form.name" class="inputWidth" />
        </el-form-item>
        <el-form-item :label="$t('cataLog.Enable')">
          <el-switch v-model="form.delivery" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="hideDialog">{{$t('table.cancel')}}</el-button>
        <el-button type="primary" @click="saveCateLog">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination/index";
export default {
  components: { Pagination },
  data() {
    return {
      form: {
        name: "",
        OrgName: "",
        CateLogName: ""
      },
      //搜索条件对象
      searchInfo: {
        HeadOfficeCode: "", //总部编码
        CateLogName: "" //项目名称
      },
      tableData: [
        {
          OrgId: "45564"
        },
        {
          OrgId: "42345564"
        },
        {
          OrgId: "432"
        },
        {
          OrgId: "45543264"
        },
        {
          OrgId: "45543264"
        }
      ],
      dialogFormVisible: false,
      formLabelWidth: "120px",
      total: 300,
      page: 10,
      limit: 10,
      pageSizes: [10, 20, 50, 100],
      loading: false,
      params: {
        currentPage: 1,
        pageSize: 10,
        params: {
          barCode: "",
          canOrder: -1,
          canSell: -1,
          category: -1,
          deleted: -1,
          drugType: 1046,
          drugsName: "",
          endTime: "",
          id: -1,
          itemCode: "",
          manufacturer: -1,
          providerId: -1,
          startTime: "",
          usingMethod: -1
        }
      }
    };
  },
  methods: {
    batchDelete() {
      var _this = this;
      console.log(_this.$refs.multipleTable.store.states.selection)
    },
    //搜索目录
    searchCateLog() {
      var _this = this;
      _this.$notify({
        title: "成功",
        message: "点击了搜索按钮",
        type: "success"
      });
    },
    showDetail(rowObject) {
      var _this = this;
      console.log("点击了查看按钮");
      _this.$notify({
        title: "成功",
        message: "点击了查看按钮" + JSON.stringify(rowObject),
        type: "success"
      });
    },
    //编辑目录
    editCateLog(rowObject) {
      var _this = this;
      console.log("点击了编辑目录");
      _this.$notify({
        title: "成功",
        message: "点击了编辑目录" + JSON.stringify(rowObject),
        type: "success"
      });
    },
    deleteCateLog(rowObject) {
      var _this = this;
      console.log("点击了删除目录");
      _this.$notify({
        title: "成功",
        message: "点击了删除目录" + JSON.stringify(rowObject),
        type: "success"
      });
    },
    //展示弹出层
    showDialog() {
      var _this = this;
      _this.dialogFormVisible = true;
    },
    //隐藏弹出层
    hideDialog() {
      var _this = this;
      _this.dialogFormVisible = false;
    },
    saveCateLog() {
      var _this = this;
      _this.dialogFormVisible = false;
      _this.$notify({
        title: "成功",
        message: "点击了弹出层的确定按钮",
        type: "success"
      });
    },
    /**
     * 分页点击事件
     */
    pagination(param) {
      console.log(param);
    }
  }
};
</script>

<style scoped lang="scss">
.app-container {
  .formItem {
    display: flex;
    flex-wrap: wrap;
  }
  .buRight {
    float: right;
    margin-bottom: 5px;
    margin-right: 2px;
    margin-left: 2px;
  }
}
</style>

