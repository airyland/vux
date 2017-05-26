<template>
  <div>
    <section class='menu_container'>
      <section class='menu_left' id='wrapper_menu'>
        <ul>
          <li v-for='(item,index) in menuList' :key='index' class='menu_left_li' :class='{activity_menu: index == menuIndex}' @click='chooseMenu(index, item)'>
            <span>{{item.caname}}</span>
          </li>
        </ul>
      </section>
      <section class='menu_right' ref='menuFoodList'>
        <checklist :check-disabled="false" :title='ctitle' :options='objectList' v-model='objectListValue' @on-change='change'>
        </checklist>

      </section>
    </section>
  </div>
</template>

<script>
  import { Checklist } from 'vux'

  export default {
    components: {
      Checklist
    },
    data () {
      return {
        menuIndex: 0,
        menuList: [ {
          'id': 1,
          'caname': '灯具',
          'delet': '0'
        }, {
          'id': 2,
          'caname': '辅材',
          'delet': '0'
        }, {
          'id': 3,
          'caname': 'T',
          'delet': '0'
        }, {
          'id': 4,
          'caname': '修房顶',
          'delet': '0'
        }, {
          'id': 5,
          'caname': '修马桶',
          'delet': '0'
        }, {
          'id': 6,
          'caname': '修桌子',
          'delet': '0'
        }, {
          'id': 7,
          'caname': '修椅子',
          'delet': '0'
        }, {
          'id': 8,
          'caname': '修大灯',
          'delet': '0'
        }, {
          'id': 9,
          'caname': '灶台类',
          'delet': '0'
        }, {
          'id': 11,
          'caname': '刀具',
          'delet': '0'
        }, {
          'id': 12,
          'caname': 'IT设备类',
          'delet': '0'
        }],
        ctitle: '',
        objectList: [],
        objectListValue: [1, 2, 3, 4, 10]
      }
    },
    methods: {
      chooseMenu: function (index, item) {
        this.menuIndex = index
        this.ctitle = item.caname
        this.getRepairMatas(index)
      },
      change (val) {
        console.log('change', val)
        console.log('current', this.objectListValue)
      },
      getRepairMatas (index, mdata = []) {
        let checkData = {}
        checkData.key = index
        checkData.value = '测试数据' + index
        mdata.push(checkData)
        this.objectList = mdata
      }
    }
  }

</script>
<style lang='less' scoped>
  .menu_container {
    display: flex;
    flex: 1;
    overflow-y: hidden;
  }
  .menu_left {
    background-color: #f8f8f8;
    width: 6rem;
    text-align: center;
  }
  .menu_right {
    flex: 4;
    overflow-y: auto;
  }
  .menu_left_li {
    padding: .7rem .3rem;
    border-bottom: 0.025rem solid #ededed;
    box-sizing: border-box;
    border-left: 0.15rem solid #f8f8f8;
    position: relative;
  }
  .activity_menu{
    border-left: 0.15rem solid #3190e8;
    background-color: #fff;
    span:nth-of-type(1){
      font-weight: bold;
    }
  }
  .detail{
    text-align: center;
    height: 50px;
    position: absolute;
    line-height: 50px;
    bottom: 0;
    border: 1px solid #F1F0F3;
  }
  .sumBtn{
    width: 80%;
    margin-top: 20px;
  }
</style>