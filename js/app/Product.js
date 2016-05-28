/**
 * @ 商品详情
 * @ author xiege
 */
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var Link = ReactRouter.Link;
var hashHistory = ReactRouter.hashHistory;
console.log(window);
/**
 * 商品详情页模拟数据
 */
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

var Activities = [{
    pricetop: 1000,
    pricedown: 200,
    information: '满1000减200'
}, {
    pricetop: 1500,
    pricedown: 500,
    information: '满1500减500'
}, {
    pricetop: 2000,
    pricedown: 800,
    information: '满2000减800'
}];
var price = '6299.00-8399.00';
var originalprice = '888.88';
// 图片轮播
var ProductImages = React.createClass({
    render: function() {
        var items = this.props.images;
        var html = items.map(function(item, index) {
            return (<li className="swiper-slide"><img src={item} width="100%" alt={index} /></li>);
        });
        return (
            <div className="main-images swiper-container" ref="mainImages">
                <ul className="swiper-wrapper">
                    {html}
                </ul>
                <span className="swiper-pagination"></span>
            </div>
        )
    },
    componentDidMount: function() {
        var mainImages = new Swiper(this.refs.mainImages.getDOMNode(), {
            pagination: $(this.refs.mainImages.getDOMNode()).find('.swiper-pagination')
        })
    }
});
// 商品标题
var ProductTitle = React.createClass({
    render: function() {
        return (
            <div className="main-title">
                <h3>{this.props.title}</h3>
            </div>
        )
    }
});
// 商品描述
var ProductDescription = React.createClass({
        render: function() {
            return (
                <div className="main-description">
                <p>{this.props.description}</p>
            </div>
            )
        }
    })
    // 商品价格及功能按钮
var ProductPriceAndFuncs = React.createClass({
    // 收藏功能
    doCollect: function(event) {
        var $this = $(event.target);
        if (!$this.hasClass('collected')) {
            $this.addClass('collected').removeClass('uncollected');
        } else {
            $this.addClass('uncollected').removeClass('collected');
        }
    },
    // 加入购物车
    addToShoppingCart: function(e) {
        ReactDOM.render(<ProductSkuSelect sku={ProductDate.goods_addon} />, document.getElementById('sku'));
    },
    render: function() {
        return (
            <div className="main-price clearfix">
                <div className="main-price-module fl"><span className="yen">&yen;</span>{this.props.price}</div>
                <div className="main-buycart-icon fr" onClick={this.addToShoppingCart}><span title="购物车"></span></div>
                <div className="main-collect-icon fr" onClick={this.doCollect} ref="collect"><span title="收藏"></span></div>
            </div>
        )
    }
});
// 详情页原价与运费
var ProductOriginalPriceAndFee = React.createClass({
    render: function() {
        return (
            <div className="main-oringinal-price clearfix">
                <div className="main-oringinal-module fl">原价:<span>{this.props.originalprice}</span></div>
                <div className="main-fee fr">快递:<span>{this.props.fare}元</span></div>
            </div>
        )
    }
});
// 商品详情
var ProductDetailsChild = React.createClass({
    render: function() {
        return (
            <div className="main-product-detail swiper-slide" dangerouslySetInnerHTML={{__html:this.props.content}} />
        )
    }
});
// 产品售后
var ProductForSale = React.createClass({
    render: function() {
        return (
            <div className="main-product-sale swiper-slide">
                <div className="main-table">
                    <h4>基本参数</h4>
                    <div className="main-table-body">
                        <div className="main-table-tr clearfix">
                            <div className="main-table-td fl">商品编码</div>
                            <div className="main-table-td fl">{this.props.snum}</div>
                        </div>
                        <div className="main-table-tr clearfix">
                            <div className="main-table-td fl">生产地址</div>
                            <div className="main-table-td fl">{this.props.madeby}</div>
                        </div>
                        <div className="main-table-tr clearfix">
                            <div className="main-table-td fl">保质时长</div>
                            <div className="main-table-td fl">{this.props.expire}</div>
                        </div>
                        <div className="main-table-tr clearfix">
                            <div className="main-table-td fl">售后方式</div>
                            <div className="main-table-td fl">{this.props.maintain}</div>
                        </div>
                        <div className="main-table-tr clearfix">
                            <div className="main-table-td fl">发货地</div>
                            <div className="main-table-td fl">{this.props.deliver_address}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});
// 详情页评论
var ProductComment = React.createClass({
        render: function() {
            return (
                <div className="main-product-comment swiper-slide">
                <div className="coment-tab">
                    <ul>
                        <li className="cur">好评<span>(12306)</span></li>
                        <li>差评<span>(11)</span></li>
                    </ul>
                </div>
                <div className="coment-container">
                    <div className="coment-list">
                        <div className="coment-header clearfix">
                            <img src="images/3.jpg" alt="用户头像" className="fl" />
                            <span className="coment-user fl">凨亦凌</span>
                            <span className="coment-time fr">2016-05-24 19:00:00</span>
                        </div>
                        <div className="coment-star">
                            <span className="coment-stars stars1"></span>
                        </div>
                        <div className="coment-info">宝贝很不错，这个价格挺直的，喜欢的亲们不要犹豫呀！</div>
                        <div className="coment-replay-wrapper">
                            <div className="coment-simple">购买时间:2016年05月24号 19:14</div>
                            <div className="coment-simple">颜色分类:黑色</div>
                        </div>
                        <div className="coment-trade-replay">
                            <div className="coment-trade-replay-info">商家：感谢您的惠顾与支持，有不懂的都可以咨询我们的售后技术员们，祝您生活愉快！</div>
                            <p>反馈时间:2016年5月24号 19:20</p>
                        </div>
                        <div className="coment-info-add">
                            <div className="coment-info">[追加]宝贝很不错，这个价格挺直的，喜欢的亲们不要犹豫呀！</div>
                            <div className="coment-replay-wrapper">
                                <div className="coment-simple">购买时间:2016年05月24号 19:14</div>
                                <div className="coment-simple">颜色分类:黑色</div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            )
        }
    })
    // 商品详情tab
var ProductTabs = React.createClass({
    render: function() {
        var {...props
        } = {
            snum: ProductDate.snum,
            madeby: ProductDate.madeby,
            expire: ProductDate.expire,
            maintain: ProductDate.maintain,
            deliver_address: ProductDate.deliver_address
        };
        return (
            <div className="main-module">
                <div className="main-detailtab">
                    <div className="main-tab">
                        <ul className="main-tab-page clearfix">
                            <li className="cur">商品详情</li>
                            <li>产品售后</li>
                            <li>评价<span>(1900)</span></li>
                        </ul>
                    </div>
                    <div className="main-product-content swiper-container" ref="productTabs">
                        <div className="main-product-wrapper swiper-wrapper">
                            <ProductDetailsChild content={ProductDate.content} />
                            <ProductForSale {...props} />
                            <ProductComment />
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    componentDidMount: function() {
        var productTabs = new Swiper(this.refs.productTabs.getDOMNode(), {
            autoHeight: true,
            pagination: $(this.refs.productTabs.getDOMNode()).siblings('.main-tab').find('.main-tab-page'),
            paginationClickable: true,
            bulletClass: "tab",
            bulletActiveClass: "cur",
            paginationBulletRender: function(index, className) {
                var _name, _comment_count = 1990;
                switch (index) {
                    case 0:
                        _name = "商品详情";
                        break;
                    case 1:
                        _name = "产品售后";
                        break;
                    case 2:
                        _name = "评价" + "<span>(" + _comment_count + ")</span>"
                        break;
                    default:
                        break;
                }
                return '<li class="' + className + '">' + _name + '</li>';
            }
        })
    }
});
// 我要联赢推荐
var Recommend = React.createClass({
    render: function() {
        return (
            <div className="main-module">
            <div className="main-recommend">
                <h4>
                    <p>我要联赢推荐</p>
                    <span title="刷新或者换一换"></span>
                </h4>
                <ul className="clearfix">
                    <li>
                        <a href="#">
                            <img src="/images/4.jpg" alt="" />
                            <p className="re-summary">CHANNEL 粉色手套拳击熊潮...</p>
                            <p className="re-price">&yen;1200</p>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <img src="/images/5.jpg" alt="" />
                            <p className="re-summary">平板电脑64G平板电脑日晖...</p>
                            <p className="re-price">&yen;1200</p>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <img src="/images/6.jpg" alt="" />
                            <p className="re-summary">华为手环 B2 TPU 腕带 运动版...</p>
                            <p className="re-price">&yen;1200</p>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        )
    }
});
// 底部
var Footer = React.createClass({
    render: function() {
        return (
            <footer>
                <div className="main-product-footer clearfix">
                    <div className="main-footer-btn main-footer-icon main-usercenter fl"><Link to="/UserCenter">个人中心</Link></div>
                    <div className="main-footer-btn main-footer-icon main-shoppingcart fl"><Link to="/ShoppingCart">购物车</Link></div>
                    <div className="main-footer-btn main-footer-icon main-allgoods fl"><Link to="/AllGoods">全部宝贝</Link></div>
                    <div className="main-footer-btn main-buy-now"><span>立即购买</span></div>
                </div>
            </footer>
        )
    },
    renderSKU: function() {
        ReactDOM.render(<ProductSkuSelect sku={ProductDate.goods_addon} />, document.getElementById('sku'));
    }
});
// 详情页路由
var ProductDetails = React.createClass({
    render: function() {
        var _Children = React.Children.map(this.props.children, function(data) {
            console.log(data);
            console.log(React.cloneElement(data, {
                doSomething: '1111'
            }))
        })
        return (
            <div>
                <div className="main">
                    <div className="main-module">
                        <ProductImages images={ProductDate.goods_images} />
                        <ProductTitle title={ProductDate.title} />
                        <ProductDescription description={ProductDate.Description} />
                        <ProductPriceAndFuncs price={price} />
                        <ProductOriginalPriceAndFee originalprice={originalprice} fare={ProductDate.fare} />
                    </div>
                    <ProductTabs  />
                    <Recommend />
                </div>
                <Footer />
            </div>
        )
    },
    componentWillMount: function() {
        console.log('componentWillMount');
    },
    componentDidMount: function(event) {

        console.log('componentDidMount');
    }
});

/**
 * SKU 属性选择
 */
var ProductSkuSelect = React.createClass({
    getInitialState: function() {
        return {
            index: 0,
            subindex: 0,
            count: 1,
            stock: this.props.sku[0].stock,
            hasSubStock: this.props.sku[0].addon.length
        }
    },
    // 规格一选择
    handleClick: function(e) {
        var _index = $(e.target).index(),
            _stock = $(e.target).data('stock');
        console.log(this.state.stock)
        this.setState({
            index: _index,
            subindex: 0,
            count: 1,
            stock: _stock,
            hasSubStock: this.props.sku[_index].addon.length
        });
    },
    // 规格二选择
    subhandleClick: function(e) {
        var _index = $(e.target).index(),
            _stock = $(e.target).data('stock');
        console.log(this.state.stock)
        this.setState({
            subindex: _index,
            count: 1,
            stock: _stock
        });
    },
    // 添加数量
    addCount: function() {
        var _count = this.state.count;
        _count = _count + 1;
        this.setState({
            count: _count
        });
    },
    // 减数量
    downCount: function() {
        var _count = this.state.count;
        _count = _count > 1 ? (_count - 1) : 1;
        console.log(_count)
        this.setState({
            count: _count
        });
    },
    render: function() {
        var _this = this;
        var data = _this.props.sku;
        console.log(data);
        var sku = data.map(function(item, index) {
            var clsName = (_this.state.index == index ? "cur" : "");
            return (
                <li className={clsName} onClick={_this.handleClick} data-stock={item.stock} >{item.feature_main}</li>
            )
        });
        var subsku = data[_this.state.index].addon.length && data[_this.state.index].addon.map(function(item, index) {
            var clsName = (_this.state.subindex == index ? "cur" : "");
            return (
                <li className={clsName} onClick={_this.subhandleClick} data-stock={item.stock} >{item.feature_main}</li>
            )
        });
        var subskuwrap = this.state.hasSubStock > 0 ? (
            <div className="sku-info clearfix">
                <span className="sku-prop-name fl">规格二</span>
                <div className="sku-prop-item">
                    <ul className="clearfix">
                        {subsku}
                    </ul>
                </div>
            </div>
        ) : '';
        return (
            <section className="sku-pop">
                <section className="sku-content">
                    <div className="sku-module">
                        <div className="sku-main">
                            <span className="sku-close" onClick={this.closeSKU}><a href="javascript:;">&times;</a></span>
                            <div className="sku-item">
                                <div className="sku-info clearfix">
                                    <span className="sku-prop-name fl">规格一</span>
                                    <div className="sku-prop-item">
                                        <ul className="clearfix">
                                            {sku}
                                        </ul>
                                    </div>
                                </div>
                                {subskuwrap}
                                <div className="sku-info clearfix">
                                    <span className="sku-prop-name fl">数&emsp;量</span>
                                    <div className="sku-prop-item">
                                        <div className="sku-number clearfix">
                                            <span className="number-down fl" onClick={_this.downCount}>-</span>
                                            <input type="number" value={_this.state.count} min="1" max="10" className="number-input fl" />
                                        <span className="number-up fl"  onClick={_this.addCount}>+</span>
                                    </div>
                                </div>
                            </div>
                            <div className="main-price clearfix">
                                <div className="main-price-module fl"><span className="yen">&yen;</span>6299.00-8399.00</div>
                            </div>
                            <div className="main-oringinal-price clearfix">
                                <div className="main-oringinal-module fl">原价:<span>699.00</span></div>
                                <div className="main-fee fr">快递:<span>20.00元</span></div>
                            </div>
                        </div>
                        <div className="sku-count clearfix">
                            <div className="sku-count-fee fl">
                                <span>合计：</span>198654.00元
                            </div>
                            <span className="add-to-cart fr">加入购物车</span>
                        </div>
                    </div>
                </div>
            </section>
        </section>
        )
    },
    closeSKU: function(e) {
        $(e.target).closest('.sku-pop').remove();
    }
});

/**
 * 全部宝贝
 */
var AllGoods = React.createClass({
    render: function() {
        return (
            <div>
                <h2>AllGoods Page ....</h2>
                <p><Link to="/ProductDetails">商品详情页</Link></p>
                <p><Link to="/UserCenter">个人中心</Link></p>
            </div>
        )
    }
});
/**
 * 个人中心
 */
var UserCenter = React.createClass({
        render: function() {
            return (
                <div>
                <h2>UserCenter Page ....</h2>
                <p><Link to="/ProductDetails">商品详情页</Link></p>
                <p><Link to="/allgoods">全部宝贝</Link></p>
            </div>
            )
        }
    })
    /**
     * 购物车
     */
var ShoppingCart = React.createClass({
    render: function() {
        return (
            <div>
                <h2>ShoppingCart Page ....</h2>
                <p><Link to="/ProductDetails">商品详情页</Link></p>
                <p><Link to="/allgoods">全部宝贝</Link></p>
            </div>
        )
    }
})

// 路由总配置
var Routes = (
    <Route path="/" component={ProductDetails}>
        <Route path="/ProductDetails" component={ProductDetails} />
        <Route path="/allgoods" component={AllGoods} />
    </Route>

);
// <Route path="/ProductDetails/sku" component={ProductSkuSelect} />
ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={ProductDetails} />
        <Route path="/ProductDetails" component={ProductDetails} />
        <Route path="/UserCenter" component={UserCenter} />
        <Route path="/allgoods" component={AllGoods} />
        <Route path="/ShoppingCart" component={ShoppingCart} />
    </Router>,
    document.getElementById('app'));
// ReactDOM.render(<Router history={hashHistory} routes={Routes} />,document.getElementById('app'));