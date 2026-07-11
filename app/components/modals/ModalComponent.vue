<template>
    <div
        @click.self="hide"
        :class="{
            'opacity-100 pointer-events-auto': isVisible,
            'opacity-0 pointer-events-none': !isVisible,
        }"
        class="z-20 fixed inset-0 place-items-center grid grid-cols-1 bg-slate-800/50 p-2 overflow-auto"
    >
        <component v-if="component" :is="component" v-bind="props"></component>
    </div>
</template>

<script setup lang="ts">
const modal = useModal();

const isVisible = ref(false);
const component = shallowRef();
const props = ref();

modal.onShow((event) => {
    component.value = event.component;
    props.value = event.props;

    isVisible.value = true;
    document.body.classList.add('hide-scroll');
});

modal.onHide(() => {
    isVisible.value = false;
    document.body.classList.remove('hide-scroll');
});

function hide() {
    modal.hide();
}
</script>