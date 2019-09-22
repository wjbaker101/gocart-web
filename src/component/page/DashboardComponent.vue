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
            padding: 1rem;
            text-align: center;
            cursor: pointer;
            transition: all animation(duration-mid);

            &:hover {
                background-color: theme(primary-light);
                color: theme(white);
            }
        }
    }
</style>
