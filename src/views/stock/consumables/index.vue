<template>
  <div class="app-container">
    <el-container>
      <el-aside width="200px" style="padding:0">
        <Tree :treeData="data" @handleClick="handleClick"></Tree>
      </el-aside>
      <el-main style="padding:0px 0px 0px 10px">
        <el-card>
          <!-- 表单区域 -->
          <el-header>
            <el-form :inline="true" :model="params.params" class="demo-form-inline">
              <el-form-item :label="$t('unit.OrgName')">
                <el-select
                  v-model="selectCateOrgIDArray"
                  multiple
                  collapse-tags
                  style="margin-left: 20px;"
                >
                  <el-option
                    v-for="(orgInfo,index) in orgList"
                    :label="orgInfo.orgname"
                    :value="orgInfo.id"
                    :key="index"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item :label="$t('pmedicines.DrugsName')">
                <el-input
                  v-model="params.params.drugsName"
                  :placeholder="$t('pmedicines.DrugsNameDesc')"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-checkbox
                  :label="$t('pmedicines.CanOrder')"
                  :checked="params.params.canOrder==1"
                  border
                  size="small"
                  @change="canOrderChange"
                ></el-checkbox>
                <el-checkbox
                  :label="$t('pmedicines.CanSell')"
                  :checked="params.params.canSell==1"
                  border
                  size="small"
                  @change="canSellChange"
                ></el-checkbox>
                <el-checkbox
                  :label="$t('pmedicines.Deleted')"
                  :checked="params.params.deleted==1"
                  border
                  size="small"
                  @change="isDeleteChange"
                ></el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click.native="GetTableData">{{$t('query')}}</el-button>
              </el-form-item>
            </el-form>
          </el-header>
          <!-- table区域 -->
          <el-main>
            <el-table
              :data="tableData"
              v-loading="loading"
              border
              stripe
              align="center"
              style="width: 99.9%;height:100%;overflow:hidden;"
              ref="drugsTable"
            >
              <el-table-column type="selection" align="center" width="55"></el-table-column>
              <!-- 产品编码 -->
              <el-table-column
                prop="itemcode"
                fixed="left"
                :label="$t('pmedicines.ItemCode')"
                width="100"
              ></el-table-column>
              <!-- 产品名称 -->
              <el-table-column
                prop="drugsName"
                fixed="left"
                :show-overflow-tooltip="true"
                :label="$t('pmedicines.DrugsName')"
                width="150"
              ></el-table-column>
              <!-- 条形码 -->
              <el-table-column
                prop="barcode"
                :show-overflow-tooltip="true"
                :label="$t('pmedicines.BarCode')"
                width="150"
              ></el-table-column>
              <!-- 通用名 -->
              <el-table-column
                prop="commonname"
                :show-overflow-tooltip="true"
                :label="$t('pmedicines.CommonName')"
                width="150"
              ></el-table-column>
              <!-- 拼音简写 -->
              <el-table-column
                prop="drugsnameletter"
                :show-overflow-tooltip="true"
                :label="$t('pmedicines.DrugsNameLetter')"
                width="100"
              ></el-table-column>
              <!-- 英文名 -->
              <el-table-column
                prop="englishname"
                :show-overflow-tooltip="true"
                :label="$t('pmedicines.EnglishName')"
                width="100"
              ></el-table-column>
              <!-- 所属目录 -->
              <el-table-column
                prop="categoryname"
                :show-overflow-tooltip="true"
                :label="$t('pmedicines.CategoryName')"
                width="180"
              ></el-table-column>
              <!-- 成本价 -->
              <el-table-column
                prop="instoreprice"
                :label="$t('pmedicines.InstorePrice')"
                width="130"
              >
                <template slot-scope="scope">{{scope.row.instoreprice | currency('$')}}</template>
              </el-table-column>
              <!-- 会员价 -->
              <el-table-column prop="memberprice" :label="$t('pmedicines.MemberPrice')" width="130">
                <template slot-scope="scope">{{scope.row.memberprice | currency('$')}}</template>
              </el-table-column>
              <!-- 销售价 -->
              <el-table-column
                prop="outstoreprice"
                :label="$t('pmedicines.OutstorePrice')"
                width="130"
              >
                <template slot-scope="scope">{{scope.row.outstoreprice | currency('$')}}</template>
              </el-table-column>
              <!-- 库存 -->
              <el-table-column prop="count" :label="$t('pmedicines.Count')" width="80">
                <template slot-scope="scope">
                  <span>{{scope.row.count}}</span>
                </template>
              </el-table-column>
              <!-- 成分 -->
              <el-table-column
                prop="ingredient"
                :show-overflow-tooltip="true"
                :label="$t('pmedicines.Ingredient')"
                width="150"
              ></el-table-column>
              <!-- 入库单位 -->
              <el-table-column
                prop="instoreunitname"
                :show-overflow-tooltip="true"
                :label="$t('pmedicines.InstoreUnitName')"
                width="100"
              ></el-table-column>
              <!-- 是否打折 -->
              <el-table-column
                prop="donotdiscount"
                :show-overflow-tooltip="true"
                :label="$t('pmedicines.DoNotDiscount')"
                width="80"
                align="center"
              >
                <template slot-scope="scope">
                  <i
                    v-if="scope.row.donotdiscount"
                    class="iconfont icon-duihao"
                    style="color:red;font-size:18px;"
                  ></i>
                  <i v-else class="iconfont icon-cuohao"></i>
                </template>
              </el-table-column>
              <!-- 可订 -->
              <el-table-column prop="canorder" :label="$t('pmedicines.CanOrder')" width="60">
                <template slot-scope="scope">
                  <el-tag
                    :type="scope.row.canorder != 0 ? 'primary' : 'danger'"
                    disable-transitions
                  >{{scope.row.canorder != 0 ?$t('common.yes'):$t('common.no')}}</el-tag>
                </template>
              </el-table-column>
              <!-- 可销 -->
              <el-table-column prop="cansell" :label="$t('pmedicines.CanSell')" width="60">
                <template slot-scope="scope">
                  <el-tag
                    :type="scope.row.cansell !=0 ? 'primary' : 'danger'"
                    disable-transitions
                  >{{scope.row.cansell !=0 ?$t('common.yes'):$t('common.no')}}</el-tag>
                </template>
              </el-table-column>
              <!-- 状态 -->
              <el-table-column prop="deleted" :label="$t('pmedicines.Deleted')" width="70">
                <template slot-scope="scope">
                  <el-tag
                    :type="scope.row.deleted != 0 ? 'primary' : 'danger'"
                    disable-transitions
                  >{{scope.row.deleted != 0 ?$t('common.yesDeleted'):$t('common.noDeleted')}}</el-tag>
                </template>
              </el-table-column>
              <!-- 创建时间 -->
              <el-table-column
                prop="insertdate"
                :formatter="dateFormat"
                :label="$t('pmedicines.InsertDate')"
                width="180"
              >
                <template slot-scope="scope">
                  <i class="el-icon-time"></i>
                  <span style="margin-left: 2px">{{ scope.row.insertdate | dateFormat}}</span>
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
      :title="$t('pmedicines.DrugDetail')"
      :visible.sync="showDrugsDetailInfo"
      :close-on-click-modal="false"
      width="60%"
    >
      <el-form :model="drugsDetailInfo" :label-width="formLabelWidth" :inline="true">
        <el-row :gutter="10">
          <el-col :xl="8">
            <el-form-item :label="$t('pmedicines.CategoryName')">
              <div>{{categoryName}}</div>
            </el-form-item>
          </el-col>
          <el-col :xl="8">
            <el-form-item :label="$t('pmedicines.DrugsName')">{{drugsDetailInfo.drugsName}}</el-form-item>
          </el-col>
          <el-col :xl="8">
            <el-form-item :label="$t('pmedicines.BarCode')">{{drugsDetailInfo.barcode}}</el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xl="8">
            <el-form-item :label="$t('pmedicines.Ingredient')">{{drugsDetailInfo.ingredient}}</el-form-item>
          </el-col>
          <el-col :xl="8">
            <el-form-item
              :label="$t('pmedicines.DrugsNameLetter')"
            >{{drugsDetailInfo.drugsnameletter}}</el-form-item>
          </el-col>
          <el-col :xl="8">
            <el-form-item :label="$t('pmedicines.EnglishName')">{{drugsDetailInfo.englishname}}</el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :xl="8">
            <el-form-item :label="$t('pmedicines.CommonName')">{{drugsDetailInfo.commonname}}</el-form-item>
          </el-col>
          <el-col :xl="8">
            <el-form-item :label="$t('pmedicines.Brand')">{{drugsDetailInfo.brand}}</el-form-item>
          </el-col>
          <el-col :xl="8">
            <el-form-item :label="$t('pmedicines.ProviderName')">{{drugsDetailInfo.providername}}</el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :xl="8">
            <el-form-item
              :label="$t('pmedicines.OutstorePrice')"
            >{{drugsDetailInfo.outstoreprice | currency('$')}}</el-form-item>
          </el-col>
          <el-col :xl="8">
            <el-form-item
              :label="$t('pmedicines.MemberPrice')"
            >{{drugsDetailInfo.memberprice| currency('$')}}</el-form-item>
          </el-col>
          <el-col :xl="8">
            <el-form-item
              :label="$t('pmedicines.InstorePrice')"
            >{{drugsDetailInfo.instoreprice| currency('$')}}</el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :xl="8">
            <el-form-item
              :label="$t('pmedicines.CostPrice')"
            >{{drugsDetailInfo.costprice| currency('$')}}</el-form-item>
          </el-col>
          <el-col :xl="8">
            <el-form-item
              :label="$t('pmedicines.DoNotDiscount')"
            >{{drugsDetailInfo.donotdiscount?'是':'否'}}</el-form-item>
          </el-col>
          <el-col :xl="8">
            <el-form-item
              :label="$t('pmedicines.AllowSaleForNoneStock')"
            >{{drugsDetailInfo.allowsalefornonestock?'是':'否'}}</el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :xl="8">
            <el-form-item :label="$t('pmedicines.CanOrder')">{{drugsDetailInfo.canorder==1?'是':'否'}}</el-form-item>
          </el-col>
          <el-col :xl="8">
            <el-form-item :label="$t('pmedicines.CanSell')">{{drugsDetailInfo.cansell==1?'是':'否'}}</el-form-item>
          </el-col>
          <el-col :xl="8">
            <el-form-item :label="$t('pmedicines.Deleted')">{{drugsDetailInfo.deleted==1?'是':'否'}}</el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :xl="8">
            <el-form-item
              :label="$t('pmedicines.InstoreUnitName')"
            >{{drugsDetailInfo.instoreunitname}}</el-form-item>
          </el-col>
          <el-col :xl="8">
            <el-form-item :label="$t('pmedicines.Specific')">{{drugsDetailInfo.specific}}</el-form-item>
          </el-col>
          <el-col :xl="8">
            <el-form-item :label="$t('pmedicines.Count')">{{drugsDetailInfo.count}}</el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-form :model="drugsDetailInfo" :label-width="formLabelWidth">
        <el-row>
          <el-col :span="24">
            <el-form-item
              :label="$t('pmedicines.Remark')"
              class="drugsRemark"
            >{{drugsDetailInfo.description}}</el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="hideDialog">{{$t('tagsView.close')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Tree from "@/components/Tree/index";
import { getListData, dateFormat } from "@/utils/index";
import Pagination from "@/components/Pagination/index";
export default {
  name: "",
  components: { Tree, Pagination },
  data() {
    return {
      catename: "", //目录名称
      data: [],
      formLabelWidth: "120px",
      drugType: 1047,
      input: "",
      // 分页参数 Satrt
      total: 0,
      page: 10,
      limit: 10,
      pageSizes: [10, 20, 50],
      loading: false,
      // 分页参数  End
      params: {
        currentPage: 1,
        pageSize: 10,
        params: {
          drugType: 1047,
          deleted: 0,
          canOrder: 1,
          canSell: 1,
        },
      },
      tableData: [],
      categoryId: 1001,
      categoryName: "消耗品目录",
      showTreeVisible: false,
      editDrugVisible: false,
      insertDrugVisible: false,
      editDrugInfo: {},
      unitList: [],
      unitParams: {
        currentPage: 1,
        pageSize: 10000,
        params: {
          parentid: 4355,
          status: 0,
          deleted: 0,
        },
      },
      productList: [],
      supplierList: [],
      supplierParams: {
        currentPage: 1,
        pageSize: 10000,
        params: {
          isdeleted: 0,
        },
      },
      showDrugsDetailInfo: false,
      //药品详情信息
      drugsDetailInfo: {},
      selectOrgVisible: false,
      selectOrgIDArray: [],
      orgList: [],
      isRepeat: false,
      cateParams: {
        currentPage: 1,
        pageSize: 100000,
        params: {
          parentid: 1001,
          status: 0,
          deleted: 0,
        },
      },
      dialogFormVisible: false,
      cateParentid: null,
      orgLoading: false,
      visible: false,
      selectCateOrgVisible: false,
      vloading: false,
      selectCateOrgIDArray: [],
    };
  },
  created() {
    var _this = this;
    _this.insertDrugInfo = _this.insertBaseInfo;
    /**
     * 初始化目录
     */
    _this.GetTreeData();

    /**
     * 初始化产品数据
     */
    _this.GetTableData();
    //加载单位下拉
    _this.loadUnitList();
    //加载供应商下拉
    _this.loadSupplierList();
    //加载生产商下拉
    _this.loadProductList();
    //加载机构列表
    _this.loadOrgList();
  },
  methods: {
    //是否停用
    isDeleteChange(value) {
      var _this = this;
      _this.params.params.deleted = value ? 1 : 0;
    },
    //是否可销
    canSellChange(value) {
      var _this = this;
      _this.params.params.canSell = value ? 1 : 0;
    },
    //是否可订
    canOrderChange(value) {
      var _this = this;
      _this.params.params.canOrder = value ? 1 : 0;
    },
    //展示目录树结构
    showCatalogTree() {
      var _this = this;
      _this.showTreeVisible = true;
      // _this.$refs['insertdrugsinfo'].resetFields();
    },
    //加载机构列表
    loadOrgList() {
      var _this = this;
      _this.$store
        .dispatch("org/selectBranIdByOrgId")
        .then((res) => {
          _this.orgList = res;
        })
        .catch(() => {
          _this.loading = false;
        });
    },

    showDrugsDetail(id) {
      var _this = this;
      _this.$store
        .dispatch("pmedicines/getPmedicinesInfo", { id: id })
        .then((res) => {
          if (res.code == 200 && res.data.length > 0) {
            _this.drugsDetailInfo = res.data[0];

            _this.showDrugsDetailInfo = true;
          } else {
            _this.$message({
              showClose: true,
              message: "网络出错，请稍后重试",
              type: "error",
            });
          }
        })
        .catch(() => {
          _this.loading = false;
        });
    },
    //生产商发生改变时
    productChange(value) {
      var _this = this;
      _this.insertDrugInfo.brand = value
        ? _this.productList.find((ele) => ele.id == value).companyname
        : "";
    },

    //加载供应商数据
    loadSupplierList() {
      var _this = this;
      _this.$store
        .dispatch("supplier/getSupplierList", _this.supplierParams)
        .then((res) => {
          _this.supplierList = res.data.list;
          _this.loading = false;
        })
        .catch(() => {
          _this.loading = false;
        });
    },
    //加载生产商数据
    loadProductList() {
      var _this = this;
      _this.$store
        .dispatch("product/getProductList", _this.supplierParams)
        .then((res) => {
          _this.productList = res.data.list;
          _this.loading = false;
        })
        .catch(() => {
          _this.loading = false;
        });
    },
    showAddDrug() {
      var _this = this;
      _this.insertDrugVisible = true;
      _this.instoreUnitName = "入库单位";
      _this.outstoreUnitName = "出库单位";
    },
    //加载单位列表
    loadUnitList() {
      var _this = this;
      _this.loading = true;
      _this.$store
        .dispatch("unit/getUnitList", _this.unitParams)
        .then((res) => {
          _this.unitList = res.data.list;
        })
        .catch(() => {
          _this.loading = false;
        });
    },
    showEditContent(id) {
      var _this = this;
      _this.$store
        .dispatch("pmedicines/getPmedicinesInfo", { id: id })
        .then((res) => {
          if (res.code == 200 && res.data.length > 0) {
            _this.editDrugInfo = res.data[0];
            _this.editDrugInfo.canorder = res.data[0].canorder == 1;
            _this.editDrugInfo.cansell = res.data[0].cansell == 1;
            _this.editDrugInfo.deleted = res.data[0].deleted == 1;
            _this.editDrugVisible = true;
          } else {
            _this.$message({
              showClose: true,
              message: "网络出错，请稍后重试",
              type: "error",
            });
          }
        })
        .catch(() => {
          _this.loading = false;
        });
    },
    /**
     * 获取目录信息
     */
    GetTreeData: function () {
      var _this = this;
      _this.$store
        .dispatch("psyslist/getPsysListBykey", {
          drugType: _this.drugType,
        })
        .then((res) => {
          _this.data = res;
          if (_this.data.length > 0) {
            _this.data.forEach(function (info) {
              if (info.id == _this.categoryId) {
                _this.categoryName = info.name;
                return;
              }
            });
          }
        });
    },
    /**
     * 树节点点击事件
     * {点击数据} nodeData
     */
    handleClick: function (nodeData) {
      this.categoryId = nodeData.id;
      this.categoryName = nodeData.name;
      this.GetTableData();
    },
    /**
     * 获取Table数据
     */
    GetTableData: function () {
      this.loading = true;
      if (this.categoryId == 1001) {
        this.params.params.category = -1;
      } else {
        this.params.params.category = this.categoryId;
      }
      this.$store
        .dispatch("pmedicines/getPmedicinesByDrugType", this.params)
        .then((res) => {
          this.tableData = res.list;
          this.total = res.total;
          this.page = res.pageNum;
          this.limit = res.pageSize;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    /**
     * 分页点击事件
     */
    pagination(param) {
      this.params.currentPage = param.page;
      this.params.pageSize = param.limit;
      this.GetTableData();
    },
    /**
     * 格式化时间
     */
    dateFormat: function (row, column) {
      //row 表示一行数据, updateTime 表示要格式化的字段名称
      return dateFormat(row.insertdate);
    },

    //隐藏弹出层
    hideDialog() {
      var _this = this;
      _this.showTreeVisible = false;
      _this.editDrugVisible = false;
      _this.insertDrugVisible = false;
      _this.showDrugsDetailInfo = false;
      _this.selectOrgVisible = false;
      _this.selectCateOrgVisible = false;
      _this.insertDrugInfo = _this.insertBaseInfo;
    },
    hideAddCate() {
      var _this = this;
      _this.dialogFormVisible = false;
    },
  },
};
</script> 
<style lang="scss" scope>
.app-container {
  .buRight {
    float: right;
    margin-bottom: 5px;
    margin-right: 2px;
    margin-left: 2px;
  }
  .newTree {
    .custom-tree-node {
      flex: 1;
      justify-content: space-between;
      display: flex;
      font-size: 14px;
      padding-right: 8px;
    }
    .el-tree-node__content {
      height: 30px;
    }
  }
  .selectOrgClass {
    .el-select {
      width: 100%;
    }
  }
  .el-dialog {
    display: flex;
    flex-direction: column;
    margin: 0 !important;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /*height:600px;*/
    max-height: calc(100% - 30px);
    max-width: calc(100% - 30px);
  }
  .el-dialog .el-dialog__body {
    flex: 1;
    overflow: auto;
  }
  .fullButtonClass {
    display: flex;
    justify-content: flex-end;
    align-self: end;
    .el-button {
      margin: 0 0 10px 0;
    }
  }
  .actionsButtonClass {
    display: flex;
    justify-content: space-between;
  }
}
</style>