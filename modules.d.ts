import type { HookResult } from '@nuxt/schema';

type ComponentProps<C extends Component> = C extends new (...args: any) => any
    ? Omit<InstanceType<C>['$props'], keyof VNodeProps | keyof AllowedComponentProps>
    : never;

export interface IModalShowOptions<TComponent extends Component> {
    readonly content: TComponent;
    readonly props?: ComponentProps<TComponent>;
}

export interface IToastPopOptions {
    readonly type: 'error' | 'info' | 'success';
    readonly message: string;
}

declare module '#app' {
    interface RuntimeNuxtHooks {

        'gocart:modal:show': <TComponent extends Component>(options: IModalShowOptions<TComponent>) => HookResult;
        'gocart:modal:hide': () => HookResult;

        'gocart:toast:pop': (options: IToastPopOptions) => HookResult;

    }
}