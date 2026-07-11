import type { IToastPopOptions } from '~~/modules';

export function useToast() {
    const app = useNuxtApp();

    return {

        pop(options: IToastPopOptions) {
            app.hooks.callHook('gocart:toast:pop', options);
        },

        onPop(action: (options: IToastPopOptions) => void) {
            app.hooks.hook('gocart:toast:pop', (options) => {
                action(options);
            });
        },

    };
}