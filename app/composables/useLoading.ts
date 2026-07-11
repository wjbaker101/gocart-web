export interface IUseLoadingOptions {
    readonly isLoading?: Ref<boolean>;
    readonly request: () => Promise<any>;
}

export async function useLoading(options: IUseLoadingOptions): Promise<void> {
    const toast = useToast();

    if (options.isLoading) {
        options.isLoading.value = true;
    }

    try {
        await options.request();
    }
    catch (error) {
        if (isNuxtError(error)) {
            toast.pop({
                type: 'error',
                message: error.message,
            });
        }

        toast.pop({
            type: 'error',
            message: 'Something went wrong, please try again later.',
        });
    }
    finally {
        if (options.isLoading) {
            options.isLoading.value = false;
        }
    }
}