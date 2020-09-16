import {debounce} from "./utils";
import BackTop from 'components/content/backTop/BackTop'
export const itemListenerMixin = {
    date() {
        return {
            itemImgListener:null
        }
    },
    mounted () {
        let newRefresh = debounce(this.$refs.scroll.refresh, 200)
        this.itemListener = () =>{
            newRefresh()
        }
         this.$bus.$on('itemImgLoad',this.itemListener)
         console.log('我是混入中的内容 ')
    }
    
}
export const backTopMixin = {
    components: {
        BackTop
    },
    data () {
        return {
            isshow: false,
           
        }
    },
    methods: {
        backClick() {
            this.$refs.scroll.scrollTo(0, 0,)
        }
    }
}