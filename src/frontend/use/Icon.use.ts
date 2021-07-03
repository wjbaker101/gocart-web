export const useIconProps = function () {
    return {
        small: Boolean,
        mid: Boolean,
        large: Boolean,
        massive: Boolean,
        colour: {
            type: String,
            default: 'currentColor',
        },
    }
}

export const useIcon = function (props: any) {
    const baseSize = 15;

    const size =
        props.small ? baseSize * 0.5 :
        props.mid ? baseSize * 1.5 :
        props.large ? baseSize * 2 :
        props.massive ? baseSize * 4 : baseSize;

    return {
        size,
    }
}
