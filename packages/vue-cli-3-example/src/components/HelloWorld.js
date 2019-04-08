import Group from 'vux/src/components/group/index'
import { Cell } from 'vux'

export default {
	components: {
		Group,
		Cell
	},
	props: {
		msg: String
	},
	methods: {
		alert () {
			this.$vux.alert.show('hello')
		}
	}
}
