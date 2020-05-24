const MapStyle = [
  {
      "stylers": [
          {
              "hue": "#ff1a00"
          },
          {
              "invert_lightness": true
          },
          {
              "saturation": -100
          },
          {
              "lightness": 33
          },
          {
              "gamma": 0.5
          }
      ]
  },
  {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
          {
              "color": "#2D333C"
          }
      ]
  }
];

const CityLocation = {
  Melbourne: {
    lat: -37.840935,
    lng: 144.946457
  },
  Sydney: {
    lat: -33.865143,
    lng: 151.2099
  },
  Adelaide: {
    lat: -34.92123,
    lng: 138.599503
  },
  Perth: {
    lat: -31.953512,
    lng: 115.857048
  },
  Canberra: {
    lat: -35.282001,
    lng: 149.128998
  },
  Brisbane: {
    lat: -27.470125,
    lng: 153.021072
  }
}

export {
  MapStyle,
  CityLocation
};