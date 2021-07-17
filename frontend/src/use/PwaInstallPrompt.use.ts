import { onBeforeMount } from 'vue';

import PwaInstallPromptComponent from '@/component/modal/content/PwaInstallPromptComponent.vue';

import { Event, eventService } from '@/service/Event.service';

export function usePwaInstallPrompt() {
    onBeforeMount(() => {
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();

            eventService.publish(Event.OPEN_MODAL, {
                content: PwaInstallPromptComponent,
                props: {
                    event: e,
                },
            });
        });

        window.addEventListener('appinstalled', () => {});
    });
}
