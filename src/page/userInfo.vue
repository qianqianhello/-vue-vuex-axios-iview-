<style scoped>
.page{
    display: flex;
    justify-content: center;
    margin: 20px;
}
</style>

<template>
    <div>
        <Breadcrumb :style="{margin: '24px 0'}">
            <BreadcrumbItem to="/">Home</BreadcrumbItem>
            <BreadcrumbItem to="/components/breadcrumb">Components</BreadcrumbItem>
            <BreadcrumbItem>Breadcrumb</BreadcrumbItem>
        </Breadcrumb>
        <Content :style="{padding: '24px', minHeight: '280px', background: '#fff',}">
            <div class="page">
            <Input size="large" v-model="search" placeholder="Enter something..." style="width: 300px" />
            <Button type="primary" style="margin-left:20px">Primary</Button>
             </div>
            <Table border class="userInfo" :columns="columnUser" :data="sUser"></Table>
            <div class="page">
             <Page :total="dataUserLength" :page-size="5" :current.sync="current"/>
             </div>
        </Content>
    </div>
</template>
<script>

    export default {
        created(){
            this.$http
            .get('api/users?action=list')
            .then(res=>{
                console.log(res)
                this.dataUser = res.data.item
                console.log(this.dataUser[1]._id,'dataUser')
                this.dataUserLength = parseInt(res.data.count)
                console.log(this.dataUserLength,'dataUserLength')

            })
            .catch(err=>{
                console.log(err)
            })
        },
        computed:{
            sUser(){
                return this.dataUser.filter(k=>{
                    return k.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1
                })
            }
        },
        watch:{
            current(n){
                console.log(n)
                this.$http
            .get('api/users?action=list',
            {params: {index:n-1,size:5}}
            )
                .then(res=>{
                // console.log(res)
                this.dataUser = res.data.item
            })
            .catch(err=>{
                console.log(err)
            })
            }
        },
        data () {
            return {
                columnUser: [
                    {
                        type: 'index',
                        width: 60,
                        align: 'center',
                    },
                    {
                        title: 'No',
                        key: 'no',
                        width:0,
                        align: 'center',
                    },
                    {
                        title: 'Name',
                        key: 'name',
                        render: (h, params) => {
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type: 'person'
                                    }
                                }),
                                h('strong', params.row.name)
                            ]);
                        }
                    },
                    {
                        title: 'Age',
                        key: 'age'
                    },
                    {
                        title: 'Address',
                        key: 'address'
                    },
                    {
                        title: 'Action',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index,params.row.no)
                                            console.log(params.row.no,'params.no')
                                        }
                                    }
                                },'Delete')
                            ]);
                        }
                    }
                ],
                dataUser: [],
                dataUserLength:Number(),
                current:1,
                search:''
            }
        },
        methods: {
            remove (index,no) {
                if(confirm('确定要删除吗？')){
                    this.dataUser.splice(index, 1);
                    console.log(no)
                    this.$http
                   .get('api/users?action=delete',
            {params: {no:no}}
            )
                .then(res=>{
                console.log(res)
            })
            .catch(err=>{
                console.log(err)
            })
            }
            }
        }
    }
</script>