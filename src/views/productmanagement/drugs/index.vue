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
                @click="batchDeleteDrugsInfo"
              >{{ $t('pmedicines.PDelete') }}</el-button>
              <el-button
                class="buRight"
                type="primary"
                icon="el-icon-download"
                @click="showFullDrug"
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
              <el-table-column fixed="right" :label="$t('table.actions')" width="300">
                <template slot-scope="scope">
                  <el-button
                    @click="showDrugsDetail(scope.row.id)"
                    size="mini"
                    icon="el-icon-search"
                  >{{$t('cataLog.ShowDetail')}}</el-button>
                  <el-button
                    @click="showEditContent(scope.row.id)"
                    size="mini"
                    icon="el-icon-edit"
                  >{{$t('table.edit')}}</el-button>
                  <el-button
                    icon="el-icon-delete"
                    type="danger"
                    size="mini"
                    @click="signDeleteDrugsInfo(scope.row.id)"
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
      :title="$t('drugTree.Catalog')"
      :visible.sync="showTreeVisible"
      width="30%"
      height="200px"
      :close-on-click-modal="false"
    >
      <!-- <div class="fullButtonClass">
        <el-button
          type="primary"
          icon="el-icon-download"
        >{{ $t('pmedicines.Lower') }}</el-button>
      </div> -->
      <div class="custom-tree-container newTree">
        <div class="block">
          <el-tree :data="data" node-key="id" default-expand-all :expand-on-click-node="true">
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>{{ data.name }}</span>
              <span>
                <el-button size="mini" icon="el-icon-plus" @click.stop="() => append(data)">添加</el-button>
                <el-button
                  size="mini"
                  icon="el-icon-delete"
                  type="danger"
                  @click.stop="() => remove(node, data)"
                >删除</el-button>
              </span>
            </span>
          </el-tree>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="hideDialog">{{$t('tagsView.close')}}</el-button>
      </div>
      <el-dialog
        :title="$t('unit.AddCate')"
        :visible.sync="dialogFormVisible"
        width="30%"
        append-to-body
        :close-on-click-modal="false"
      >
        <el-form :label-width="formLabelWidth">
          <el-form-item :label="$t('unit.CateName')">
            <el-input v-model="catename" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="hideAddCate">{{$t('table.cancel')}}</el-button>
          <el-button type="primary" @click="saveCate">{{$t('table.confirm')}}</el-button>
        </div>
      </el-dialog>
    </el-dialog>

    <el-dialog
      :title="$t('pmedicines.EditDrug')"
      :visible.sync="editDrugVisible"
      :close-on-click-modal="false"
      width="60%"
      v-loading="loading"
    >
      <el-form
        :model="editDrugInfo"
        :label-width="formLabelWidth"
        :inline="true"
        ref="updatedrugsinfo"
        :rules="rules"
      >
        <el-row :gutter="10">
          <el-col :xl="8">
            <el-form-item :label="$t('pmedicines.CategoryName')">
              <div>{{categoryName}}</div>
            </el-form-item>
          </el-col>
          <el-col :xl="8">
            <el-form-item
              :label="$t('pmedicines.DrugsName')"
              prop="drugsName"
              :rules="[{ required: true, message: '请输入产品名称' }]"
            >
              <el-input v-model="editDrugInfo.drugsName" @change="handlerDrugName" />
            </el-form-item>
          </el-col>
          <el-col :xl="8">
            <el-form-item
              :label="$t('pmedicines.BarCode')"
              prop="barcode"
              :rules="[{ required: true, message: '请输入条形码' }]"
            >
              <el-input v-model="editDrugInfo.barcode" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xl="8">
            <el-form-item
              :label="$t('pmedicines.Ingredient')"
              prop="ingredient"
              :rules="[{ required: true, message: '请输入成分' }]"
            >
              <el-input v-model="editDrugInfo.ingredient" />
            </el-form-item>
          </el-col>
          <el-col :xl="8">
            <el-form-item :label="$t('pmedicines.DrugsNameLetter')">
              <el-input v-model="editDrugInfo.drugsnameletter" />
            </el-form-item>
          </el-col>
          <el-col :xl="8">
            <el-form-item :label="$t('pmedicines.EnglishName')">
              <el-input v-model="editDrugInfo.englishname" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :xl="8">
            <el-form-item :label="$t('pmedicines.CommonName')">
              <el-input v-model="editDrugInfo.commonname" />
            </el-form-item>
          </el-col>
          <el-col :xl="8">
            <el-form-item :label="$t('pmedicines.Brand')">
              <el-select v-model="editDrugInfo.brandid" filterable @change="productChange">
                <el-option
                  v-for="(productInfo,index) in productList"
                  :label="productInfo.companyname"
                  :value="productInfo.id"
                  :key="index"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xl="8">
            <el-form-item :label="$t('pmedicines.ProviderName')">
              <el-select v-model="editDrugInfo.providerid" filterable>
                <el-option
                  v-for="(supplierInfo,index) in supplierList"
                  :label="supplierInfo.companyname"
                  :value="supplierInfo.id"
                  :key="index"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :xl="8">
            <el-form-item :label="$t('pmedicines.DosingWay')">
              <el-select
                v-model="editDrugInfo.dosingway"
                filterable
                @change="medicateMethodsChange"
              >
                <el-option
                  v-for="(medicateMethods,index) in medicateMethodsList"
                  :label="medicateMethods.name"
                  :value="medicateMethods.id"
                  :key="index"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xl="8">
            <el-form-item :label="$t('pmedicines.ShowAll')">
              <el-switch v-model="editDrugInfo.showall"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :xl="8">
            <el-form-item :label="$t('pmedicines.UsingMethod')">
              <el-select v-model="editDrugInfo.usingmethod" filterable>
                <el-option
                  v-for="(usageMethods,index) in usageMethodsList"
                  :label="usageMethods.name"
                  :value="usageMethods.id"
                  :key="index"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :xl="8">
            <el-form-item :label="$t('pmedicines.OutstorePrice')" prop="outstoreprice">
              <el-input type="number" v-model="editDrugInfo.outstoreprice" />
            </el-form-item>
          </el-col>
          <el-col :xl="8">
            <el-form-item :label="$t('pmedicines.MemberPrice')" prop="memberprice">
              <el-input type="number" v-model="editDrugInfo.memberprice" />
            </el-form-item>
          </el-col>
          <el-col :xl="8">
            <el-form-item :label="$t('pmedicines.InstorePrice')">
              <el-input type="number" v-model="editDrugInfo.instoreprice" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :xl="8">
            <el-form-item :label="$t('pmedicines.CostPrice')">
              <el-input type="number" v-model="editDrugInfo.costprice" />
            </el-form-item>
          </el-col>
          <el-col :xl="8">
            <el-form-item :label="$t('pmedicines.DoNotDiscount')">
              <el-switch v-model="editDrugInfo.donotdiscount"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :xl="8">
            <el-form-item :label="$t('pmedicines.AllowSaleForNoneStock')">
              <el-switch v-model="editDrugInfo.allowsalefornonestock"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :xl="8">
            <el-form-item :label="$t('pmedicines.CanOrder')">
              <el-switch v-model="editDrugInfo.canorder" @change="orderDrugs"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :xl="8">
            <el-form-item :label="$t('pmedicines.CanSell')">
              <el-switch v-model="editDrugInfo.cansell" @change="orderDrugs"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :xl="8">
            <el-form-item :label="$t('pmedicines.Deleted')">
              <el-switch v-model="editDrugInfo.deleted" @change="deleteDrugs"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :xl="8">
            <el-form-item
              :label="$t('pmedicines.InstoreUnitName')"
              prop="instoreunit"
              :rules="[{ required: true, message: '请选择出入库单位' }]"
            >
              <el-select v-model="editDrugInfo.instoreunit" filterable @change="insertUnitChange">
                <el-option
                  v-for="(unit,index) in unitList"
                  :label="unit.name"
                  :value="unit.id"
                  :key="index"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xl="8">
            <el-form-item
              :label="$t('pmedicines.Unit')"
              prop="outstoreunit"
              :rules="[{ required: true, message: '请选择投药单位' }]"
            >
              <el-select v-model="editDrugInfo.unit" filterable @change="outUnitChange">
                <el-option
                  v-for="(unit,index) in unitList"
                  :label="unit.name"
                  :value="unit.id"
                  :key="index"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xl="8">
            <el-form-item :label="$t('pmedicines.SpecificInMath')" class="specificInMath">
              1
              {{instoreUnitName}}
              =
              <el-input type="number" v-model="editDrugInfo.specificinmath" />
              {{outstoreUnitName}}
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :xl="8">
            <el-form-item :label="$t('pmedicines.Specific')">
              <el-input v-model="editDrugInfo.specific" />
            </el-form-item>
          </el-col>
          <el-col :xl="8">
            <el-form-item :label="$t('pmedicines.Count')">
              <el-input disabled v-model="editDrugInfo.count"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xl="8"></el-col>
        </el-row>
      </el-form>
      <el-form :model="editDrugInfo" :label-width="formLabelWidth">
        <el-row>
          <el-col :span="24">
            <el-form-item :label="$t('pmedicines.Remark')" class="drugsRemark">
              <el-input type="textarea" v-model="editDrugInfo.description"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="hideDialog">{{$t('table.cancel')}}</el-button>
        <el-button
          type="primary"
          @click="saveEditDrugsInfo('updatedrugsinfo')"
        >{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>
    <el-dialog
      :title="$t('pmedicines.AddDrug')"
      :visible.sync="insertDrugVisible"
      :close-on-click-modal="false"
      width="60%"
      @close="resetForm('insertdrugsinfo')"
      v-loading="loading"
    >
      <el-form
        :model="insertDrugInfo"
        :label-width="formLabelWidth"
        :inline="true"
        ref="insertdrugsinfo"
        :rules="rules"
      >
        <el-row :gutter="10">
          <el-col :xl="8">
            <el-form-item :label="$t('pmedicines.CategoryName')">
              <div>{{categoryName}}</div>
            </el-form-item>
          </el-col>
          <el-col :xl="8">
            <el-form-item
              :label="$t('pmedicines.DrugsName')"
              prop="drugsName"
              :rules="[{ required: true, message: '请输入产品名称' }]"
            >
              <el-input v-model="insertDrugInfo.drugsName" @change="handlerDrugName" />
            </el-form-item>
          </el-col>
          <el-col :xl="8">
            <el-form-item
              :label="$t('pmedicines.BarCode')"
              prop="barcode"
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
              prop="ingredient"
              :rules="[{ required: true, message: '请输入成分' }]"
            >
              <el-input v-model="insertDrugInfo.ingredient" />
            </el-form-item>
          </el-col>
          <el-col :xl="8">
            <el-form-item :label="$t('pmedicines.DrugsNameLetter')">
              <el-input v-model="insertDrugInfo.drugsnameletter" />
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
              <el-select v-model="insertDrugInfo.brandid" filterable @change="productChange">
                <el-option
                  v-for="(productInfo,index) in productList"
                  :label="productInfo.companyname"
                  :value="productInfo.id"
                  :key="index"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xl="8">
            <el-form-item :label="$t('pmedicines.ProviderName')">
              <el-select v-model="insertDrugInfo.providerid" filterable>
                <el-option
                  v-for="(supplierInfo,index) in supplierList"
                  :label="supplierInfo.companyname"
                  :value="supplierInfo.id"
                  :key="index"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :xl="8">
            <el-form-item :label="$t('pmedicines.DosingWay')">
              <el-select
                v-model="insertDrugInfo.dosingway"
                filterable
                @change="medicateMethodsChange"
              >
                <el-option
                  v-for="(medicateMethods,index) in medicateMethodsList"
                  :label="medicateMethods.name"
                  :value="medicateMethods.id"
                  :key="index"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xl="8">
            <el-form-item :label="$t('pmedicines.ShowAll')">
              <el-switch v-model="insertDrugInfo.showall"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :xl="8">
            <el-form-item :label="$t('pmedicines.UsingMethod')">
              <el-select v-model="insertDrugInfo.usingmethod" filterable>
                <el-option
                  v-for="(usageMethods,index) in usageMethodsList"
                  :label="usageMethods.name"
                  :value="usageMethods.id"
                  :key="index"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :xl="8">
            <el-form-item :label="$t('pmedicines.OutstorePrice')" prop="outstoreprice">
              <el-input type="number" v-model="insertDrugInfo.outstoreprice" />
            </el-form-item>
          </el-col>
          <el-col :xl="8">
            <el-form-item :label="$t('pmedicines.MemberPrice')" prop="memberprice">
              <el-input type="number" v-model="insertDrugInfo.memberprice" />
            </el-form-item>
          </el-col>
          <el-col :xl="8">
            <el-form-item :label="$t('pmedicines.InstorePrice')">
              <el-input type="number" v-model="insertDrugInfo.instoreprice" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :xl="8">
            <el-form-item :label="$t('pmedicines.CostPrice')">
              <el-input type="number" v-model="insertDrugInfo.costprice" />
            </el-form-item>
          </el-col>
          <el-col :xl="8">
            <el-form-item :label="$t('pmedicines.DoNotDiscount')">
              <el-switch v-model="insertDrugInfo.donotdiscount"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :xl="8">
            <el-form-item :label="$t('pmedicines.AllowSaleForNoneStock')">
              <el-switch v-model="insertDrugInfo.allowsalefornonestock"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :xl="8">
            <el-form-item :label="$t('pmedicines.CanOrder')">
              <el-switch v-model="insertDrugInfo.canorder" @change="orderDrugs"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :xl="8">
            <el-form-item :label="$t('pmedicines.CanSell')">
              <el-switch v-model="insertDrugInfo.cansell" @change="orderDrugs"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :xl="8">
            <el-form-item :label="$t('pmedicines.Deleted')">
              <el-switch v-model="insertDrugInfo.deleted" @change="deleteDrugs"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :xl="8">
            <el-form-item
              :label="$t('pmedicines.InstoreUnitName')"
              prop="instoreunit"
              :rules="[{ required: true, message: '请选择出入库单位' }]"
            >
              <el-select v-model="insertDrugInfo.instoreunit" filterable @change="insertUnitChange">
                <el-option
                  v-for="(unit,index) in unitList"
                  :label="unit.name"
                  :value="unit.id"
                  :key="index"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xl="8">
            <el-form-item
              :label="$t('pmedicines.Unit')"
              prop="outstoreunit"
              :rules="[{ required: true, message: '请选择投药单位' }]"
            >
              <el-select v-model="insertDrugInfo.unit" filterable @change="outUnitChange">
                <el-option
                  v-for="(unit,index) in unitList"
                  :label="unit.name"
                  :value="unit.id"
                  :key="index"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xl="8">
            <el-form-item :label="$t('pmedicines.SpecificInMath')" class="specificInMath">
              1
              {{instoreUnitName}}
              =
              <el-input type="number" v-model="insertDrugInfo.specificinmath" />
              {{outstoreUnitName}}
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :xl="8">
            <el-form-item :label="$t('pmedicines.Specific')">
              <el-input v-model="insertDrugInfo.specific" />
            </el-form-item>
          </el-col>
          <el-col :xl="8">
            <el-form-item :label="$t('pmedicines.Count')">
              <el-input disabled v-model="insertDrugInfo.count"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xl="8"></el-col>
        </el-row>
      </el-form>
      <el-form :model="insertDrugInfo" :label-width="formLabelWidth">
        <el-row>
          <el-col :span="24">
            <el-form-item :label="$t('pmedicines.Remark')" class="drugsRemark">
              <el-input type="textarea" v-model="insertDrugInfo.description"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('insertdrugsinfo')">{{$t('table.cancel')}}</el-button>
        <el-button type="primary" @click="submitDrugInfo('insertdrugsinfo')">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>

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
            <el-form-item :label="$t('pmedicines.DosingWay')">{{drugsDetailInfo.dosingwayname}}</el-form-item>
          </el-col>
          <el-col :xl="8">
            <el-form-item :label="$t('pmedicines.ShowAll')">{{drugsDetailInfo.showall?'是':'否'}}</el-form-item>
          </el-col>
          <el-col :xl="8">
            <el-form-item :label="$t('pmedicines.UsingMethod')">{{drugsDetailInfo.usingmethodname}}</el-form-item>
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
            <el-form-item :label="$t('pmedicines.Unit')">{{drugsDetailInfo.unitname}}</el-form-item>
          </el-col>
          <el-col :xl="8">
            <el-form-item :label="$t('pmedicines.SpecificInMath')" class="specificInMath">
              1
              {{drugsDetailInfo.instoreunitname}}
              =
              {{drugsDetailInfo.specificinmath}}
              {{drugsDetailInfo.unitname}}
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :xl="8">
            <el-form-item :label="$t('pmedicines.Specific')">{{drugsDetailInfo.specific}}</el-form-item>
          </el-col>
          <el-col :xl="8">
            <el-form-item :label="$t('pmedicines.Count')">{{drugsDetailInfo.count}}</el-form-item>
          </el-col>
          <el-col :xl="8"></el-col>
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

    <el-dialog
      :title="$t('unit.BatchFull')"
      :visible.sync="selectOrgVisible"
      width="30%"
      :close-on-click-modal="false"
    >
      <el-form :label-width="formLabelWidth">
        <el-form-item :label="$t('unit.OrgName')" class="selectOrgClass">
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
import Tree from "@/components/Tree/index";
import { getListData, dateFormat } from "@/utils/index";
import { mapGetters } from "vuex";
import Pagination from "@/components/Pagination/index";
import vPinyin from "@/common/convertpinyi";
export default {
  name: "",
  components: { Tree, Pagination },
  data() {
    var validateInsertPrice = (rule, value, callback) => {
      if (parseFloat(value) <= 0) {
        callback(new Error("输入的销售价不能小于等于0"));
      } else {
        callback();
      }
    };
    var validateOutPricePrice = (rule, value, callback) => {
      if (parseFloat(value) <= 0) {
        callback(new Error("输入的会员价不能小于等于0"));
      } else {
        callback();
      }
    };
    return {
      catename: "", //目录名称
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
          drugType: 1046,
          deleted: 0
        }
      },
      tableData: [],
      categoryId: 1006,
      categoryName: "",
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
          deleted: 0
        }
      },
      insertBaseInfo: {
        drugtype: 1046,
        category: 1006,
        barcode: "",
        providerid: null,
        ingredient: "",
        drugsName: "",
        description: "",
        instoreprice: null,
        outstoreprice: null,
        unit: null,
        specific: "",
        count: 0,
        usingmethod: null,
        englishname: null,
        drugsnameletter: "",
        instoreunit: null,
        deleted: false,
        memberprice: null,
        donotdiscount: true,
        showall: true,
        itemcode: "",
        brand: null,
        allowsalefornonestock: false,
        dosingway: null,
        categoryname: "",
        costprice: null,
        commonname: "",
        specificinmath: 1,
        outstoreunit: null,
        canorder: true,
        cansell: true,
        brandid: null,
        unitname: null,
        instoreunitname: null,
        outstoreunitname: null,
        dosingwayname: null
      },
      insertDrugInfo: {},
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
      medicateMethodsList: [],
      instoreUnitName: "入库单位",
      outstoreUnitName: "出库单位",
      rules: {
        outstoreprice: [
          { required: true, message: "请输入销售价" },
          { validator: validateInsertPrice, trigger: "blur" }
        ],
        memberprice: [
          { required: true, message: "请输入会员价" },
          { validator: validateOutPricePrice, trigger: "blur" }
        ]
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
          parentid: 1006,
          status: 0,
          deleted: 0
        }
      },
      dialogFormVisible: false,
      cateParentid: null
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
    //加载投药方式
    _this.loadMedicateMethods();
    //加载使用方式
    _this.loadUsageMethods();
    //加载机构列表
    _this.loadOrgList();
  },
  methods: {
    saveCate() {
      var _this = this;
      if (_this.catename == null || _this.catename == "") {
        _this.$message({
          showClose: true,
          message: "请填写目录名称",
          type: "error"
        });
        _this.isRepeat = false;
        return;
      }
      var englishname = vPinyin.chineseToPinYin(_this.catename);
      _this.$store
        .dispatch("unit/insertUnitInfo", {
          name: _this.catename,
          parentid: _this.cateParentid,
          deleted: 0,
          englishname: englishname,
          status: 0
        })
        .then(res => {
          if (res.code == 200) {
            _this.$message({
              showClose: true,
              type: "success",
              message: "添加成功"
            });
            _this.catename = "";
            _this.dialogFormVisible = false;
            _this.GetTreeData();
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
    //展示目录树结构
    showCatalogTree() {
      var _this = this;
      _this.showTreeVisible = true;
    },
    append(data) {
      console.log("节点对象数据为", data);
      var _this = this;
      _this.dialogFormVisible = true;
      _this.cateParentid = data.id;
    },

    remove(node, data) {
      var _this = this;
      //如果有子集并且子集的数据大于0
      if (
        data.hasOwnProperty("children") &&
        data.children != null &&
        data.children != undefined &&
        data.children.length > 0
      ) {
        _this.$message({
          showClose: true,
          message: "非子节点不可删除",
          type: "error"
        });
        return;
      }
      var ids = [];
      ids.push(data.id);
      _this
        .$confirm("确认要删除吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          _this.$store
            .dispatch("commondelete/deleteInfo", {
              ids: ids,
              tableType: 0
            })
            .then(res => {
              if (res.code == 200) {
                _this.$message({
                  showClose: true,
                  type: "success",
                  message: "删除成功"
                });
                _this.GetTreeData();
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
        });
    },
    showFullDrug() {
      var _this = this;
      _this.selectOrgVisible = true;
    },
    //加载机构列表
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
    //批量下发
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
    },
    //批量删除药品信息
    batchDeleteDrugsInfo() {
      var _this = this;
      var ids = _this.$refs.drugsTable.selection.map(function(info) {
        return info.id;
      });
      if (ids.length <= 0) {
        _this.$message({
          showClose: true,
          message: "请至少选择一行药品信息",
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
          _this.deleteDrugsInfo(ids);
        });
    },
    //单个删除药品信息
    signDeleteDrugsInfo(id) {
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
          _this.deleteDrugsInfo(ids);
        });
    },
    //删除药品信息
    deleteDrugsInfo(ids) {
      var _this = this;
      _this.$store
        .dispatch("commondelete/deleteInfo", {
          ids: ids,
          tableType: 3
        })
        .then(res => {
          if (res.code == 200) {
            _this.$message({
              showClose: true,
              type: "success",
              message: "删除成功"
            });
            _this.GetTableData();
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
    saveEditDrugsInfo(formName) {
      var _this = this;
      console.log("编辑的结果为", formName);
      _this.$refs[formName].validate(valid => {
        if (valid) {
          _this.loading = true;
          _this.editDrugInfo.deleted = _this.editDrugInfo.deleted ? 1 : 0;
          _this.editDrugInfo.canorder = _this.editDrugInfo.canorder ? 1 : 0;
          _this.editDrugInfo.cansell = _this.editDrugInfo.cansell ? 1 : 0;
          _this.deleteObjectValue("insertdate");
          _this.deleteObjectValue("validdate");
          _this.deleteObjectValue("updatestamp");
          _this.deleteObjectValue("lastupdateuserId");
          console.log("需要提交的对象为", _this.editDrugInfo);
          _this.$store
            .dispatch("pmedicines/updateDrugsAPI", _this.editDrugInfo)
            .then(res => {
              if (res.code == 200) {
                _this.$message({
                  showClose: true,
                  type: "success",
                  message: "保存成功"
                });
                _this.hideDialog();
                _this.GetTableData();
              } else {
                _this.$message({
                  showClose: true,
                  message: res.msg,
                  type: "error"
                });
              }
              _this.loading = false;
            })
            .catch(() => {
              _this.loading = false;
            });
        } else {
          return false;
        }
      });
    },
    deleteObjectValue(value) {
      var _this = this;
      console.log("属性值为", value);
      if (_this.editDrugInfo.hasOwnProperty(value)) {
        delete _this.editDrugInfo[value];
      }
    },
    showDrugsDetail(id) {
      var _this = this;
      _this.$store
        .dispatch("pmedicines/getPmedicinesInfo", { id: id })
        .then(res => {
          if (res.code == 200 && res.data.length > 0) {
            _this.drugsDetailInfo = res.data[0];

            _this.showDrugsDetailInfo = true;
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
    submitDrugInfo(formName) {
      var _this = this;
      _this.$refs[formName].validate(valid => {
        if (valid) {
          _this.loading = true;
          _this.insertDrugInfo.deleted = _this.insertDrugInfo.deleted ? 1 : 0;
          _this.insertDrugInfo.canorder = _this.insertDrugInfo.canorder ? 1 : 0;
          _this.insertDrugInfo.cansell = _this.insertDrugInfo.cansell ? 1 : 0;
          _this.$store
            .dispatch("pmedicines/insertDrugsAPI", _this.insertDrugInfo)
            .then(res => {
              if (res.code == 200) {
                _this.$message({
                  showClose: true,
                  type: "success",
                  message: "添加成功"
                });
                _this.hideDialog();
                _this.GetTableData();
              } else {
                _this.$message({
                  showClose: true,
                  message: res.msg,
                  type: "error"
                });
              }
              _this.loading = false;
            })
            .catch(() => {
              _this.loading = false;
            });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      var _this = this;
      _this.insertDrugInfo = _this.insertBaseInfo;
      _this.$refs[formName].resetFields();
      _this.hideDialog();
    },
    //投药方式发生改变时
    medicateMethodsChange(value) {
      var _this = this;
      _this.insertDrugInfo.dosingwayname = value
        ? _this.medicateMethodsList.find(ele => ele.id == value).name
        : "";
    },
    //生产商发生改变时
    productChange(value) {
      var _this = this;
      _this.insertDrugInfo.brand = value
        ? _this.productList.find(ele => ele.id == value).companyname
        : "";
    },
    //处理商品的大写拼音值
    handlerDrugName() {
      var _this = this;
      _this.insertDrugInfo.drugsnameletter = vPinyin.chineseToPinYinLatter(
        _this.insertDrugInfo.drugsName
      );
    },
    orderDrugs() {
      var _this = this;
      if (_this.insertDrugInfo.canorder || _this.insertDrugInfo.cansell)
        _this.insertDrugInfo.deleted = false;
      else if (!_this.insertDrugInfo.canorder && !_this.insertDrugInfo.cansell)
        _this.insertDrugInfo.deleted = false;
    },
    deleteDrugs() {
      var _this = this;
      if (_this.insertDrugInfo.deleted) {
        _this.insertDrugInfo.canorder = false;
        _this.insertDrugInfo.cansell = false;
      }
    },
    insertUnitChange(value) {
      var _this = this;
      var unitName = value
        ? _this.unitList.find(ele => ele.id == value).name
        : "";
      _this.instoreUnitName = unitName;
      _this.insertDrugInfo.instoreunitname = unitName;
      _this.insertDrugInfo.outstoreunit = value;
      _this.insertDrugInfo.outstoreunitname = unitName;
    },
    outUnitChange(value) {
      var _this = this;
      var unitName = value
        ? _this.unitList.find(ele => ele.id == value).name
        : "";
      _this.outstoreUnitName = unitName;
      _this.insertDrugInfo.unitname = unitName;
    },
    //加载投药方式
    loadMedicateMethods() {
      var _this = this;
      _this.$store
        .dispatch("pmedicines/getMedicateMethods", { parentid: 2335 })
        .then(res => {
          _this.medicateMethodsList = res.data;
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
          _this.usageMethodsList = res.data;
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
            _this.editDrugInfo.canorder = res.data[0].canorder == 1;
            _this.editDrugInfo.cansell = res.data[0].cansell == 1;
            _this.editDrugInfo.deleted = res.data[0].deleted == 1;
            console.log("需要编辑的实体为", _this.editDrugInfo);
            console.log("编辑的供应商为", _this.editDrugInfo.providerid);
            _this.insertUnitChange(_this.editDrugInfo.instoreunit);
            _this.outUnitChange(_this.editDrugInfo.unit);
            _this.editDrugVisible = true;
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
          _this.data = res;
          if (_this.data.length > 0) {
            _this.data.forEach(function(info) {
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
      this.insertDrugInfo.category = nodeData.id;
      this.insertDrugInfo.categoryname = nodeData.name;
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
          console.log("结果", res);
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

    //隐藏弹出层
    hideDialog() {
      var _this = this;
      _this.showTreeVisible = false;
      _this.editDrugVisible = false;
      _this.insertDrugVisible = false;
      _this.showDrugsDetailInfo = false;
      _this.selectOrgVisible = false;
      _this.insertDrugInfo = _this.insertBaseInfo;
    },
    hideAddCate() {
      var _this = this;
      _this.dialogFormVisible = false;
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
      justify-content: space-between;
      display: flex;
      font-size: 14px;
      padding-right: 8px;
    }
    .el-tree-node__content {
      height: 30px;
    }
  }
  .el-form {
    .specificInMath {
      display: flex;
      .el-input {
        width: 85px;
      }
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
  .fullButtonClass{
    display:flex;
    justify-content: flex-end;
    align-self: end;
    .el-button{
      margin: 0 0 10px 0;
    }
  }
}
</style>