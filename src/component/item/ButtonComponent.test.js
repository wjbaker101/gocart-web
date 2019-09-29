import { shallowMount } from '@vue/test-utils';
import ButtonComponent from './ButtonComponent.vue';

describe('Component', () => {
    test('is a Vue instance', () => {
        const button = shallowMount(ButtonComponent, {
            propsData: {
                isSecondary: true,
            },
        });

        expect(button.isVueInstance()).toBeTruthy();
        expect(button.find('.is-secondary').exists()).toBeTruthy();
    });
});