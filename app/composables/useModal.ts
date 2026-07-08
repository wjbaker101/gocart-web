import { useEventBus } from '@vueuse/core';

import type { ComponentProps } from '#build/types/layouts';


export interface IShowModalEvent<T extends InstanceType<any>> {
    readonly component: T;
    readonly props: ComponentProps<T>;
}

export function useModal() {
    const showModalBus = useEventBus<IShowModalEvent<any>>('show-modal');
    const hideModalBus = useEventBus('hide-modal');

    return {
        show<T extends Component>(event: IShowModalEvent<T>) {
            showModalBus.emit(event);
        },

        onShow<T extends Component>(action: (event: IShowModalEvent<T>) => void) {
            showModalBus.on(action);
        },

        hide() {
            hideModalBus.emit();
        },

        onHide(action: () => void) {
            hideModalBus.on(action);
        },
    };
}