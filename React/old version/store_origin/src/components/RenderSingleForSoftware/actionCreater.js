import actionType from '../RenderSingleForSoftware'

const actions = {
    supportToggleState:(status) => ({
        type:actionType.typesName.supportToggle,
        status
    }),
    descriptToggleState:(status) => ({
        type:actionType.typesName.descriptToggle,
        status
    }),
    updateToggleState:(status) => ({
        type:actionType.typesName.updateToggle,
        status
    })
}

export default actions