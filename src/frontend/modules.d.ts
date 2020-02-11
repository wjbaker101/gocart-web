declare module '*.vue' {
    import Vue from 'vue';
    export default Vue;
}

declare module '*.svg' {
    const content: any;
    export default content;
}

declare module 'vuedraggable';
declare module 'quagga';

interface BeforeInstallPromptEvent extends Event {

    readonly platforms: Array<string>;

    readonly userChoice: Promise<{
        outcome: 'accepted' | 'dismissed',
        platform: string,
    }>;

    prompt(): Promise<void>;
}
