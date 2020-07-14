const stack_1 = require('./assets/json/1593437264028.json');
const stack_2 = require('./assets/json/1593437284744.json');

export default {
    getJson(graphID) {
        if (graphID === 1){
            return this.prepare(graphID, stack_1);
        }

        if (graphID === 2){
            return this.prepare(graphID, stack_2);
        }

        return {};
    },
    prepare(graphID, stack){
        let positions = this.getStoredPosition(graphID) ?? [];
        let nodes = stack.nodes.map((node) => {
            let position = positions[node.id];
            return {
                id: node.id,
                label: node.name,
                x: position ? position.x : undefined,
                y: position ? position.y : undefined,
            }
        });
        let relations = stack.relationships.map((relation) => {
            return {
                from: relation.from,
                to: relation.to
            };
        });

        return { nodes, relations };
    },
    storePositions(graphID, data) {
        window.localStorage.setItem(graphID, JSON.stringify(data))
    },
    getStoredPosition(graphID){
        return JSON.parse(window.localStorage.getItem(graphID))
    }
};