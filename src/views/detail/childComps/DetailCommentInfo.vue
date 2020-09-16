<template>
    <div class=comment-info>
        <div class="info-top">
            <div class="top-comment">用户评论</div>
            <div class="top-more">更多</div>
        </div>
        <div class="info-user">
            <img :src="commentInfo.user.avatar" alt="">
            <span class="user-id">{{commentInfo.user.uname}}</span>
        </div>

        <div class="info-detail">
            <p>{{commentInfo.content}}</p>
            <div class="detail-other">
                <span class="date">{{commentInfo.created | showDate}}</span>
                <span>{{commentInfo.style}}</span>
            </div>
            <div class="detail-img" v-if="commentInfo.images">
                <img v-for="(item,index) in commentInfo.images" :key="index" :src="item">
            </div>
        </div>
    </div>
</template>
<script>
    import {formatDate} from "common/utils"
    export default {
        name: "DetailCommentInfo",
        props: {
            commentInfo: {
                type: Object,
                dafault() {
                    return {}
                }
            }
        },
        filters: {
          ShowDate(value) { 
              //1.将时间戳转换为Date对象
              const date = new Date(value*1000)
              //2.将date进行格式化
              return formatDate(date,'yyyy-MM-dd')
          }
        },
        created() {
            console.log(this.commentInfo.user.uname)
        }
    }
</script>
<style scoped>
    .comment-info {
        padding: 0 15px;
    }

    .info-top {
        height: 50px;
        line-height: 50px;
        color: #333333;
        font-size: 16px;
        border-bottom: 2px solid rgba(100, 100, 100, .1);
    }

    .top-comment {
        float: left;
    }

    .top-more {
        float: right;
    }

    .info-user {
        margin: 10px 0;
        display: flex;
        align-items: center
    }

    .info-user img {
        border-radius: 50%;
        width: 45px;
        height: 45px;
    }

    .info-user .user-id {
        display: block;
        margin-left: 15px;
        color: #333333;
        font-size: 18px;
    }

    .info-detail {
        padding: 0 5px;
        
    }
    .info-detail p {
        color: #666666;
        font-size: 14px;
    }
    .info-detail .detail-other {
        padding: 10px 0;
        font-size: 14px;
        color: #999999;
    }
    .detail-other .date {
        margin-right: 10px;
    }
    .detail-img img {
        width: 70px;
        height: 70px;
        overflow: hidden;
    }
</style>