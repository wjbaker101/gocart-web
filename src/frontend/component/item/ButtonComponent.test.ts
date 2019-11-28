import { shallowMount } from '@vue/test-utils';
import ButtonComponent from './ButtonComponent.vue';

describe('ButtonComponent', () => {
    test('is a Vue instance', () => {
        const button = shallowMount(ButtonComponent);

        expect(button.isVueInstance()).toBeTruthy();
    });

    test('can become secondary button', () => {
        const button = shallowMount(ButtonComponent, {
            propsData: {
                isSecondary: true,
            },
        });

        // Check whether the 'is-secondary' class is applied to the button when
        // 'isSecondary' is set to true
        expect(button.find('.is-secondary').exists()).toBeTruthy();
    });
});