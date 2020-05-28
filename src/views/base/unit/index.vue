<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px" class="formItem">
      <el-form-item :label="$t('unit.HeadOfficeCode')">
        <el-input v-model="searchInfo.serialnumber" class="inputWidth" />
      </el-form-item>
      <el-form-item :label="$t('unit.UnitName')">
        <el-input v-model="searchInfo.name" class="inputWidth" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchUnit">{{$t('table.search')}}</el-button>
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
                @click="batchDeleteUnit"
              >{{ $t('pmedicines.PDelete') }}</el-button>
              <el-button
                class="buRight"
                type="primary"
                icon="el-icon-download"
                @click="batchFull"
              >{{ $t('pmedicines.Lower') }}</el-button>
              <el-button
                type="success"
                class="buRight"
                icon="el-icon-plus"
                @click="showDialog"
              >{{$t('table.add')}}</el-button>
            </el-row>
            <el-table
              :data="tableData"
              border
              stripe
              v-loading="loading"
              ref="unitTable"
              style="width: 99.9%;height:100%;overflow:hidden;"
            >
              <el-table-column type="selection" align="center" width="55"></el-table-column>
              <!-- 总部编码 -->
              <el-table-column
                prop="serialnumber"
                :show-overflow-tooltip="true"
                :label="$t('unit.HeadOfficeCode')"
                width="300"
                align="center"
              ></el-table-column>
              <!-- 项目名称 -->
              <el-table-column
                prop="name"
                :show-overflow-tooltip="true"
                :label="$t('unit.UnitName')"
                width="400"
              ></el-table-column>
              <!-- 英文名称 -->
              <el-table-column
                prop="englishname"
                :show-overflow-tooltip="true"
                :label="$t('unit.EnglishName')"
                width="300"
              ></el-table-column>
              <!-- 创建时间 -->
              <el-table-column :label="$t('unit.CreateTime')" align="center" width="250">
                <template slot-scope="scope">
                  <i class="el-icon-time"></i>
                  <span style="margin-left: 2px">{{ scope.row.createdate | dateFormat}}</span>
                </template>
              </el-table-column>
              <el-table-column fixed="right" label="操作" width="250">
                <template slot-scope="scope">
                  <el-button
                    icon="el-icon-edit"
                    size="mini"
                    @click="editUnitInfo(scope.row.id)"
                  >{{$t('table.edit')}}</el-button>
                  <el-button
                    icon="el-icon-delete"
                    type="danger"
                    size="mini"
                    @click="deleteUnit(scope.row.id)"
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
    <el-dialog :title="$t('unit.AddUnit')" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="form" :label-width="formLabelWidth">
        <el-form-item :label="$t('unit.UnitName')">
          <el-input v-model="form.name" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="hideDialog">{{$t('table.cancel')}}</el-button>
        <el-button type="primary" @click="saveUnit">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="$t('unit.EditUnit')" :visible.sync="editVisible" width="30%">
      <el-form :model="editUnitInfomation" :label-width="formLabelWidth">
        <el-form-item :label="$t('unit.UnitName')">
          <el-input v-model="editUnitInfomation.name" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="hideDialog">{{$t('table.cancel')}}</el-button>
        <el-button type="primary" @click="saveEditUnit">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="$t('unit.BatchFull')" :visible.sync="selectOrgVisible" width="30%" v-loading="vloading">
      <el-form :label-width="formLabelWidth">
        <el-form-item :label="$t('unit.OrgName')">
          <el-select v-model="selectOrgIDArray" multiple>
            <el-option
              v-for="(orgInfo,index) in orgList"
              :label="orgInfo.orgname"
              :value="orgInfo.id"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="hideDialog">{{$t('table.cancel')}}</el-button>
        <el-button type="primary" @click="fullUnit">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination/index";
import vPinyin from "@/common/convertpinyi";

export default {
  components: { Pagination },
  data() {
    return {
      //搜索条件对象
      searchInfo: {
        serialnumber: "", //总部编码
        name: "" //项目名称
      },
      tableData: [],
      dialogFormVisible: false,
      formLabelWidth: "120px",
      total: 0,
      page: 10,
      limit: 10,
      pageSizes: [10, 20, 50, 100],
      loading: false,
      vloading: false,
      params: {
        currentPage: 1,
        pageSize: 10,
        params: {
          parentid: 4355,
          status: 0,
          deleted: 0
        }
      },
      form: {
        name: "",
        englishname: "",
        status: 0,
        parentid: 4355,
        deleted: 0
      },
      isRepeat: false,
      editVisible: false,
      editUnitInfomation: {
        id: null,
        name: "",
        englishname: ""
      },
      selectOrgVisible: false,
      orgList: [],
      selectOrgIDArray: []
    };
  },
  created() {
    var _this = this;
    _this.loadUnitList();
  },
  methods: {
    //加载单位列表
    loadUnitList() {
      var _this = this;
      _this.loading = true;
      _this.$store
        .dispatch("unit/getUnitList", _this.params)
        .then(res => {
          _this.tableData = res.data.list;
          _this.total = res.data.total;
          _this.page = res.data.pageNum;
          _this.limit = res.data.pageSize;
          _this.loading = false;
        })
        .catch(() => {
          _this.loading = false;
        });
    },
    //搜索单位
    searchUnit() {
      var _this = this;
      if (!_this.isNullOrEmpty(_this.searchInfo.serialnumber)) {
        _this.params.params.serialnumber = _this.searchInfo.serialnumber;
      } else if (
        _this.isNullOrEmpty(_this.searchInfo.serialnumber) ||
        (_this.params.params.hasOwnProperty("serialnumber") &&
          _this.isNullOrEmpty(_this.params.params.serialnumber))
      ) {
        delete _this.params.params.serialnumber;
      }
      if (!_this.isNullOrEmpty(_this.searchInfo.name)) {
        _this.params.params.name = _this.searchInfo.name;
      } else if (
        _this.isNullOrEmpty(_this.searchInfo.name) ||
        (_this.params.params.hasOwnProperty("name") &&
          _this.isNullOrEmpty(_this.params.params.name))
      ) {
        delete _this.params.params.name;
      }
      _this.loadUnitList();
    },
    //编辑单位
    editUnitInfo(id) {
      var _this = this;
      _this.editUnitInfomation.id = id;
      _this.$store
        .dispatch("unit/getUnitInfo", _this.editUnitInfomation)
        .then(res => {
          if (res.code == 200 && res.data.length > 0) {
            _this.editUnitInfomation.name = res.data[0].name;
            _this.editUnitInfomation.englishname = res.data[0].englishname;
            _this.editVisible = true;
          } else {
            _this.$message({
              showClose: true,
              message: "网络出错，请稍后重试",
              type: "error"
            });
          }
        })
        .catch(() => {
          _this.loading = false;
        });
    },
    deleteUnit(id) {
      var _this = this;
      this.$confirm("确认要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        if (_this.isRepeat) {
          return;
        }
        _this.isRepeat = true;
        var ids = [];
        ids.push(id);
        _this.deleteUnitInfo(ids);
      });
    },
    deleteUnitInfo(ids) {
      var _this = this;
      _this.$store
        .dispatch("commondelete/deleteInfo", { ids: ids, tableType: 0 })
        .then(res => {
          if (res.code == 200) {
            _this.$message({
              showClose: true,
              type: "success",
              message: "删除成功"
            });
            _this.loadUnitList();
          } else {
            _this.$message({
              showClose: true,
              message: res.msg,
              type: "error"
            });
          }
          _this.isRepeat = false;
          _this.loading = false;
        })
        .catch(() => {
          _this.isRepeat = false;
          _this.loading = false;
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
      _this.editVisible = false;
      _this.selectOrgVisible = false;
    },
    saveUnit() {
      var _this = this;
      if (_this.isRepeat) {
        return;
      }
      _this.isRepeat = true;
      if (_this.isNullOrEmpty(_this.form.name)) {
        _this.$message({
          showClose: true,
          message: "请填写项目名称",
          type: "error"
        });
        _this.isRepeat = false;
        return;
      }
      _this.form.englishname = vPinyin.chineseToPinYin(_this.form.name);
      _this.dialogFormVisible = false;
      _this.$store
        .dispatch("unit/insertUnitInfo", _this.form)
        .then(res => {
          if (res.code == 200) {
            _this.$message({
              showClose: true,
              type: "success",
              message: "添加成功"
            });
            _this.form.name = "";
            _this.form.englishname = "";
            _this.loadUnitList();
          } else {
            _this.$message({
              showClose: true,
              message: res.msg,
              type: "error"
            });
          }
          _this.isRepeat = false;
          _this.loading = false;
        })
        .catch(() => {
          _this.isRepeat = false;
          _this.loading = false;
        });
    },
    saveEditUnit() {
      var _this = this;
      if (_this.isRepeat) {
        return;
      }
      _this.isRepeat = true;
      if (_this.isNullOrEmpty(_this.editUnitInfomation.name)) {
        _this.$message({
          showClose: true,
          message: "请填写项目名称",
          type: "error"
        });
        _this.isRepeat = false;
        return;
      }
      console.log("处理前的数据为", _this.editUnitInfomation);
      _this.editUnitInfomation.englishname = vPinyin.chineseToPinYin(
        _this.editUnitInfomation.name
      );
      console.log("处理后的数据为", _this.editUnitInfomation);
      _this.$store
        .dispatch("unit/updateUnitInfo", _this.editUnitInfomation)
        .then(res => {
          if (res.code == 200) {
            _this.$message({
              showClose: true,
              type: "success",
              message: "编辑成功"
            });
            _this.editVisible = false;
            _this.loadUnitList();
          } else {
            _this.$message({
              showClose: true,
              message: res.msg,
              type: "error"
            });
          }
          _this.isRepeat = false;
          _this.loading = false;
        })
        .catch(() => {
          _this.isRepeat = false;
          _this.loading = false;
        });
    },
    //判断内容是否为空
    isNullOrEmpty(content) {
      return content == null || content == undefined || content == "";
    },
    /**
     * 分页点击事件
     */
    pagination(param) {
      var _this = this;
      _this.params.currentPage = param.page;
      _this.params.pageSize = param.limit;
      _this.loadUnitList();
    },
    /**
     * 格式化时间
     */
    dateFormat: function(row, column) {
      var _this = this;
      if (_this.isNullOrEmpty(row.insertdate)) return "";
      //row 表示一行数据, updateTime 表示要格式化的字段名称
      return dateFormat(row.insertdate);
    },
    batchDeleteUnit() {
      var _this = this;
      var ids = _this.$refs.unitTable.selection.map(function(info) {
        return info.id;
      });
      if (ids.length <= 0) {
        _this.$message({
          showClose: true,
          message: "请至少选择一行单位",
          type: "error"
        });
        return;
      }
      this.$confirm("确认要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        _this.deleteUnitInfo(ids);
      });
    },
    loadOrgList() {
      var _this = this;
      _this.$store
        .dispatch("org/selectBranIdByOrgId")
        .then(res => {
          _this.orgList = res;
        })
        .catch(() => {
          _this.loading = false;
        });
    },
    batchFull() {
      var _this = this;
      _this.loadOrgList();
      _this.selectOrgVisible = true;
    },
    fullUnit() {
      var _this = this;
      if (_this.isRepeat) {
        return;
      }
      _this.isRepeat = true;
      if (_this.selectOrgIDArray.length <= 0) {
        _this.$message({
          showClose: true,
          message: "请选择机构名称",
          type: "error"
        });
        _this.isRepeat = false;
        return;
      }
      var _this = this;
      _this.vloading = true;
      console.log("下发前选择的机构为",_this.selectOrgIDArray)
      _this.$store
        .dispatch("hq/psyslistHq", {status:0,orgIds:_this.selectOrgIDArray})
        .then(res => { 
          if(res.data.code!=200){
             _this.$message({
                showClose: true,
                message: res.data.message,
                type: "error"
              });
          }else{
               _this.$message({
                showClose: true,
                message: "执行成功",
                type: "success"
              });
          }
          _this.selectOrgVisible=false;
          _this.isRepeat = false;
          _this.vloading = false;
        })
        .catch(() => {
          _this.selectOrgVisible=false;
          _this.isRepeat = false;
          _this.vloading = false;
        });
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
  .el-select {
    width: 100%;
  }
}
</style>

