import { createNamespace } from "@yx/utils/create";
import { transform } from "typescript";
import {
  computed,
  defineComponent,
  h,
  onMounted,
  reactive,
  ref,
  watch,
} from "vue";

export default defineComponent({
  name: "YxVirtualList",
  props: {
    size: {
      type: Number,
      default: 35,
    },
    remain: {
      type: Number,
      default: 8,
    },
    items: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, { slots }) {
    const bem = createNamespace("vl");
    const wrapperRef = ref<HTMLElement>();
    const barRef = ref<HTMLElement>();
    const state = reactive({
      start: 0,
      end: props.remain,
    });
    const prev = computed(() => {
      return Math.min(state.start, props.remain);
    });
    const next = computed(() => {
      return Math.min(props.items.length - state.end, props.remain);
    });
    // 当前可视区内的数据：额外展示上remain条和下remain条，防止快速滑动时看到空白
    const visibleData = computed(() => {
      return props.items.slice(
        state.start - prev.value,
        state.end + next.value
      );
    });

    const offset = ref(0);
    const handleScroll = () => {
      // 根据当前滚动的距离来算，滚走了几个数据
      const scrollTop = wrapperRef.value!.scrollTop;
      state.start = Math.floor(scrollTop / props.size); // 已经划过去了多少个
      state.end = state.start + props.remain;
      offset.value = state.start * props.size - props.size * prev.value; // 已经划过去了多少个的距离
    };

    function initWrapper() {
      wrapperRef.value!.style.height = props.remain * props.size + "px";
      barRef.value!.style.height = props.items.length * props.size + "px";
    }

    // Wrapper的高度必须实时更新
    watch(() => props.items, initWrapper);

    onMounted(() => {
      initWrapper();
    });
    return () => {
      return (
        <div class={bem.b()} ref={wrapperRef} onScroll={handleScroll}>
          {/* 模拟列表的总长度，仿佛有很多数据 */}
          <div class={bem.e("scroll-bar")} ref={barRef}></div>
          {/* 更新列表的显示区域，只展示 remain 条数据 */}
          <div
            class={bem.e("scroll-list")}
            style={{ transform: `translate3d(0, ${offset.value}px, 0)` }}
          >
            {/* {console.log(props.items)} */}
            {visibleData!.value.map((node) => {
              // console.log(node);
              return slots.default!({ node });
            })}
          </div>
        </div>
      );
    };
  },
});
