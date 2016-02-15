<template>
	<div class="weui_cells_title" v-show="description && (!type || type!=='inline')">{{description}}</div>
	<div :class="type==='inline'?'weui_cell weui_cell_box':'weui_cells'">
		<div class="weui_cell" :class="{'weui_select_after':title,'weui_cell_select':!readonly}">
			<div class="weui_cell_hd" v-show="title" :class="{'weui_cell_primary':readonly}">
	            {{title}}
	        </div>
		    <div class="weui_cell_bd weui_cell_primary" v-if="!readonly">
		        <select class="weui_select" name="select1" v-model="value">
		        	<option value="" v-show="placeholder" selected="{{!selected}}">{{placeholder}}</option>
		            <option value="{{one.value}}" v-for="one in options" selected="{{selected && one.text===selected}}">{{one.text}}</option>
		        </select>
		    </div>
		    <div class="weui_cell_ft" v-else>
          		{{selected}}
            </div>
		</div>
	</div>
</template>

<script>
export default {
  ready () {
  	console.log('ready')
  	console.log('defautl value is',this.selected)
  	this.value = this.selected;
  },
  data:function(){
  	return {
  		values:null
  	}
  },
  watch: {
  	value: function(newValue){
  		this.selected = newValue;
  		console.log('child change value',newValue);
  		this.$dispatch('change', newValue)
  	}
  },
  props: {
    title: {
      type: String,
      required: false
    },
    options: {
      type: Array,
      required: true
    },
    placeholder: {
    	type: String
    },
    description: {
    	type: String
    },
    type: {
    	type: String,
    	default: 'group'
    },
    selected: {
    	type:String,
    	twoWay:true
    },
    readonly: {
    	type: Boolean,
    	default: false
    },
    value:{
    	type: String
    }
  }
}
</script>
