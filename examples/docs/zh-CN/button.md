## Button 按钮

常用的操作按钮。

#### :star::star::star:相对于 Element 所做的变动：

:::tip

 1. 组件名称统一为`up-button`，通过`component`属性，传入`el-button`和`el-button-group`来做控制。
 2. 当`component`为`el-button-group`时， 可以传入`data`属性来展示按钮列表，`data`中每一项 `item` 的属性都会应用到按钮上。
 3. 在`data`中有两个特别的属性`attrs`和`listeners`，分别为按钮组中的按钮添加属性和绑定事件。如果存在同名属性，则`attrs`中的属性优先于`props`及`item`中的属性；如果存在同名事件，则`listeners`中的事件优先于在属性`component`为`el-button-group`的按钮组上绑定的事件。
:::

### 基础用法

基础的按钮用法。

:::demo 使用`type`、`plain`、`round`和`circle`属性来定义 Button 的样式。

```html
<up-row>
  <up-button>默认按钮</up-button>
  <up-button type="primary">主要按钮</up-button>
  <up-button type="success">成功按钮</up-button>
  <up-button type="info">信息按钮</up-button>
  <up-button type="warning">警告按钮</up-button>
  <up-button type="danger">危险按钮</up-button>
</up-row>

<up-row>
  <up-button plain>朴素按钮</up-button>
  <up-button type="primary" plain>主要按钮</up-button>
  <up-button type="success" plain>成功按钮</up-button>
  <up-button type="info" plain>信息按钮</up-button>
  <up-button type="warning" plain>警告按钮</up-button>
  <up-button type="danger" plain>危险按钮</up-button>
</up-row>

<up-row>
  <up-button round>圆角按钮</up-button>
  <up-button type="primary" round>主要按钮</up-button>
  <up-button type="success" round>成功按钮</up-button>
  <up-button type="info" round>信息按钮</up-button>
  <up-button type="warning" round>警告按钮</up-button>
  <up-button type="danger" round>危险按钮</up-button>
</up-row>

<up-row>
  <up-button icon="el-icon-search" circle></up-button>
  <up-button type="primary" icon="el-icon-edit" circle></up-button>
  <up-button type="success" icon="el-icon-check" circle></up-button>
  <up-button type="info" icon="el-icon-message" circle></up-button>
  <up-button type="warning" icon="el-icon-star-off" circle></up-button>
  <up-button type="danger" icon="el-icon-delete" circle></up-button>
</up-row>
```
:::

### 禁用状态

按钮不可用状态。

:::demo 你可以使用`disabled`属性来定义按钮是否可用，它接受一个`Boolean`值。

```html
<up-row>
  <up-button disabled>默认按钮</up-button>
  <up-button type="primary" disabled>主要按钮</up-button>
  <up-button type="success" disabled>成功按钮</up-button>
  <up-button type="info" disabled>信息按钮</up-button>
  <up-button type="warning" disabled>警告按钮</up-button>
  <up-button type="danger" disabled>危险按钮</up-button>
</up-row>

<up-row>
  <up-button plain disabled>朴素按钮</up-button>
  <up-button type="primary" plain disabled>主要按钮</up-button>
  <up-button type="success" plain disabled>成功按钮</up-button>
  <up-button type="info" plain disabled>信息按钮</up-button>
  <up-button type="warning" plain disabled>警告按钮</up-button>
  <up-button type="danger" plain disabled>危险按钮</up-button>
</up-row>
```
:::

### 文字按钮

没有边框和背景色的按钮。

:::demo
```html
<up-button type="text">文字按钮</up-button>
<up-button type="text" disabled>文字按钮</up-button>
```
:::

### 图标按钮

带图标的按钮可增强辨识度（有文字）或节省空间（无文字）。

:::demo 设置`icon`属性即可，icon 的列表可以参考 Element 的 icon 组件，也可以设置在文字右边的 icon ，只要使用`i`标签即可，可以使用自定义图标。

```html
<up-button type="primary" icon="el-icon-edit"></up-button>
<up-button type="primary" icon="el-icon-share"></up-button>
<up-button type="primary" icon="el-icon-delete"></up-button>
<up-button type="primary" icon="el-icon-search">搜索</up-button>
<up-button type="primary">上传<i class="el-icon-upload el-icon--right"></i></up-button>
```
:::

### 按钮组

以按钮组的方式出现，常用于多项类似操作。

:::demo 使用`<up-button>`标签配合`component="el-button-group"`来嵌套你的按钮。

```html
<up-button component="el-button-group">
  <up-button type="primary" icon="el-icon-arrow-left">上一页</up-button>
  <up-button type="primary">下一页<i class="el-icon-arrow-right el-icon--right"></i></up-button>
</up-button>

<up-button component="el-button-group">
  <up-button type="primary" icon="el-icon-edit"></up-button>
  <up-button type="primary" icon="el-icon-share"></up-button>
  <up-button type="primary" icon="el-icon-delete"></up-button>
</up-button>
```
:::

### <up-component component="el-badge" value="new">按钮组 - 属性、事件、slot</up-component>

:::demo 可以统一为按钮组中所有按钮绑定事件，也可以在`data`中为每一个按钮绑定属性`attrs`及事件`listeners`，在`data`中绑定的事件优先于按钮组中统一绑定的事件。提供默认插槽来覆盖默认的按钮组展示行为，同时提供`up:item`插槽来自定义按钮内容的展示，其中`slot-scope`返回`{ item, $index }`供使用，`item`表示`data`中的每一项。

```html
<template>
  <up-row>
    <up-button component="el-button-group" :data="data" @click="handleClick">
      <!-- up:item 插槽 -->
      <span slot="up:item" slot-scope="{ item, $index }">{{ item.name }}</span>
    </up-button>
  </up-row>

  <up-row>
    <up-button component="el-button-group">
      <!-- 默认插槽 -->
      <up-button v-for="(item, index) in data" :type="item.type" :key="item.name" @click="event => handleClick(event, item, index, data)"> {{ item.name + '—' + index }} </up-button>
    </up-button>
  </up-row>
</template>

<script>
export default {
  data () {
    return {
      data: [
        {
          name: '绑定事件',
          type: 'default',
          active: false,
          listeners: {
            click (event, item, index, data) {
              console.log('FROM [BUTTON] handleClick: ', event, item, index, data)
            }
          }
        },
        { name: '绑定属性', type: 'default', active: false, attrs: { icon: 'el-icon-share' } },
        { name: '默认', type: 'default', active: false },
      ]
    }
  },
  methods: {
    handleClick (event, item, index, data) {
      console.log('FROM [BUTTON GROUP] handleClick: ', event, item, index, data)
      item.type = item.active ? 'default' : 'primary'
      item.active = !item.active
    }
  }
}
</script>
```
:::

### 加载中

点击按钮后进行数据加载操作，在按钮上显示加载状态。

:::demo 要设置为 loading 状态，只要设置`loading`属性为`true`即可。

```html
<up-button type="primary" :loading="true">加载中</up-button>
<up-button type="success" :loading="true">加载中</up-button>
<up-button type="warning" :loading="true">加载中</up-button>
<up-button type="danger" :loading="true">加载中</up-button>
<up-button type="info" :loading="true">加载中</up-button>
<up-button type="text" :loading="true">加载中</up-button>
```
:::

### <up-component component="el-badge" value="change">不同尺寸</up-component>

Button 组件提供除了默认值以外的三种尺寸，可以在不同场景下选择合适的按钮尺寸。

:::demo 额外的尺寸：`medium`、`small`、`mini`，通过设置`size`属性来配置它们。

```html
<template>
  <up-row>
    <up-col :span="3">
      <up-button type="text">切换类型</up-button>
    </up-col>
    <up-col :span="15">
      <up-button component="el-button-group" :data="data" @click="handleClick">
        <span slot="up:item" slot-scope="{ item }">{{ item.name }}</span>
      </up-button>
    </up-col>
  </up-row>
  <up-row>
    <up-button :type="type">默认按钮</up-button>
    <up-button :type="type" size="medium">中等按钮</up-button>
    <up-button :type="type" size="small">小型按钮</up-button>
    <up-button :type="type" size="mini">超小按钮</up-button>
  </up-row>
  <up-row>
    <up-button :type="type" round>默认按钮</up-button>
    <up-button :type="type" size="medium" round>中等按钮</up-button>
    <up-button :type="type" size="small" round>小型按钮</up-button>
    <up-button :type="type" size="mini" round>超小按钮</up-button>
  </up-row>
</template>

<script>
export default {
  data () {
    return {
      data: [
        { name: '主要', type: 'primary' },
        { name: '成功', type: 'success' },
        { name: '信息', type: 'info' },
        { name: '警告', type: 'warning' },
        { name: '危险', type: 'danger' },
        { name: '默认', type: 'default' }
      ],
      type: ''
    }
  },
  methods: {
    handleClick (event, item, index, data) {
      console.log('FROM BUTTON handleClick: ', event, item, index, data)
      this.type = item.type
    }
  }
}
</script>
```
:::

### <up-component component="el-badge" value="new">Button-group Attributes</up-component>
| 参数                                      | 说明     | 类型  | 可选值 | 默认值 |
| ----------------------------------------- | -------- | ----- | ------ | ------ |
| data: [{ ..., attrs: {}, listeners: {} }] | 按钮列表 | array | —      | []     |

### <up-component component="el-badge" value="new">Button-group Slot</up-component>
| 参数    | 说明                                      |
| ------- | ----------------------------------------- |
| —       | 自定义按钮列表                            |
| up:item | 自定义按钮的内容，参数为 { item, $index } |

### Attributes
| 参数                                                                    | 说明           | 类型    | 可选值                                             | 默认值    |
| ----------------------------------------------------------------------- | -------------- | ------- | -------------------------------------------------- | --------- |
| <up-component component="el-badge" value="new">component</up-component> | 组件名称       | string  | el-button / el-button-group                        | el-button |
| size                                                                    | 尺寸           | string  | medium / small / mini                              | —         |
| type                                                                    | 类型           | string  | primary / success / warning / danger / info / text | —         |
| plain                                                                   | 是否朴素按钮   | boolean | —                                                  | false     |
| round                                                                   | 是否圆角按钮   | boolean | —                                                  | false     |
| circle                                                                  | 是否圆形按钮   | boolean | —                                                  | false     |
| loading                                                                 | 是否加载中状态 | boolean | —                                                  | false     |
| disabled                                                                | 是否禁用状态   | boolean | —                                                  | false     |
| icon                                                                    | 图标类名       | string  | —                                                  | —         |
| autofocus                                                               | 是否默认聚焦   | boolean | —                                                  | false     |
| native-type                                                             | 原生 type 属性 | string  | button / submit / reset                            | button    |