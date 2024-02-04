<template>
	<div class="fitment_left">

    <a-collapse class="collapse" >
      <a-collapse-panel :header="moduleName | moduleNameFilter" v-for="moduleName of Object.keys(realModuleList)" :key="moduleName">
        <draggable
          v-model="moduleListData[moduleName]"
          v-bind="dragOptions"
          :move="dragMoveStart"
          filter=".disabled"
          @clone="cloneStart"
          @end="dragEnd"
        >
          <transition-group :id="moduleName" tag="div" name="module_name" type="transition">
            <a-card-grid
              v-for="item in moduleListData[moduleName]"
              :key="item.key"
              style="width:50%;text-align:center"
              @click="clickModule(item)"
              :class="item.useCount >= item.count ? 'disabled': 'draggable'"
            >
              <div :class="['iconfont',item.icon]"></div>
              <p>{{ item.name }}</p>
              <p>({{ item.useCount }}/{{ item.count }})</p>
            </a-card-grid>
          </transition-group>
        </draggable>
      </a-collapse-panel>
    </a-collapse>
<!--
		<a-card title="基础组件" :bordered="false" style="width: 100%">
			<draggable
				v-model="moduleList"
				v-bind="dragOptions"
				:move="dragMoveStart"
        filter=".disabled"
				@clone="cloneStart"
				@end="dragEnd"
			>
				<transition-group tag="div" name="module_name" type="transition">
					<a-card-grid
						v-for="item in moduleList"
						:key="item.key"
						style="width:50%;text-align:center"
            @click="clickModule(item)"
            :class="item.useCount >= item.count ? 'disabled': 'draggable'"
					>
						<div :class="['iconfont',item.icon]"></div>
						<p>{{ item.name }}</p>
						<p>({{ item.useCount }}/{{ item.count }})</p>
					</a-card-grid>
				</transition-group>
			</draggable>
		</a-card> -->
	</div>
</template>
<script>
import Draggable from 'vuedraggable'
export default {
	name: 'FitmentLeft',
	components: {
		Draggable
	},
  filters: {
    moduleNameFilter (val) {
      switch (val) {
        case 'baseComponents':
          return '基础组件'
        case 'advancedComponents':
          return '高级组件'
        case 'marketingComponents':
          return '营销组件'
      }
    }
  },

	props: {
    moduleListData: {
			type: Object,
			required: true,
      default () {
        return {
          baseComponents: [],
          advancedComponents: [],
          marketingComponents: []
        }
      }
    },
		baseComponents: {
			type: Array,
			required: false
		},
		advancedComponents: {
			type: Array,
			required: false
		},
		marketingComponents: {
			type: Array,
			required: false
		}

	},
	data () {
		return {}
	},
	computed: {
    realModuleList () {
      let res = {}
      Object.keys(this.moduleListData).forEach(moduleName => {
        if (this.moduleListData[moduleName].length > 0) {
          Object.assign(res, {
            [moduleName]: this.moduleListData[moduleName]
          })
        }
      })
      return res
    },
		dragOptions () {
			return {
				group: { name: 'moduleView', pull: 'clone', put: false },
				sort: false,
				tag: 'div',
				animation: 200,
				disabled: false
			}
		}
	},
	created () {
		console.log(this.moduleList)
	},
	methods: {
    clickModule (item) {
      if (item.useCount >= item.count) {
        this.$message.warning('该组件添加数量已达上限！')
      }
    },
    checkChoose (e) {
      console.log('checkChoose', e)
    },
		dragMoveStart (e, originalEvent) {
      console.log('dragMoveStart', e)

			// console.log('被拖拽的元素的序号', e.draggedContext.index)
			// console.log('被拖拽的元素对应的对象', e.draggedContext.element)
			// console.log('被拖拽的元素的预期位置、目标位置', e.draggedContext.futureIndex)

			// console.log('目标停靠对象的序号', e.relatedContext.index)
			// console.log('目标停靠对应的对象', e.relatedContext.element)
			// console.log('目标数组', e.relatedContext.list)
			// console.log('将停靠的vue组件对象', e.relatedContext.component)
			// false表示阻止拖拽
			// return true
			return true
		},
		cloneStart (e) {
			// console.log('cloneStart', e)
			// console.log('cloneStart', e.index)
		},

		// cloneDog (toolItem) {
		//   console.log('cloneDog')
		//     // return generateEditorItem(toolItem)
		// },
		dragEnd (e, t) {
			// console.log('dragEnd', e)
			// console.log('dragEnd', t)
		}
		// clickAddComponents (item) {
		// 	this.$emit('clickAddComponents', item)
		// }
	}
}
</script>
<style lang="less" scoped>
.draggable{
  cursor: move;
}
.disabled{
  cursor: not-allowed;
}
.fitment_left {
  height: calc(100% - 20px);
	overflow-y: scroll;
  border-right: 1px solid #fafafa;
  margin-bottom:20px;
  width: 264px;
  /deep/ .collapse {
    .ant-collapse-content > .ant-collapse-content-box{
      padding: 0;
    }
  }
  // .iconfont {
  // }
	.ant-card-grid {
		position: relative;
		&:hover {
			background-color: #f2f2f2;
			box-shadow: 0 0 8px 1px rgb(0 0 0 / 20%);
			// .add-mask {
			// 	// display: flex;
			// }
		}
	}
}
.iconfont {
	font-size:.28rem;
	height:.3rem;
	line-height:.3rem;
}
</style>
