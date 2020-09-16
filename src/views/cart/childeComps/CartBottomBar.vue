<template>
    <div class="bottom-bar">
        <div class="check-content">
            <check-button :is-checked="isselectall" class="check-button" 
            @click.native="checkClick"/>
            <span>全选</span>
        </div>
        <div class="total">
            合计:{{totalprice}}
        </div>
        <div class="calculate">
            计算({{checklength}})
        </div>
    </div>
</template>
<script>
    import checkButton from 'components/content/checkButton/CheckButton'
    export default {
        name: 'CartBottomBar',
        components: {
            checkButton
        },
        computed: {
            totalprice() {
                return '￥' + this.$store.state.cartList.filter(item => {
                    return item.checked
                }).reduce((preValue, item) => {
                    return preValue + item.price * item.count
                }, 0).toFixed(2)
            },
            checklength() {
                return this.$store.state.cartList.filter(item => {
                    return item.checked
                }).length
            },
            isselectall() {
                if(this.$store.state.cartList.length === 0) return false
               return !this.$store.state.cartList.find(item=>!item.checked)
            }
        },
        methods: {
            checkClick() {
               if(this.isselectall){
                   this.$store.state.cartList.forEach(item=>item.checked =false)
            } else{
                this.$store.state.cartList.forEach(item=>item.checked = true)
            }
        }
    
    }
}
</script>
<style scoped>
    .bottom-bar {
        display: flex;
        height: 40px;
        line-height: 40px;
        background-color: #eee;
        position: fixed;
        bottom: 49px;
        left: 0;
        right: 0;
    }

    .check-content {
        display: flex;
        align-items: center;
        width: 100px;

    }

    .check-button {
        height: 22px;
        width: 22px;
        line-height: 22px;
        margin-left: 10px;
        margin-right: 5px;
    }

    .total {
        flex: 1
    }

    .calculate {
        width: 90px;
        background-color: red;
        color: #fff;
        text-align: center;
    }
</style>