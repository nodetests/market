import { BaseUrl } from '@/config/baseUrl'
import skillNameConfig from '@/config/skill/HeroStarRelation.json'
import skillImgConfig from '@/config/skill/SkillModel.json'

const skillUrl = BaseUrl.REACT_APP_SKILLIMG

export const getSkillName = (val: number | string) => {
  let nameObj: any = skillNameConfig.items
  let imgObj: any = skillImgConfig.items
  let skillNameId1 = nameObj[val][1].normalAttacckId
  let skillNameId2 = nameObj[val][1].skillFirstId
  let arr = [
    { name: imgObj[skillNameId1].skillName || '普通攻击', skillIntro: imgObj[skillNameId1].skillIntro,url:getSkillImg(imgObj[skillNameId1].skillPic) },
    { name: imgObj[skillNameId2].skillName, skillIntro: imgObj[skillNameId2].skillIntro,url:getSkillImg(imgObj[skillNameId2].skillPic) },
  ]
  return arr
}

export const getSkillImg = (val: any) => {
  return `${skillUrl}/${val}.png`
}