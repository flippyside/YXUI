import { h, defineComponent } from "vue";

export default defineComponent({
  name: "Loading",
  setup() {
    return () => (
      <svg
        class="loading"
        width="24"
        height="24"
        // style="animation: spin 1s linear infinite;"
        viewBox="0 0 24 24"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="black"
          stroke-width="4"
          fill="none"
          stroke-dasharray="50 100" // 60 为可见弧长，100 为缺口长度
        />
      </svg>
    );
  },
});
