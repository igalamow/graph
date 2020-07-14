<template>
    <div id="app">
        <img alt="Vue logo" src="./assets/logo.png">
        <Graph :input="dataObject"/>
    </div>
</template>

<script>
    import data from './data';
    import Graph from './components/Graph.vue'

    export default {
        name: 'App',
        data: function () {
            return {
                dataObject: data
            };
        },
        components: {
            Graph
        }
    }
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }

    #app > div {
        min-height: 800px;
        height: 100%;
    }
</style>
