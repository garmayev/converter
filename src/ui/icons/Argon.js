import Svg, {Path} from 'react-native-svg';
import {styles} from './styles';

export default function Argon(props) {
    return (
        <Svg
            xmlSpace="preserve"
            width="13mm"
            height="15mm"
            viewBox="0 0 1300 1500"
            {...props} >
            <Path style={styles.fil0}
                  d="M47.33 526.12l0 454.82c0,73.82 39.42,142.08 103.45,179.12l393.96 227.54c64.03,37.04 142.88,37.04 206.64,0l393.96 -227.54c64.03,-37.04 103.45,-105.04 103.45,-179.12l0.02 -454.82c0,-73.82 -39.42,-142.08 -103.45,-179.12l-393.96 -227.54c-64.03,-37.04 -142.88,-37.04 -206.64,0l-393.96 227.54c-64.04,37.04 -103.47,105.04 -103.47,179.12z"/>
            <Path style={styles.fil1}
                  d="M598.73 698.1l40.75 127c10.05,30.16 -3.7,57.15 -33.34,67.2 -30.16,10.05 -56.62,-3.18 -67.2,-33.34l-14.82 -42.86 -144.47 0 -14.29 42.86c-10.05,30.16 -37.04,43.39 -67.2,33.34 -29.63,-10.05 -43.39,-37.04 -33.34,-67.2l40.75 -127c23.28,-71.97 40.22,-118.53 51.33,-139.17 15.88,-30.16 35.45,-48.68 59.27,-55.56 10.05,-3.18 22.23,-4.76 35.98,-4.76 33.87,0 59.8,11.11 78.32,33.87 15.35,18.52 32.28,56.62 51.33,114.3 3.7,10.05 9,26.99 16.4,49.74l0 0.53 0.53 1.05zm-103.19 33.34l-43.39 -127 -43.39 127 86.78 0z"/>
            <Path style={styles.fil1}
                  d="M709.32 894.16c-31.75,0 -52.92,-21.17 -52.92,-52.92l0 -203.2c0,-31.75 21.17,-52.92 52.92,-52.92 19.58,0 34.4,7.41 43.92,22.23 20.64,-19.05 44.98,-28.58 72.5,-28.58l2.12 0c31.75,0 52.92,21.17 52.92,52.92 0,30.16 -21.17,51.33 -52.92,51.33l-13.76 0c-29.1,0 -51.86,25.4 -51.86,57.15l0 101.07c0,31.75 -21.17,52.92 -52.92,52.92z"/>
            <Path style={styles.fil1}
                  d="M916.23 911.62c-18.52,0 -30.96,-12.44 -30.96,-30.96 0,-89.43 104.51,-81.23 104.51,-128.06 0,-11.91 -6.61,-17.99 -19.05,-17.99 -11.11,0 -19.05,8.73 -19.05,20.9 0,16.93 -12.44,27.78 -30.96,27.78 -18.52,0 -30.96,-12.44 -30.96,-30.96 0,-22.23 7.67,-40.22 23.02,-53.45 15.35,-13.23 34.66,-20.11 57.68,-20.11 23.81,0 42.86,6.09 57.94,18.52 15.08,11.91 22.75,29.37 22.75,51.86 0,25.93 -9,46.3 -23.81,58.47 -7.14,6.09 -14.55,11.38 -21.96,15.61 -7.14,4.23 -15.08,9 -24.08,13.49 -9,4.49 -15.35,8.73 -20.11,12.44l62.19 0.02c18.52,0 30.96,12.44 30.96,30.96 0,18.52 -12.44,30.96 -30.96,30.96l-107.15 -0.01 0 0.53z"/>
        </Svg>
    );
}