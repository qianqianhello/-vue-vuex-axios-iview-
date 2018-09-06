<template>
    <div class="layout">
        <index-header/>
       <Layout class="content">
            <Sider :width="200" style="background:#f2f2f2;flex:1;">
                <index-left />
            </Sider>
            <Layout :style="{padding: '0 24px 24px'}">
                <router-view />
            </Layout>
        </Layout>
    </div>
</template>

<script>

import indexHeader from '@/header/header.vue'
import indexLeft from '@/header/indexLeft.vue'
    export default {
        components:{
            indexHeader,
            indexLeft
        }
    }
</script>

<style scoped>

.layout{
        background: #f2f2f2;
        height: 100%;
        width: 100%;
    }
</style>