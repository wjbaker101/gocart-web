<template>
    <div class="dashboard-component" :class="{ 'is-menu-open': isMenuOpen }">
        <div class="menu-container">
            <ul>
                <router-link to="/scan">
                    <li @click="closeMenu">
                        <BarcodeIcon />
                        <span>Barcode Scanner</span>
                    </li>
                </router-link>
            </ul>
        </div>
        <div class="links-container">
            <router-link to="/">
                <div class="dashboard-item">
                    <ListIcon /><br>
                    <small>List</small>
                </div>
            </router-link>
            <router-link to="/search">
                <div class="dashboard-item">
                    <SearchIcon /><br>
                    <small>Search</small>
                </div>
            </router-link>
            <router-link to="/shop">
                <div class="dashboard-item">
                    <ShopIcon /><br>
                    <small>Shops</small>
                </div>
            </router-link>
            <div class="dashboard-item" @click="isMenuOpen = !isMenuOpen">
                <BarsIcon /><br>
                <small>Menu</small>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';

    import BarsIcon from '@frontend/assets/icon/bars.svg';
    import BarcodeIcon from '@frontend/assets/icon/barcode.svg';
    import ListIcon from '@frontend/assets/icon/list.svg';
    import SearchIcon from '@frontend/assets/icon/search.svg';
    import ShopIcon from '@frontend/assets/icon/shop.svg';

    export default Vue.extend({
        name: 'DashboardComponent',

        components: {
            BarcodeIcon,
            BarsIcon,
            ListIcon,
            SearchIcon,
            ShopIcon,
        },

        data() {
            return {
                isMenuOpen: false,
            }
        },

        methods: {
            closeMenu() {
                this.isMenuOpen = false;
            },
        },
    })
</script>

<style lang="scss">
    .dashboard-component {
        width: 100%;
        position: fixed;
        bottom: 0;
        left: 0;
        background-color: theme(white);
        background: linear-gradient(-15deg, theme(grey-light), theme(white));
        z-index: 1;
        user-select: none;

        box-shadow:
            1px -2px 4px rgba(0, 0, 0, 0.25),
            -2px -2px 12px rgba(0, 0, 0, 0.1) inset;

        &.is-menu-open {
            border-top-right-radius: 0;
            border-top-left-radius: 0;

            .menu-container {
                pointer-events: all;
                clip-path: polygon(-10% -10%, 110% -10%, 110% 110%, -10% 110%);
            }
        }

        .menu-container {
            width: 100%;
            position: absolute;
            top: 0;
            left: 0;
            transform: translateY(-100%);
            overflow: hidden;
            pointer-events: none;
            clip-path: polygon(0 100%, 100% 100%, 100% 100%, 0% 100%);
            background-color: theme(white);
            border-bottom: 2px solid theme(grey);
            transition: clip-path animation(duration-short);

            box-shadow:
                1px -2px 4px rgba(0, 0, 0, 0.25),
                -2px -2px 12px rgba(0, 0, 0, 0.1) inset;

            ul {
                list-style: none;
                padding: 0;
                margin: 0;

                li {
                    padding: 1rem;
                    cursor: pointer;

                    &:hover {
                        background-color: theme(primary-light);
                        color: theme(white);
                    }
                }

                svg {
                    margin-right: 1rem;
                }
            }
        }

        .links-container {
            display: flex;

            & > * {
                flex: 1;
            }
        }

        .dashboard-item {
            position: relative;
            padding: 0.5rem;
            text-align: center;
            cursor: pointer;
            transition: color animation(duration-mid), text-shadow animation(duration-mid);

            &:hover {
                color: theme(white);
                font-weight: bold;

                &::before {
                    opacity: 1;
                }
            }

            /*
                Use pseudo-elements to add a background to the button, due to
                the "background" not being transitionable. Add the hover
                background style to a pseudo-element and change it's opacity
                when the button is hovered.
            */
            &::before {
                content: '';
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                background: linear-gradient(-15deg, theme(primary), theme(primary-light));
                box-shadow: -2px -2px 12px rgba(0, 0, 0, 0.2) inset;
                z-index: -1;
                opacity: 0;
                transition: opacity animation(duration-mid);

            }
        }
    }
</style>
