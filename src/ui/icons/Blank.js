import Svg, {Path} from 'react-native-svg';
import {styles} from './styles';

export default function Blank({props}) {
    return (
        <Svg
            xmlSpace="preserve"
            width="60"
            height="60"
            viewBox="0 0 1300 1500"
            {...props} >
            <Path style={styles.fil0}
                  d="M47.34 526.12l0 454.82c0,73.82 39.42,142.08 103.45,179.12l393.96 227.54c64.03,37.04 142.88,37.04 206.64,0l393.96 -227.54c64.03,-37.04 103.45,-105.04 103.45,-179.12l0.01 -454.82c0,-73.82 -39.42,-142.08 -103.45,-179.12l-393.96 -227.54c-64.03,-37.04 -142.88,-37.04 -206.64,0l-393.96 227.54c-64.04,37.03 -103.46,105.3 -103.46,179.12z"/>
        </Svg>
    )
}
