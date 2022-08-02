import heroModelConfig from '@/config/HeroModel.json'
import { BaseUrl } from '@/config/baseUrl'

// const equipContext = require.context ( '@/asset/img/hero', true, /\.(png|jpg)$/ )

// const requireContext = require.context('@/asset/img/hero', true, /^\.\/.*\.png$/)
// const nowUrl = requireContext.keys().map(requireContext)
// export const getHeroImage =(heroName:string) =>{
//     const heroPath = "./" + heroName + ".png"
//     const imgPath = equipContext(heroPath)
//     return imgPath.default
// }
const heroUrl = BaseUrl.REACT_APP_HEROIMG
export const getHeroImage =(heroName:string) =>{
  
    return `${heroUrl}/${heroName}.png`
}
export const getQualityImage =(qualityNumber:number | string) =>{
    let quality: string
    switch (qualityNumber) {
      case 1 || '1':
        quality = 'N'
        break
      case 2 || '2':
        quality = 'R'
        break
      case 3  || '3':
        quality = 'SR'
        break
      case 4  || '4':
        quality = 'SSR'
        break
      default:
        quality = 'N'
        break
    }
    return quality
}

export const getHeroModelImage =(modal:number | string) =>{
  let obj:any = heroModelConfig.items || null
  if(obj&&modal){
    // console.log(obj[modal].largePic);
    return obj[modal].largePic
  }
}