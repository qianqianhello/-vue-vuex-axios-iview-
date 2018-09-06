
  

<style scoped>

.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
}
.layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
}
</style>
<template>
    
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-logo"></div>
                    <div class="layout-nav">
                        <MenuItem name="1">
                            <Icon type="ios-navigate"></Icon>
                            <router-link to="/">首页</router-link>
                        </MenuItem>
                        <MenuItem name="2">
                            <Icon type="ios-keypad"></Icon>
                            <span v-if="this.user.account">欢迎{{this.user.account}}</span>
                            <span v-else><router-link to="/login">去登陆</router-link></span>
                        </MenuItem>
                        <MenuItem name="3">
                            <Icon type="ios-analytics"></Icon>
                            <span><router-link to="/register">去注册</router-link></span>
                        </MenuItem>
                        <MenuItem name="4">
                            <Icon type="ios-paper"></Icon>
                            <!-- <button @click="cancle">注销</button> -->
                            <span @click="cancle">注销</span>
                        </MenuItem>
                    </div>
                </Menu>
            </Header>
        </Layout>
</template>
<script>
// import indexLeft from'@/header/indexLeft'
import { mapGetters,mapMutations  } from 'vuex'
    export default {
        name: 'indexHeader',
        computed:{
            ...mapGetters([
                'user'
            ])
        //    getAccount(){
        //        return this.$store.getters.getUser.account
        //    }
        },
        methods:{
            ...mapMutations([
                'updateUser'
            ]),
            cancle(){
                // this.updateUser(this.datas)
                this.updateUser({})
                this.$route.push('./login')
                // this.$store.commit('updateUser','')
            }
        }
        
    }
</script>