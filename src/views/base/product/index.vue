<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px" class="formItem">
      <el-form-item :label="$t('product.ProductName')">
        <el-input class="inputWidth" />
      </el-form-item>
      <el-form-item :label="$t('product.PersonInCharge')">
        <el-input class="inputWidth" />
      </el-form-item>
      <el-form-item :label="$t('product.Contacts')">
        <el-input class="inputWidth" />
      </el-form-item>
      <el-form-item :label="$t('product.ContactAddress')">
        <el-input class="inputWidth" />
      </el-form-item>
      <el-form-item :label="$t('product.EnterpriseLegalPerson')">
        <el-input class="inputWidth" />
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
              >{{ $t('pmedicines.PDelete') }}</el-button>
              <el-button
                class="buRight"
                type="primary"
                icon="el-icon-download"
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
              style="width: 99.9%;height:100%;overflow:hidden;"
            >
              <el-table-column type="selection" align="center" width="55"></el-table-column>
              <!-- 机构名称 -->
              <el-table-column fixed="left" prop="productname" :label="$t('product.ProductName')" width="200"></el-table-column>
              <el-table-column prop="productname" :label="$t('product.ProductNumber')" width="200"></el-table-column>
              <el-table-column prop="productname" :label="$t('product.PersonInCharge')" width="80"></el-table-column>
              <el-table-column prop="productname" :label="$t('product.Contacts')" width="80"></el-table-column>
              <el-table-column prop="productname" :label="$t('product.ContactPhone')" width="100"></el-table-column>
              <el-table-column prop="productname" :label="$t('product.ContactsOne')" width="80"></el-table-column>
              <el-table-column prop="productname" :label="$t('product.ContactsPhoneOne')" width="100"></el-table-column>
              <el-table-column prop="productname" :label="$t('product.FaxNumber')" width="100"></el-table-column>
              <el-table-column prop="productname" :label="$t('product.ContactAddress')" width="300"></el-table-column>
              <el-table-column prop="productname" :label="$t('product.PostalCode')" width="100"></el-table-column>
              <el-table-column prop="productname" :label="$t('product.EnterpriseLegalPerson')" width="100"></el-table-column>
              <el-table-column prop="productname" :label="$t('product.BusinessLicenseNo')" width="100"></el-table-column>
              <el-table-column prop="productname" :label="$t('product.BusinessScope')" width="300"></el-table-column>
              
              <el-table-column fixed="right" label="操作" width="250">
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    size="small"
                    @click="showDetail(scope.row)"
                  >{{$t('unit.ShowDetail')}}</el-button>
                  <el-button
                    type="text"
                    size="small"
                    @click="editUnit(scope.row)"
                  >{{$t('table.edit')}}</el-button>
                  <el-button
                    type="text"
                    size="small"
                    @click="deleteUnit(scope.row)"
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
        <el-form-item :label="$t('unit.EnglishName')">
          <el-input v-model="form.englishname" />
        </el-form-item>
        <el-form-item :label="$t('unit.Enable')">
          <el-switch v-model="form.status" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="hideDialog">{{$t('table.cancel')}}</el-button>
        <el-button type="primary" @click="saveUnit">{{$t('table.confirm')}}</el-button>
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
      //搜索条件对象
      searchInfo: {
        headofficeCode: "", //总部编码
        unitname: "" //项目名称
      },
      tableData: [],
      dialogFormVisible: false,
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
      loading: false,
      form: {
        name: "",
        englishname: "",
        status: true
      }
    };
  },
  methods: {
    //加载单位列表
    loadUnitList() {
      var _this = this;
      _this.loading = true;
      _this.params.params.category = _this.categoryId;
      _this.$store
        .dispatch("unit/getPsysListBykey", _this.params)
        .then(res => {
          console.log("加载单位的列表数据为", res);
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
    //搜索单位
    searchUnit() {
      var _this = this;
      console.log("点击了搜索按钮", _this.unit);
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
    //编辑单位
    editUnit(rowObject) {
      var _this = this;
      console.log("点击了编辑单位");
      _this.$notify({
        title: "成功",
        message: "点击了编辑单位" + JSON.stringify(rowObject),
        type: "success"
      });
    },
    deleteUnit(rowObject) {
      var _this = this;
      console.log("点击了删除单位");
      _this.$notify({
        title: "成功",
        message: "点击了删除单位" + JSON.stringify(rowObject),
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
    saveUnit() {
      var _this = this;
      if (_this.isRepeat) {
        return;
      }
      _this.isRepeat = true;
      if (_this.isNullOrEmpty(_this.form.orgid)) {
        _this.$message({
          showClose: true,
          message: "请选择机构",
          type: "error"
        });
        _this.isRepeat = false;
        return;
      }
      if (_this.isNullOrEmpty(_this.form.producttype)) {
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
    justify-content: space-around;
  }
  .buRight {
    float: right;
    margin-bottom: 5px;
    margin-right: 2px;
    margin-left: 2px;
  }
}
</style>

