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

<script>
    import BarsIcon from '@/assets/icon/bars.svg';
    import BarcodeIcon from '@/assets/icon/barcode.svg';
    import ListIcon from '@/assets/icon/list.svg';
    import SearchIcon from '@/assets/icon/search.svg';
    import ShopIcon from '@/assets/icon/shop.svg';

    export default {
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
    }
</script>

<style lang="scss">
    .dashboard-component {
        width: 100%;
        position: fixed;
        bottom: 0;
        left: 0;
        border-top-right-radius: layout(border-radius);
        border-top-left-radius: layout(border-radius);
        background-color: theme(white);
        box-shadow: 1px -2px 4px rgba(0, 0, 0, 0.25);
        z-index: 1;
        user-select: none;

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
            border-top-right-radius: layout(border-radius);
            border-top-left-radius: layout(border-radius);
            background-color: theme(white);
            border-bottom: 2px solid theme(grey);
            box-shadow: 1px -2px 4px rgba(0, 0, 0, 0.25);
            transition: clip-path animation(duration-short);

            ul {
                list-style: none;
                padding: 0;
                margin: 0;

                li {
                    padding: 1rem;
                    cursor: pointer;

                    &:hover {
                        background-color: theme(secondary);
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
                background: linear-gradient(-5deg, theme(secondary-light), theme(primary-light));
                z-index: -1;
                opacity: 0;
                transition: opacity animation(duration-mid);
            }
        }
    }
</style>
