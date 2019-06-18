## Layout 布局

通过基础的 24 分栏，迅速简便地创建布局。

### 基础布局

使用单一分栏创建基础的栅格布局。

:::demo 通过 row 和 col 组件，并通过 col 组件的 `span` 属性我们就可以自由地组合布局。
```html
<up-row>
  <up-col :span="24"><div class="grid-content bg-purple-dark"></div></up-col>
</up-row>
<up-row>
  <up-col :span="12"><div class="grid-content bg-purple"></div></up-col>
  <up-col :span="12"><div class="grid-content bg-purple-light"></div></up-col>
</up-row>
<up-row>
  <up-col :span="8"><div class="grid-content bg-purple"></div></up-col>
  <up-col :span="8"><div class="grid-content bg-purple-light"></div></up-col>
  <up-col :span="8"><div class="grid-content bg-purple"></div></up-col>
</up-row>
<up-row>
  <up-col :span="6"><div class="grid-content bg-purple"></div></up-col>
  <up-col :span="6"><div class="grid-content bg-purple-light"></div></up-col>
  <up-col :span="6"><div class="grid-content bg-purple"></div></up-col>
  <up-col :span="6"><div class="grid-content bg-purple-light"></div></up-col>
</up-row>
<up-row>
  <up-col :span="4"><div class="grid-content bg-purple"></div></up-col>
  <up-col :span="4"><div class="grid-content bg-purple-light"></div></up-col>
  <up-col :span="4"><div class="grid-content bg-purple"></div></up-col>
  <up-col :span="4"><div class="grid-content bg-purple-light"></div></up-col>
  <up-col :span="4"><div class="grid-content bg-purple"></div></up-col>
  <up-col :span="4"><div class="grid-content bg-purple-light"></div></up-col>
</up-row>

<style>
  .up-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .up-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
```
:::

### 分栏间隔

分栏之间存在间隔。

:::demo Row 组件 提供 `gutter` 属性来指定每一栏之间的间隔，默认间隔为 0。
```html
<up-row :gutter="20">
  <up-col :span="6"><div class="grid-content bg-purple"></div></up-col>
  <up-col :span="6"><div class="grid-content bg-purple"></div></up-col>
  <up-col :span="6"><div class="grid-content bg-purple"></div></up-col>
  <up-col :span="6"><div class="grid-content bg-purple"></div></up-col>
</up-row>

<style>
  .up-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .up-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
```
:::

### 混合布局

通过基础的 1/24 分栏任意扩展组合形成较为复杂的混合布局。

:::demo
```html
<up-row :gutter="20">
  <up-col :span="16"><div class="grid-content bg-purple"></div></up-col>
  <up-col :span="8"><div class="grid-content bg-purple"></div></up-col>
</up-row>
<up-row :gutter="20">
  <up-col :span="8"><div class="grid-content bg-purple"></div></up-col>
  <up-col :span="8"><div class="grid-content bg-purple"></div></up-col>
  <up-col :span="4"><div class="grid-content bg-purple"></div></up-col>
  <up-col :span="4"><div class="grid-content bg-purple"></div></up-col>
</up-row>
<up-row :gutter="20">
  <up-col :span="4"><div class="grid-content bg-purple"></div></up-col>
  <up-col :span="16"><div class="grid-content bg-purple"></div></up-col>
  <up-col :span="4"><div class="grid-content bg-purple"></div></up-col>
</up-row>

<style>
  .up-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .up-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
```
:::

### 分栏偏移

支持偏移指定的栏数。

:::demo 通过制定 col 组件的 `offset` 属性可以指定分栏偏移的栏数。
```html
<up-row :gutter="20">
  <up-col :span="6"><div class="grid-content bg-purple"></div></up-col>
  <up-col :span="6" :offset="6"><div class="grid-content bg-purple"></div></up-col>
</up-row>
<up-row :gutter="20">
  <up-col :span="6" :offset="6"><div class="grid-content bg-purple"></div></up-col>
  <up-col :span="6" :offset="6"><div class="grid-content bg-purple"></div></up-col>
</up-row>
<up-row :gutter="20">
  <up-col :span="12" :offset="6"><div class="grid-content bg-purple"></div></up-col>
</up-row>

<style>
  .up-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .up-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
```
:::

### 对齐方式

通过 `flex` 布局来对分栏进行灵活的对齐。

:::demo 将 `type` 属性赋值为 'flex'，可以启用 flex 布局，并可通过 `justify` 属性来指定 start, center, end, space-between, space-around 其中的值来定义子元素的排版方式。
```html
<up-row type="flex" class="row-bg">
  <up-col :span="6"><div class="grid-content bg-purple"></div></up-col>
  <up-col :span="6"><div class="grid-content bg-purple-light"></div></up-col>
  <up-col :span="6"><div class="grid-content bg-purple"></div></up-col>
</up-row>
<up-row type="flex" class="row-bg" justify="center">
  <up-col :span="6"><div class="grid-content bg-purple"></div></up-col>
  <up-col :span="6"><div class="grid-content bg-purple-light"></div></up-col>
  <up-col :span="6"><div class="grid-content bg-purple"></div></up-col>
</up-row>
<up-row type="flex" class="row-bg" justify="end">
  <up-col :span="6"><div class="grid-content bg-purple"></div></up-col>
  <up-col :span="6"><div class="grid-content bg-purple-light"></div></up-col>
  <up-col :span="6"><div class="grid-content bg-purple"></div></up-col>
</up-row>
<up-row type="flex" class="row-bg" justify="space-between">
  <up-col :span="6"><div class="grid-content bg-purple"></div></up-col>
  <up-col :span="6"><div class="grid-content bg-purple-light"></div></up-col>
  <up-col :span="6"><div class="grid-content bg-purple"></div></up-col>
</up-row>
<up-row type="flex" class="row-bg" justify="space-around">
  <up-col :span="6"><div class="grid-content bg-purple"></div></up-col>
  <up-col :span="6"><div class="grid-content bg-purple-light"></div></up-col>
  <up-col :span="6"><div class="grid-content bg-purple"></div></up-col>
</up-row>

<style>
  .up-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .up-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
```
:::

### <up-component c="el-badge" value="new">交叉轴对齐方式</up-component>

:::demo 将 type 属性赋值为 'flex'，可以启用flex 布局，并通过 align 属性来指定 top(默认值), middle, center, baseline, stretch 其中的值来定义子元素在交叉轴上的对齐方式。
```html
<up-row type="flex" class="row-bg" style="height: 100px">
  <up-col :span="6"><div class="grid-content bg-purple">flex-start</div></up-col>
  <up-col :span="6"><div class="grid-content bg-purple-light"></div></up-col>
  <up-col :span="6"><div class="grid-content bg-purple"></div></up-col>
  <up-col :span="6"><div class="grid-content bg-purple-light"></div></up-col>
</up-row>
<up-row type="flex" align="middle" class="row-bg" style="height: 100px;">
  <up-col :span="6"><div class="grid-content bg-purple">center</div></up-col>
  <up-col :span="6"><div class="grid-content bg-purple-light"></div></up-col>
  <up-col :span="6"><div class="grid-content bg-purple"></div></up-col>
  <up-col :span="6"><div class="grid-content bg-purple-light"></div></up-col>
</up-row>
<up-row type="flex" align="bottom" class="row-bg" style="height: 100px;">
  <up-col :span="6"><div class="grid-content bg-purple">flex-end</div></up-col>
  <up-col :span="6"><div class="grid-content bg-purple-light"></div></up-col>
  <up-col :span="6"><div class="grid-content bg-purple"></div></up-col>
  <up-col :span="6"><div class="grid-content bg-purple-light"></div></up-col>
</up-row>
<up-row type="flex" align="baseline" class="row-bg" style="height: 100px;">
  <span style="line-height: 70px;margin-right: 20px;">baseline</span>
  <up-col :span="6"><div class="grid-content bg-purple-light"></div></up-col>
  <up-col :span="6"><div class="grid-content bg-purple"></div></up-col>
  <up-col :span="6"><div class="grid-content bg-purple-light"></div></up-col>
</up-row>
<up-row type="flex" align="stretch" class="row-bg" style="height: 100px;">
  <up-col :span="6" style="height: auto;"><div class="grid-content bg-purple is-stretch">stretch</div></up-col>
  <up-col :span="6" style="height: auto;"><div class="grid-content bg-purple-light is-stretch"></div></up-col>
  <up-col :span="6" style="height: auto;"><div class="grid-content bg-purple is-stretch"></div></up-col>
  <up-col :span="6" style="height: auto;"><div class="grid-content bg-purple-light is-stretch"></div></up-col>
</up-row>

<style>
  .up-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .up-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
    line-height: 36px;
    text-align: center;
    font-size: 18px;
    color: #5e6d82;
  }
  .grid-content.is-stretch {
    min-height: 100%;
    line-height: 80px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
```
:::

### <up-component c="el-badge" value="new">排列方向</up-component>

通过 flex 布局来对分栏进行灵活的排列。

:::demo 将 type 属性赋值为 'flex'，可以启用flex 布局，并通过 direction 属性来指定 row(默认值), row-reverse, column, column-reverse 其中的值来定义子元素的排列方式。
```html
<up-row type="flex" class="row-bg">
  <up-col :span="6"><div class="grid-content bg-purple">6-1</div></up-col>
  <up-col :span="6"><div class="grid-content bg-purple-light">6-2</div></up-col>
  <up-col :span="6"><div class="grid-content bg-purple">6-3</div></up-col>
</up-row>
<up-row type="flex" direction="row-reverse" class="row-bg">
  <up-col :span="6"><div class="grid-content bg-purple">6-1</div></up-col>
  <up-col :span="6"><div class="grid-content bg-purple-light">6-2</div></up-col>
  <up-col :span="6"><div class="grid-content bg-purple">6-3</div></up-col>
</up-row>
<up-row type="flex" direction="column" class="row-bg">
  <up-col :span="6"><div class="grid-content bg-purple">6-1</div></up-col>
  <up-col :span="6"><div class="grid-content bg-purple-light">6-2</div></up-col>
  <up-col :span="6"><div class="grid-content bg-purple">6-3</div></up-col>
</up-row>
<up-row type="flex" direction="column-reverse" class="row-bg">
  <up-col :span="6"><div class="grid-content bg-purple">6-1</div></up-col>
  <up-col :span="6"><div class="grid-content bg-purple-light">6-2</div></up-col>
  <up-col :span="6"><div class="grid-content bg-purple">6-3</div></up-col>
</up-row>

<style>
  .up-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .up-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
    line-height: 36px;
    text-align: center;
    font-size: 18px;
    color: #5e6d82;
  }
  .grid-content.is-stretch {
    min-height: 100%;
    line-height: 80px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
```
:::

### <up-component c="el-badge" value="new">单行、多行</up-component>

通过 flex 布局来对分栏进行灵活的单行或多行显示。

:::demo 将 type 属性赋值为 'flex'，可以启用flex 布局，并通过 wrap 属性来指定 nowrap(默认值), wrap, wrap-reverse 其中的值来定义子元素的单行或多行显示方式并允许你控制行的堆叠方向。
```html
<up-row type="flex" wrap="nowrap" class="row-bg">
  <up-col :span="6"><div class="grid-content bg-purple">6</div></up-col>
  <up-col :span="6"><div class="grid-content bg-purple-light">6</div></up-col>
  <up-col :span="6"><div class="grid-content bg-purple">6</div></up-col>
  <up-col :span="6"><div class="grid-content bg-purple-light">6</div></up-col>
  <up-col :span="6"><div class="grid-content bg-purple">6</div></up-col>
</up-row>
<up-row type="flex" wrap="wrap" class="row-bg">
  <up-col :span="6"><div class="grid-content bg-purple">6</div></up-col>
  <up-col :span="6"><div class="grid-content bg-purple-light">6</div></up-col>
  <up-col :span="6"><div class="grid-content bg-purple">6</div></up-col>
  <up-col :span="6"><div class="grid-content bg-purple-light">6</div></up-col>
  <up-col :span="6"><div class="grid-content bg-purple">6</div></up-col>
</up-row>
<up-row type="flex" wrap="wrap-reverse" class="row-bg">
  <up-col :span="6"><div class="grid-content bg-purple">6</div></up-col>
  <up-col :span="6"><div class="grid-content bg-purple-light">6</div></up-col>
  <up-col :span="6"><div class="grid-content bg-purple">6</div></up-col>
  <up-col :span="6"><div class="grid-content bg-purple-light">6</div></up-col>
  <up-col :span="6"><div class="grid-content bg-purple">6</div></up-col>
</up-row>
```
:::

### <up-component c="el-badge" value="new">多轴对齐方式</up-component>

通过 flex 布局来对分栏进行灵活的对齐

:::demo 将 type 属性赋值为 'flex'，可以启用flex 布局，并通过 content 属性来指定 start, center, end, space-around, space-between, stretch 其中的值来定义子元素的多轴对齐方式。
```html
<up-row type="flex" wrap="wrap" class="row-bg" style="height: 150px;">
  <up-col :span="6"><div class="grid-content bg-purple">6</div></up-col>
  <up-col :span="6"><div class="grid-content bg-purple-light">6</div></up-col>
  <up-col :span="6"><div class="grid-content bg-purple">6</div></up-col>
  <up-col :span="6"><div class="grid-content bg-purple-light">6</div></up-col>
  <up-col :span="6"><div class="grid-content bg-purple">6</div></up-col>
</up-row>
<up-row type="flex" wrap="wrap" content="center" class="row-bg" style="height: 150px;">
  <up-col :span="6"><div class="grid-content bg-purple">6</div></up-col>
  <up-col :span="6"><div class="grid-content bg-purple-light">6</div></up-col>
  <up-col :span="6"><div class="grid-content bg-purple">6</div></up-col>
  <up-col :span="6"><div class="grid-content bg-purple-light">6</div></up-col>
  <up-col :span="6"><div class="grid-content bg-purple">6</div></up-col>
</up-row>
<up-row type="flex" wrap="wrap" content="end" class="row-bg" style="height: 150px;">
  <up-col :span="6"><div class="grid-content bg-purple">6</div></up-col>
  <up-col :span="6"><div class="grid-content bg-purple-light">6</div></up-col>
  <up-col :span="6"><div class="grid-content bg-purple">6</div></up-col>
  <up-col :span="6"><div class="grid-content bg-purple-light">6</div></up-col>
  <up-col :span="6"><div class="grid-content bg-purple">6</div></up-col>
</up-row>
<up-row type="flex" wrap="wrap" content="space-between" class="row-bg" style="height: 150px;">
  <up-col :span="6"><div class="grid-content bg-purple">6</div></up-col>
  <up-col :span="6"><div class="grid-content bg-purple-light">6</div></up-col>
  <up-col :span="6"><div class="grid-content bg-purple">6</div></up-col>
  <up-col :span="6"><div class="grid-content bg-purple-light">6</div></up-col>
  <up-col :span="6"><div class="grid-content bg-purple">6</div></up-col>
</up-row>
<up-row type="flex" wrap="wrap" content="space-around" class="row-bg" style="height: 150px;">
  <up-col :span="6"><div class="grid-content bg-purple">6</div></up-col>
  <up-col :span="6"><div class="grid-content bg-purple-light">6</div></up-col>
  <up-col :span="6"><div class="grid-content bg-purple">6</div></up-col>
  <up-col :span="6"><div class="grid-content bg-purple-light">6</div></up-col>
  <up-col :span="6"><div class="grid-content bg-purple">6</div></up-col>
</up-row>
<up-row type="flex" content="stretch" class="row-bg" style="height: 150px;">
  <up-col :span="6" style="height: auto;"><div class="grid-content bg-purple is-stretch">6</div></up-col>
  <up-col :span="6" style="height: auto;"><div class="grid-content bg-purple-light is-stretch">6</div></up-col>
  <up-col :span="6" style="height: auto;"><div class="grid-content bg-purple is-stretch">6</div></up-col>
  <up-col :span="6" style="height: auto;"><div class="grid-content bg-purple-light is-stretch">6</div></up-col>
  <up-col :span="6" style="height: auto;"><div class="grid-content bg-purple is-stretch">6</div></up-col>
</up-row>

<style>
  .up-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .up-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
    line-height: 36px;
    text-align: center;
    font-size: 18px;
    color: #5e6d82;
  }
  .grid-content.is-stretch {
    min-height: 100%;
    line-height: 80px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
```
:::

### <up-component c="el-badge" value="new">排列顺序</up-component>

通过 flex 布局来对分栏进行灵活的排序。

:::demo 将 type 属性赋值为 'flex'，可以启用flex 布局，并通过 order 属性来指定 子元素的排列顺序，数值越小，排列越靠前，默认为0。
```html
<up-row type="flex" class="row-bg">
  <up-col :span="6" :order="3"><div class="grid-content bg-purple">6-1 | order-3</div></up-col>
  <up-col :span="6" :order="4"><div class="grid-content bg-purple-light">6-2 | order-4</div></up-col>
  <up-col :span="6" :order="1"><div class="grid-content bg-purple">6-3 | order-1</div></up-col>
  <up-col :span="6" :order="2"><div class="grid-content bg-purple-light">6-4 | order-2</div></up-col>
</up-row>

<style>
  .up-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .up-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
    line-height: 36px;
    text-align: center;
    font-size: 18px;
    color: #5e6d82;
  }
  .grid-content.is-stretch {
    min-height: 100%;
    line-height: 80px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
```
:::

### 响应式布局

参照了 Bootstrap 的 响应式设计，预设了五个响应尺寸：`xs`、`sm`、`md`、`lg` 和 `xl`。

:::demo
```html
<up-row :gutter="10">
  <up-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"><div class="grid-content bg-purple"></div></up-col>
  <up-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"><div class="grid-content bg-purple-light"></div></up-col>
  <up-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"><div class="grid-content bg-purple"></div></up-col>
  <up-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"><div class="grid-content bg-purple-light"></div></up-col>
</up-row>

<style>
  .up-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
</style>
```
:::

### 基于断点的隐藏类

Element 额外提供了一系列类名，用于在某些条件下隐藏元素。这些类名可以添加在任何 DOM 元素或自定义组件上。如果需要，请自行引入以下文件：

```js
import 'element-up/lib/theme-chalk/display.css';
```

包含的类名及其含义为：
- `hidden-xs-only` - 当视口在 `xs` 尺寸时隐藏
- `hidden-sm-only` - 当视口在 `sm` 尺寸时隐藏
- `hidden-sm-and-down` - 当视口在 `sm` 及以下尺寸时隐藏
- `hidden-sm-and-up` - 当视口在 `sm` 及以上尺寸时隐藏
- `hidden-md-only` - 当视口在 `md` 尺寸时隐藏
- `hidden-md-and-down` - 当视口在 `md` 及以下尺寸时隐藏
- `hidden-md-and-up` - 当视口在 `md` 及以上尺寸时隐藏
- `hidden-lg-only` - 当视口在 `lg` 尺寸时隐藏
- `hidden-lg-and-down` - 当视口在 `lg` 及以下尺寸时隐藏
- `hidden-lg-and-up` - 当视口在 `lg` 及以上尺寸时隐藏
- `hidden-xl-only` - 当视口在 `xl` 尺寸时隐藏

### Row Attributes
| 参数                                                            | 说明                                  | 类型   | 可选值                                              | 默认值 |
| --------------------------------------------------------------- | ------------------------------------- | ------ | --------------------------------------------------- | ------ |
| gutter                                                          | 栅格间隔                              | number | —                                                   | 0      |
| type                                                            | 布局模式，可选 flex，现代浏览器下有效 | string | —                                                   | —      |
| justify                                                         | flex 布局下的水平排列方式             | string | start/end/center/space-around/space-between         | start  |
| align                                                           | flex 布局下的垂直排列方式             | string | top/middle/bottom/baseline/stretch                  | top    |
| <up-component c="el-badge" value="new">direction</up-component> | flex 布局下的排列方向                 | string | row/row-reverse/column/column-reverse               | row    |
| <up-component c="el-badge" value="new">wrap</up-component>      | flex 布局下的单行或多行显示方式       | string | nowrap/wrap/wrap-reverse                            | nowrap |
| <up-component c="el-badge" value="new">content</up-component>   | flex 布局下的多轴排列方式             | string | start/center/end/space-around/space-between/stretch | start  |
| tag                                                             | 自定义元素标签                        | string | *                                                   | div    |

### Col Attributes
| 参数                                                        | 说明                                   | 类型                                        | 可选值 | 默认值 |
| ----------------------------------------------------------- | -------------------------------------- | ------------------------------------------- | ------ | ------ |
| span                                                        | 栅格占据的列数                         | number                                      | —      | 24     |
| offset                                                      | 栅格左侧的间隔格数                     | number                                      | —      | 0      |
| push                                                        | 栅格向右移动格数                       | number                                      | —      | 0      |
| pull                                                        | 栅格向左移动格数                       | number                                      | —      | 0      |
| <up-component c="el-badge" value="new">order</up-component> | 栅格排列顺序                           | number                                      | —      | 0      |
| xs                                                          | `<768px` 响应式栅格数或者栅格属性对象  | number/object (例如： {span: 4, offset: 4}) | —      | —      |
| sm                                                          | `≥768px` 响应式栅格数或者栅格属性对象  | number/object (例如： {span: 4, offset: 4}) | —      | —      |
| md                                                          | `≥992px` 响应式栅格数或者栅格属性对象  | number/object (例如： {span: 4, offset: 4}) | —      | —      |
| lg                                                          | `≥1200px` 响应式栅格数或者栅格属性对象 | number/object (例如： {span: 4, offset: 4}) | —      | —      |
| xl                                                          | `≥1920px` 响应式栅格数或者栅格属性对象 | number/object (例如： {span: 4, offset: 4}) | —      | —      |
| tag                                                         | 自定义元素标签                         | string                                      | *      | div    |