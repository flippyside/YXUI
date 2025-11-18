import { defineComponent, inject } from "vue";
import { treeInjectKey, treeNodeContentProps } from "../tree";

export default defineComponent({
  name: "YxTreeNodeContent",
  props: treeNodeContentProps,
  setup(props) {
    const treeContext = inject(treeInjectKey);
    const node = props.node;
    // console.log(node);
    return () => {
      return treeContext?.slots.default
        ? treeContext?.slots.default({ node })
        : node?.label;
    };
  },
});
