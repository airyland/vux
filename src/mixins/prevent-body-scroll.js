import dom from '../libs/dom'
require('./prevent-body-scroll.css')

const BODY_CLASS_NAME = 'vux-modal-open'
const CONTAINER_CLASS_NAME = 'vux-modal-open-for-container'

export default {
  created () {
    // get global layout config
    if (this.$vux && this.$vux.config && this.$vux.config.$layout === 'VIEW_BOX') {
      this.layout = 'VIEW_BOX'
    }
  },
  data () {
    return {
      layout: ''
    }
  },
  methods: {
    addModalClassName () {
      if (this.layout === 'VIEW_BOX') {
        dom.addClass(document.body, BODY_CLASS_NAME)
        dom.addClass(document.querySelector('#vux_view_box_body'), CONTAINER_CLASS_NAME)
      }
    },
    removeModalClassName () {
      if (this.layout === 'VIEW_BOX') {
        dom.removeClass(document.body, BODY_CLASS_NAME)
        dom.removeClass(document.querySelector('#vux_view_box_body'), CONTAINER_CLASS_NAME)
      }
    }
  },
  beforeDestroy () {
    this.removeModalClassName()
  },
  deactivated () {
    this.removeModalClassName()
  }
}
