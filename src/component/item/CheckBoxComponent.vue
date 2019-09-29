<template>
    <div class="checkbox-component">
        <input ref="checkboxInput" :id="id" type="checkbox" :checked="value" @change="update">
        <label :for="id" class="checkbox-label">{{ label }}</label>
        <span class="check"></span>
    </div>
</template>

<script>
    export default {
        name: 'CheckBoxComponent',

        props: ['id', 'label', 'value'],

        methods: {
            update(event) {
                this.$emit('input', event.target.checked);
            },
        },
    }
</script>

<style lang="scss">
    .checkbox-component {
        display: table;
        position: relative;
        line-height: 1em;

        .checkbox-label {
            &::before {
                content: '';
                display: inline-block;
                width: 1.25rem;
                height: 1.25rem;
                border: 2px solid theme(primary);
                border-radius: layout(border-radius);
                background-color: theme(white);
                cursor: pointer;
            }

            &::after {
                content: '';
                display: block;
                position: absolute;
<<<<<<< HEAD
                top: 5px;
                left: 7px;
                pointer-events: none;
                opacity: 0;
                width: 6px;
                height: 11px;
=======
                top: 7px;
                left: 5px;
                pointer-events: none;
                opacity: 0;
                width: 5px;
                height: 8px;
>>>>>>> f4fea87bde5b437d7ca7cfa60744ac0ac99063f6
                border-bottom: 2px solid theme(white);
                border-right: 2px solid theme(white);
                box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.6);
                transform: rotate(45deg);
            }
        }

        input {
            display: none;
        }

        input:checked  {
            & + .checkbox-label {
                &::before {
                    background-color: theme(primary);
                }

                &::after {
                    opacity: 1;
                }
            }

            & + .check {
                opacity: 1;
            }
        }
    }
</style>
