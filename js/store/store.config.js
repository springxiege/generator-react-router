import { createStore } from 'redux'
import todoGoodsSelectSku from '../reducers/todoGoodsSelectSku'

let store = createStore(DetailSelectSku)
import { doGoodsSelectSku } from '../actions/ActionFuncs'

// 打印初始状态
console.log(store.getState())

// 每次 state 更新时，打印日志
// 注意 subscribe() 返回一个函数用来注销监听器
let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
)

// 发起一系列 action
store.dispatch(doGoodsSelectSku(0,1,2))
// store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED))

// 停止监听 state 更新
unsubscribe();
