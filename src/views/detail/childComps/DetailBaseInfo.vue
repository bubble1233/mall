<template>
    <div v-if="Object.keys(goods).length !== 0" class="base-info">
        <div class="Info-title"> {{goods.title}} </div>
        <div class="Info-price">
            <span class="n-price">{{goods.newPrice}}</span>
            <span class="o-price">{{goods.oldPrice}}</span>
            <span v-if="goods.discount" class="discount">{{goods.discount}}</span>
        </div>
        <div class="info-other">
            <span>{{goods.columns[0]}}</span>
            <span>{{goods.columns[1]}}</span>
            <span>{{goods.services[goods.services.length-1].name}}</span>
        </div>
        <div class="info-service">
            <span class="info-service-item" v-for="index in goods.services.length-1" :key="index">
                <img :src="goods.services[index-1].icon">
                <span>{{goods.services[index-1].name}}</span>
            </span>
        </div>
    </div>

</template>
<script>
    export default {
        name: "DetailBaseInfo",
        props: {
            goods: {
                type: Object,
                default() {
                    return {

                    }
                }
            }

        }
    
    }
</script>
<style scoped>
    .base-info {
        margin-top: 15px;
        padding: 0 8px;
        color: #999;
        border-bottom: 5px solid #f2f5f8;
    }

    .base-title {
        color: #222
    }

    .Info-price {
        margin-top: 10px;
    }

    .Info-price .n-price {
        font-size: 24px;
        color: var(--color-high-text);
    }

    .Info-price .o-price {
        font-size: 13px;
        color: #999999;
        margin-left: 5px;
        text-decoration: line-through;
    }
    .Info-price .discount {
        border-radius: 8px;
        margin-left: 5px;
        position: relative;
        top: -8px;
        font-size: 12px;
        padding: 2px 5px;
        background-color: var(--color-high-text) ;
        color: #fff;
    }
    .info-other {
        margin-top: 15px;
        font-size: 13px;
        line-height: 30px;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid rgba(100, 100, 100, .1);
    }
    .info-service {
    display: flex;
    justify-content: space-between;
    line-height: 60px;
  }
    .info-service img {
        width: 14px;
        height: 14px;
    }
    .info-service-item span {
    font-size: 13px;
    color: #333;
  }
</style>