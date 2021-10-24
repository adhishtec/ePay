import React, {useState, useEffect} from 'react';
import moment from 'moment';
import {View, Image, StyleSheet, ScrollView} from 'react-native';
import {Card} from 'react-native-elements';
import Axios from 'axios';

const Tileview = prop => {
  const [img, setImg] = React.useState('');
  const [humid, setHumid] = React.useState('');
  const [time, setTime] = React.useState('');
  const [weatherInformation, setWeatherInformation] = React.useState(null);
  const [displayWeatherObj, setDisplayWeatherObj] = React.useState(null);

  useEffect(() => {
    getData();
  }, []);
  // Service Call
  function getData() {
    Axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${prop.city}&appid=1f89da47fe4d0be6bbbf376af70bdb58`,
    )
      .then(data => {
        setWeatherInformation(data);
        let obj = {};
        const tempValToCel = weatherInformation.data.main.temp - 273.15;
        obj['temp'] = Math.round(tempValToCel);
        obj['icon'] = JSON.parse(
          weatherInformation.request._response,
        ).weather[0].icon;
        obj['humid'] = JSON.parse(
          weatherInformation.request._response,
        ).main.humidity;
        obj['timezone'] = getDate(JSON.parse(weatherInformation.data.timezone));

        setHumid(obj.humid);
        setImg(`https://openweathermap.org/img/wn/${obj.icon}.png`);
        setDisplayWeatherObj(obj);
        // }
      })
      .catch(error => {
        console.log(error);
      });
  }
  // Date data formating
  function getDate(timeData) {
    const nowInLocalTime = Date.now() + timeData;

    let ms = nowInLocalTime;
    let d = new Date(1000 * Math.round(ms / 1000)); // round to nearest second
    function pad(i) {
      return ('0' + i).slice(-2);
    }
    var str =
      d.getUTCHours() +
      ':' +
      pad(d.getUTCMinutes()) +
      ':' +
      pad(d.getUTCSeconds());
    console.log(str);
    let dateform = moment(d.getUTCHours() + ':' + pad(d.getUTCMinutes()), [
      'HH:mm',
    ]).format('hh:mm A');

    setTime(
      moment(d.getUTCHours() + ':' + pad(d.getUTCMinutes()), ['HH:mm']).format(
        'hh:mm A',
      ),
    );
    return d.getUTCHours() + ':' + pad(d.getUTCMinutes());
  }
  // UI components
  return (
    <View>
      <ScrollView>
        <Card style={styles.cardData}>
          <Card.Title>Next</Card.Title>
          <ScrollView horizontal={true}>
            <Card style={styles.cardData}>
              <Card.Title>
                {displayWeatherObj && displayWeatherObj.temp}°C
              </Card.Title>
              <Card.Title>{humid}%</Card.Title>
              <Card.Divider />
              <Image
                style={styles.img}
                source={{
                  uri: img,
                }}
              />
              <Card.Divider />
              <Card.Title>{time}</Card.Title>
            </Card>
            <Card style={styles.cardData}>
              <Card.Title>
                {displayWeatherObj && displayWeatherObj.temp}°C
              </Card.Title>
              <Card.Title>{humid}%</Card.Title>
              <Card.Divider />
              <Image
                style={styles.img}
                source={{
                  uri: img,
                }}
              />
              <Card.Divider />
              <Card.Title>{time}</Card.Title>
            </Card>

            <Card style={styles.cardData}>
              <Card.Title>
                {displayWeatherObj && displayWeatherObj.temp}°C
              </Card.Title>
              <Card.Title>{humid}%</Card.Title>
              <Card.Divider />
              <Image
                style={styles.img}
                source={{
                  uri: img,
                }}
              />
              <Card.Divider />
              <Card.Title>{time}</Card.Title>
            </Card>
          </ScrollView>
        </Card>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  cardData: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  img: {
    height: 80,
    width: 80,
  },
});

export default Tileview;
