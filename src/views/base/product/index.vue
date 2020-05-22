<template>
  <div class="app-container">
    <el-form label-width="120px" class="formItem">
      <el-form-item :label="$t('supplier.EnterpriseName')">
        <el-input v-model="enterpriseName" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchSupplier">{{$t('table.search')}}</el-button>
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
              v-loading="loading"
              ref="supplierTable"
              style="width: 99.9%;height:100%;overflow:hidden;"
            >
              <el-table-column type="selection" align="center" width="55"></el-table-column>
              <!-- 机构名称 -->
              <el-table-column
                prop="companyname"
                :label="$t('supplier.EnterpriseName')"
                fixed="left"
                width="200"
              ></el-table-column>
              <el-table-column
                prop="licenseno"
                :label="$t('supplier.EnterpriseNumber')"
                width="200"
              ></el-table-column>
              <el-table-column prop="leader" :label="$t('supplier.PersonInCharge')" width="150"></el-table-column>
              <el-table-column prop="contacter" :label="$t('supplier.Contacts')" width="150"></el-table-column>
              <el-table-column prop="telephone" :label="$t('supplier.ContactPhone')" width="200"></el-table-column>
              <el-table-column prop="contacter1" :label="$t('supplier.ContactsOne')" width="150"></el-table-column>
              <el-table-column
                prop="telephone1"
                :label="$t('supplier.ContactsPhoneOne')"
                width="200"
              ></el-table-column>
              <el-table-column prop="faxnumber" :label="$t('supplier.FaxNumber')" width="200"></el-table-column>
              <el-table-column prop="address" :label="$t('supplier.ContactAddress')" width="300"></el-table-column>
              <el-table-column prop="postalcode" :label="$t('supplier.PostalCode')" width="200"></el-table-column>
              <el-table-column
                prop="enterpriser"
                :label="$t('supplier.EnterpriseLegalPerson')"
                width="200"
              ></el-table-column>
              <el-table-column
                prop="legalerno"
                :label="$t('supplier.BusinessLicenseNo')"
                width="200"
              ></el-table-column>
              <el-table-column
                prop="scopebusiness"
                :label="$t('supplier.BusinessScope')"
                width="300"
              >
                <template slot-scope="scope">
                  <div
                    class="remarkClass"
                    :title="scope.row.scopebusiness"
                  >{{scope.row.scopebusiness}}</div>
                </template>
              </el-table-column>

              <el-table-column fixed="right" label="操作" width="350">
                <template slot-scope="scope">
                  <el-button
                    icon="el-icon-search"
                    @click="showDetail(scope.row.id)"
                  >{{$t('unit.ShowDetail')}}</el-button>
                  <el-button
                    icon="el-icon-edit"
                    @click="editSupplier(scope.row.id)"
                  >{{$t('table.edit')}}</el-button>
                  <el-button
                    icon="el-icon-delete"
                    type="danger"
                    @click="deleteSupplier(scope.row.id)"
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
    <el-dialog
      :title="$t('supplier.AddSupplier')"
      top="10px"
      :visible.sync="dialogFormVisible"
      width="50%"
    >
      <el-form :model="form" :label-width="formLabelWidth">
        <el-form-item :label="$t('supplier.EnterpriseName')">
          <el-input v-model="form.companyname" />
        </el-form-item>
        <el-form-item :label="$t('supplier.EnterpriseNumber')">
          <el-input v-model="form.licenseno" />
        </el-form-item>
        <el-form-item :label="$t('supplier.PersonInCharge')">
          <el-input v-model="form.leader" />
        </el-form-item>
        <el-form-item :label="$t('supplier.Contacts')">
          <el-input v-model="form.contacter" />
        </el-form-item>
        <el-form-item :label="$t('supplier.ContactPhone')">
          <el-input v-model="form.telephone" />
        </el-form-item>
        <el-form-item :label="$t('supplier.ContactsOne')">
          <el-input v-model="form.contacter1" />
        </el-form-item>
        <el-form-item :label="$t('supplier.ContactsPhoneOne')">
          <el-input v-model="form.telephone1" />
        </el-form-item>
        <el-form-item :label="$t('supplier.FaxNumber')">
          <el-input v-model="form.faxnumber" />
        </el-form-item>
        <el-form-item :label="$t('supplier.ContactAddress')">
          <el-input v-model="form.address" />
        </el-form-item>
        <el-form-item :label="$t('supplier.PostalCode')">
          <el-input v-model="form.postalcode" />
        </el-form-item>
        <el-form-item :label="$t('supplier.EnterpriseLegalPerson')">
          <el-input v-model="form.enterpriser" />
        </el-form-item>
        <el-form-item :label="$t('supplier.BusinessLicenseNo')">
          <el-input v-model="form.legalerno" />
        </el-form-item>
        <el-form-item :label="$t('supplier.BusinessScope')">
          <el-input v-model="form.scopebusiness" type="textarea" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="hideDialog">{{$t('table.cancel')}}</el-button>
        <el-button type="primary" @click="saveSupplierInfo">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>
    <el-dialog
      :title="$t('supplier.SupplierDetail')"
      top="10px"
      :visible.sync="supplierDetailVisible"
      width="50%"
    >
      <el-form :model="form" :label-width="formLabelWidth">
        <el-form-item :label="$t('supplier.EnterpriseName')">{{supplierInfo.companyname}}</el-form-item>
        <el-form-item :label="$t('supplier.EnterpriseNumber')">{{supplierInfo.licenseno}}</el-form-item>
        <el-form-item :label="$t('supplier.PersonInCharge')">{{supplierInfo.leader}}</el-form-item>
        <el-form-item :label="$t('supplier.Contacts')">{{supplierInfo.contacter}}</el-form-item>
        <el-form-item :label="$t('supplier.ContactPhone')">{{supplierInfo.telephone}}</el-form-item>
        <el-form-item :label="$t('supplier.ContactsOne')">{{supplierInfo.contacter1}}</el-form-item>
        <el-form-item :label="$t('supplier.ContactsPhoneOne')">{{supplierInfo.telephone1}}</el-form-item>
        <el-form-item :label="$t('supplier.FaxNumber')">{{supplierInfo.faxnumber}}</el-form-item>
        <el-form-item :label="$t('supplier.ContactAddress')">{{supplierInfo.address}}</el-form-item>
        <el-form-item :label="$t('supplier.PostalCode')">{{supplierInfo.postalcode}}</el-form-item>
        <el-form-item :label="$t('supplier.EnterpriseLegalPerson')">{{supplierInfo.enterpriser}}</el-form-item>
        <el-form-item :label="$t('supplier.BusinessLicenseNo')">{{supplierInfo.legalerno}}</el-form-item>
        <el-form-item :label="$t('supplier.BusinessScope')">{{supplierInfo.scopebusiness}}</el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="hideDialog">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>
    <el-dialog
      :title="$t('supplier.EditSupplier')"
      top="10px"
      :visible.sync="editSupplierVisible"
      width="50%"
    >
      <el-form :model="editSupplierInfo" :label-width="formLabelWidth">
        <el-form-item :label="$t('supplier.EnterpriseName')">
          <el-input v-model="editSupplierInfo.companyname" />
        </el-form-item>
        <el-form-item :label="$t('supplier.EnterpriseNumber')">
          <el-input v-model="editSupplierInfo.licenseno" />
        </el-form-item>
        <el-form-item :label="$t('supplier.PersonInCharge')">
          <el-input v-model="editSupplierInfo.leader" />
        </el-form-item>
        <el-form-item :label="$t('supplier.Contacts')">
          <el-input v-model="editSupplierInfo.contacter" />
        </el-form-item>
        <el-form-item :label="$t('supplier.ContactPhone')">
          <el-input v-model="editSupplierInfo.telephone" />
        </el-form-item>
        <el-form-item :label="$t('supplier.ContactsOne')">
          <el-input v-model="editSupplierInfo.contacter1" />
        </el-form-item>
        <el-form-item :label="$t('supplier.ContactsPhoneOne')">
          <el-input v-model="editSupplierInfo.telephone1" />
        </el-form-item>
        <el-form-item :label="$t('supplier.FaxNumber')">
          <el-input v-model="editSupplierInfo.faxnumber" />
        </el-form-item>
        <el-form-item :label="$t('supplier.ContactAddress')">
          <el-input v-model="editSupplierInfo.address" />
        </el-form-item>
        <el-form-item :label="$t('supplier.PostalCode')">
          <el-input v-model="editSupplierInfo.postalcode" />
        </el-form-item>
        <el-form-item :label="$t('supplier.EnterpriseLegalPerson')">
          <el-input v-model="editSupplierInfo.enterpriser" />
        </el-form-item>
        <el-form-item :label="$t('supplier.BusinessLicenseNo')">
          <el-input v-model="editSupplierInfo.legalerno" />
        </el-form-item>
        <el-form-item :label="$t('supplier.BusinessScope')">
          <el-input v-model="editSupplierInfo.scopebusiness" type="textarea" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="hideDialog">{{$t('table.cancel')}}</el-button>
        <el-button type="primary" @click="saveEditSupplier">{{$t('table.confirm')}}</el-button>
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
        unitname: "" //项目名称
      },
      enterpriseName: "",
      tableData: [],
      dialogFormVisible: false,
      supplierDetailVisible: false,
      editSupplierVisible: false,
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
          isdeleted: 0
        }
      },
      isRepeat: false,
      form: {
        companyname: "",
        licenseno: "",
        leader: "",
        contacter: "",
        telephone: "",
        contacter1: "",
        telephone1: "",
        faxnumber: "",
        address: "",
        postalcode: "",
        enterpriser: "",
        legalerno: "",
        scopebusiness: ""
      },
      supplierInfo: {},
      editSupplierInfo: {},
      deleteIds: []
    };
  },
  created() {
    var _this = this;
    _this.loadSupplierList();
  },
  methods: {
    loadSupplierList() {
      var _this = this;
      _this.loading = true;
      if (!_this.isNullOrEmpty(_this.enterpriseName)) {
        _this.params.params.enterpriseName = _this.enterpriseName;
      } else if (
        _this.isNullOrEmpty(_this.enterpriseName) ||
        (_this.params.params.hasOwnProperty("enterpriseName") &&
          _this.isNullOrEmpty(_this.params.params.enterpriseName))
      ) {
        delete _this.params.params.enterpriseName;
      }
      console.log("请求的参数为", _this.params);
      _this.$store
        .dispatch("product/getProductList", _this.params)
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
    searchSupplier() {
      var _this = this;
      _this.loadSupplierList();
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
    deleteSupplier(id) {
      var _this = this;
      var ids = [];
      ids.push(id.toString());
      _this
        .$confirm("确认要删除吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          _this.deleteMethods(ids);
        });
    },
    deleteMethods(ids) {
      var _this = this;
      _this.$store
        .dispatch("commondelete/deleteInfo", {
          ids: ids,
          tableType: 1
        })
        .then(res => {
          if (res.code == 200) {
            _this.$message({
              showClose: true,
              type: "success",
              message: "删除成功"
            });
            _this.deleteIds = [];
            _this.loadSupplierList();
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
    batchDelete() {
      var _this = this;
      _this.deleteIds = _this.$refs.supplierTable.selection.map(function(info) {
        return info.id;
      });
      if (_this.deleteIds.length <= 0) {
        _this.$message({
          showClose: true,
          message: "请至少选择一行供应商",
          type: "error"
        });
        return;
      }
      _this
        .$confirm("确认要删除吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          _this.deleteMethods(_this.deleteIds);
        });
    },
    //展示弹出层
    showDialog() {
      var _this = this;
      _this.dialogFormVisible = true;
    },
    showDetail(id) {
      var _this = this;
      _this.$store
        .dispatch("product/getProductInfo", { id: id })
        .then(res => {
          console.log("返回的数据为", res);
          if (res.code == 200 && res.data.length > 0) {
            _this.supplierInfo = res.data[0];
            _this.supplierDetailVisible = true;
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
    //隐藏弹出层
    hideDialog() {
      var _this = this;
      _this.dialogFormVisible = false;
      _this.supplierDetailVisible = false;
      _this.editSupplierVisible = false;
    },
    //判断内容是否为空
    isNullOrEmpty(content) {
      return content == null || content == undefined || content == "";
    },
    saveSupplierInfo() {
      var _this = this;
      //企业名称、企业编号、负责人、联系电话
      if (_this.isRepeat) {
        return;
      }
      _this.isRepeat = true;
      if (_this.isNullOrEmpty(_this.form.companyname)) {
        _this.$message({
          showClose: true,
          message: "请输入企业名称",
          type: "error"
        });
        _this.isRepeat = false;
        return;
      }
      if (_this.isNullOrEmpty(_this.form.licenseno)) {
        _this.$message({
          showClose: true,
          message: "请输入企业编号",
          type: "error"
        });
        _this.isRepeat = false;
        return;
      }
      if (_this.isNullOrEmpty(_this.form.leader)) {
        _this.$message({
          showClose: true,
          message: "请输入负责人",
          type: "error"
        });
        _this.isRepeat = false;
        return;
      }
      if (_this.isNullOrEmpty(_this.form.telephone)) {
        _this.$message({
          showClose: true,
          message: "请输入联系电话",
          type: "error"
        });
        _this.isRepeat = false;
        return;
      }
      _this.$store
        .dispatch("product/insertProductInfo", _this.form)
        .then(res => {
          if (res.code == 200) {
            _this.$message({
              showClose: true,
              type: "success",
              message: "添加成功"
            });
            _this.form = {
              companyname: "",
              licenseno: "",
              leader: "",
              contacter: "",
              telephone: "",
              contacter1: "",
              telephone1: "",
              faxnumber: "",
              address: "",
              postalcode: "",
              enterpriser: "",
              legalerno: "",
              scopebusiness: ""
            };
            _this.hideDialog();
            _this.loadSupplierList();
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
    //编辑供应商信息
    editSupplier(id) {
      var _this = this;
      _this.$store
        .dispatch("product/getProductInfo", { id: id })
        .then(res => {
          console.log("返回的数据为", res);
          if (res.code == 200 && res.data.length > 0) {
            _this.editSupplierInfo = res.data[0];
            _this.editSupplierVisible = true;
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
    saveEditSupplier() {
      var _this = this;
      if (_this.isRepeat) {
        return;
      }
      _this.isRepeat = true;
      if (_this.isNullOrEmpty(_this.editSupplierInfo.companyname)) {
        _this.$message({
          showClose: true,
          message: "请输入企业名称",
          type: "error"
        });
        _this.isRepeat = false;
        return;
      }
      if (_this.isNullOrEmpty(_this.editSupplierInfo.licenseno)) {
        _this.$message({
          showClose: true,
          message: "请输入企业编号",
          type: "error"
        });
        _this.isRepeat = false;
        return;
      }
      if (_this.isNullOrEmpty(_this.editSupplierInfo.leader)) {
        _this.$message({
          showClose: true,
          message: "请输入负责人",
          type: "error"
        });
        _this.isRepeat = false;
        return;
      }
      if (_this.isNullOrEmpty(_this.editSupplierInfo.telephone)) {
        _this.$message({
          showClose: true,
          message: "请输入联系电话",
          type: "error"
        });
        _this.isRepeat = false;
        return;
      }
      console.log("需要提交的表单内容为", _this.editSupplierInfo);
      _this.$store
        .dispatch("supplier/updateSupplierInfo", _this.editSupplierInfo)
        .then(res => {
          console.log("编辑以后返回的数据为", res);
          if (res.code == 200) {
            _this.$message({
              showClose: true,
              type: "success",
              message: "保存成功"
            });
            _this.hideDialog();
            _this.loadSupplierList();
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
      _this.loadSupplierList();
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
  }
  .buRight {
    float: right;
    margin-bottom: 5px;
    margin-right: 2px;
    margin-left: 2px;
  }
  .remarkClass {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    -webkit-line-clamp: 2;
  }
}
</style>

