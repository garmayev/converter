import Svg, {Path} from 'react-native-svg';
import {styles} from './styles';

export default function Liquid(props) {
    return (
        <Svg
            xmlSpace="preserve"
            width="13mm"
            height="15mm"
            viewBox="0 0 1300 1500"
            {...props} >
            <Path style={styles.fil0}
                  d="M41.23 520.23l0 454.82c0,73.82 39.42,142.08 103.45,179.12l393.96 227.54c64.03,37.04 142.88,37.04 206.64,0l393.96 -227.54c64.03,-37.04 103.45,-105.04 103.45,-179.12l0.02 -454.82c0,-73.82 -39.42,-142.08 -103.45,-179.12l-393.96 -227.54c-64.03,-37.04 -142.88,-37.04 -206.64,0l-393.96 227.54c-64.04,37.04 -103.47,105.3 -103.47,179.12z"/>
            <Path style={styles.fil1}
                  d="M612.12 393.22c14.02,-19.84 43.39,-19.84 57.68,-0.26 52.65,73.03 152.66,218.02 184.15,280.72 24.34,48.42 49.21,97.37 54.5,151.87 8.73,93.66 -24.34,169.86 -92.6,227.54 -127,107.42 -327.29,75.94 -409.31,-68.79 -34.66,-61.12 -41.54,-126.21 -20.64,-193.68 16.93,-55.3 43.13,-106.63 70.91,-157.16 46.04,-83.08 99.49,-161.4 155.31,-240.24zm39.16 137.32c-4.5,-7.14 -14.82,-7.41 -19.31,0 -26.46,44.19 -98.69,172.24 -136.79,242.89 -11.91,22.23 -19.58,49.21 -20.64,74.61 -3.97,92.6 70.64,166.16 164.84,168.28 113.24,2.38 204.52,-120.65 156.37,-220.93 -26.99,-56.09 -54.77,-111.65 -84.14,-166.42 -17.99,-33.61 -39.96,-65.89 -60.33,-98.43z"/>
        </Svg>
    );
}