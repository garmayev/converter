import {Float} from "react-native/Libraries/Types/CodegenTypes";
import {Scale} from "./Scale";
import {Balloon} from "./Balloon";

export type GasType = {
    title: String,
    moll: Float,
    density: Float,
    scales: Scale[],
    balloons: Balloon[],
    defaultBalloon: number
}
