<template>
  <div class="app-container" style="display:flex">
    <el-card>
      <el-table
        :data="tableData"
        v-loading="loading"
        border
        stripe
        style="width: 99.9%;height:100%;overflow:hidden;"
      >
        <el-table-column prop="operModul" :label="$t('log.Oper_Modul')" width="200"></el-table-column>
        <el-table-column
          prop="operCreateTime"
          :formatter="dateFormat"
          :label="$t('log.Oper_Create_Time')"
          width="180"
        ></el-table-column>
        <el-table-column prop="operType" :label="$t('log.Oper_Type')" width="120"></el-table-column>
        <el-table-column prop="operUrl" :label="$t('log.Oper_Url')" width="180"></el-table-column>
        <el-table-column
          prop="operRequParam"
          :show-overflow-tooltip="true"
          :label="$t('log.Oper_Requ_Param')"
          width="220"
        ></el-table-column>
        <el-table-column
          prop="operMethod"
          :show-overflow-tooltip="true"
          :label="$t('log.Oper_Method')"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="operReturnParam"
          :show-overflow-tooltip="true"
          :label="$t('log.Oper_Return_Param')"
          width="300"
        ></el-table-column>
        <el-table-column prop="operUsername" :label="$t('log.Oper_UserName')" width="100"></el-table-column>
        <el-table-column prop="operDesc" :label="$t('log.Oper_Desc')" width="300"></el-table-column>
        <el-table-column prop="operIp" :label="$t('log.Oper_IP')" width="120"></el-table-column>
        <el-table-column prop="operVer" :label="$t('log.Oper_Ver')" width="100"></el-table-column>
      </el-table>

      <Pagination
        :total="total"
        :background="true"
        :page="page"
        :limit="limit"
        :pageSizes="pageSizes"
        @pagination="pagination"
      ></Pagination>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { param, parseTime } from "@/utils/index";
import Pagination from "@/components/Pagination/index";
export default {
  name: "Logs",
  components: { Pagination },
  computed: {
    ...mapGetters({ logData: "logLoadData" })
  },
  created() {
    this.loadData();
  },
  methods: {
    dateFormat: function(row, column) {
      var t = new Date(row.operCreateTime); //row 表示一行数据, updateTime 表示要格式化的字段名称
      var year = t.getFullYear(),
        month = t.getMonth() + 1,
        day = t.getDate(),
        hour = t.getHours(),
        min = t.getMinutes(),
        sec = t.getSeconds();
      var newTime =
        year +
        "-" +
        (month < 10 ? "0" + month : month) +
        "-" +
        (day < 10 ? "0" + day : day) +
        " " +
        (hour < 10 ? "0" + hour : hour) +
        ":" +
        (min < 10 ? "0" + min : min) +
        ":" +
        (sec < 10 ? "0" + sec : sec);
      return newTime;
    },
    pagination(param) {
      this.params.currentPage = param.page;
      this.params.pageSize = param.limit;
      this.loadData();
    },
    loadData() {
      this.loading = true;
      this.$store
        .dispatch("log/getLogAll", this.params)
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
    }
  },

  data() {
    return {
      tableData: [],
      total: 0,
      page: 10,
      limit: 10,
      pageSizes: [10, 20, 50, 100],
      loading: false,
      params: {
        currentPage: 1,
        pageSize: 10
      }
    };
  }
};
</script>
<style>
.el-pagination__rightwrapper {
  float: left !important;
}
</style>