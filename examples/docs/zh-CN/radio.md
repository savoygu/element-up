## Radio 单选框

在一组备选项中进行单选

### 基础用法

由于选项默认可见，不宜过多，若选项过多，建议使用 Select 选择器。

:::demo 要使用 Radio 组件，只需要设置`v-model`绑定变量，选中意味着变量的值为相应 Radio `label`属性的值，`label`可以是`String`、`Number`或`Boolean`。

```html
<template>
  <up-radio v-model="radio" label="1">备选项</up-radio>
  <up-radio v-model="radio" label="2">备选项</up-radio>
</template>

<script>
  export default {
    data () {
      return {
        radio: '1'
      };
    }
  }
</script>
```
:::

### 禁用状态

单选框不可用的状态。

:::demo 只要在`up-radio`元素中设置`disabled`属性即可，它接受一个`Boolean`，`true`为禁用。
```html
<template>
  <up-radio disabled v-model="radio" label="禁用">备选项</up-radio>
  <up-radio disabled v-model="radio" label="选中且禁用">备选项</up-radio>
</template>

<script>
  export default {
    data () {
      return {
        radio: '选中且禁用'
      };
    }
  }
</script>
```
:::

### 单选框组

适用于在多个互斥的选项中选择的场景

:::demo 结合`up-radio-group`元素和子元素`up-radio`可以实现单选组，在`up-radio-group`中绑定`v-model`，在`up-radio`中设置好`label`即可，无需再给每一个`up-radio`绑定变量，另外，还提供了`change`事件来响应变化，它会传入一个参数`value`。

```html
<template>
  <up-radio-group v-model="radio">
    <up-radio :label="3">备选项</up-radio>
    <up-radio :label="6">备选项</up-radio>
    <up-radio :label="9">备选项</up-radio>
  </up-radio-group>
</template>

<script>
  export default {
    data () {
      return {
        radio: 3
      };
    }
  }
</script>
```
:::

### <up-component c="el-badge" value="new">单选框组 - 属性、事件、slot</up-component>

适用于在多个互斥的选项中选择的场景

:::demo 结合`up-radio-group`元素和 `data` 也可以实现单选组，在`up-radio-group`中绑定`v-model`，`data`中`name`和`value` 分别表示`up-button`的内容和`label`。你可以通过 `keyValue`来更改`data`中每一项的键值，还可以通过`slot=up:item`来自定义`up-button`的内容展示，另外，还提供了自定义事件`up:radio:change`和`up:radio-group:change`事件来响应变化，它们分别会传入参数`value, item, index, data`和`value`。

```html
<template>
  <div>
    <up-radio-group
      v-model="radio"
      :data="data"
      @change="handleChange"
      @up:radio:change="handleUpRadioChange"
      @up:radio-group:change="handleUpRadioGroupChange">
    </up-radio-group>
  </div>

  <div style="margin-top: 20px;">
    <up-radio-group
      v-model="radio"
      :data="data"
      @change="handleChange"
      @up:radio:change="handleUpRadioChange"
      @up:radio-group:change="handleUpRadioGroupChange">
      <!-- 自定义插槽 up:item -->
      <template slot="up:item" slot-scope="{ item, $index }">{{item.name}} = {{item.value}}</template>
    </up-radio-group>
  </div>

  <div style="margin-top: 20px;">
    <up-radio-group
      v-model="radio"
      :data="data"
      component="el-radio-button"
      @change="handleChange"
      @up:radio:change="handleUpRadioChange"
      @up:radio-group:change="handleUpRadioGroupChange">
      <!-- 自定义插槽 up:item -->
      <template slot="up:item" slot-scope="{ item, $index }">{{item.name}} = {{item.value}}</template>
    </up-radio-group>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        radio: 3,
        data: [
          { name: '备选项', value: 3 },
          { name: '备选项', value: 6 },
          { name: '备选项', value: 9 },
        ]
      };
    },
    methods: {
      handleChange (value) {
        console.log('FROM handleChange: ', value)
      },
      handleUpRadioChange (value, item, index, data) {
        console.log('FROM [RADIO] handleUpRadioChange: ', value, item, index, data)
      },
      handleUpRadioGroupChange (value) {
        console.log('FROM [RADIO GROUP] handleUpRadioGroupChange: ', value)
      }
    }
  }
</script>
```
:::


### 按钮样式

按钮样式的单选组合。

:::demo 只需要把`up-radio`元素换成`up-radio-button`元素即可，此外，Element 还提供了`size`属性。
```html
<template>
  <div>
    <up-radio-group v-model="radio1">
      <up-radio-button label="上海"></up-radio-button>
      <up-radio-button label="北京"></up-radio-button>
      <up-radio-button label="广州"></up-radio-button>
      <up-radio-button label="深圳"></up-radio-button>
    </up-radio-group>
  </div>
  <div style="margin-top: 20px">
    <up-radio-group v-model="radio2" size="medium">
      <up-radio-button label="上海" ></up-radio-button>
      <up-radio-button label="北京"></up-radio-button>
      <up-radio-button label="广州"></up-radio-button>
      <up-radio-button label="深圳"></up-radio-button>
    </up-radio-group>
  </div>
  <div style="margin-top: 20px">
    <up-radio-group v-model="radio3" size="small">
      <up-radio-button label="上海"></up-radio-button>
      <up-radio-button label="北京" disabled ></up-radio-button>
      <up-radio-button label="广州"></up-radio-button>
      <up-radio-button label="深圳"></up-radio-button>
    </up-radio-group>
  </div>
  <div style="margin-top: 20px">
    <up-radio-group v-model="radio4" disabled size="mini">
      <up-radio-button label="上海"></up-radio-button>
      <up-radio-button label="北京"></up-radio-button>
      <up-radio-button label="广州"></up-radio-button>
      <up-radio-button label="深圳"></up-radio-button>
    </up-radio-group>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        radio1: '上海',
        radio2: '上海',
        radio3: '上海',
        radio4: '上海'
      };
    }
  }
</script>
```
:::

### 带有边框

:::demo 设置`border`属性可以渲染为带有边框的单选框。
```html
<template>
  <div>
    <up-radio v-model="radio1" label="1" border>备选项1</up-radio>
    <up-radio v-model="radio1" label="2" border>备选项2</up-radio>
  </div>
  <div style="margin-top: 20px">
    <up-radio v-model="radio2" label="1" border size="medium">备选项1</up-radio>
    <up-radio v-model="radio2" label="2" border size="medium">备选项2</up-radio>
  </div>
  <div style="margin-top: 20px">
    <up-radio-group v-model="radio3" size="small">
      <up-radio label="1" border>备选项1</up-radio>
      <up-radio label="2" border disabled>备选项2</up-radio>
    </up-radio-group>
  </div>
  <div style="margin-top: 20px">
    <up-radio-group v-model="radio4" size="mini" disabled>
      <up-radio label="1" border>备选项1</up-radio>
      <up-radio label="2" border>备选项2</up-radio>
    </up-radio-group>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        radio1: '1',
        radio2: '1',
        radio3: '1',
        radio4: '1'
      };
    }
  }
</script>
```
:::

### Radio Attributes
| 参数            | 说明                                 | 类型                      | 可选值                | 默认值 |
| --------------- | ------------------------------------ | ------------------------- | --------------------- | ------ |
| value / v-model | 绑定值                               | string / number / boolean | —                     | —      |
| label           | Radio 的 value                       | string / number / boolean | —                     | —      |
| disabled        | 是否禁用                             | boolean                   | —                     | false  |
| border          | 是否显示边框                         | boolean                   | —                     | false  |
| size            | Radio 的尺寸，仅在 border 为真时有效 | string                    | medium / small / mini | —      |
| name            | 原生 name 属性                       | string                    | —                     | —      |

### Radio Events
| 事件名称 | 说明                   | 回调参数              |
| -------- | ---------------------- | --------------------- |
| change   | 绑定值变化时触发的事件 | 选中的 Radio label 值 |

### Radio-group Attributes
| 参数                                                            | 说明                                                       | 类型                      | 可选值                   | 默认值            |
| --------------------------------------------------------------- | ---------------------------------------------------------- | ------------------------- | ------------------------ | ----------------- |
| <up-component c="el-badge" value="new">data</up-component>      | Radio 列表                                                 | array                     | —                        | []                |
| <up-component c="el-badge" value="new">component</up-component> | 组件名称                                                   | string                    | el-radio/el-radio-button | el-radio          |
| <up-component c="el-badge" value="new">keyValue</up-component>  | Radio 键值                                                 | array                     | —                        | ['name', 'value'] |
| value / v-model                                                 | 绑定值                                                     | string / number / boolean | —                        | —                 |
| size                                                            | 单选框组尺寸，仅对按钮形式的 Radio 或带有边框的 Radio 有效 | string                    | medium / small / mini    | —                 |
| disabled                                                        | 是否禁用                                                   | boolean                   | —                        | false             |
| text-color                                                      | 按钮形式的 Radio 激活时的文本颜色                          | string                    | —                        | #ffffff           |
| fill                                                            | 按钮形式的 Radio 激活时的填充色和边框色                    | string                    | —                        | #409EFF           |

### Radio-group Events
| 事件名称                                                                    | 说明                   | 回调参数                  |
| --------------------------------------------------------------------------- | ---------------------- | ------------------------- |
| change                                                                      | 绑定值变化时触发的事件 | 选中的 Radio label 值     |
| <up-component c="el-badge" value="new">up:radio-group:change</up-component> | 绑定值变化时触发的事件 | 选中的 Radio label 值     |
| <up-component c="el-badge" value="new">`up:radio:change`</up-component>     | 绑定值变化时触发的事件 | (value, item, index,data) |

### <up-component component="el-badge" value="new">Radio-group Slots</up-component>

| 参数    | 说明                                       |
| ------- | ------------------------------------------ |
| —       | 自定义Radio列表                            |
| up:item | 自定义Radio的内容，参数为 { item, $index } |


### Radio-button Attributes
| 参数     | 说明           | 类型            | 可选值 | 默认值 |
| -------- | -------------- | --------------- | ------ | ------ |
| label    | Radio 的 value | string / number | —      | —      |
| disabled | 是否禁用       | boolean         | —      | false  |
| name     | 原生 name 属性 | string          | —      | —      |