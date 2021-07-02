import { Ref } from 'vue';

const DELAY = 7000;

export const useUserMessage = function () {
    return {
        set(ref: Ref<string>, message: string) {
            ref.value = message;

            setTimeout(() => {
                ref.value = '';
            }, DELAY);
        },
    }
}
