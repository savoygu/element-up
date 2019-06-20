## Checkbox 多选框
一组备选项中进行多选

#### :star::star::star:相对于 Element 所做的变动：

:::tip

 1. 组件书写形式发生变化：`<el-checkbox>`修改为`<up-checkbox>`，`<el-checkbox-group>`修改为`<up-checkbox-group>`
 2. `up-checkbox-group`可以传入 `data` 属性来展示Checkbox列表，`data`中每一项 `item`的属性都会应用到Checkbox上。
 3. 可以在`up-checkbox-group`上指定`component="el-checkbox-button"`来展示Checkbox Button列表。
 4. 还提供了插槽`up:item`，用来自定义每一项的介绍，其中`slot-scope`接收`item, $index`属性。
:::


### 基础用法

单独使用可以表示两种状态之间的切换，写在标签中的内容为 checkbox 按钮后的介绍。

:::demo 在`up-checkbox`元素中定义`v-model`绑定变量，单一的`checkbox`中，默认绑定变量的值会是`Boolean`，选中为`true`。

```html
<template>
  <!-- `checked` 为 true 或 false -->
  <up-checkbox v-model="checked">备选项</up-checkbox>
</template>
<script>
  export default {
    data() {
      return {
        checked: true
      };
    }
  };
</script>
```
:::

### 禁用状态

多选框不可用状态。

:::demo 设置`disabled`属性即可。

```html
<template>
  <up-checkbox v-model="checked1" disabled>备选项1</up-checkbox>
  <up-checkbox v-model="checked2" disabled>备选项</up-checkbox>
</template>
<script>
  export default {
    data() {
      return {
        checked1: false,
        checked2: true
      };
    }
  };
</script>
```
:::

### 多选框组

适用于多个勾选框绑定到同一个数组的情景，通过是否勾选来表示这一组选项中选中的项。

:::demo `up-checkbox-group`元素能把多个 checkbox 管理为一组，只需要在 Group 中使用`v-model`绑定`Array`类型的变量即可。 `up-checkbox` 的 `label`属性是该 checkbox 对应的值，若该标签中无内容，则该属性也充当 checkbox 按钮后的介绍。`label`与数组中的元素值相对应，如果存在指定的值则为选中状态，否则为不选中。

```html
<template>
  <up-checkbox-group v-model="checkList">
    <up-checkbox label="复选框 A"></up-checkbox>
    <up-checkbox label="复选框 B"></up-checkbox>
    <up-checkbox label="复选框 C"></up-checkbox>
    <up-checkbox label="禁用" disabled></up-checkbox>
    <up-checkbox label="选中且禁用" disabled></up-checkbox>
  </up-checkbox-group>
</template>

<script>
  export default {
    data () {
      return {
        checkList: ['选中且禁用','复选框 A']
      };
    }
  };
</script>
```
:::

### <up-component c="el-badge" value="new">多选框组 - 属性、事件、slot</up-component>

适用于多个勾选框绑定到同一个数组的情景，通过是否勾选来表示这一组选项中选中的项。

:::demo `up-checkbox-group`元素集合`data`也能把多个 checkbox 管理为一组，只需要在 Group 中使用`v-model`绑定`Array`类型的变量即可,其中`data`中`name`和`value`分别表示checkbox 按钮后的介绍和`up-checkbox`的`label`。可以通过`keyValue`来更改`data`中每一项的键值，还可以通过`slot=up:item`来自定义`up-checkbox`的介绍，另外，还提供了自定义事件`up:checkbox:change`和`up:checkbox-group:change`事件来响应变化，它们分别会传入参数`value, item, index, data`和`value`

```html
<template>
  <div>
    <up-checkbox-group
      v-model="checkList"
      :data="data"
      @change="handleChange"
      @up:checkbox:change="handleUpCheckboxChange"
      @up:checkbox-group:change="handleUpCheckboxGroupChange">
    </up-checkbox-group>
  </div>
  <div style="margin-top: 20px;">
    <up-checkbox-group
      v-model="checkList"
      :data="data"
      @change="handleChange"
      @up:checkbox:change="handleUpCheckboxChange"
      @up:checkbox-group:change="handleUpCheckboxGroupChange"
    >
      <template slot="up:item" slot-scope="{ item, $index }">{{item.name}} = {{$index}}</template>
    </up-checkbox-group>
  </div>
  <div style="margin-top: 20px;">
    <up-checkbox-group
      v-model="checkList"
      :data="data"
      component="el-checkbox-button"
      @change="handleChange"
      @up:checkbox:change="handleUpCheckboxChange"
      @up:checkbox-group:change="handleUpCheckboxGroupChange"
    >
      <template slot="up:item" slot-scope="{ item, $index }">{{item.name}} = {{$index}}</template>
    </up-checkbox-group>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        data: [
          { name: '复选框 A', value: '复选框 A' },
          { name: '复选框 B', value: '复选框 B' },
          { name: '复选框 C', value: '复选框 C' },
          { name: '禁用', value: '禁用', disabled: true },
          { name: '选中且禁用', value: '选中且禁用', disabled: true }
        ],
        checkList: ['选中且禁用','复选框 A']
      };
    }
  };
</script>
```
:::

### indeterminate 状态

`indeterminate` 属性用以表示 checkbox 的不确定状态，一般用于实现全选的效果

:::demo

```html
<template>
  <up-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</up-checkbox>
  <div style="margin: 15px 0;"></div>
  <up-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
    <up-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</up-checkbox>
  </up-checkbox-group>
</template>
<script>
  const cityOptions = ['上海', '北京', '广州', '深圳'];
  export default {
    data() {
      return {
        checkAll: false,
        checkedCities: ['上海', '北京'],
        cities: cityOptions,
        isIndeterminate: true
      };
    },
    methods: {
      handleCheckAllChange(val) {
        this.checkedCities = val ? cityOptions : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      }
    }
  };
</script>
```
:::

### 可选项目数量的限制

使用 `min` 和 `max` 属性能够限制可以被勾选的项目的数量。

:::demo

```html
<template>
  <up-checkbox-group
    v-model="checkedCities"
    :min="1"
    :max="2">
    <up-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</up-checkbox>
  </up-checkbox-group>
</template>
<script>
  const cityOptions = ['上海', '北京', '广州', '深圳'];
  export default {
    data() {
      return {
        checkedCities: ['上海', '北京'],
        cities: cityOptions
      };
    }
  };
</script>
```

:::

### 按钮样式

按钮样式的多选组合。

:::demo 只需要把`up-checkbox`元素替换为`up-checkbox-button`元素即可。此外，Element 还提供了`size`属性。
```html
<template>
  <div>
    <up-checkbox-group v-model="checkboxGroup1">
      <up-checkbox-button v-for="city in cities" :label="city" :key="city">{{city}}</up-checkbox-button>
    </up-checkbox-group>
  </div>
  <div style="margin-top: 20px">
    <up-checkbox-group v-model="checkboxGroup2" size="medium">
      <up-checkbox-button v-for="city in cities" :label="city" :key="city">{{city}}</up-checkbox-button>
    </up-checkbox-group>
  </div>
  <div style="margin-top: 20px">
    <up-checkbox-group v-model="checkboxGroup3" size="small">
      <up-checkbox-button v-for="city in cities" :label="city" :disabled="city === '北京'" :key="city">{{city}}</up-checkbox-button>
    </up-checkbox-group>
  </div>
  <div style="margin-top: 20px">
    <up-checkbox-group v-model="checkboxGroup4" size="mini" disabled>
      <up-checkbox-button v-for="city in cities" :label="city" :key="city">{{city}}</up-checkbox-button>
    </up-checkbox-group>
  </div>
</template>
<script>
  const cityOptions = ['上海', '北京', '广州', '深圳'];
  export default {
    data () {
      return {
        checkboxGroup1: ['上海'],
        checkboxGroup2: ['上海'],
        checkboxGroup3: ['上海'],
        checkboxGroup4: ['上海'],
        cities: cityOptions
      };
    }
  }
</script>
```
:::

### 带有边框

:::demo 设置`border`属性可以渲染为带有边框的多选框。
```html
<template>
  <div>
    <up-checkbox v-model="checked1" label="备选项1" border></up-checkbox>
    <up-checkbox v-model="checked2" label="备选项2" border></up-checkbox>
  </div>
  <div style="margin-top: 20px">
    <up-checkbox v-model="checked3" label="备选项1" border size="medium"></up-checkbox>
    <up-checkbox v-model="checked4" label="备选项2" border size="medium"></up-checkbox>
  </div>
  <div style="margin-top: 20px">
    <up-checkbox-group v-model="checkboxGroup1" size="small">
      <up-checkbox label="备选项1" border></up-checkbox>
      <up-checkbox label="备选项2" border disabled></up-checkbox>
    </up-checkbox-group>
  </div>
  <div style="margin-top: 20px">
    <up-checkbox-group v-model="checkboxGroup2" size="mini" disabled>
      <up-checkbox label="备选项1" border></up-checkbox>
      <up-checkbox label="备选项2" border></up-checkbox>
    </up-checkbox-group>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        checked1: true,
        checked2: false,
        checked3: false,
        checked4: true,
        checkboxGroup1: [],
        checkboxGroup2: []
      };
    }
  }
</script>
```
:::

### Checkbox Attributes
| 参数            | 说明                                                                  | 类型                      | 可选值                | 默认值 |
| --------------- | --------------------------------------------------------------------- | ------------------------- | --------------------- | ------ |
| value / v-model | 绑定值                                                                | string / number / boolean | —                     | —      |
| label           | 选中状态的值（只有在`checkbox-group`或者绑定对象类型为`array`时有效） | string / number / boolean | —                     | —      |
| true-label      | 选中时的值                                                            | string / number           | —                     | —      |
| false-label     | 没有选中时的值                                                        | string / number           | —                     | —      |
| disabled        | 是否禁用                                                              | boolean                   | —                     | false  |
| border          | 是否显示边框                                                          | boolean                   | —                     | false  |
| size            | Checkbox 的尺寸，仅在 border 为真时有效                               | string                    | medium / small / mini | —      |
| name            | 原生 name 属性                                                        | string                    | —                     | —      |
| checked         | 当前是否勾选                                                          | boolean                   | —                     | false  |
| indeterminate   | 设置 indeterminate 状态，只负责样式控制                               | boolean                   | —                     | false  |

### Checkbox Events
| 事件名称 | 说明                     | 回调参数   |
| -------- | ------------------------ | ---------- |
| change   | 当绑定值变化时触发的事件 | 更新后的值 |

### Checkbox-group Attributes
| 参数                                                            | 说明                                                             | 类型    | 可选值                         | 默认值            |
| --------------------------------------------------------------- | ---------------------------------------------------------------- | ------- | ------------------------------ | ----------------- |
| <up-component c="el-badge" value="new">data</up-component>      | Checkbox 列表                                                    | array   | —                              | []                |
| <up-component c="el-badge" value="new">component</up-component> | 组件名称                                                         | string  | el-checkbox/el-checkbox-button | el-checkbox       |
| <up-component c="el-badge" value="new">keyValue</up-component>  | Checkbox 键值                                                    | array   | —                              | ['name', 'value'] |
| value / v-model                                                 | 绑定值                                                           | array   | —                              | —                 |
| size                                                            | 多选框组尺寸，仅对按钮形式的 Checkbox 或带有边框的 Checkbox 有效 | string  | medium / small / mini          | —                 |
| disabled                                                        | 是否禁用                                                         | boolean | —                              | false             |
| min                                                             | 可被勾选的 checkbox 的最小数量                                   | number  | —                              | —                 |
| max                                                             | 可被勾选的 checkbox 的最大数量                                   | number  | —                              | —                 |
| text-color                                                      | 按钮形式的 Checkbox 激活时的文本颜色                             | string  | —                              | #ffffff           |
| fill                                                            | 按钮形式的 Checkbox 激活时的填充色和边框色                       | string  | —                              | #409EFF           |

### Checkbox-group Events
| 事件名称                                                                       | 说明                     | 回调参数                  |
| ------------------------------------------------------------------------------ | ------------------------ | ------------------------- |
| change                                                                         | 当绑定值变化时触发的事件 | 更新后的值                |
| <up-component c="el-badge" value="new">up:checkbox-group:change</up-component> | 绑定值变化时触发的事件   | 选中的 Checkbox label 值  |
| <up-component c="el-badge" value="new">`up:checkbox:change`</up-component>     | 绑定值变化时触发的事件   | (value, item, index,data) |

### <up-component component="el-badge" value="new">Checkbox-group Slots</up-component>

| 参数    | 说明                                          |
| ------- | --------------------------------------------- |
| —       | 自定义Checkbox列表                            |
| up:item | 自定义Checkbox的内容，参数为 { item, $index } |


### Checkbox-button Attributes
| 参数        | 说明                                                                  | 类型                      | 可选值 | 默认值 |
| ----------- | --------------------------------------------------------------------- | ------------------------- | ------ | ------ |
| label       | 选中状态的值（只有在`checkbox-group`或者绑定对象类型为`array`时有效） | string / number / boolean | —      | —      |
| true-label  | 选中时的值                                                            | string / number           | —      | —      |
| false-label | 没有选中时的值                                                        | string / number           | —      | —      |
| disabled    | 是否禁用                                                              | boolean                   | —      | false  |
| name        | 原生 name 属性                                                        | string                    | —      | —      |
| checked     | 当前是否勾选                                                          | boolean                   | —      | false  |