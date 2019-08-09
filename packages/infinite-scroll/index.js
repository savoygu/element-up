import InfiniteScroll from 'element-ui/packages/infinite-scroll'

InfiniteScroll.install = function (Vue) {
  Vue.directive(InfiniteScroll.name, InfiniteScroll)
}

export default InfiniteScroll
