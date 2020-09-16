<template>
    <div class="para-info"  v-if="Object.keys(paramInfo).length !== 0">
        <table  v-for="(item, index) in paramInfo.sizes"  class="info-size" :key="index">
            <tr v-for="(tr, indey) in item" :key="indey">
                <td v-for="(td, indez) in tr" :key="indez">{{td}}</td>
            </tr>
        </table>
        <table class="infos">
            <tr v-for="(item,index) in paramInfo.infos" :key="index">
                <td class="infos-tdfirst">{{item.key}}</td>
                <td class="infos-td">{{item.value}}</td>
            </tr>
        </table>
        <div class="info-img" v-if="paramInfo.image.length !== 0">
            <img :src="paramInfo.image" alt="">
          </div>
    </div>
</template>
<script>
export default {
    name:'DetailParamInfo',
    props: {
        paramInfo: {
            type:Object,
            default(){
                return{}
            }
        }
    }
}
</script>
<style scoped>
.para-info {
    padding: 20px 15px;
    font-size: 14px;
    border-bottom: 5px solid #f2f5f8;
}
.para-info table{
    width: 100%;
    border-collapse: collapse;

}
.para-info table tr {
    height: 42px;
}
.para-info table tr td {
    border-bottom: 1px solid rgba(100,100,100,.1);
  }
  .infos .infos-td {
      color:#eb4868
  }
  .infos .infos-tdfirst {
    width: 95px;
  }
  .infos {
    border-top: 1px solid rgba(0,0,0,.1);
  }
  .info-img img {
    width: 100%;
  }
</style>