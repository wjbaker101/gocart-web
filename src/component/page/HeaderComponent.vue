<template>
    <header>
        <h1>GoCart</h1>
    </header>
</template>

<script>
    export default {
        name: 'HeaderComponent',
    }
</script>

<style lang="scss">
    #app > header {
        padding: 2rem 1rem;
        background-color: theme(primary);
        color: theme(white);
        box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.25);

        h1 {
            font-size: 1.25rem;
            margin: 0;
            line-height: 1em;
        }
    }
</style>
