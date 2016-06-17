var React = require('react-native');
var Swiper = require('react-native-swiper');
var {
  StyleSheet,
  Text,
  View,
  Image,
} = React

var styles = StyleSheet.create({
  wrapper: {
     //backgroundColor: '#f00',
    height:80,
  },
  slide: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  image: {
    height:90,
  }
})

var SwiperDemo = React.createClass({
  render: function() {
    return (
      <View style={{backgroundColor: '#333333', height:90}}>
          <Swiper style={styles.wrapper}
            dot={<View style={{backgroundColor:'rgba(255,255,255,.3)', width: 13, height: 13,borderRadius: 7, marginLeft: 7, marginRight: 7,}} />}
            activeDot={<View style={{backgroundColor: '#fff', width: 13, height: 13, borderRadius: 7, marginLeft: 7, marginRight: 7}} />}
            paginationStyle={{
              bottom: 20,
            }}
            loop={false}>
            <View style={styles.slide}>
              <Image style={styles.image} source={{uri: 'http://i.imgur.com/u3kXqo7.png'}} />
            </View>
            <View style={styles.slide}>
              <Image style={styles.image} source={{uri: 'http://i.imgur.com/3Z4nQyb.png'}} />
            </View>
            <View style={styles.slide}>
              <Image style={styles.image} source={{uri: 'http://i.imgur.com/5Wa3Iyb.png'}} />
            </View>
          </Swiper>
      </View>
    )
  }
});

module.exports = SwiperDemo;
