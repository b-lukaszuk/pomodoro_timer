import degreeToRadian from "./degreeToRadian";
import ICoord from "../interfaces/ICoord";

// https://math.stackexchange.com/questions/260096/find-the-coordinates-of-a-point-on-a-circle
function getXYCoordOnArc(angleDeg: number, xMid: number, yMid: number,
    radius: number): ICoord {
    let newX: number = radius * Math.sin(degreeToRadian(angleDeg));
    let newY: number = radius * Math.cos(degreeToRadian(angleDeg));
    // the web page says the middle of a circle is (0, 0)
    // in canvas it it (xMid, yMid) (no zeros) so correction is in order
    return { x: (newX + xMid), y: (yMid - newY) };

}

export default getXYCoordOnArc;
