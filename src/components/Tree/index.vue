<template>
  <el-card shadow="always">
    <el-tree
      :data="data"
      node-key="id"
      default-expand-all
      :highlight-current="true"
      @node-click="handleClick"
      draggable
    >
    <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{ node.label }}</span>
                <span>{{ data.name }}</span>
    </span>
    </el-tree>
  </el-card>
</template>
<script>


      // :allow-drop="allowDrop"
      // :allow-drag="allowDrag"
      // @node-drag-start="handleDragStart"
      // @node-drag-enter="handleDragEnter"
      // @node-drag-leave="handleDragLeave"
      // @node-drag-over="handleDragOver"
      // @node-drag-end="handleDragEnd"
      // @node-drop="handleDrop"
export default {
  props: {
    treeData: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      data: this.treeData
    };
  },
  created() {
    //this.data=this.treeData;
  },
  methods: {
    handleClick(data,node,relf){
      this.$emit("handleClick",data);
    },
    handleDragStart(node, ev) {
      console.log("drag start", node);
    },
    handleDragEnter(draggingNode, dropNode, ev) {
      console.log("tree drag enter: ", dropNode.label);
    },
    handleDragLeave(draggingNode, dropNode, ev) {
      console.log("tree drag leave: ", dropNode.label);
    },
    handleDragOver(draggingNode, dropNode, ev) {
      console.log("tree drag over: ", dropNode.label);
    },
    handleDragEnd(draggingNode, dropNode, dropType, ev) {
      console.log("tree drag end: ", dropNode && dropNode.label, dropType);
    },
    handleDrop(draggingNode, dropNode, dropType, ev) {
      console.log("tree drop: ", dropNode.label, dropType);
    },
    allowDrop(draggingNode, dropNode, type) {
      if (dropNode.data.label === "二级 3-1") {
        return type !== "inner";
      } else {
        return true;
      }
    },
    allowDrag(draggingNode) {
      return draggingNode.data.label.indexOf("三级 3-2-2") === -1;
    }
  },
  watch: {
    treeData(oldVal, newVal) {
      this.data = oldVal;
    }
  }
};
</script>