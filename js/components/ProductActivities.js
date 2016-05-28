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
// var ProductActivities = React.createClass({
//
//
// });
// module.exports = ProductActivities;
export class ProductActivities extends React.Component {
    render() {
        var activites = this.props.activites.map(function(item, index) {
            return (
                <li className="swiper-slide">{item.information}</li>
            )
        });
        return (
            <section className="detailsImage">
                <div className="swiper-container" id="swiper-container" ref="swiperActivities">
                    <ul className="swiper-wrapper">
                        {activites}
                    </ul>
                </div>
            </section>
        )
    }
    componentDidMount() {
        this.timer = setTimeout(function() {
            var detailsSwiper = new Swiper(this.refs.swiperActivities.getDOMNode(), {})
        }.bind(this), 100);
    }
}



// ReactDOM.render(<ProductActivities activites={Activities} />,document.getElementById('detailActivites'));