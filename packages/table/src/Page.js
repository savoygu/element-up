const PAGE_SIZE = 10
const CURRENT_PAGE = 1

export default class Page {
  constructor ({
    header = {},
    data = [],
    currentPage = CURRENT_PAGE,
    pageSize = PAGE_SIZE,
    total = 0,
    loading = false
  } = {}) {
    this.header = header
    this.data = data
    this.currentPage = currentPage
    this.pageSize = pageSize
    this.total = total
    this.loading = loading
  }

  setData ({ header = this.header, data = this.data, currentPage, pageSize, total = 0, loading = false } = {}) {
    this.header = header
    this.data = data
    if (currentPage) this.currentPage = currentPage
    if (pageSize) this.pageSize = pageSize
    this.total = total
    this.loading = loading
  }

  removeData (field, data) {
    this.data = this.data.filter(v => data.indexOf(v[field]) < 0)
  }

  resetData ({ currentPage = CURRENT_PAGE, pageSize = PAGE_SIZE } = {}) {
    this.loading = true
    if (this.data.length > 0) {
      this.data.splice(0)
      this.currentPage = currentPage
      this.pageSize = pageSize
    }
  }

  clearData () {
    this.loading = true
    if (this.data.length > 0) {
      this.data.splice(0)
    }
  }
}
