import { mount } from '@vue/test-utils';
import ButtonComponent from './ButtonComponent.vue';

describe('Component', () => {
    test('is a Vue instance', () => {
        const wrapper = mount(ButtonComponent);
        expect(wrapper.isVueInstance()).toBeTruthy();
    });
});