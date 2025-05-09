import Svg, {Path} from 'react-native-svg';
import {styles} from './styles';

export default function Hydrogen(props) {
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
                      d="M747.95 857.91c0,31.75 -21.17,52.92 -52.92,52.92 -31.75,0 -52.92,-21.17 -52.92,-52.92l0 -100.01 -113.23 0 0 100.01c0,31.75 -21.17,52.92 -52.92,52.92 -31.75,0 -52.92,-21.17 -52.92,-52.92l0 -286.28c0,-31.75 21.17,-52.92 52.92,-52.92 31.75,0 52.92,21.17 52.92,52.92l0 91.02 113.24 0 0 -91.02c0,-31.75 21.17,-52.92 52.92,-52.92 31.75,0 52.92,21.17 52.92,52.92l-0.01 286.28z"/>
                <Path style={styles.fil1}
                      d="M793.99 928.29c-18.52,0 -30.96,-12.44 -30.96,-30.96 0,-89.43 104.51,-81.23 104.51,-128.06 0,-11.91 -6.61,-17.99 -19.05,-17.99 -11.11,0 -19.05,8.73 -19.05,20.9 0,16.93 -12.44,27.78 -30.96,27.78 -18.52,0 -30.96,-12.44 -30.96,-30.96 0,-22.23 7.67,-40.22 23.02,-53.45 15.35,-13.23 34.66,-20.11 57.68,-20.11 23.81,0 42.86,6.09 57.94,18.52 15.08,11.91 22.75,29.37 22.75,51.86 0,25.93 -9,46.3 -23.81,58.47 -7.14,6.09 -14.55,11.38 -21.96,15.61 -7.14,4.23 -15.08,9 -24.08,13.49 -9,4.49 -15.35,8.73 -20.11,12.44l62.19 0.02c18.52,0 30.96,12.44 30.96,30.96 0,18.52 -12.44,30.96 -30.96,30.96l-107.15 -0.01 0 0.53z"/>
            </Svg>
    );
}
