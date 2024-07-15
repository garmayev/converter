import Svg, {Circle, Path, Rect} from 'react-native-svg';
import {styles} from './styles';

export default function News({svgProps}) {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48">
            <Path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M5.5 13.573A28.927 28.927 0 0 1 34.427 42.5"></Path>
            <Path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M5.5 5.5a37 37 0 0 1 37 37"></Path>
            <Path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M5.5 18.282A24.22 24.22 0 0 1 29.718 42.5"></Path>
            <Path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M22.318 42.5A16.82 16.82 0 0 0 5.5 25.682v-7.4"></Path>
            <Path fill="none" stroke="currentColor" d="M5.5 13.573V5.5m16.818 37h7.4m4.709 0H42.5"></Path>
            <Circle cx={10.246} cy={37.755} r={4.745} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></Circle>
        </Svg>    );
}
