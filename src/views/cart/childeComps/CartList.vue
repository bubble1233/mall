<template>
    <div class="cart-list">
        <scroll class="content" ref="scroll">
           <cart-list-item v-for="(item,index) in list" :key="index" :itemInfo="item" />
        </scroll>
    </div>
</template>
<script>
     import Scroll from 'components/common/scroll/Scroll'
    import CartListItem from './CartListItem'
    import { mapGetters } from 'vuex'

    export default {
        name: 'CartList',
        components: {
            Scroll,
           CartListItem
        },
        computed: {
            ...mapGetters({
                list: 'cartList'
            })
        },
        activated() {
            this.$refs.scroll.refresh()
        }
    }
</script>
<style scoped>
    .cart-list {
         height: calc(100% - 44px - 49px - 40px);
    }

    .content {
        overflow: hidden;
        position: absolute;
        top: 44px;
        bottom: 89px;
        right: 0;
        left: 0;
    }
</style>