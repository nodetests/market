
import lvConfig from '../../config/HeroLevelRelation.json'

export const lvPress = (nowLv: number | string, exp: number | string) => {
    if (Number(exp) <= 0) {
        return 0
    } else {
        const allConfig: any = lvConfig
        const lv = Number(nowLv) + 1
        const lvObj: any = allConfig.items[lv]
        const arr: any = Object.values(lvObj)
        const num = Div(exp,arr[0].exp )*100
        return num
    }

}
//加法函数，用来得到精确的加法结果
//说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
//调用：Add(arg1,arg2)
//返回值：arg1加上arg2的精确结果

export function Add(arg1: any, arg2: any) {
    arg1 = parseFloat(arg1);
    arg2 = parseFloat(arg2);
    var r1, r2, m;
    try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
    try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
    m = Math.pow(100, Math.max(r1, r2));
    return (Mul(arg1, m) + Mul(arg2, m)) / m;
}
//减法函数，用来得到精确的减法结果
//说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的减法结果。
//调用：Sub(arg1,arg2)
//返回值：arg1减去arg2的精确结果

export function Sub(arg1: any, arg2: any) {
    arg1 = parseFloat(arg1);
    arg2 = parseFloat(arg2);
    var r1, r2, m, n;
    try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
    try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
    m = Math.pow(10, Math.max(r1, r2));
    //动态控制精度长度
    n = (r1 >= r2) ? r1 : r2;
    return ((Mul(arg1, m) - Mul(arg2, m)) / m).toFixed(n);
}
//乘法函数，用来得到精确的乘法结果
//说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
//调用：Mul(arg1,arg2)
//返回值：arg1乘以arg2的精确结果
export function Mul(arg1: any, arg2: any) {
    arg1 = parseFloat(arg1);
    arg2 = parseFloat(arg2);
    var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try { m += s1.split(".")[1].length } catch (e) { }
    try { m += s2.split(".")[1].length } catch (e) { }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}
//除法函数，用来得到精确的除法结果
//说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
//调用：Div(arg1,arg2)
//返回值：arg1除以arg2的精确结果
export function Div(arg1: any, arg2: any) {
    arg1 = parseFloat(arg1);
    arg2 = parseFloat(arg2);
    var t1 = 0, t2 = 0, r1, r2;
    try { t1 = arg1.toString().split(".")[1].length; } catch (e) { }
    try { t2 = arg2.toString().split(".")[1].length; } catch (e) { }
    r1 = Number(arg1.toString().replace(".", ""));
    r2 = Number(arg2.toString().replace(".", ""));
    return Mul(r1 / r2, Math.pow(10, t2 - t1));
}