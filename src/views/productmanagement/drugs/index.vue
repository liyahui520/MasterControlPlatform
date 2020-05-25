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
                @click="showAddDrug"
              >{{$t('table.add')}}</el-button>
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
                prop="drugsname"
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
              <el-table-column fixed="right" label="操作" width="300">
                <template slot-scope="scope">
                  <el-button @click="handleClick(scope.row)" size="mini" icon="el-icon-search">查看</el-button>
                  <el-button
                    @click="showEditContent(scope.row.id)"
                    size="mini"
                    icon="el-icon-edit"
                  >编辑</el-button>
                  <el-button icon="el-icon-delete" type="danger" size="mini">{{$t('table.delete')}}</el-button>
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
      <div class="custom-tree-container newTree">
        <div class="block">
          <el-tree
            :data="catalogList"
            node-key="id"
            default-expand-all
            :expand-on-click-node="true"
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

    <el-dialog :title="$t('pmedicines.EditDrug')" :visible.sync="editDrugVisible" width="50%">
      <el-form :model="editDrugInfo" :label-width="formLabelWidth" :inline="true">
        <el-row :gutter="10">
          <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"></el-col>
          <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
            <el-form-item :label="$t('pmedicines.ItemCode')">
              <div>{{editDrugInfo.itemcode}}</div>
            </el-form-item>
          </el-col>
          <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
            <el-form-item
              :label="$t('pmedicines.DrugsName')"
              :rules="[{ required: true, message: '请输入产品名称' }]"
            >
              <el-input v-model="editDrugInfo.drugsname" />
            </el-form-item>
          </el-col>
          <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"></el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"></el-col>
          <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
            <el-form-item
              :label="$t('pmedicines.BarCode')"
              :rules="[{ required: true, message: '请输入条形码' }]"
            >
              <el-input v-model="editDrugInfo.barcode" />
            </el-form-item>
          </el-col>
          <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
            <el-form-item
              :label="$t('pmedicines.CommonName')"
              :rules="[{ required: true, message: '请输入通用名' }]"
            >
              <el-input v-model="editDrugInfo.commonname" />
            </el-form-item>
          </el-col>
          <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"></el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"></el-col>
          <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
            <el-form-item :label="$t('pmedicines.EnglishName')">
              <el-input v-model="editDrugInfo.englishname" />
            </el-form-item>
          </el-col>
          <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
            <el-form-item :label="$t('pmedicines.CategoryName')">
              <el-input v-model="editDrugInfo.categoryname" />
            </el-form-item>
          </el-col>
          <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"></el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"></el-col>
          <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
            <el-form-item :label="$t('pmedicines.InstorePrice')">
              <el-input type="number" v-model="editDrugInfo.instoreprice" />
            </el-form-item>
          </el-col>
          <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
            <el-form-item :label="$t('pmedicines.MemberPrice')">
              <el-input type="number" v-model="editDrugInfo.memberprice" />
            </el-form-item>
          </el-col>
          <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"></el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"></el-col>
          <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
            <el-form-item :label="$t('pmedicines.OutstorePrice')">
              <el-input type="number" v-model="editDrugInfo.outstoreprice" />
            </el-form-item>
          </el-col>
          <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
            <el-form-item :label="$t('pmedicines.Count')">
              <el-input disabled v-model="editDrugInfo.count" />
            </el-form-item>
          </el-col>
          <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"></el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"></el-col>
          <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
            <el-form-item :label="$t('pmedicines.Ingredient')">
              <el-input v-model="editDrugInfo.ingredient" />
            </el-form-item>
          </el-col>
          <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
            <el-form-item :label="$t('pmedicines.UnitName')">
              <el-select v-model="editDrugInfo.unit" filterable>
                <el-option
                  v-for="(unitInfo,index) in unitList"
                  :label="unitInfo.name"
                  :value="unitInfo.id"
                  :key="index"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"></el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"></el-col>
          <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
            <el-form-item :label="$t('pmedicines.InstoreUnitName')">
              <el-select v-model="editDrugInfo.instoreunit" filterable>
                <el-option
                  v-for="(unitInfo,index) in unitList"
                  :label="unitInfo.name"
                  :value="unitInfo.id"
                  :key="index"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
            <el-form-item :label="$t('pmedicines.OutstoreUnitName')">
              <el-select v-model="editDrugInfo.outstoreunit" filterable>
                <el-option
                  v-for="(unitInfo,index) in unitList"
                  :label="unitInfo.name"
                  :value="unitInfo.id"
                  :key="index"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"></el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"></el-col>
          <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
            <el-form-item :label="$t('pmedicines.DoNotDiscount')">
              <el-switch v-model="editDrugInfo.donotdiscount"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
            <el-form-item :label="$t('pmedicines.CanOrder')">
              <el-switch v-model="editDrugInfo.canorder"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"></el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"></el-col>
          <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
            <el-form-item :label="$t('pmedicines.CanSell')">
              <el-switch v-model="editDrugInfo.cansell"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
            <el-form-item :label="$t('pmedicines.Deleted')">
              <el-switch v-model="editDrugInfo.deleted"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"></el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="hideDialog">{{$t('table.cancel')}}</el-button>
        <el-button type="primary">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="$t('pmedicines.AddDrug')" :visible.sync="insertDrugVisible" width="60%">
      <el-form :model="insertDrugInfo" :label-width="formLabelWidth" :inline="true">
        <el-row :gutter="10">
          <el-col :xl="8">
            <el-form-item :label="$t('pmedicines.CategoryName')">
              <div>{{categoryName}}</div>
            </el-form-item>
          </el-col>
          <el-col :xl="8">
            <el-form-item
              :label="$t('pmedicines.DrugsName')"
              :rules="[{ required: true, message: '请输入产品名称' }]"
            >
              <el-input v-model="insertDrugInfo.drugsname" />
            </el-form-item>
          </el-col>
          <el-col :xl="8">
            <el-form-item
              :label="$t('pmedicines.BarCode')"
              :rules="[{ required: true, message: '请输入条形码' }]"
            >
              <el-input v-model="insertDrugInfo.barcode" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xl="8">
            <el-form-item
              :label="$t('pmedicines.Ingredient')"
              :rules="[{ required: true, message: '请输入成分' }]"
            >
              <el-input v-model="insertDrugInfo.ingredient" />
            </el-form-item>
          </el-col>
          <el-col :xl="8">
            <el-form-item :label="$t('pmedicines.DrugsNameLetter')">
              <el-input v-model="insertDrugInfo.drugsnameLetter" />
            </el-form-item>
          </el-col>
          <el-col :xl="8">
            <el-form-item :label="$t('pmedicines.EnglishName')">
              <el-input v-model="insertDrugInfo.englishname" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :xl="8">
            <el-form-item :label="$t('pmedicines.CommonName')">
              <el-input v-model="insertDrugInfo.commonname" />
            </el-form-item>
          </el-col>
          <el-col :xl="8">
            <el-form-item :label="$t('pmedicines.Brand')">
              <el-input v-model="insertDrugInfo.brand" />
            </el-form-item>
          </el-col>
          <el-col :xl="8">
            <el-form-item :label="$t('pmedicines.ProviderName')">
              <el-input v-model="insertDrugInfo.providerName" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :xl="8">
            <el-form-item :label="$t('pmedicines.DosingWay')">
              <el-input v-model="insertDrugInfo.usingmethod" />
            </el-form-item>
          </el-col>
          <el-col :xl="8">
            <el-form-item :label="$t('pmedicines.ShowAll')">
              <el-switch v-model="insertDrugInfo.showall"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :xl="8">
            <el-form-item :label="$t('pmedicines.UsingMethod')">
              <el-select v-model="insertDrugInfo.instoreunit" filterable>
                <el-option
                  v-for="(unitInfo,index) in unitList"
                  :label="unitInfo.name"
                  :value="unitInfo.id"
                  :key="index"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :xl="8">
            <el-form-item :label="$t('pmedicines.OutstorePrice')" :rules="[{ required: true, message: '请输入销售价' }]">
              <el-input type="number" v-model="insertDrugInfo.commonname" />
            </el-form-item>
          </el-col>
          <el-col :xl="8">
            <el-form-item :label="$t('pmedicines.MemberPrice')" :rules="[{ required: true, message: '请输入会员价' }]">
              <el-input type="number" v-model="insertDrugInfo.commonname" />
            </el-form-item>
          </el-col>
          <el-col :xl="8">
            <el-form-item :label="$t('pmedicines.InstorePrice')" :rules="[{ required: true, message: '请输入产品名称' }]">
              <el-input type="number" v-model="insertDrugInfo.commonname" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :xl="8">
            <el-form-item :label="$t('pmedicines.CostPrice')">
              <el-switch v-model="insertDrugInfo.cansell"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :xl="8">
            <el-form-item :label="$t('pmedicines.DoNotDiscount')">
              <el-switch v-model="insertDrugInfo.deleted"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :xl="8">
            <el-form-item :label="$t('pmedicines.AllowSaleForNoneStock')">
              <el-switch v-model="insertDrugInfo.cansell"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :xl="8">
            <el-form-item :label="$t('pmedicines.CanOrder')">
              <el-switch v-model="insertDrugInfo.deleted"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :xl="8">
            <el-form-item :label="$t('pmedicines.CanSell')">
              <el-switch v-model="insertDrugInfo.cansell"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :xl="8">
            <el-form-item :label="$t('pmedicines.Deleted')">
              <el-switch v-model="insertDrugInfo.deleted"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :xl="8">
            <el-form-item :label="$t('pmedicines.InstoreUnitName')">
              <el-switch v-model="insertDrugInfo.cansell"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :xl="8">
            <el-form-item :label="$t('pmedicines.OutstoreUnitName')">
              <el-switch v-model="insertDrugInfo.deleted"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :xl="8">
            <el-form-item :label="$t('pmedicines.SpecificInMath')">
              <el-switch v-model="insertDrugInfo.cansell"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="8">
            <el-form-item :label="$t('pmedicines.Specific')">
              <el-input v-model="insertDrugInfo.barcode" />
            </el-form-item>
          </el-col>
          <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="8">
            <el-form-item :label="$t('pmedicines.Count')">
              <el-switch v-model="insertDrugInfo.deleted"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"></el-col>
          <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="13">
            <el-form-item :label="$t('pmedicines.Remark')">
              <el-switch v-model="insertDrugInfo.cansell"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="hideDialog">{{$t('table.cancel')}}</el-button>
        <el-button type="primary">{{$t('table.confirm')}}</el-button>
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
    const treeDataList = [
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
      formLabelWidth: "120px",
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
      categoryId: 1006,
      categoryName: "",
      showTreeVisible: false,
      catalogList: JSON.parse(JSON.stringify(treeDataList)),
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
          deleted: 0
        }
      },
      insertDrugInfo: {
        drugtype: 1046,
        category: null,
        barcode: "",
        providerid: null,
        ingredient: "",
        isanaesthesia: null,
        drugsname: "",
        refer: "",
        description: "",
        instoreprice: null,
        outstoreprice: null,
        mincount: null,
        unit: null,
        specific: "",
        totalcount: null,
        notfor: null,
        count: null,
        usingmethod: null,
        vaccinatetimes: null,
        vaccinateinterval: null,
        englishname: null,
        drugsnameletter: "",
        englishnameletter: null,
        manufacturer: null,
        instoreunit: null,
        drugid: "",
        discountrate: null,
        deleted: false,
        memberprice: null,
        minstore: null,
        donotdiscount: false,
        showall: true,
        notice: "",
        itemcode: "",
        brand: null,
        kindof: null,
        allowsalefornonestock: false,
        validdate: null,
        dosingway: null,
        indication: null,
        forr: null,
        taboo: null,
        dosageperkg: null,
        adversereactions: null,
        druginteractions: null,
        characters: null,
        categoryname: "",
        deallevel: null,
        markid: null,
        occupycount: null,
        fid: null,
        sourceflag: null,
        costprice: null,
        savemethod: null,
        commonname: "",
        writer: null,
        handedbrand: null,
        handedproductname: null,
        specificmath: null,
        specificinmath: null,
        specificoutmath: null,
        outstoreunit: null,
        lastinstorecount: null,
        canorder: false,
        cansell: false,
        brandid: null,
        lastupdateuserid: null,
        istemporder: false,
        brand2: null,
        brand2id: null,
        isrecommend: false,
        newbrand: null,
        lastinstoreprice: null,
        paindesc: null,
        procurementunit: null,
        chargeunit: null,
        anothername: null,
        manufacturerinternalcode: null,
        banneddrugs: true,
        producttaxpoint: null,
        referenceprice: null,
        validityinstruction: null,
        validityperiodmanagement: false,
        packagingunitspecification: null,
        functional: null,
        dosage: null,
        approvalnumber: null,
        temppurchasing: false,
        chargetostorage: null,
        procurementtopackage: null,
        associationtype: 0,
        countryid: null,
        isstandarddrugs: false,
        iscontorprice: 0,
        iscontortype: 0,
        tag: null,
        autocombine: null,
        updatestamp: "",
        imageurl: null,
        unitname: null,
        instoreunitname: null,
        outstoreunitname: null,
        dosingwayname: null
      },
      productList: [],
      supplierList: [],
      supplierParams: {
        currentPage: 1,
        pageSize: 10000,
        params: {
          isdeleted: 0
        }
      },
      usageMethodsList: [],
      medicateMethodsList: []
    };
  },
  created() {
    var _this = this;
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
    //加载投药方式
    _this.loadMedicateMethods();
    //加载使用方式
    _this.loadUsageMethods();
  },
  methods: {
    //加载投药方式
    loadMedicateMethods() {
      var _this = this;
      _this.$store
        .dispatch("pmedicines/getMedicateMethods", { parentid: 2335 })
        .then(res => {
          _this.medicateMethodsList = res.data.list;
          _this.loading = false;
        })
        .catch(() => {
          _this.loading = false;
        });
    },
    //加载使用方式
    loadUsageMethods() {
      var _this = this;
      _this.$store
        .dispatch("pmedicines/getUsageMethods", { parentid: 2287 })
        .then(res => {
          _this.usageMethodsList = res.data.list;
          _this.loading = false;
        })
        .catch(() => {
          _this.loading = false;
        });
    },
    //加载供应商数据
    loadSupplierList() {
      var _this = this;
      _this.$store
        .dispatch("supplier/getSupplierList", _this.supplierParams)
        .then(res => {
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
        .then(res => {
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
    },
    //加载单位列表
    loadUnitList() {
      var _this = this;
      _this.loading = true;
      _this.$store
        .dispatch("unit/getUnitList", _this.unitParams)
        .then(res => {
          _this.unitList = res.data.list;
        })
        .catch(() => {
          _this.loading = false;
        });
    },
    showEditContent(id) {
      var _this = this;
      console.log("需要编辑的id为", id);

      _this.$store
        .dispatch("pmedicines/getPmedicinesInfo", { id: id })
        .then(res => {
          if (res.code == 200 && res.data.length > 0) {
            _this.editDrugInfo = res.data[0];
            _this.editDrugInfo.canorder = res.data[0].canorder == 0;
            _this.editDrugInfo.cansell = res.data[0].cansell == 0;
            _this.editDrugInfo.deleted = res.data[0].deleted == 0;
            _this.editDrugVisible = true;
            console.log("获取到药品的详细数据为", _this.editDrugInfo);
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
    /**
     * 获取目录信息
     */
    GetTreeData: function() {
      var _this = this;
      _this.$store
        .dispatch("psyslist/getPsysListBykey", {
          drugType: _this.drugType
        })
        .then(res => {
          console.log("请求的结果为", res);

          _this.data = res;
          if (_this.data.length > 0) {
            _this.data.forEach(function(info) {
              console.log("每个目录的id为", info);
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
    handleClick: function(nodeData) {
      console.log(nodeData);
      this.categoryId = nodeData.id;
      this.categoryName = nodeData.name;
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
      _this.editDrugVisible = false;
      _this.insertDrugVisible = false;
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
  .newTree {
    .custom-tree-node {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      padding-right: 8px;
    }
  }
}
</style>