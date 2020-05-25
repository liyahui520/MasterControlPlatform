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
              <el-form-item :label="$t('pmedicines.DrugsName')">
                <el-input
                  v-model="params.params.drugsName"
                  :placeholder="$t('pmedicines.DrugsNameDesc')"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click.native="GetTableData">{{$t('query')}}</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="showCatalogTree">{{$t('drugTree.AddCatalog')}}</el-button>
              </el-form-item>
            </el-form>
          </el-header>
          <!-- table区域 -->
          <el-main>
            <el-row>
              <el-button
                class="buRight"
                type="info"
                icon="el-icon-edit"
              >{{ $t('pmedicines.PEdit') }}</el-button>
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
            </el-row>
            <el-table
              :data="tableData"
              v-loading="loading"
              border
              stripe
              align="center"
              style="width: 99.9%;height:100%;overflow:hidden;"
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
                width="80"
              >
                <template slot-scope="scope">{{scope.row.instoreprice | currency('$')}}</template>
              </el-table-column>
              <!-- 会员价 -->
              <el-table-column prop="memberprice" :label="$t('pmedicines.MemberPrice')" width="80">
                <template slot-scope="scope">{{scope.row.memberprice | currency('$')}}</template>
              </el-table-column>
              <!-- 销售价 -->
              <el-table-column
                prop="outstoreprice"
                :label="$t('pmedicines.OutstorePrice')"
                width="80"
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
              <!-- 投药单位 -->
              <el-table-column
                prop="unitname"
                :show-overflow-tooltip="true"
                :label="$t('pmedicines.UnitName')"
                width="80"
              ></el-table-column>
              <!-- 入库单位 -->
              <el-table-column
                prop="instoreunitname"
                :show-overflow-tooltip="true"
                :label="$t('pmedicines.InstoreUnitName')"
                width="80"
              ></el-table-column>
              <!-- 出库单位 -->
              <el-table-column
                prop="outstoreunitname"
                :show-overflow-tooltip="true"
                :label="$t('pmedicines.OutstoreUnitName')"
                width="80"
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
                    v-if="!scope.row.donotdiscount"
                    class="iconfont icon-duihao"
                    style="color:red;font-size:18px;"
                  ></i>
                  <i v-else class="iconfont icon-cuohao"></i>
                  <!-- <el-tag
                    :type="scope.row.donotdiscount? 'primary' : 'danger'"
                    disable-transitions
                  >{{scope.row.donotdiscount?$t('common.yes'):$t('common.no')}}</el-tag>-->
                </template>
              </el-table-column>
              <!-- 可订 -->
              <el-table-column prop="canorder" :label="$t('pmedicines.CanOrder')" width="60">
                <template slot-scope="scope">
                  <el-tag
                    :type="scope.row.canorder === 0 ? 'primary' : 'danger'"
                    disable-transitions
                  >{{scope.row.canorder === 0 ?$t('common.yes'):$t('common.no')}}</el-tag>
                </template>
              </el-table-column>
              <!-- 可销 -->
              <el-table-column prop="cansell" :label="$t('pmedicines.CanSell')" width="60">
                <template slot-scope="scope">
                  <el-tag
                    :type="scope.row.cansell === 0 ? 'primary' : 'danger'"
                    disable-transitions
                  >{{scope.row.cansell === 0 ?$t('common.yes'):$t('common.no')}}</el-tag>
                </template>
              </el-table-column>
              <!-- 状态 -->
              <el-table-column prop="deleted" :label="$t('pmedicines.Deleted')" width="70">
                <template slot-scope="scope">
                  <el-tag
                    :type="scope.row.deleted === 0 ? 'primary' : 'danger'"
                    disable-transitions
                  >{{scope.row.deleted === 0 ?$t('common.yesDeleted'):$t('common.noDeleted')}}</el-tag>
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
              <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                  <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                  <el-button type="text" size="small">编辑</el-button>
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
      :title="$t('drugTree.Catalog')"
      :visible.sync="showTreeVisible"
      width="50%"
      height="200px"
    >
      <div class="custom-tree-container">
        <div class="block">
          <el-tree
            :data="catalogList"
            show-checkbox
            node-key="id"
            default-expand-all
            :expand-on-click-node="false"
          >
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>{{ node.label }}</span>
              <span>
                <el-button type="text" size="mini" @click="() => append(data)">添加</el-button>
                <el-button type="text" size="mini" @click="() => remove(node, data)">删除</el-button>
              </span>
            </span>
          </el-tree>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="hideDialog">{{$t('tagsView.close')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Tree from "@/components/Tree/index";
import { getListData, dateFormat } from "@/utils/index";
import { mapGetters } from "vuex";
import Pagination from "@/components/Pagination/index";
export default {
  name: "",
  components: { Tree, Pagination },
  data() {
    const treeDataList=[
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1"
                },
                {
                  id: 10,
                  label: "三级 1-1-2"
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1"
            },
            {
              id: 6,
              label: "二级 2-2"
            }
          ]
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1"
            },
            {
              id: 8,
              label: "二级 3-2"
            }
          ]
        }
      ];
    return {
      data: [],
      defaultProps: {
        children: "children",
        label: "name"
      },
      drugType: 1046,
      input: "",
      // 分页参数 Satrt
      total: 0,
      page: 10,
      limit: 10,
      pageSizes: [10, 20, 50, 100],
      loading: false,
      // 分页参数  End
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
      },
      tableData: [],
      categoryId: -1,
      showTreeVisible: false,
      catalogList: JSON.parse(JSON.stringify(treeDataList))
    };
  },
  created() {
    /**
     * 初始化目录
     */
    this.GetTreeData();
    /**
     * 初始化产品数据
     */
    this.GetTableData();
  },
  methods: {
    /**
     * 获取目录信息
     */
    GetTreeData: function() {
      this.$store
        .dispatch("psyslist/getPsysListBykey", {
          drugType: this.drugType
        })
        .then(res => {
          this.data = res;
        });
    },
    /**
     * 树节点点击事件
     * {点击数据} nodeData
     */
    handleClick: function(nodeData) {
      console.log(nodeData);
      this.categoryId = nodeData.id;
      this.GetTableData();
    },
    /**
     * 获取Table数据
     */
    GetTableData: function() {
      this.loading = true;
      this.params.params.category = this.categoryId;
      this.$store
        .dispatch("pmedicines/getPmedicinesByDrugType", this.params)
        .then(res => {
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
    dateFormat: function(row, column) {
      //row 表示一行数据, updateTime 表示要格式化的字段名称
      return dateFormat(row.insertdate);
    },

    showCatalogTree() {
      var _this = this;
      _this.showTreeVisible = true;
    },

    //隐藏弹出层
    hideDialog() {
      var _this = this;
      _this.showTreeVisible = false;
    },
    append(data) {
      const newChild = { id: data.id++, label: "testtest", children: [] };
      if (!data.children) {
        this.$set(data, "children", []);
      }
      data.children.push(newChild);
    },

    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
    },

    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.append(data)}
            >
              添加
            </el-button>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.remove(node, data)}
            >
              删除
            </el-button>
          </span>
        </span>
      );
    }
  }
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
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
  .treeForm {
    display: flex;
    justify-content: flex-end;
  }
}
</style>