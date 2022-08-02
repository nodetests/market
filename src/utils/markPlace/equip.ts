import baseConfig from '../../config/EquipModel.json'
import bg1 from '@/asset/img/markPlace/sale_hero_n.png'
import bg2 from '@/asset/img/markPlace/sale_hero_r.png'
import bg3 from '@/asset/img/markPlace/sale_hero_sr.png'
import bg4 from '@/asset/img/markPlace/sale_hero_ssr.png'
import { BaseUrl } from '@/config/baseUrl'

const equipUrl  = BaseUrl.REACT_APP_EQUIPIMG

// const equipContext = require.context ( '@/asset/img/equip', true, /\.(png|jpg)$/ )


// export const getEquipImage =(equipName:string) =>{
//    const cache:any = allItem.find((item:any) => item.name === equipName)
//    const equipPath = "./" + cache.pic + ".png"
//     const imgPath = equipContext(equipPath)
//     return imgPath.default
// }
export const getEquipImage =(equipName:string) =>{
    const allItem = Object.values(baseConfig.items)
    const cache:any = allItem.find((item:any) => item.name === equipName)
    return `${equipUrl}/${cache.pic}.png`
 }

export const getEquipBgImage =(val:string | number) =>{
    let bg:any =''
    if(val === '0' || 0){
        bg = bg1
    }else if(val === '1' || 1 ){
        bg = bg2
    }else if(val === '2' || 2){
        bg = bg3
    }else{
        bg = bg4
    }
    return bg
}
