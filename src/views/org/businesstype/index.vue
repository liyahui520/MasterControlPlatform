<template>
  <div class="app-container">
    <el-container>
      <el-main style="padding:0px 0px 0px 10px">
        <el-card>
          <!-- table区域 -->
          <el-main>
            <el-row>
              <el-button
                class="buRight"
                type="primary"
                icon="el-icon-plus"
                @click="showDialog(true)"
              >{{ $t('table.add') }}</el-button>
            </el-row>
            <el-table
              :data="tableData"
              border
              stripe
              v-loading="loading"
              style="width: 99.9%;height:100%;overflow:hidden;"
            >
              <!-- 机构名称 -->
              <el-table-column prop="OrgName" :label="$t('unit.OrgName')" width="300">
                <template slot-scope="scope">{{scope.row.orgname}}</template>
              </el-table-column>
              <!-- 产品类型 -->
              <el-table-column
                :show-overflow-tooltip="true"
                :label="$t('businessType.ProductType')"
                width="200"
              >
                <template slot-scope="scope">{{businessType[scope.row.producttype]}}</template>
              </el-table-column>
              <!-- 是否总部管控 -->
              <el-table-column
                :show-overflow-tooltip="true"
                :label="$t('businessType.IsMasterControl')"
                width="300"
              >
                <template slot-scope="scope">{{isMasterControl[scope.row.ordertype]}}</template>
              </el-table-column>
              <!-- 是否已清洗 -->
              <el-table-column
                :show-overflow-tooltip="true"
                :label="$t('businessType.IsClean')"
                align="center"
                width="200"
              >
                <template slot-scope="scope">{{isClean[scope.row.isclean]}}</template>
              </el-table-column>
              <!-- 创建时间 -->
              <el-table-column :label="$t('unit.CreateTime')" align="center" width="210">
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
                    @click="editUnit(scope.row.id)"
                  >{{$t('table.edit')}}</el-button>
                  <el-button
                    icon="el-icon-download"
                    type="primary"
                    size="mini"
                    plain
                    @click="cleanDrugs(scope.row.id,scope.row.orgid)"
                  >{{$t('table.batchClean')}}</el-button>
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
    <el-dialog :title="$t('businessType.AddOrg')" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="form" :label-width="formLabelWidth">
        <el-form-item :label="$t('unit.OrgName')">
          <el-select v-model="form.orgid">
            <el-option
              v-for="(orgInfo,index) in orgList"
              :label="orgInfo.orgname"
              :value="orgInfo.id"
              :key="index"
            />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('businessType.ProductType')">
          <el-select v-model="form.producttype">
            <el-option
              v-for="(typeInfo,index) in businessTypeList"
              :value="typeInfo.id"
              :label="typeInfo.name"
              :key="index"
            >{{typeInfo.name}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('businessType.IsMasterControl')">
          <el-radio-group v-model="form.ordertype">
            <el-radio label="0">未管控</el-radio>
            <el-radio label="1">总部管控</el-radio>
            <el-radio label="2">小暖标准库管控</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="hideDialog">{{$t('table.cancel')}}</el-button>
        <el-button type="primary" @click="saveUnit">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="$t('businessType.EditOrg')" :visible.sync="editVisible" width="30%">
      <el-form :model="businessTypeInfo" :label-width="formLabelWidth">
        <el-form-item :label="$t('unit.OrgName')">
          <el-select v-model="businessTypeInfo.orgid">
            <el-option
              v-for="(orgInfo,index) in editOrgList"
              :label="orgInfo.orgname"
              :value="orgInfo.id"
              :key="index"
            />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('businessType.ProductType')">
          <el-select v-model="businessTypeInfo.producttype">
            <el-option
              v-for="(typeInfo,index) in businessTypeList"
              :value="typeInfo.id"
              :label="typeInfo.name"
              :key="index"
            >{{typeInfo.name}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('businessType.IsMasterControl')">
          <el-radio-group v-model="businessTypeInfo.ordertype">
            <el-radio label="0">未管控</el-radio>
            <el-radio label="1">总部管控</el-radio>
            <el-radio label="2">小暖标准库管控</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="hideDialog">{{$t('table.cancel')}}</el-button>
        <el-button type="primary" @click="saveEdit">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination/index";
import dictionary from "@/common/dictionary.js";
import { dateFormat } from "@/utils/index";
import businessTypeLanguage from "@/lang/zh.js";
export default {
  components: { Pagination },
  data() {
    return {
      tableData: [],
      dialogFormVisible: false,
      editVisible: false,
      formLabelWidth: "120px",
      total: 0,
      page: 10,
      limit: 10,
      pageSizes: [10, 20, 50, 100],
      loading: false,
      params: {
        currentPage: 1,
        pageSize: 10,
        params: {
          
        }
      },
      isRepeat: false,
      businessType: dictionary.businessType,
      orgType: dictionary.orgType,
      isMasterControl: {
        0: "未管控",
        1: "总部管控",
        2: "小暖标准库管控"
      },
      isClean: {
        0: "未清洗",
        1: "已清洗"
      },
      orgList: [],
      businessTypeList: [],
      businessTypeInfo: {},
      editOrgList: [],
      form: {
        producttype: "1046",
        ordertype: "1",
        orgid: null,
        isclean:0
      }
    };
  },
  created() {
    var _this = this;
    _this.loadBusinessTypeList();
    for (const key in _this.businessType) {
      _this.businessTypeList.push({ id: key, name: _this.businessType[key] });
    }
  },
  methods: {
    //一键清洗
    cleanDrugs(id,orgid){
      var _this=this;
      console.log("id为",id)
      console.log("orgid为",orgid)
      if(_this.isRepeat){
        return;
      }
      _this.isRepeat=true;
      _this.loading=true;
      var questInfo={id:id,orgid:id};
      _this.$store
        .dispatch("hq/businessTypeHq",questInfo)
        .then(res => {
          if (res.code == 200) {
            _this.$message({
              showClose: true,
              message: "执行成功",
              type: "success"
            });
          } else {
            _this.$message({
              showClose: true,
              message: res.data.message,
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
    //加载关系表列表
    loadBusinessTypeList() {
      var _this = this;
      _this.loading = true;
      _this.$store
        .dispatch("businesstype/getBusinessTypeList", _this.params)
        .then(res => {
          console.log("返回的关系列表为", res);
          _this.tableData = res.list;
          _this.total = res.total;
          _this.page = res.pageNum;
          _this.limit = res.pageSize;
          _this.loading = false;
        })
        .catch(() => {
          _this.loading = false;
        });
    },
    loadOrgListForAddOrMidify() {
      var _this = this;
      _this.$store
        .dispatch("org/selectBtOrgId")
        .then(res => {
          _this.orgList = res;
        })
        .catch(() => {
          _this.loading = false;
        });
    },
    //编辑单位
    editUnit(id) {
      var _this = this;
      _this.loadEditOrgList();
      _this.$store
        .dispatch("businesstype/getBusinessTypeInfo", { id: id })
        .then(res => {
          if (res.code == 200 && res.data.length > 0) {
            _this.businessTypeInfo = res.data[0];
            _this.businessTypeInfo.producttype=res.data[0].producttype+'';
            _this.businessTypeInfo.ordertype=res.data[0].ordertype+'';
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
    loadEditOrgList() {
      var _this = this;
      _this.$store
        .dispatch("org/selectBranIdByOrgId")
        .then(res => {
          _this.editOrgList = res;
        })
        .catch(() => {
          _this.loading = false;
        });
    },
    //展示弹出层
    showDialog(state) {
      var _this = this;
      _this.dialogFormVisible = true;
      _this.loadOrgListForAddOrMidify();
    },
    //隐藏弹出层
    hideDialog() {
      var _this = this;
      _this.dialogFormVisible = false;
      _this.editVisible = false;
    },
    saveUnit() {
      var _this = this;
      if (_this.isRepeat) {
        return;
      }
      _this.isRepeat = true;
      if (_this.form.orgid == null || _this.form.orgid == "") {
        _this.$message({
          showClose: true,
          message: "请选择机构",
          type: "error"
        });
        _this.isRepeat = false;
        return;
      }
      if (_this.form.producttype == null || _this.form.producttype == "") {
        _this.$message({
          showClose: true,
          message: "请选择产品类型",
          type: "error"
        });
        _this.isRepeat = false;
        return;
      }
      _this.dialogFormVisible = false;
      _this.form.isclean = _this.form.isclean ? 0 : 1;
      _this.form.ordertype = parseFloat(_this.form.ordertype);
      _this.form.producttype = parseFloat(_this.form.producttype);
      _this.$store
        .dispatch("businesstype/insertBusinessType", _this.form)
        .then(res => {
          if (res.code == 200) {
            _this.$message({
              showClose: true,
              type: "success",
              message: "添加成功"
            });
            _this.loadBusinessTypeList();
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
    saveEdit() {
      var _this = this;
      if (_this.isRepeat) {
        return;
      }
      _this.isRepeat = true;
      if (
        _this.businessTypeInfo.orgid == null ||
        _this.businessTypeInfo.orgid == ""
      ) {
        _this.$message({
          showClose: true,
          message: "请选择机构",
          type: "error"
        });
        _this.isRepeat = false;
        return;
      }
      if (
        _this.businessTypeInfo.producttype == null ||
        _this.businessTypeInfo.producttype == ""
      ) {
        _this.$message({
          showClose: true,
          message: "请选择产品类型",
          type: "error"
        });
        _this.isRepeat = false;
        return;
      }
      _this.editVisible = false;
      _this.$store
        .dispatch("businesstype/updateBusinessType", _this.businessTypeInfo)
        .then(res => {
          if (res.code == 200) {
            _this.$message({
              showClose: true,
              type: "success",
              message: "编辑成功"
            });
            _this.loadBusinessTypeList();
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
    /**
     * 分页点击事件
     */
    pagination(param) {
      var _this = this;
      _this.params.currentPage = param.page;
      _this.params.pageSize = param.limit;
      _this.loadBusinessTypeList();
    },
    /**
     * 格式化时间
     */
    dateFormat: function(row, column) {
      //row 表示一行数据, updateTime 表示要格式化的字段名称
      return dateFormat(row.insertdate);
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
  .el-row{
    display: flex;
    flex-direction:row-reverse;
    padding-right: 2px;
    padding-bottom: 5px;
  }
}
</style>

