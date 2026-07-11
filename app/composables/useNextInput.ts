import { useEventListener } from '@vueuse/core';

export function useNextInput(elements: Array<Ref<HTMLInputElement | null>>, action: () => Promise<void>) {
    for (const element of elements) {
        useEventListener(element, 'keypress', async (event) => {
            if (event.key !== 'Enter') {
                return;
            }

            const currentIndex = elements.findIndex(x => x.value === event.target);
            if (currentIndex === -1) {
                return;
            }

            let nextIndex = (currentIndex + 1) % elements.length;

            while (nextIndex !== currentIndex) {
                const nextInput = elements[nextIndex]?.value;
                if (!nextInput) {
                    continue;
                }

                if (nextInput.value.length === 0) {
                    nextInput.focus();
                    return;
                }

                nextIndex = (nextIndex + 1) % elements.length;
            }

            if ((event.target as HTMLInputElement).value.length === 0) {
                return;
            }

            await action();
        });
    }
}