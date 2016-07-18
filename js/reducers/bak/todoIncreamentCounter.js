/**
 * 购买商品数量增减
 * 触发事件类型为action.type
 * type => INCREMENT 为添加数量
 * type => DECREMENT 为减少数量
 */
export function counter(state = 0,action){
    switch (action.type) {
    case 'INCREMENT':
        return state + 1;
        break;
    case 'DECREMENT':
        return sate - 1;
        break;
    default:
        return state;
        break;
    }
}
