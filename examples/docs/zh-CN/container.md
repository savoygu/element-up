## Container 布局容器

用于布局的容器组件，方便快速搭建页面的基本结构：

#### :star::star::star: 相对于 Element 所做的变动

:::tip
组件书写形式发生变化：

 - `<el-container>` 修改为 `<up-component component="el-container">` 或 `<up-component c="el-container">`
 - `<el-header>` 修改为 `<up-component component="el-header">` 或 `<up-component c="el-header">`
 - `<el-aside>` 修改为 `<up-component component="el-aside">` 或 `<up-component c="el-aside">`
 - `<el-main>` 修改为 `<up-component component="el-main">` 或 `<up-component c="el-main">`
 - `<el-footer>` 修改为 `<up-component component="el-footer">` 或 `<up-component c="el-footer">`
:::

`<up-component>`：外层容器。当子元素中包含 `<up-component component="el-header">` 或 `<up-component component="el-footer">` 时，全部子元素会垂直上下排列，否则会水平左右排列。

`<up-component component="el-header">`：顶栏容器。

`<up-component component="el-aside">`：侧边栏容器。

`<up-component component="el-main">`：主要区域容器。

`<up-component component="el-footer">`：底栏容器。

:::tip
以上组件采用了 flex 布局，使用前请确定目标浏览器是否兼容。此外，`<up-component component="el-container">` 的子元素只能是后四者，后四者的父元素也只能是 `<up-component component="el-container">`。
:::

### 常见页面布局

:::demo
```html
<up-component c="el-row">
  <up-component component="el-container">
    <up-component component="el-header">Header</up-component>
    <up-component component="el-main">Main</up-component>
  </up-component>
</up-component>

<up-component component="el-container">
  <up-component component="el-header">Header</up-component>
  <up-component component="el-main">Main</up-component>
  <up-component component="el-footer">Footer</up-component>
</up-component>

<up-component component="el-container">
  <up-component component="el-aside" width="200px">Aside</up-component>
  <up-component component="el-main">Main</up-component>
</up-component>

<up-component component="el-container">
  <up-component component="el-header">Header</up-component>
  <up-component>
    <up-component component="el-aside" width="200px">Aside</up-component>
    <up-component component="el-main">Main</up-component>
  </up-component>
</up-component>

<up-component component="el-container">
  <up-component component="el-header">Header</up-component>
  <up-component component="el-container">
    <up-component component="el-aside" width="200px">Aside</up-component>
      <up-component component="el-container">
        <up-component component="el-main">Main</up-component>
        <up-component component="el-footer">Footer</up-component>
      </up-component>
    </up-component>
  </up-component>
</up-component>

<up-component component="el-container">
  <up-component component="el-aside" width="200px">Aside</up-component>
  <up-component component="el-container">
    <up-component component="el-header">Header</up-component>
    <up-component component="el-main">Main</up-component>
  </up-component>
</up-component>

<up-component component="el-container">
  <up-component component="el-aside" width="200px">Aside</up-component>
  <up-component component="el-container">
    <up-component component="el-header">Header</up-component>
    <up-component component="el-main">Main</up-component>
    <up-component component="el-footer">Footer</up-component>
  </up-component>
</up-component>

<style>
  .up-row {
    margin: 5px;
  }
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
```
:::

### 实例

:::demo
```html
<up-component component="el-container" style="height: 500px; border: 1px solid #eee">
  <up-component component="el-aside" width="200px" style="background-color: rgb(238, 241, 246)">
    <up-menu :default-openeds="['1', '3']" :data="menuData"></up-menu>
    <!-- <el-menu :default-openeds="['1', '3']">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>导航一</template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项4-1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-menu"></i>导航二</template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="2-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项4-1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-setting"></i>导航三</template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="3-1">选项1</el-menu-item>
          <el-menu-item index="3-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="3-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="3-4">
          <template slot="title">选项4</template>
          <el-menu-item index="3-4-1">选项4-1</el-menu-item>
        </el-submenu>
      </el-submenu>
    </el-menu> -->
  </up-component>

  <up-component c="el-container">
    <up-component c="el-header" style="text-align: right; font-size: 12px">
      <up-dropdown :data="dropdownData">
        <i class="el-icon-setting" style="margin-right: 15px"></i>
      </up-dropdown>
      <!-- <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>查看</el-dropdown-item>
          <el-dropdown-item>新增</el-dropdown-item>
          <el-dropdown-item>删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>王小虎</span> -->
    </up-component>

    <up-component c="el-main">
      <up-table :page="pageData" :pagination="false"></up-table>
      <!-- <el-table :data="tableData">
        <el-table-column prop="date" label="日期" width="140">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="120">
        </el-table-column>
        <el-table-column prop="address" label="地址">
        </el-table-column>
      </el-table> -->
    </up-component>
  </up-component>
</up-component>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }
</style>

<script>
  export default {
    data() {
      const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      };
      return {
        menuData: [
          { title: '导航一', icon: 'el-icon-message', index: '1' },
          { title: '导航二', icon: 'el-icon-menu', index: '2' },
          { title: '导航三', icon: 'el-icon-setting', index: '3' }
        ].map((item, index) => ({
          ...item,
          groups: [
            {
              title: '分组一',
              children: [
                { title: '选项1', index: `${index}-1` },
                { title: '选项2', index: `${index}-2` }
              ]
            },
            {
              title: '分组二',
              children: [
                { title: '选项3', index: `${index}-3` },
              ]
            }
          ],
          next: [
            {
              title: '选项4', index: `${index}-4`,
              children: [
                { title: '选项4-1', index: `${index}-4-1` }
              ]
            }
          ]
        })),
        tableData: Array(20).fill(item),
        dropdownData: ['查看', '新增' ,'删除'],
        pageData: {
          header: { date: '日期', name: '姓名', address: '地址' },
          data: Array(20).fill(item)
        }
      }
    }
  };
</script>
```
:::

### Container Attributes
| 参数      | 说明             | 类型   | 可选值                | 默认值                                                                                        |
| --------- | ---------------- | ------ | --------------------- | --------------------------------------------------------------------------------------------- |
| direction | 子元素的排列方向 | string | horizontal / vertical | 子元素中有 props `component/c` 为 `el-header` 或 `el-footer` 时为 vertical，否则为 horizontal |

### Header Attributes
| 参数   | 说明     | 类型   | 可选值 | 默认值 |
| ------ | -------- | ------ | ------ | ------ |
| height | 顶栏高度 | string | —      | 60px   |

### Aside Attributes
| 参数  | 说明       | 类型   | 可选值 | 默认值 |
| ----- | ---------- | ------ | ------ | ------ |
| width | 侧边栏宽度 | string | —      | 300px  |

### Footer Attributes
| 参数   | 说明     | 类型   | 可选值 | 默认值 |
| ------ | -------- | ------ | ------ | ------ |
| height | 底栏高度 | string | —      | 60px   |