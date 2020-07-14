<template>
    <div>
        <network
                ref="network"
                :nodes="nodes"
                :edges="edges"
                :options="options()"
                @release="release"
                @hoverNode="onNodeHovered"
        >
        </network>
        <button v-on:click="setActive(1)">Graph 1</button>
        <button v-on:click="setActive(2)">Graph 2</button>
    </div>
</template>

<script>
    import {Network} from 'vue-vis-network';

    export default {
        name: 'Graph',
        props: {
            input: Object
        },
        data() {
            return {
                activeGraph: 1
            }
        },
        computed: {
            network: function () {
                return this.input.getJson(this.activeGraph);
            },
            nodes: function () {
                return this.network.nodes;
            },
            edges: function () {
                return this.network.relations;
            },
        },
        mounted() {
            if (this.startedDrawing()){
                this.input.storePositions(this.activeGraph, this.$refs.network.getPositions());
                this.$refs.network.setOptions(this.options());
                setTimeout(() => {
                    this.redraw();
                }, 0);
            }
        },
        methods: {
            options: function () {
                return {
                    height: '500px',
                    width: '100%',
                    nodes: {
                        shape: 'box',
                        margin: {
                            top: 15,
                            bottom: 15
                        }
                        // chosen: false,
                    },
                    edges: {
                        selfReferenceSize:20,
                        chosen: false,
                        smooth: {
                            enabled: false
                        }
                    },
                    physics: {
                        enabled: false,
                    },
                    // manipulation: {
                    //     enabled: false
                    // },
                    layout: {
                        improvedLayout: true,
                        //randomSeed: 6,
                        hierarchical: {
                            enabled: this.startedDrawing(),
                            direction: 'UD',
                            sortMethod: 'hubsize'
                        }
                    },
                };
            },
            startedDrawing: function () {
                return !this.input.getStoredPosition(this.activeGraph)
            },
            setActive(number){
                this.activeGraph = number;
                setTimeout(() => {
                    this.redraw();
                    if (this.startedDrawing()){
                        this.input.storePositions(this.activeGraph, this.$refs.network.getPositions());
                        this.$refs.network.setOptions(this.options());
                        setTimeout(() => {
                            this.redraw();
                        }, 0);
                    }
                }, 0);
            },
            release() {
                this.input.storePositions(this.activeGraph, this.$refs.network.getPositions());
            },
            onNodeHovered(data) {
                console.log(data)
            },
            redraw(){
                this.$refs.network.redraw();
            },
        },
        components: {
            'network': Network
        },
    }
</script>

<style scoped>
</style>
