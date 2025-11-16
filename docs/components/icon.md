# Icon 图标

用于展示图标或作为按钮、菜单等元素的视觉符号。推荐使用 xicons 作为图标库

```
pnpm install @vicons/ionicons5
```

## 基础用法

通过 `color` 和 `size` 属性控制图标的颜色和大小。

<script setup>
import { AddCircle } from "@vicons/ionicons5";
import { CashOutline } from "@vicons/ionicons5";
</script>

<yx-icon color="yellowgreen" size="24">
<AddCircle/>
</yx-icon>

<yx-icon color="yellowgreen" size="24">
<CashOutline/>
</yx-icon>

<br/>

<yx-icon color="yellowgreen" size="48">
<AddCircle/>
</yx-icon>

<yx-icon color="yellowgreen" size="48">
<CashOutline/>
</yx-icon>

```vue
<script setup lang="ts">
import { CashOutline } from "@vicons/ionicons5";
</script>

<yx-icon color="red" size="24">
<CashOutline/>
</yx-icon>
```
