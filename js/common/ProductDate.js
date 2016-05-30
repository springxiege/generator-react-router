var ProductDate = {
    // 商品ID
    id: 1,
    // 商品编号
    snum: "1102545212555521",
    // 商品标题
    title: "方糖音箱 无线WiFi音响 迷你智能小音箱 原木体感触控桌面 便携",
    // 商品描述
    Description: "Cube 最吸引人的地方在于没有任何按钮，采用了更自然的体感交互方式，具体来说就是轻拍一下切换播放/暂停，轻拍两下分享，左右倾斜切换上下曲。",
    // 轮播图片数据
    goods_images: [
        '/js/components/ProductImages/1.jpg',
        '/js/components/ProductImages/1.jpg',
        '/js/components/ProductImages/1.jpg'
    ],
    // 商品详情
    content: "<p><img src=\"/images/2.jpg\"><p>",
    // 商品产地
    madeby: "西湖区计量大厦",
    // 送货地址
    deliver_address: "西湖区计量大厦6楼610室",
    //折扣
    discount: 1,
    // 运费
    fare: 10,
    // 佣金百分比
    brokerage: 0,
    // 商品过期时间
    expire: "1年",
    // 售后维护
    maintain: '全国联保',
    // 商品总库存
    stock: 100,
    // 是否参与活动
    is_activity: 0,
    // 活动列表
    activity_ids: {},
    // 商品是否违规
    is_legal: 0,
    goods_addon: [{
        id: 1,
        // 所属商品主表ID
        goods_id: 1,
        parent_id: 0,
        // 商品规格1
        feature_main: '32',
        // 商品规格2
        feature_sub: '',
        goods_price: 111,
        stock: 12,
        addon: [{
            id: 2,
            goods_id: 1,
            parent_id: 1,
            feature_main: '红色',
            feature_sub: '',
            goods_price: 20,
            stock: 80,
        }, {
            id: 3,
            goods_id: 2,
            parent_id: 1,
            feature_main: '白色',
            feature_sub: '',
            goods_price: 20,
            stock: 40,
        }, {
            id: 4,
            goods_id: 3,
            parent_id: 1,
            feature_main: '黑色',
            feature_sub: '',
            goods_price: 20,
            stock: 50,
        }]

    }, {
        id: 2,
        // 所属商品主表ID
        goods_id: 1,
        parent_id: 0,
        // 商品规格1
        feature_main: '33',
        // 商品规格2
        feature_sub: '',
        goods_price: 131,
        stock: 44,
        addon: [{
            id: 5,
            goods_id: 1,
            parent_id: 1,
            feature_main: '黑色',
            feature_sub: '',
            goods_price: 20,
            stock: 50,
        }, {
            id: 6,
            goods_id: 2,
            parent_id: 1,
            feature_main: '红色',
            feature_sub: '',
            goods_price: 20,
            stock: 50,
        }, {
            id: 7,
            goods_id: 3,
            parent_id: 1,
            feature_main: '蓝色',
            feature_sub: '',
            goods_price: 20,
            stock: 50,
        }]

    }, {
        id: 3,
        // 所属商品主表ID
        goods_id: 1,
        parent_id: 0,
        // 商品规格1
        feature_main: '38',
        // 商品规格2
        feature_sub: '',
        goods_price: 131,
        stock: 24,
        addon: []

    }]
}


module.exports = ProductDate;