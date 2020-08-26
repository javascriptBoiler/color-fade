const HexColor = new RegExp(/#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
const RGBColor = new RegExp(/rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/)

const COLOR_TYPE = {
    RGB: 'rgb',
    HEX: 'hex'
}

function isHexColor(color) {
    return HexColor.test(color)
}

function isRGBColor(color) {
    return RGBColor.test(color)
}

function interpolateColor(color1, color2, factor) {
    if (arguments.length < 3) {
        factor = 0.5;
    }
    let result = color1.slice();
    for (let i = 0; i < 3; i++) {
        result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]));
    }
    return result;
};

async function hexConvertToRGB(color) {
    const hexColor = color.replace("#","")
    var aRgbHex = hexColor.match(/.{1,2}/g);

    const colorCode = `${parseInt(aRgbHex[0], 16)}, ${parseInt(aRgbHex[1], 16)}, ${parseInt(aRgbHex[2], 16)}`
    return `rgb(${colorCode})`;
}

function convertToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function RGBToHEXConvert([r, g, b]) {
    return "#" + convertToHex(r) + convertToHex(g) + convertToHex(b);
}

async function isValidColor(color1, color2) {
    if (isHexColor(color1) && isHexColor(color2)) {
        return { isValid: true, colorType: COLOR_TYPE.HEX };
    }
    else if (isRGBColor(color1) && isRGBColor(color2)) {
        return { isValid: true, colorType: COLOR_TYPE.RGB };
    }
    else {
        return { isValid: false, colorType: null };
    }
}

async function fadeColor(color1, color2, steps, location= 0, returnType = COLOR_TYPE.HEX) {
    let selectedColorOne = color1;
    let selectedColorTwo = color2;

    const { isValid, colorType } = await isValidColor(color1, color2);

    if (!isValid) {
        throw new Error('Invalid color!')
    }

    if (colorType === COLOR_TYPE.HEX) {
        selectedColorOne = await hexConvertToRGB(color1);
        selectedColorTwo = await hexConvertToRGB(color2);
    }

    let stepFactor = 1 / (steps - 1),
        interpolatedColorArray = [];

    color1 = selectedColorOne.match(/\d+/g).map(Number);
    color2 = selectedColorTwo.match(/\d+/g).map(Number);

    for (let i = 0; i < steps; i++) {
        interpolatedColorArray.push(interpolateColor(color1, color2, stepFactor * i));
    }

    if(location === 0){
        if(returnType === COLOR_TYPE.HEX){
            return interpolatedColorArray.map((each)=>{
                return RGBToHEXConvert(each);
            });
        }
        else{
            return interpolatedColorArray
        }
    }else{
        if(returnType === COLOR_TYPE.HEX){
            return RGBToHEXConvert(interpolatedColorArray[location-1]);
        }else{
            return interpolatedColorArray[location-1];
        }
    }
}

module.exports = {
    fadeColor
}