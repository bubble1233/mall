import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = () => import('../views/home/Home')
const Category = () => import('../views/category/Category')
const File = () => import('../views/file/File')
const Cart = () => import('../views/cart/Cart')
const Detail = () => import('../views/detail/Detail')
//安装插件ue
Vue.use(VueRouter)
//创建路由对象
const routes = [
    {
        path: '',
        redirect: '/home'
    },
    {
        path: '/home',
        component: Home
    },
    {
        path: '/category',
        component: Category
    },
    {
        path: '/file',
        component: File
    },
    {
        path: '/cart',
        component: Cart
    },
    {
        path: '/detail/:iid',
        component: Detail
    },
]
const router = new VueRouter({
    routes,
    mode: 'history'
})
export default router 