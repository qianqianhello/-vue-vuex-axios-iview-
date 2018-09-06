
<template>
<div class="card">
    <Form class="login" ref="formInline" >
            <FormItem >
                <div class="title">
                    <h2>登录</h2>
                </div>
           </FormItem>
            <FormItem :error="error.account">
                <Input type="text" @input="error.account = ''" v-model="datas.account">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                </Input>
           </FormItem>
           <FormItem :error="error.password">
                <Input type="password" @input="error.password = ''"  v-model="datas.password">
                    <Icon type="ios-lock-outline" slot="prepend" />
                </Input>
           </FormItem>
           <FormItem :error="error.verifiy">
                <div class="verify">
                    <Input type="text" @input="error.verifiy = ''" v-model="datas.verifiy">
                        <Icon type="ios-barcode-outline" slot="prepend" />
                    </Input>
                    
                        <img style="height:30px;" @load="verifyLoadState=true" @click="toggleVerify(e)" :src="verifiy">
                </div>
           </FormItem>
           <FormItem>
               <Button type="primary" long @click="goLog">登录</Button>
           </FormItem>
    </Form>
</div>
</template>
<script>
// import axios from 'axios';
 import { mapMutations  } from 'vuex'
    export default {
        data(){
            return {
                datas:{

                },
                error:{
                    account:'',
                    password:'',
                    verifiy:''
                },
                verifiy:'/api/svg',
                // verify:'/net/verifiycode.gif',
                verifyLoadState:false // 没加载完

            }
        },
         methods:{
             ...mapMutations([
                'updateUser'
            ]),
            toggleVerify(e){
                if(!this.verifyLoadState) return;
                // 防止下一次重复点击
                this.verifyLoadState =  false
                const base = '/api/svg'
                this.verifiy = base + '?' + e.timeStamp
            },
            goLog(){
                
                console.log(this.datas)
                // 基础判断email
                if(!this.datas.account) 
                {this.$set(this.error,'account','邮箱不能为空')}

                // 基础判断password
                if(!this.datas.password) 
                {this.$set(this.error,'password','密码不能为空')}

                // 基础判断verifiy
                if(!this.datas.verifiy) 
                {this.$set(this.error,'verifiy','验证码不能为空')}

                console.log(this.error,'err')
                let length = Object.keys(this.error).filter(k=>{
                    console.log(this.error[k])
                    return this.error[k].length > 0
                })
                if(length.length > 0) return;
                    this.$http
                    .post('/api/users?action=login',this.datas)
                    // {params:{
                    //     account:this.data.account,
                    //     password:this.data.password,
                    //     verifiy:this.data.verifiy
                    // }})
                    // ./net?action=login',this.data)
                    .then(res=>{
                        console.log(res.data.code,'res.data.code')
                        if(res.data.code==='200'){
                        //  window.location.href="/register"
                        this.datas.password = ''
                        this.updateUser(this.datas)
                        // this.$store.commit('updateUser',this.datas)
                        // this.updateUser(this.datas)
                        this.$router.push('/')
                        }else{
                            console.log(res)
                            this.error = res.data.error
                             const base = '/api/svg'
                             this.verifiy = base + '?' + Math.random()
                        }
                    })
                    .catch(err=>{
                        console.log(err)
                    })
            }
        },
    }
</script>

<style scoped>
span{
    font-size: 12px;
    color: red
}
.card{
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .card .login{
        width: 320px;
        padding: 10px 20px;
        background: #fff;
        border: 1px solid #ddd;
        border-radius: 3px;
    }

    .card .login h2{
        text-align: center;
    }

    .card .login .title{
        text-align: center;
    }

    .card .login .logo img{
        width: 50px;
    }

    .card .login .verify{
        display: flex;
    }

</style>