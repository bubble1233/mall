<template>
    <div id="detail">
        <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="navbar" />
        <scroll class="content" :probe-type=3 ref="scroll" @scroll=contentScroll>
            <detail-swiper :top-images="topImages" />
            <detail-base-info :goods="goods" />
            <detail-shop-info :shop="shop" />
            <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad" />
            <detail-param-info :param-info="paramInfo" ref="param" />
            <detail-comment-info v-if='commentInfo.user' :comment-info="commentInfo" ref="comment" />
            <goods-list :goods="recommends" ref="goods" />
        </scroll>
        <detail-bottom-bar @addCart="addToCart" />
        <back-top @click.native="backClick" v-show="isshow" />
    </div>
</template>
<script>
    import DetailNavBar from './childComps/DetailNavBar'
    import DetailSwiper from './childComps/DetailSwiper'
    import DetailBaseInfo from './childComps/DetailBaseInfo'
    import DetailShopInfo from './childComps/DetailShopInfo'
    import DetailGoodsInfo from './childComps/DetailGoodsInfo'
    import DetailParamInfo from './childComps/DetailParamInfo'
    import DetailCommentInfo from './childComps/DetailCommentInfo'
    import DetailBottomBar from './childComps/DetailBottomBar'

    import Scroll from 'components/common/scroll/Scroll'
    import GoodsList from 'components/content/goods/GoodsList'

    import { getDetail, Goods, Shop, GoodsParam, getRecommend } from "network/detail"
    import { itemListenerMixin, backTopMixin } from "common/mixin"

    import { mapActions } from 'vuex'
    export default {
        name: "Detail",
        components: {
            DetailNavBar,
            DetailSwiper,
            DetailBaseInfo,
            Scroll,
            DetailShopInfo,
            DetailGoodsInfo,
            DetailParamInfo,
            DetailCommentInfo,
            DetailBottomBar,
            GoodsList
        },
        mixins: [itemListenerMixin, backTopMixin],
        data() {
            return {
                iid: null,
                topImages: [],
                goods: {},
                shop: {},
                detailInfo: {},
                paramInfo: {},
                commentInfo: {},
                recommends: [],
                themeTopYs: [],
                Index: 0,
            }
        },
        created() {
            this.iid = this.$route.params.iid,
                getDetail(this.iid).then(res => {
                    console.log(res)
                    const data = res.result;
                    // 1.获取顶部的图片轮播数据
                    this.topImages = data.itemInfo.topImages
                    // 2.获取商品信息
                    this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
                    //3获取商家信息
                    this.shop = new Shop(data.shopInfo)
                    // 4.保存商品的详情数据
                    this.detailInfo = data.detailInfo;
                    // 5.获取参数的信息
                    this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
                    //6. 获取评论信息
                    if (data.rate.cRate !== 0) {
                        this.commentInfo = data.rate.list[0]
                    }
                })
            //请求推荐参数
            getRecommend().then(res => {
                this.recommends = res.data.list
            })
        },
        destroyed() {
            this.$bus.$off('itemImgLoad', this.itemImgListener)
        },
        methods: {
            ...mapActions(["addCart"]),

            imgLoad() {
                this.$refs.scroll.refresh()
                this.$nextTick(() => {
                    this.themeTopYs = [0]
                    this.themeTopYs.push(this.$refs.param.$el.offsetTop)
                    this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
                    this.themeTopYs.push(this.$refs.goods.$el.offsetTop)
                    this.themeTopYs.push(Number.MAX_VALUE)
                    console.log(this.themeTopYs)
                })

            },
            titleClick(index) {
                this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
            },
            contentScroll(position) {
                this.isshow = (-position.y) > 1000
                const positionY = -position.y
                let length = this.themeTopYs.length
                for (let i = 0; i < length - 1; i++) {
                    if (this.Index !== i && (positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])) {
                        this.Index = i;
                        this.$refs.navbar.currentIndex = this.Index
                    }
                }
            },
            addToCart() {
                const product = {}

                product.image = this.topImages[0];
                product.iid = this.iid;
                product.desc = this.goods.desc;
                product.title = this.goods.title;
                product.price = this.goods.realPrice;
                this.addCart(product).then(res => {


                     alert(res)
                 console.log(this.$toast) //.show(res,2000)
                })

                // this.$store.dispatch('addCart', product).then(res=>{
                //     console.log(res);
                //})
            },
            
        }
    }
</script>
<style scoped>
    #detail {
        position: relative;
        z-index: 9;
        background-color: #fff;
        height: 100vh;

    }

    .content {
        overflow: hidden;
        position: absolute;
        top: 44px;
        bottom: 58px;
        right: 0;
        left: 0;

    }
</style>