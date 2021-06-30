import { ref } from 'vue';

import { Product } from '@/model/Product.model';

const product = ref<Product | null>(null);

export function useCurrentProduct() {
    return {
        product,
    }
}
