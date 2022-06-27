import actionType from '../Dialog'

const actions = {
    dialogIsOpened:(status) => ({
        type:actionType.typesName.dialogIsOpen,
        status
    })
}

export default actions