import Svg, {Path} from 'react-native-svg';
import {styles} from './styles';

export default function Air(props) {
    return (
        <Svg
            xmlSpace="preserve"
            width="13mm"
            height="15mm"
            viewBox="0 0 1300 1500"
            {...props} >
            <Path style={styles.fil0}
                  d="M47.33 526.12l0 454.82c0,73.82 39.42,142.08 103.45,179.12l393.96 227.54c64.03,37.04 142.88,37.04 206.64,0l393.96 -227.54c64.03,-37.04 103.45,-105.04 103.45,-179.12l0.01 -454.82c0,-73.82 -39.42,-142.08 -103.45,-179.12l-393.96 -227.54c-64.03,-37.04 -142.88,-37.04 -206.64,0l-393.96 227.54c-64.04,37.04 -103.46,105.3 -103.46,179.12z"/>
            <Path style={styles.fil1}
                  d="M604.45 421.8c9.26,2.38 18.79,3.97 27.52,7.14 78.58,28.84 105.3,123.56 52.65,188.91 -24.61,30.43 -57.41,44.71 -96.31,44.71 -70.38,0 -141.02,-0.26 -211.4,0 -25.66,0 -35.98,-20.9 -30.16,-37.84 3.97,-11.64 14.55,-19.05 27.78,-19.05 28.05,0 55.83,0 83.87,0 44.71,0 89.16,0.26 133.88,0 43.92,-0.26 74.61,-45.51 58.47,-86.25 -16.4,-41.8 -66.15,-52.92 -98.16,-27.25 -10.32,8.47 -14.02,20.37 -15.88,32.81 -0.79,4.76 -0.79,9.53 -1.32,14.29 -1.32,15.61 -13.49,26.72 -29.37,26.19 -14.82,-0.26 -26.99,-12.7 -26.99,-28.05 0,-33.6 9.26,-63.76 34.66,-87.05 16.93,-15.35 37.31,-23.81 59.8,-27.25 1.85,-0.26 3.7,-0.79 5.29,-1.32 9,0.01 17.47,0.01 25.67,0.01z"/>
            <Path style={styles.fil1}
                  d="M604.98 782.96c-76.2,0 -152.66,0 -228.86,0 -15.08,0 -25.66,-7.14 -29.63,-20.11 -5.29,-16.93 5.82,-34.13 23.55,-35.98 3.7,-0.53 7.41,-0.53 11.11,-0.53 148.17,0 296.33,0 444.5,0 17.73,0 33.6,-4.5 47.36,-16.14 24.87,-20.9 28.58,-60.85 8.2,-86.25 -20.9,-26.19 -53.45,-30.96 -79.64,-17.73 -17.73,9 -24.08,24.87 -25.93,43.39 -0.26,3.7 -0.26,7.41 -0.79,11.11 -2.38,15.61 -14.82,26.19 -29.1,25.4 -15.35,-0.79 -27.25,-12.17 -27.25,-28.05 0,-33.6 8.73,-64.56 35.19,-87.58 26.72,-23.28 58.21,-31.75 92.87,-27.25 51.06,6.61 92.08,45.51 102.13,96.31 12.44,61.91 -27.25,124.35 -88.9,139.44 -10.85,2.65 -22.23,3.7 -33.34,3.7 -73.3,0.53 -147.39,0.27 -221.47,0.27z"/>
            <Path style={styles.fil1}
                  d="M608.42 844.87c72.5,0 144.99,0 217.49,0 24.61,0 47.63,4.76 68.26,18.26 38.1,24.87 57.41,60.33 56.62,106.1 -1.06,55.3 -42.6,105.04 -98.69,114.04 -45.77,7.41 -85.2,-5.56 -113.51,-43.92 -16.14,-21.7 -21.43,-47.36 -19.05,-74.08 1.06,-14.29 13.49,-23.81 27.52,-23.81 14.02,0 25.4,9.53 27.78,23.81 1.06,6.61 0.79,13.23 2.12,19.84 4.76,25.14 19.05,38.89 44.45,42.6 33.87,5.29 66.94,-18.52 71.97,-51.33 5.56,-35.72 -16.93,-68 -51.86,-73.82 -4.76,-0.79 -10.05,-1.06 -14.82,-1.06 -149.75,0 -299.77,0 -449.53,0 -16.14,0 -26.72,-6.88 -30.69,-20.37 -5.03,-16.93 6.09,-34.13 23.81,-35.98 3.18,-0.26 6.61,-0.53 10.05,-0.53 75.94,0.25 152.14,0.25 228.08,0.25z"/>
        </Svg>
    );
}