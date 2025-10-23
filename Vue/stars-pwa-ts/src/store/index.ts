import { reducer as BottomBarReducer } from '@/components/BottomBar'
import { reducer as BaseReducer } from '@/Page/Base'
import reducerMembers from '@/store/reducerMembersEnum'

export default {
    [reducerMembers.BottomBar]: BottomBarReducer,
    [reducerMembers.Base]: BaseReducer
}