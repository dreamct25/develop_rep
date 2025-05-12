import { Ref } from 'vue'

export interface storeType {
    currentSelectStar: Ref<string>,
    isSettingStars: Ref<boolean>,
    allStars: Ref<{
        starNameZh: string,
        starNameEn: string
    }[]>,
    starsKeyPare: Ref<Record<string, string>>
    starMatches: Ref<{
        matchFst: string,
        matchScd: string,
        matchPercent: number,
        matchShortDesc: string,
        matchDesc: string
    }[]>,
    starExplain: Ref<{
        starNameZh: string,
        starNameEn: string,
        starPose: string,
        starPoseRep: string,
        starPoseDec: string,
        starGuard: string,
        starType: string,
        starBirth: string,
        starLife: string,
        starFriend: string,
        starLove: string,
        starMarry: string,
        starAdvice: string
    }[]>,
    startPredictFortuneToday: Ref<{
        canDo: string,
        noToDo: string,
        lucky?: {
            num: string, 
            color: string, 
            constellation: string 
        },
        fortune: {
            overall: {
                score: number,
                scoreDesc: string
            },
            love: {
                score: number,
                scoreDesc: string
            },
            work: {
                score: number,
                scoreDesc: string
            },
            wealth: {
                score: number,
                scoreDesc: string
            }
        }
    } | undefined>
}