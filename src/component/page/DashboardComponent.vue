<template>
    <div class="dashboard-component">
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
    </div>
</template>

<script>
    import ListIcon from '@/assets/icon/list.svg';
    import SearchIcon from '@/assets/icon/search.svg';
    import ShopIcon from '@/assets/icon/shop.svg';

    export default {
        name: 'DashboardComponent',

        components: {
            ListIcon,
            SearchIcon,
            ShopIcon,
        },
    }
</script>

<style lang="scss">
    .dashboard-component {
        width: 100%;
        display: flex;
        position: fixed;
        bottom: 0;
        left: 0;
        background-color: theme(white);
        box-shadow: 1px -2px 4px rgba(0, 0, 0, 0.25);
        z-index: 1;

        & > * {
            flex: 1;
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
