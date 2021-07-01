var fill = d3.scale.category20()
var data;

var minNodeSize = 5,
    maxNodeSize = 30,
    stateNodeTextSize = 20,
    padding = 1.5,
    svgX = 0,
    svgY = 200;

var displayingFreq = false;

let stateWidth = window.innerWidth / 2;
let stateHeight = window.innerHeight;
let sequenceWidth = (window.innerWidth / 2) - 1;
let sequenceHeight = window.innerHeight;
let groupHeight = 250;
let groupWidth = 250;
// window.onresize = function (e) {
//     stateWidth = window.innerWidth
// }
var div, svg;
var groupSvg;

var userIDLengthLimit = 10;
file_suffix = '';

// The below loads data from server
d3.json('data/visualization_ids.json', function (error, sessionList) {
    if (error) {
        alert("The file containing the list of match IDs does not exist.");
        return console.warn(error);
    }
    dd = sessionList;

    var selectUI = d3.select("#level-select")
    var options = selectUI.selectAll('option').data(dd); // Data join

    options.enter()
        .append("option")
        .text(function (d) {
            return d;
        });
    selectUI.property("value", dd[0]);

    // graph stores the loaded data
    sID = d3.select("#level-select").node().value;
    // console.log(sID);
    d3.json('data/' + sID + file_suffix + '.json', updateJSON);

});

var prevStroke, prevFill, prevFillOpa, prevStrokeOpa, prevTextFill;

/******************** State graph **********************************/

var stateforce = d3.layout.force()
    .charge(-1500)
    .linkDistance(1000)
    .size([stateWidth, stateHeight])
    .on("tick", statetick);

svg = d3.select("#state-graph-svg")
    .attr("width", stateWidth)
    .attr("height", stateHeight)
    .attr("pointer-events", "all")
    .call(d3.behavior.zoom().on("zoom", stateZoomPan))
    .on("dblclick.zoom", null)
    .append("svg:g")
    .attr("transform", "translate(200,200)scale(.5,.5)");


// the graph components (nodes and links)
var stateSvgContainer = svg.append("g").attr("id", "stategraph_container");
let statelink = stateSvgContainer.append("g").attr("id", "statelink_container").selectAll(".statelink");
let statenode = stateSvgContainer.append("g").attr("id", "statenode_container").selectAll(".statenode");

// Define markers
// Per-type markers, as they don't inherit styles.
svg.append("defs").selectAll("marker")
    .data(["start", "mid", "end"])
    .enter().append("marker")
    .attr("id", function (d) {
        return d;
    })
    // the region viewable in this marker
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 15)
    .attr("refY", 0)
    .attr("markerWidth", 30) //1.5)
    .attr("markerHeight", 30) //1.5)
    .attr("markerUnits", "userSpaceOnUse")
    .attr("orient", "auto")
    .append("path")
    .attr("d", "M0,-5L10,0L0,5");

// for sticky drag
var statedrag = stateforce.drag().on("dragstart", dragstart);

/********************* Behavior graph ******************************/

const minDistance = 50;
const maxDistance = 500;

var behaviorforce = d3.layout.force()
    .charge(-100)
    .linkDistance(distanceMapping)
    .size([sequenceWidth, sequenceHeight])
    .on("tick", behaviortick);

svg = d3.select("#sequence-graph-svg")
    .attr("width", sequenceWidth)
    .attr("height", sequenceHeight)
    .attr("pointer-events", "all")
    .call(d3.behavior.zoom().on("zoom", behaviorZoomPan))
    .on("dblclick.zoom", null)


// the graph components (nodes and links)
var behaviorSvgContainer = svg.append("g").attr("id", "graph_container");
var behaviorlink = behaviorSvgContainer.append("g").attr("id", "link_container").selectAll(".behaviorlink");
var behaviornode = behaviorSvgContainer.append("g").attr("id", "node_container").selectAll(".behaviornode");


// for sticky drag
var behaviordrag = behaviorforce.drag()
    .on("dragstart", behaviorDragstart);

//--------------- Functions ------------
var stateMap = {};
var actionMap = {};

function updateJSON(error, json) {

    if (error) {
        alert("Level does not exist!");
        return console.warn(error);
    }
    data = json;

    // update info on num statenodes and players
    d3.select("#level-id").text(data.level_info);
    d3.select("#num-statenodes").text(data.nodes.length);

    // set statemap for fast access
    stateMap = {};
    data.nodes.forEach(function (aNode) {
        stateMap[aNode.id] = aNode;
    });

    actionMap = {};
    data.links.forEach(function (aLink) {
        actionMap[aLink.id] = aLink;
    });

    visualizeStateData();
    if (data.team_trajectories) {
        let group = document.getElementById('group-graph-container')
        group.classList.remove('none')
        d3.select("#group-trajectories").text(data.team_trajectories.length);
        visualizeGroupData();
    }

    // update info on num nodes and players
    d3.select("#num-sequences").text(data.trajectories.length);
    d3.select("#num-players").text(data.num_users);
    // d3.select("#num-teams").text(data.team_trajectories.length);

    visualizeBehaviorData();

    showLinks = true;
    toggleShowLinks();
}

function updateLevel() {
    clearHighlight();
    clearTextField();
    clearGroupNodesActive();
    sID = d3.select("#level-select").node().value;
    d3.json('data/' + sID + file_suffix + '.json', updateJSON);
}

/******************** State graph **********************************/
var linearStateNodeScale, linearStateLinkScale;

var presetStateNodes = function (nodes) {

    margin = 100;
    maxX = 890;

    nodeSpacing = (maxX - 2 * margin) / 8;
    yNodeSpacing = 200;

    // Prefix positions of start and end nodes------
    nodes[0].fixed = true;
    nodes[0].x = margin;
    nodes[0].y = margin;

    nodes[1].fixed = true;
    nodes[1].x = stateWidth - margin;
    nodes[1].y = stateHeight - margin;
};

var state_node_label = function (d) {

    return extractDetails(d.details);

};

var state_link_label = function (d) {
    return d.details;
};


function visualizeStateData() {
    linearStateNodeScale = getStateNodeScale(data.nodes);
    linearStateLinkScale = getStateLinkScale(data.links);

    // Prefix positions of start and end nodes------
    presetStateNodes(data.nodes);
    //---------------------------------------------

    stateforce.nodes(data.nodes)
        .links(data.links);

    statelink = statelink.data(data.links);
    statenode = statenode.data(data.nodes);

    statelink.exit().remove();
    statenode.exit().remove();

    // UPDATE --------------------
    statelink.attr("id", function (d, i) {
        return 'statelink' + d.id;
    })
        .attr("class", updateLinkClass)
        .style("stroke-width", getStrokeWidth)
        .attr("marker-end", function (d) {
            return "url(#mid)";

        });
    statelink.select("title").text(function (d) {
        return state_link_label(d);
    });

    statenode.attr("id", function (d, i) {
        return 'statenode' + d.id;
    })
        .attr("class", function (d) {
            return "statenode " + d.type;
        })
        .select("circle")
        .attr("class", function (d) {
            return d.type;
        })
        .attr("r", function (d) {
            return linearStateNodeScale(d.user_ids.length);
        });

    statenode.select("text")
        .attr("class", function (d) {
            return d.type;
        })
        .attr("dx", function (d) {
            return linearStateNodeScale(d.user_ids.length);
        })
        .attr("font-size", function (d) {
            return maxNodeSize;
        })
        .text(function (d, i) {
            return state_node_label(d);
        });

    statenode.select("title").text(function (d) {
        return state_node_label(d);
    });

    // ENTER ----------------
    var statelinkGroup = statelink.enter().append("path") //.append("line")
        .attr("class", updateLinkClass)
        .attr("id", function (d, i) {
            return 'statelink' + d.id;
        })
        .style("stroke-width", getStrokeWidth)
        .attr("marker-end", function (d) {
            return "url(#mid)";
        })
        .on("click", function (d) {
        
            stateLinkClicked(d)
        })
        .on("dblclick", function (d) {
        
            setPlaytraceIndex(d)
            highlightNodeID()
        })
        .on("mouseover", function (d) {
            if (!d3.select("#playtrace-index").node().value) {
                highlightNodeStroke(d, true)
            }
        })
        .on("mouseout", function (d) {
            highlightNodeStroke(d, false)
        })

    statelinkGroup.append("title").text(function (d) {
        return state_link_label(d);
    });

    var statenodeGroup = statenode.enter().append("g")
        .attr("class", function (d) {
            return "statenode " + d.type;
        })
        .attr("id", function (d, i) {
            return 'statenode' + d.id;
        })
        //andy
        //disabled
        // .on("dblclick", dblclick)
        .call(statedrag);

    statenodeGroup.append("title").text(function (d) {
        return state_node_label(d);
    });

    statenodeGroup.append("circle")
        .attr("r", function (d) {
            return linearStateNodeScale(d.user_ids.length);
        })
        .on("mouseover", stateDisplayInfo);

    statenodeGroup.append("text")
        .attr("dx", function (d) {
            return linearStateNodeScale(d.user_ids.length);
        })
        .attr("dy", ".35em")
        .attr("class", function (d) {
            return d.type;
        })
        .attr("font-size", function (d) {
            return stateNodeTextSize;
        })
        .text(function (d, i) {
            return state_node_label(d);
        });

    // EXIT --------------------------------------


    stateforce.start();

}


// Group Graph

var groupForce = d3.layout.force()
    .charge(-100)
    // .linkDistance(distanceMapping)
    .linkDistance(100)
    .size([groupWidth, groupHeight])
    .on("tick", groupTick);

groupSvg = d3.select("#group-graph-svg")
    .attr("width", groupWidth)
    .attr("height", groupHeight)
    .attr("pointer-events", "all")
    .call(d3.behavior.zoom().on("zoom", behaviorZoomPan))
    .on("dblclick.zoom", null)


// the graph components (nodes and links)
var groupSvgContainer = groupSvg.append("g").attr("id", "group-graph-container");
var groupLink = groupSvgContainer.append("g").attr("id", "group-link-container").selectAll(".groupLink");
var groupNode = groupSvgContainer.append("g").attr("id", "group-node-container").selectAll(".groupNode");


// for sticky drag
var groupDrag = groupForce.drag()
    .on("dragstart", groupDragStart);

//--------------- Functions ------------


// flag: 1 - popularity, 2 - look significant
// can create function instead of copying codes
var changeStateNodeSizeType = function (flag) {
    switch (flag) {

        case 1:
            statenode
                .select("circle")
                .attr("r", function (d) {
                    return linearStateNodeScale(d.user_ids.length);
                });
            statenode.select("text")
                .attr("font-size", function (d) {
                    return linearStateNodeScale(d.user_ids.length);
                })
            break;

        case 2:
            statenode
                .select("circle")
                .attr("r", function (d) {
                    if (d.type == 'mid')
                        return linearStateNodeScale(getLookSignificance(d));
                    return maxNodeSize;
                });
            statenode.select("text")
                .attr("font-size", function (d) {
                    if (d.type == 'mid')
                        return linearStateNodeScale(getLookSignificance(d));
                    return maxNodeSize;
                })
            break;

    }
};

function statetick(e) {
    statelink.attr("d", function (d) {
        var x1 = d.source.x,
            y1 = d.source.y,
            x2 = d.target.x,
            y2 = d.target.y,
            dx = x2 - x1,
            dy = y2 - y1,
            dr = Math.sqrt(dx * dx + dy * dy),

            // Defaults for normal edge.
            drx = dr,
            dry = dr,
            xRotation = 0,
            largeArc = 0,
            sweep = 1;

        // Self edge.
        if (x1 === x2 && y1 === y2) {
            // Fiddle with this angle to get loop oriented.
            xRotation = -45;

            // Needs to be 1.
            largeArc = 1;

            // Change sweep to change orientation of loop.
            //sweep = 0;

            // Make drx and dry different to get an ellipse
            // instead of a circle.
            drx = 30;
            dry = 20;

            // For whatever reason the arc collapses to a point if the beginning
            // and ending points of the arc are the same, so kludge it.
            x2 = x2 + 1;
            y2 = y2 + 1;
        }

        return "M" + x1 + "," + y1 + "A" + drx + "," + dry + " " + xRotation + "," + largeArc + "," + sweep + " " + x2 + "," + y2;
    });

    statenode
        .each(collide(.5))
        .attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
        })
}


// Move nodes toward cluster focus.
function gravity(alpha) {
    return function (d) {
        if (d.type == 'mid') {
            d.y += (foci[gravityFocus[d.details.affect]].y - d.y) * alpha;
            d.x += (foci[gravityFocus[d.details.affect]].x - d.x) * alpha;
        }
    };
}

function getStrokeWidth(d) {
    return linearStateLinkScale(d.user_ids.length);
}

function updateLinkClass(d) {
    return 'statelink mid';
}

function getLinkTypeFromMeaning(meaning) {
    return "mid";
}

function getStateNodeScale(dataset) {
    var minVisits = d3.min(dataset, function (d) {
        return d.user_ids.length;
    });
    var maxVisits = d3.max(dataset, function (d) {
        return d.user_ids.length;
    });

    return d3.scale.linear()
        .domain([minVisits, maxVisits])
        .range([minNodeSize, maxNodeSize]);
}

function getStateLinkScale(dataset) {
    var minVisits = d3.min(dataset, function (d) {
        return d.user_ids.length;
    });
    var maxVisits = d3.max(dataset, function (d) {
        return d.user_ids.length;
    });

    return d3.scale.linear()
        .domain([minVisits, maxVisits])
        .range([minNodeSize, maxNodeSize]);
}

// collision detection
// Resolves collisions between d and all other circles.
function collide(alpha) {
    var quadtree = d3.geom.quadtree(data.nodes);
    return function (d) {
        // the radius of the current node
        var d_radius = linearStateNodeScale(d.user_ids.length);
        var r = d_radius + maxNodeSize + padding,
            nx1 = d.x - r,
            nx2 = d.x + r,
            ny1 = d.y - r,
            ny2 = d.y + r;

        quadtree.visit(function (quad, x1, y1, x2, y2) {
            if (quad.point && (quad.point !== d)) {
                var x = d.x - quad.point.x,
                    y = d.y - quad.point.y,
                    l = Math.sqrt(x * x + y * y),
                    r = d_radius + linearStateNodeScale(quad.point.user_ids.length) + padding;
                if (l < r) {
                    l = (l - r) / l * alpha; // padding
                    d.x -= x *= l;
                    d.y -= y *= l;
                    quad.point.x += x;
                    quad.point.y += y;
                }
            }
            return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
        });
    };
}


function stateZoomPan() {
    stateSvgContainer.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}

function behaviorZoomPan() {
    behaviorSvgContainer.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}

// for sticky drag
// This callback can access this (the DOM object it is called upon)
function dblclick(d) {
    // somehow this works, but
    // d3.event.sourceEvent.stopPropagation(); does not

    d3.event.stopPropagation();
    d3.select(this).classed("fixed", d.fixed = false);
}

function dragstart(d) {
    d3.event.sourceEvent.stopPropagation();
    d3.select(this).classed("fixed", d.fixed = true);
    stateDisplayInfo(d);
}

// display info in textboxes
function stateDisplayInfo(d) {

    d3.select("#statenode-id").text(d.id);
    d3.select("#statenode-info").text(extractDetails(d.details));
    d3.select("#statenode-stats").text(extractStats(d.stats));
    d3.select("#num-players-state").text(d.user_ids.length);
    if (d.user_ids.length <= userIDLengthLimit)
        d3.select("#players-state").text(d.user_ids);
    else d3.select("#players-state").text(d.user_ids.slice(0, userIDLengthLimit) + ",....");
}

// display link info in textboxes
function stateLinkClicked(d) {

    d3.select("#num-players-statelink").text(d.user_ids.length);
    if (d.user_ids.length <= userIDLengthLimit)
        d3.select("#players-statelink").text(d.user_ids);
    else d3.select("#players-statelink").text(d.user_ids.slice(0, userIDLengthLimit) + ",....");
    d3.select("#statelink-info").text(state_link_label(d));


}

function getNumTrue(itemArray) {
    var result = 0;
    for (var i = 0; i < itemArray.length; i++) {
        if (itemArray[i][2]) result++;
    }
    return result;
}

// index 0: start, index 1: end
function setNodeForFreq(index) {
    var value = d3.select("#statenode-id").text();
    if (index == 0) {
        d3.select("#freq-start-node").node().value = value;
    } else d3.select("#freq-end-node").node().value = value;
}


/*************************** Behavior graph *******************/

var linearScaleBehaviorNode, distanceBehaviorScale;
function displayStateImages(id){
    $('#state_images').empty()
    var myImages ={"d0cd0662-ac0d-4d28-a799-3ed4a0495793": ["Screenshots/d0cd0662-ac0d-4d28-a799-3ed4a0495793/d0cd0662-ac0d-4d28-a799-3ed4a0495793_2021-07-01_20:09:56.062746.png", "Screenshots/d0cd0662-ac0d-4d28-a799-3ed4a0495793/d0cd0662-ac0d-4d28-a799-3ed4a0495793_2021-07-01_20:09:56.105737.png", "Screenshots/d0cd0662-ac0d-4d28-a799-3ed4a0495793/d0cd0662-ac0d-4d28-a799-3ed4a0495793_2021-07-01_20:09:56.170153.png", "Screenshots/d0cd0662-ac0d-4d28-a799-3ed4a0495793/d0cd0662-ac0d-4d28-a799-3ed4a0495793_2021-07-01_20:09:56.223223.png", "Screenshots/d0cd0662-ac0d-4d28-a799-3ed4a0495793/d0cd0662-ac0d-4d28-a799-3ed4a0495793_2021-07-01_20:09:56.272837.png", "Screenshots/d0cd0662-ac0d-4d28-a799-3ed4a0495793/d0cd0662-ac0d-4d28-a799-3ed4a0495793_2021-07-01_20:09:56.318880.png", "Screenshots/d0cd0662-ac0d-4d28-a799-3ed4a0495793/d0cd0662-ac0d-4d28-a799-3ed4a0495793_2021-07-01_20:09:56.366014.png", "Screenshots/d0cd0662-ac0d-4d28-a799-3ed4a0495793/d0cd0662-ac0d-4d28-a799-3ed4a0495793_2021-07-01_20:09:56.412499.png"], "787785b5-e800-45e2-82dd-9001eae092ef": ["Screenshots/787785b5-e800-45e2-82dd-9001eae092ef/787785b5-e800-45e2-82dd-9001eae092ef_2021-07-01_20:09:57.685749.png", "Screenshots/787785b5-e800-45e2-82dd-9001eae092ef/787785b5-e800-45e2-82dd-9001eae092ef_2021-07-01_20:09:57.728736.png", "Screenshots/787785b5-e800-45e2-82dd-9001eae092ef/787785b5-e800-45e2-82dd-9001eae092ef_2021-07-01_20:09:57.771764.png", "Screenshots/787785b5-e800-45e2-82dd-9001eae092ef/787785b5-e800-45e2-82dd-9001eae092ef_2021-07-01_20:09:57.824218.png"], "64ea8334-1539-4f9c-a5fd-9788528f5c3f": ["Screenshots/64ea8334-1539-4f9c-a5fd-9788528f5c3f/64ea8334-1539-4f9c-a5fd-9788528f5c3f_2021-07-01_20:09:55.884968.png", "Screenshots/64ea8334-1539-4f9c-a5fd-9788528f5c3f/64ea8334-1539-4f9c-a5fd-9788528f5c3f_2021-07-01_20:09:55.953411.png", "Screenshots/64ea8334-1539-4f9c-a5fd-9788528f5c3f/64ea8334-1539-4f9c-a5fd-9788528f5c3f_2021-07-01_20:09:56.006843.png"], "0ba55f9b-be6f-4478-b31a-547ea6f64ef4": ["Screenshots/0ba55f9b-be6f-4478-b31a-547ea6f64ef4/0ba55f9b-be6f-4478-b31a-547ea6f64ef4_2021-07-01_20:09:56.488102.png", "Screenshots/0ba55f9b-be6f-4478-b31a-547ea6f64ef4/0ba55f9b-be6f-4478-b31a-547ea6f64ef4_2021-07-01_20:09:56.533604.png", "Screenshots/0ba55f9b-be6f-4478-b31a-547ea6f64ef4/0ba55f9b-be6f-4478-b31a-547ea6f64ef4_2021-07-01_20:09:56.584403.png", "Screenshots/0ba55f9b-be6f-4478-b31a-547ea6f64ef4/0ba55f9b-be6f-4478-b31a-547ea6f64ef4_2021-07-01_20:09:56.637530.png", "Screenshots/0ba55f9b-be6f-4478-b31a-547ea6f64ef4/0ba55f9b-be6f-4478-b31a-547ea6f64ef4_2021-07-01_20:09:56.688276.png", "Screenshots/0ba55f9b-be6f-4478-b31a-547ea6f64ef4/0ba55f9b-be6f-4478-b31a-547ea6f64ef4_2021-07-01_20:09:56.738978.png", "Screenshots/0ba55f9b-be6f-4478-b31a-547ea6f64ef4/0ba55f9b-be6f-4478-b31a-547ea6f64ef4_2021-07-01_20:09:56.791509.png", "Screenshots/0ba55f9b-be6f-4478-b31a-547ea6f64ef4/0ba55f9b-be6f-4478-b31a-547ea6f64ef4_2021-07-01_20:09:56.844681.png", "Screenshots/0ba55f9b-be6f-4478-b31a-547ea6f64ef4/0ba55f9b-be6f-4478-b31a-547ea6f64ef4_2021-07-01_20:09:56.897520.png", "Screenshots/0ba55f9b-be6f-4478-b31a-547ea6f64ef4/0ba55f9b-be6f-4478-b31a-547ea6f64ef4_2021-07-01_20:09:56.951249.png", "Screenshots/0ba55f9b-be6f-4478-b31a-547ea6f64ef4/0ba55f9b-be6f-4478-b31a-547ea6f64ef4_2021-07-01_20:09:57.005090.png", "Screenshots/0ba55f9b-be6f-4478-b31a-547ea6f64ef4/0ba55f9b-be6f-4478-b31a-547ea6f64ef4_2021-07-01_20:09:57.058946.png", "Screenshots/0ba55f9b-be6f-4478-b31a-547ea6f64ef4/0ba55f9b-be6f-4478-b31a-547ea6f64ef4_2021-07-01_20:09:57.108915.png"], "34939330-b4bf-42a6-88b1-294148819974": ["Screenshots/34939330-b4bf-42a6-88b1-294148819974/34939330-b4bf-42a6-88b1-294148819974_2021-07-01_20:09:54.434114.png", "Screenshots/34939330-b4bf-42a6-88b1-294148819974/34939330-b4bf-42a6-88b1-294148819974_2021-07-01_20:09:54.478520.png", "Screenshots/34939330-b4bf-42a6-88b1-294148819974/34939330-b4bf-42a6-88b1-294148819974_2021-07-01_20:09:54.528340.png", "Screenshots/34939330-b4bf-42a6-88b1-294148819974/34939330-b4bf-42a6-88b1-294148819974_2021-07-01_20:09:54.582938.png", "Screenshots/34939330-b4bf-42a6-88b1-294148819974/34939330-b4bf-42a6-88b1-294148819974_2021-07-01_20:09:54.633158.png", "Screenshots/34939330-b4bf-42a6-88b1-294148819974/34939330-b4bf-42a6-88b1-294148819974_2021-07-01_20:09:54.682465.png", "Screenshots/34939330-b4bf-42a6-88b1-294148819974/34939330-b4bf-42a6-88b1-294148819974_2021-07-01_20:09:54.734032.png", "Screenshots/34939330-b4bf-42a6-88b1-294148819974/34939330-b4bf-42a6-88b1-294148819974_2021-07-01_20:09:54.809813.png", "Screenshots/34939330-b4bf-42a6-88b1-294148819974/34939330-b4bf-42a6-88b1-294148819974_2021-07-01_20:09:54.861405.png", "Screenshots/34939330-b4bf-42a6-88b1-294148819974/34939330-b4bf-42a6-88b1-294148819974_2021-07-01_20:09:54.911138.png", "Screenshots/34939330-b4bf-42a6-88b1-294148819974/34939330-b4bf-42a6-88b1-294148819974_2021-07-01_20:09:54.963352.png", "Screenshots/34939330-b4bf-42a6-88b1-294148819974/34939330-b4bf-42a6-88b1-294148819974_2021-07-01_20:09:55.017158.png", "Screenshots/34939330-b4bf-42a6-88b1-294148819974/34939330-b4bf-42a6-88b1-294148819974_2021-07-01_20:09:55.070044.png"], "248d368d-232d-46c8-b137-8f81dc77f809": ["Screenshots/248d368d-232d-46c8-b137-8f81dc77f809/248d368d-232d-46c8-b137-8f81dc77f809_2021-07-01_20:09:54.192365.png", "Screenshots/248d368d-232d-46c8-b137-8f81dc77f809/248d368d-232d-46c8-b137-8f81dc77f809_2021-07-01_20:09:54.234888.png", "Screenshots/248d368d-232d-46c8-b137-8f81dc77f809/248d368d-232d-46c8-b137-8f81dc77f809_2021-07-01_20:09:54.282999.png", "Screenshots/248d368d-232d-46c8-b137-8f81dc77f809/248d368d-232d-46c8-b137-8f81dc77f809_2021-07-01_20:09:54.334488.png", "Screenshots/248d368d-232d-46c8-b137-8f81dc77f809/248d368d-232d-46c8-b137-8f81dc77f809_2021-07-01_20:09:54.382323.png"], "5c2947cc-34b1-42ac-864c-3f69f9171c54": ["Screenshots/5c2947cc-34b1-42ac-864c-3f69f9171c54/5c2947cc-34b1-42ac-864c-3f69f9171c54_2021-07-01_20:09:59.214473.png", "Screenshots/5c2947cc-34b1-42ac-864c-3f69f9171c54/5c2947cc-34b1-42ac-864c-3f69f9171c54_2021-07-01_20:09:59.257999.png", "Screenshots/5c2947cc-34b1-42ac-864c-3f69f9171c54/5c2947cc-34b1-42ac-864c-3f69f9171c54_2021-07-01_20:09:59.300790.png", "Screenshots/5c2947cc-34b1-42ac-864c-3f69f9171c54/5c2947cc-34b1-42ac-864c-3f69f9171c54_2021-07-01_20:09:59.351407.png", "Screenshots/5c2947cc-34b1-42ac-864c-3f69f9171c54/5c2947cc-34b1-42ac-864c-3f69f9171c54_2021-07-01_20:09:59.397132.png", "Screenshots/5c2947cc-34b1-42ac-864c-3f69f9171c54/5c2947cc-34b1-42ac-864c-3f69f9171c54_2021-07-01_20:09:59.444948.png"], "9553b141-533e-4cd7-bb59-5d8f8c56a507": ["Screenshots/9553b141-533e-4cd7-bb59-5d8f8c56a507/9553b141-533e-4cd7-bb59-5d8f8c56a507_2021-07-01_20:09:58.705735.png", "Screenshots/9553b141-533e-4cd7-bb59-5d8f8c56a507/9553b141-533e-4cd7-bb59-5d8f8c56a507_2021-07-01_20:09:58.771837.png", "Screenshots/9553b141-533e-4cd7-bb59-5d8f8c56a507/9553b141-533e-4cd7-bb59-5d8f8c56a507_2021-07-01_20:09:58.817706.png", "Screenshots/9553b141-533e-4cd7-bb59-5d8f8c56a507/9553b141-533e-4cd7-bb59-5d8f8c56a507_2021-07-01_20:09:58.872619.png", "Screenshots/9553b141-533e-4cd7-bb59-5d8f8c56a507/9553b141-533e-4cd7-bb59-5d8f8c56a507_2021-07-01_20:09:58.922771.png", "Screenshots/9553b141-533e-4cd7-bb59-5d8f8c56a507/9553b141-533e-4cd7-bb59-5d8f8c56a507_2021-07-01_20:09:58.973369.png", "Screenshots/9553b141-533e-4cd7-bb59-5d8f8c56a507/9553b141-533e-4cd7-bb59-5d8f8c56a507_2021-07-01_20:09:59.023576.png"], "37023d9a-a8a3-4998-be0e-447962220be0": ["Screenshots/37023d9a-a8a3-4998-be0e-447962220be0/37023d9a-a8a3-4998-be0e-447962220be0_2021-07-01_20:09:55.129679.png", "Screenshots/37023d9a-a8a3-4998-be0e-447962220be0/37023d9a-a8a3-4998-be0e-447962220be0_2021-07-01_20:09:55.173995.png", "Screenshots/37023d9a-a8a3-4998-be0e-447962220be0/37023d9a-a8a3-4998-be0e-447962220be0_2021-07-01_20:09:55.225736.png", "Screenshots/37023d9a-a8a3-4998-be0e-447962220be0/37023d9a-a8a3-4998-be0e-447962220be0_2021-07-01_20:09:55.282159.png", "Screenshots/37023d9a-a8a3-4998-be0e-447962220be0/37023d9a-a8a3-4998-be0e-447962220be0_2021-07-01_20:09:55.337096.png", "Screenshots/37023d9a-a8a3-4998-be0e-447962220be0/37023d9a-a8a3-4998-be0e-447962220be0_2021-07-01_20:09:55.386114.png", "Screenshots/37023d9a-a8a3-4998-be0e-447962220be0/37023d9a-a8a3-4998-be0e-447962220be0_2021-07-01_20:09:55.432961.png", "Screenshots/37023d9a-a8a3-4998-be0e-447962220be0/37023d9a-a8a3-4998-be0e-447962220be0_2021-07-01_20:09:55.477374.png", "Screenshots/37023d9a-a8a3-4998-be0e-447962220be0/37023d9a-a8a3-4998-be0e-447962220be0_2021-07-01_20:09:55.529256.png", "Screenshots/37023d9a-a8a3-4998-be0e-447962220be0/37023d9a-a8a3-4998-be0e-447962220be0_2021-07-01_20:09:55.580374.png", "Screenshots/37023d9a-a8a3-4998-be0e-447962220be0/37023d9a-a8a3-4998-be0e-447962220be0_2021-07-01_20:09:55.627234.png", "Screenshots/37023d9a-a8a3-4998-be0e-447962220be0/37023d9a-a8a3-4998-be0e-447962220be0_2021-07-01_20:09:55.674695.png", "Screenshots/37023d9a-a8a3-4998-be0e-447962220be0/37023d9a-a8a3-4998-be0e-447962220be0_2021-07-01_20:09:55.725047.png", "Screenshots/37023d9a-a8a3-4998-be0e-447962220be0/37023d9a-a8a3-4998-be0e-447962220be0_2021-07-01_20:09:55.779255.png"], "b4152ba7-4846-4ba2-93c4-eba434125dbe": ["Screenshots/b4152ba7-4846-4ba2-93c4-eba434125dbe/b4152ba7-4846-4ba2-93c4-eba434125dbe_2021-07-01_20:09:53.487527.png", "Screenshots/b4152ba7-4846-4ba2-93c4-eba434125dbe/b4152ba7-4846-4ba2-93c4-eba434125dbe_2021-07-01_20:09:53.639066.png", "Screenshots/b4152ba7-4846-4ba2-93c4-eba434125dbe/b4152ba7-4846-4ba2-93c4-eba434125dbe_2021-07-01_20:09:53.714960.png", "Screenshots/b4152ba7-4846-4ba2-93c4-eba434125dbe/b4152ba7-4846-4ba2-93c4-eba434125dbe_2021-07-01_20:09:53.767756.png", "Screenshots/b4152ba7-4846-4ba2-93c4-eba434125dbe/b4152ba7-4846-4ba2-93c4-eba434125dbe_2021-07-01_20:09:53.819906.png", "Screenshots/b4152ba7-4846-4ba2-93c4-eba434125dbe/b4152ba7-4846-4ba2-93c4-eba434125dbe_2021-07-01_20:09:53.872352.png", "Screenshots/b4152ba7-4846-4ba2-93c4-eba434125dbe/b4152ba7-4846-4ba2-93c4-eba434125dbe_2021-07-01_20:09:53.924344.png", "Screenshots/b4152ba7-4846-4ba2-93c4-eba434125dbe/b4152ba7-4846-4ba2-93c4-eba434125dbe_2021-07-01_20:09:53.977509.png", "Screenshots/b4152ba7-4846-4ba2-93c4-eba434125dbe/b4152ba7-4846-4ba2-93c4-eba434125dbe_2021-07-01_20:09:54.030404.png", "Screenshots/b4152ba7-4846-4ba2-93c4-eba434125dbe/b4152ba7-4846-4ba2-93c4-eba434125dbe_2021-07-01_20:09:54.083212.png", "Screenshots/b4152ba7-4846-4ba2-93c4-eba434125dbe/b4152ba7-4846-4ba2-93c4-eba434125dbe_2021-07-01_20:09:54.136268.png"], "c996d3cd-6f96-4b58-a4f4-60026db0edcc": ["Screenshots/c996d3cd-6f96-4b58-a4f4-60026db0edcc/c996d3cd-6f96-4b58-a4f4-60026db0edcc_2021-07-01_20:09:59.075972.png", "Screenshots/c996d3cd-6f96-4b58-a4f4-60026db0edcc/c996d3cd-6f96-4b58-a4f4-60026db0edcc_2021-07-01_20:09:59.118218.png", "Screenshots/c996d3cd-6f96-4b58-a4f4-60026db0edcc/c996d3cd-6f96-4b58-a4f4-60026db0edcc_2021-07-01_20:09:59.164127.png"], "4666e412-31ab-421b-b335-b30c7c322bdd": ["Screenshots/4666e412-31ab-421b-b335-b30c7c322bdd/4666e412-31ab-421b-b335-b30c7c322bdd_2021-07-01_20:09:57.873905.png", "Screenshots/4666e412-31ab-421b-b335-b30c7c322bdd/4666e412-31ab-421b-b335-b30c7c322bdd_2021-07-01_20:09:57.918134.png", "Screenshots/4666e412-31ab-421b-b335-b30c7c322bdd/4666e412-31ab-421b-b335-b30c7c322bdd_2021-07-01_20:09:57.960600.png", "Screenshots/4666e412-31ab-421b-b335-b30c7c322bdd/4666e412-31ab-421b-b335-b30c7c322bdd_2021-07-01_20:09:58.012722.png"], "2e07ba3c-51be-498f-815a-768f3b7cb7e1": ["Screenshots/2e07ba3c-51be-498f-815a-768f3b7cb7e1/2e07ba3c-51be-498f-815a-768f3b7cb7e1_2021-07-01_20:09:57.161495.png", "Screenshots/2e07ba3c-51be-498f-815a-768f3b7cb7e1/2e07ba3c-51be-498f-815a-768f3b7cb7e1_2021-07-01_20:09:57.204868.png", "Screenshots/2e07ba3c-51be-498f-815a-768f3b7cb7e1/2e07ba3c-51be-498f-815a-768f3b7cb7e1_2021-07-01_20:09:57.255768.png", "Screenshots/2e07ba3c-51be-498f-815a-768f3b7cb7e1/2e07ba3c-51be-498f-815a-768f3b7cb7e1_2021-07-01_20:09:57.310075.png", "Screenshots/2e07ba3c-51be-498f-815a-768f3b7cb7e1/2e07ba3c-51be-498f-815a-768f3b7cb7e1_2021-07-01_20:09:57.361329.png", "Screenshots/2e07ba3c-51be-498f-815a-768f3b7cb7e1/2e07ba3c-51be-498f-815a-768f3b7cb7e1_2021-07-01_20:09:57.413924.png", "Screenshots/2e07ba3c-51be-498f-815a-768f3b7cb7e1/2e07ba3c-51be-498f-815a-768f3b7cb7e1_2021-07-01_20:09:57.467809.png", "Screenshots/2e07ba3c-51be-498f-815a-768f3b7cb7e1/2e07ba3c-51be-498f-815a-768f3b7cb7e1_2021-07-01_20:09:57.522319.png", "Screenshots/2e07ba3c-51be-498f-815a-768f3b7cb7e1/2e07ba3c-51be-498f-815a-768f3b7cb7e1_2021-07-01_20:09:57.591806.png"], "e95dfdda-ad84-47c2-8d04-105692208369": ["Screenshots/e95dfdda-ad84-47c2-8d04-105692208369/e95dfdda-ad84-47c2-8d04-105692208369_2021-07-01_20:09:58.454375.png", "Screenshots/e95dfdda-ad84-47c2-8d04-105692208369/e95dfdda-ad84-47c2-8d04-105692208369_2021-07-01_20:09:58.498746.png", "Screenshots/e95dfdda-ad84-47c2-8d04-105692208369/e95dfdda-ad84-47c2-8d04-105692208369_2021-07-01_20:09:58.551541.png", "Screenshots/e95dfdda-ad84-47c2-8d04-105692208369/e95dfdda-ad84-47c2-8d04-105692208369_2021-07-01_20:09:58.598461.png", "Screenshots/e95dfdda-ad84-47c2-8d04-105692208369/e95dfdda-ad84-47c2-8d04-105692208369_2021-07-01_20:09:58.650530.png"], "ceb929b7-97d0-4d10-89f8-8206ce24e7a5": ["Screenshots/ceb929b7-97d0-4d10-89f8-8206ce24e7a5/ceb929b7-97d0-4d10-89f8-8206ce24e7a5_2021-07-01_20:09:58.301988.png", "Screenshots/ceb929b7-97d0-4d10-89f8-8206ce24e7a5/ceb929b7-97d0-4d10-89f8-8206ce24e7a5_2021-07-01_20:09:58.344282.png", "Screenshots/ceb929b7-97d0-4d10-89f8-8206ce24e7a5/ceb929b7-97d0-4d10-89f8-8206ce24e7a5_2021-07-01_20:09:58.394489.png"], "780fc9bd-794c-4906-9f64-c04d19144e0f": ["Screenshots/780fc9bd-794c-4906-9f64-c04d19144e0f/780fc9bd-794c-4906-9f64-c04d19144e0f_2021-07-01_20:09:58.062406.png", "Screenshots/780fc9bd-794c-4906-9f64-c04d19144e0f/780fc9bd-794c-4906-9f64-c04d19144e0f_2021-07-01_20:09:58.105944.png", "Screenshots/780fc9bd-794c-4906-9f64-c04d19144e0f/780fc9bd-794c-4906-9f64-c04d19144e0f_2021-07-01_20:09:58.149335.png", "Screenshots/780fc9bd-794c-4906-9f64-c04d19144e0f/780fc9bd-794c-4906-9f64-c04d19144e0f_2021-07-01_20:09:58.202990.png", "Screenshots/780fc9bd-794c-4906-9f64-c04d19144e0f/780fc9bd-794c-4906-9f64-c04d19144e0f_2021-07-01_20:09:58.253295.png"]}
    id = id[0].substring(0, id[0].length - 5);
    console.log(myImages[id])
    for (var i = 0; i < myImages[id].length; i++) 
    {
        path =  myImages[id][i].replace(/\/$/, '');;

        $('#state_images').append("<img class='image-style' " + " src="+ path +'>')
         
    }
}

function returnHTML(d, i) {
    var nodeinfo = i + " (";
    if (d.completed) {
        nodeinfo = nodeinfo + "reach end state)";
    } else {
        nodeinfo = nodeinfo + "does not reach end state)"
    };

    return `<div class="tooltip-inner">
                <div><span class="tooltip-key">Sequence Node Info: </span>${nodeinfo}</div>
                <div><span class="tooltip-key">Player IDs with this Pattern:</span> (${d.user_ids.length}) ${d.user_ids.join('')}</div>
                <div><span class="tooltip-key">Action Sequence: </span>${compressArray(d.action_meaning)}</div>
            </div>`
}

function visualizeBehaviorData() {
    let tooltip = d3.select('#tooltip')
    linearScaleBehaviorNode = getBehaviorNodeScale(data.trajectories);
    distanceBehaviorScale = getBehaviorDistanceScale(data.traj_similarity);

    behaviorforce.nodes(data.trajectories)
        .links(data.traj_similarity);

    behaviorlink = behaviorlink.data(data.traj_similarity);
    behaviornode = behaviornode.data(data.trajectories);

    behaviorlink.enter().append("line")
        .attr("class", "behaviorlink")
        .attr("id", function (d, i) {
            return 'behaviorlink' + d.id;
        });

    behaviornode.enter().append("g")
        .attr("id", function (d, i) {

            return 'behaviornode' + i;
            // Jimmy changes i to d.user_ids to show the player id instead of default numbers
            // return 'behaviornode' + d.user_ids;
        })
        .attr("color", function (d) {
            if (d.id > 20) {
                let divisor = Math.floor(d.id / 20)
                let new_id = d.id - (20 * divisor)
                return fill(new_id)
            } else {
                return fill(d.id)
            }
        })

        //andy disabled
        // .on("dblclick", dblclick)
        // .on("mouseover", displayInfo)
        .call(behaviordrag);

    behaviornode.append("circle")
        .attr("r", function (d) {
            return linearScaleBehaviorNode(d.user_ids.length);
        })
        .attr('pointer-events', 'fill')
        .attr('cursor', 'pointer')
        .on("mouseover", function (d, i) {
            activateCompleteSequence()
            displayInfo(d)
            
            shuffleNodeOrder(d.index)
            // displayStateImages(d.user_ids)
            tooltip
                .style('opacity', 1)
                .style("left", d3.event.pageX + "px")
                .style("top", d3.event.pageY + "px")
                .html(returnHTML(d, i))
        })
        .on("mouseout", function (d) {
            tooltip
                .style('opacity', 0)
        })

    behaviornode.append("text")
        .attr("class", function (d) {
            if (d.completed)
                return "complete";
            return "incomplete";
        })
        .attr("dx", function (d) {
            return linearScaleBehaviorNode(d.user_ids.length) + 3;
        })
        .attr("dy", ".35em")
        .attr("font-size", function (d) {
            return maxNodeSize;
        })
        .text(function (d, i) {
            // return i;
            // Jimmy changes i to d.user_ids to show the player id instead of default numbers
            return d.user_ids;
        });

    // UPDATE --------------------
    behaviorlink.attr("id", function (d, i) {
        return 'behaviorlink' + d.id;
    })
        .attr("class", "behaviorlink");

    behaviornode.attr("id", function (d, i) {
        return 'behaviornode' + i;
        // Jimmy changes i to d.user_ids to show the player id instead of default numbers
        // return 'behaviornode' + d.user_ids;
    })
        .attr("class", function (d) {
            if (d.completed)
                return `behaviornode complete ${d.user_ids[0]} ${d.id}`;
            return `behaviornode incomplete ${d.user_ids[0]} ${d.id}`;
        })
        .attr("node_index", function (d) {
            return d.id
        })
        .select("circle")
        .attr("class", function (d) {
            if (d.completed)
                return "complete";
            return "incomplete";
        })
        .attr("r", function (d) {
            return linearScaleBehaviorNode(d.user_ids.length);
        });

    behaviornode.select("text")
        .attr("class", function (d) {
            if (d.completed)
                return "complete";
            return "incomplete";
        })
        .attr("dx", function (d) {
            return linearScaleBehaviorNode(d.user_ids.length) + 3;
        })
        .attr("font-size", function (d) {
            return maxNodeSize;
        })
        .text(function (d, i) {
            // return i;
            // Jimmy changes i to d.user_ids to show the player id instead of default numbers
            return d.user_ids;
        });

    behaviorlink.exit().remove();
    behaviornode.exit().remove();
    behaviorforce.start();
}

// Group Graph

function returnGroupHTML(d, i) {
    // return `<div class="tooltip-inner">
    //             <div><span class="tooltip-key">Sequence Node Info: </span>${nodeinfo}</div>
    //             <div><span class="tooltip-key">Player IDs with this Pattern:</span> (${d.user_ids.length}) ${d.user_ids.join('')}</div>
    //             <div><span class="tooltip-key">Action Sequence: </span>${compressArray(d.action_meaning)}</div>
    //         </div>`
}

function visualizeGroupData() {
    let tooltip = d3.select('#tooltip')
    groupForce.nodes(data.team_trajectories)
        .links(data.team_traj_similarity);

    groupLink = groupLink.data(data.team_traj_similarity);
    groupNode = groupNode.data(data.team_trajectories);

    groupLink.enter().append("line")
        .attr("class", "groupLink")
        .attr("id", function (d, i) {
            return 'groupLink' + d.id;
        });

    groupNode.enter().append("g")
        .attr("class", function(d) {
            return `groupNode groupNode${d.id}`
        })
        .call(groupDrag);

    groupNode.append("circle")
        .attr("id", function (d, i) {
            return 'groupNode' + i;
        })
        .attr('r', 15)
        .attr('pointer-events', 'fill')
        .attr('cursor', 'pointer')
        // .on("mouseover", function (d, i) {
        //     activateCompleteSequence()
        //     displayInfo(d)
        //     shuffleNodeOrder(d.index)
        //     tooltip
        //         .style('opacity', 1)
        //         .style("left", d3.event.pageX + "px")
        //         .style("top", d3.event.pageY + "px")
        //         .html(returnGroupHTML(d, i))
        // })
        // .on("mouseout", function (d) {
        //     tooltip
        //         .style('opacity', 0)
        // })
        .on("click", function(d) {
            clearGroupNodesActive()
            d3.select(this).classed('groupNode-active', true)
            highlightIndTrajectories(d)
            //displayStateImages(d.user_ids)
        })

    groupNode.append("text")
        .attr("dx", ".9em")
        .attr("dy", ".4em")
        .text(function (d, i) {
            return i;
        });

    // UPDATE --------------------
    groupLink.attr("id", function (d, i) {
        return 'groupLink';
    })
        .attr("class", "groupLink");

    groupNode
        .select("circle")
        .attr('r', 15)


    groupNode.select("text")

        .attr("font-size", function (d) {
            return 20;
        })
        .text(function (d, i) {
            return i;
        });

    groupLink.exit().remove();
    groupNode.exit().remove();
    groupForce.start();
}

function clearGroupNodesActive() {
    d3.selectAll('.groupNode')
        .each(function(d) {
            let el = document.getElementById(`groupNode${d.index}`)
            if (el.classList.contains('groupNode-active')) {
                el.classList.remove('groupNode-active')
            }
        })
}

function toggleGroupNodeActive() {

}

function unique(value, index, self) {
    return self.indexOf(value) === index;
}

function highlightIndTrajectories(d) {
    let uniqueTraj = d.team_members_index.filter(unique)
    setPlaytraceIndex(uniqueTraj)
    highlightNodeID()

}



//Andy
function shuffleNodeOrder(node) {
    nArray = d3.select("#playtrace-index").node().value.replace(/\s/g, '').split(",");
    let hoverNode = node.toString()
    if (nArray.includes(hoverNode)) {
        highlightNodeID(false, hoverNode)
    }
}

function distanceMapping(d) {
    return distanceBehaviorScale(d.similarity);
}


function behaviortick() {
    behaviorlink.attr("x1", function (d) {
        return d.source.x;
    })
        .attr("y1", function (d) {
            return d.source.y;
        })
        .attr("x2", function (d) {
            return d.target.x;
        })
        .attr("y2", function (d) {
            return d.target.y;
        });
    behaviornode
        .attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
        });
}

function groupTick() {
    groupLink.attr("x1", function (d) {
        return d.source.x;
    })
        .attr("y1", function (d) {
            return d.source.y;
        })
        .attr("x2", function (d) {
            return d.target.x;
        })
        .attr("y2", function (d) {
            return d.target.y;
        });
    groupNode
        .attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
        });
}

// set minValue and maxValue
function getBehaviorNodeScale(dataset) {
    var minValue = d3.min(dataset, function (d) {
        return d.user_ids.length;
    });
    var maxValue = d3.max(dataset, function (d) {
        return d.user_ids.length;
    });
    // if minValue and maxValue are the same,
    // we'll make it such that the node takes the big size.
    if (minValue == maxValue)
        minValue -= 1;
    return d3.scale.linear()
        .domain([minValue, maxValue])
        .range([minNodeSize, maxNodeSize]);
}

function getBehaviorDistanceScale(dataset) {
    var minValue = d3.min(dataset, function (d) {
        return d.similarity;
    });
    var maxValue = d3.max(dataset, function (d) {
        return d.similarity;
    });

    return d3.scale.linear()
        .domain([minValue, maxValue])
        .range([minDistance, maxDistance]);
}

var showLinks = true;

function toggleShowLinks() {
    if (showLinks) {
        d3.selectAll(".behaviorlink").style("stroke", "transparent");
    } else {
        d3.selectAll(".behaviorlink").style("stroke", null);
    }

    showLinks = !showLinks;
}

// display info in textboxes
var displayInfo = function (d, i) {
    var nodeinfo = i + " (";
    if (d.completed) nodeinfo = nodeinfo + "reach end state)";
    else nodeinfo = nodeinfo + "does not reach end state)";

    // the start and end states are dummy
    d3.select("#num-states-in-trajectory").text(d.trajectory.length - 2);
    d3.select("#selected-node-index").text(nodeinfo);
    d3.select("#infobox").text(compressStates(d.trajectory));
    d3.select("#actionseq-info").text(compressArray(d.action_meaning));
    d3.select("#num-players-sequence").text(d.user_ids.length);
    if (d.user_ids.length <= userIDLengthLimit)
        d3.select("#players-sequence").text(d.user_ids);
    else d3.select("#players-sequence").text(d.user_ids.slice(0, userIDLengthLimit) + ",....");
};

var extractDetails = function (detail_obj) {
    // movement events: show the region
    if (detail_obj.event_type.indexOf('movement') !== -1)
        return detail_obj.metadata.encounter;
    return detail_obj.event_type;
};


var extractStats = function (stats_obj) {
    return JSON.stringify(stats_obj);
};

var compressStates = function (pArray) {
    items = _.map(pArray, function (a) { return extractDetails(data.nodes[a].details); });
    return compressArray(items);
};

var compressArray = function (pArray) {
    var actions = "";
    var prevAction = "";
    var prevActionCount = 0;
    var currItem;
    for (var i = 1; i < pArray.length - 1; i++) {

        currItem = pArray[i];

        if (prevAction != currItem) {
            if (prevAction != "") {
                actions += prevAction + "(" + prevActionCount.toString() + ")";
                actions += ", ";
            }
            prevAction = currItem;
            prevActionCount = 1;
        } else prevActionCount += 1;
    }
    actions += prevAction + "(" + prevActionCount.toString() + ")";

    return actions;
};

var lowestOpacity = 0.1;

function behaviorDragstart(d, i) {
    d3.event.sourceEvent.stopPropagation();

    // Highlight the behavior
    clearHighlight();
    displayStateImages(d.user_ids)
    applyOpacity(lowestOpacity);
    highlightBehaviorNodeIndex(i, "red");
    archiveStyle(this);
}

function groupDragStart(d, i) {
    d3.event.sourceEvent.stopPropagation();

    // Highlight the behavior
    clearHighlight();
    // applyOpacity(lowestOpacity);
    // highlightBehaviorNodeIndex(i, "red");
    archiveStyle(this);
}

var archiveStyle = function (domNode) {
    prevStroke = d3.select(domNode).style("stroke");
    prevFill = d3.select(domNode).style("fill");
    prevStrokeOpa = d3.select(domNode).style("stroke-opacity");
    prevFillOpa = d3.select(domNode).style("fill-opacity");
    prevTextFill = d3.select(domNode).select("text").style("fill");
};

var restoreStyle = function (domNode) {
    d3.select(domNode).style("stroke-opacity", prevStrokeOpa)
        .style("stroke", prevStroke)
        .style("fill-opacity", prevFillOpa)
        .style("fill", prevFill);

    d3.select(domNode).select("text").style("fill", prevTextFill);
};

var highlightNodeID = function (reverse = false, hoverNode) {
    nArray = d3.select("#playtrace-index").node().value.replace(/\s/g, '').split(",");
    if (nArray.length > 0 && nArray[0] !== '') {
        clearHighlight();
        applyOpacity(lowestOpacity);

        if (reverse)
            nArray = nArray.reverse();

        if (hoverNode) {
            let index = nArray.indexOf(hoverNode)
            nArray.splice(index, 1)
            nArray.push(hoverNode)
        }
        _.each(nArray, function (item, ind) {
            let color = d3.select(`#behaviornode${item}`).node().getAttribute('color')
            highlightBehaviorNodeIndex(parseInt(item), color)
        })
        displayInfo(data.trajectories[nArray[0]], nArray[0]);

        // if reverse is set, set the text to the reverse
        if (reverse)
            d3.select("#playtrace-index").node().value = nArray.join();
    }
};

var setPlaytraceIndex = function (d) {
    let arr = []
    if (d.user_ids) {
        d.user_ids.forEach((u) => {
            let node_index = d3.select(`.${u}`).attr('node_index')
            arr.push(node_index)
        })
    } else {
        d.forEach((u) => {
            arr.push(u)
        })
    }
    document.getElementById("playtrace-index").value = arr;
}

var highlightNodeStroke = function (nodes, bool) {
    nodes.user_ids.forEach(d => {
        d3.select(`.${d}`).classed('selectednode', bool)
    })
};

var highlightNodeID_index = function (index = 0) {
    nArray = d3.select("#playtrace-index").node().value.replace(/\s/g, '').split(",");
    if (nArray.length > 0 && nArray[0] !== '') {
        clearHighlight();
        applyOpacity(lowestOpacity);
        if (index == -1)
            index = nArray.length - 1;
        highlightBehaviorNodeIndex(parseInt(nArray[index]), fill(index));
    }
};


function showInfoNodeID() {
    var index = parseInt(d3.select("#playtrace-show-info").node().value);
    displayInfo(data.trajectories[index], index);
}
/*************************** Highlighting ******************/


function clearHighlight() {

    // clear all styles for state graph
    d3.selectAll(".statelink,.statenode").style("stroke-opacity", null)
        .style("stroke", null)
        .style("fill", null)
        .style("fill-opacity", null);

    d3.selectAll(".statenode circle").style("fill", null).style("stroke", null);

    d3.selectAll(".statenode").select("text")
        .style("fill", null)
        .style("fill-opacity", null);

    // clear behavior graph
    d3.selectAll(".behaviornode").style("stroke-opacity", null)
        .style("stroke", null)
        .style("fill", null)
        .style("fill-opacity", null);

    d3.selectAll(".behaviornode circle").style("fill", null).style("stroke", null);

    applyOpacity(currentOpacity);

    displayingFreq = false;
}

function clearTextField() {
    document.getElementById('playtrace-index').value = '';
}


var highlightUserID = function () {
    clearHighlight();
    input = d3.select("#userID").node().value;
    // 1. find the user traj from the trajectories

    userIDs = input.split(",");
    first_one_highlighted = true;
    _.each(userIDs, function (userID, id) {
        var trajIndex = -1;
        for (var i = 0; i < data.trajectories.length; i++) {
            if (_.includes(data.trajectories[i].user_ids, userID)) {
                trajIndex = i;
                break;
            }
        }

        if (trajIndex >= 0) {
            if (first_one_highlighted) {
                applyOpacity(lowestOpacity);
                first_one_highlighted = false;
            }
            // 2 is red
            highlightBehaviorNodeIndex(trajIndex, fill(id));
            found_user = true;
        } else {
            alert('cant find');
        }
    });
};

var groupCache = {};
// This function construct the key to retrieve from groupCache
var constructGroupKey = function (feature, groupValue) {
    return feature + '_' + groupValue;
};

// flag: 1: team2, blue; 2: team3, red; 0: all
var highlightGroup = function (flag) {
    clearHighlight();
    applyOpacity(lowestOpacity);
    switch (flag) {
        case 1:
            highlightGroupWithName('blue', 'blue');  //<!team2>
            break;
        case 2:
            highlightGroupWithName('red', 'red');  //<!team3>
            break;
        default:
            highlightGroupWithName('blue', 'blue');  //<!team2>
            highlightGroupWithName('red', 'red');  //<!team3>
    }
};

//working
var highlightGroupWithName = function (grpName, color) {
    _.each(data.trajectories, function (traj, id) {
        //change this to high or low
        // if (traj.teams.indexOf(grpName) > -1)
        //     highlightBehaviorNodeIndex(id, color);
    });
};


function highlightBehaviorNodeIndex(index, color) {
    highlightTraj(data.trajectories[index], color);
    highlightBehaviorNode(index, color);
    displayInfo(data.trajectories[index], index);
    displayingFreq = true;
}

function highlightBehaviorNode(nodeToHighlight, color) {
    d3.select("#behaviornode" + nodeToHighlight).style("stroke-opacity", 1)
        .style("stroke", color)
        .style("fill", color)
        .style("fill-opacity", 1)
    // somehow have to set fill for cirle only.
    d3.select("#behaviornode" + nodeToHighlight).select("circle")
        .style("stroke", color)
        .style("fill", color);
}

function toggleKthTrajectories() {
    clearHighlight();
    applyOpacity(lowestOpacity);
    var numHighlight = parseInt(d3.select("#number-highlight").node().value);
    if (data.hasOwnProperty('trajectories') && numHighlight <= data.trajectories.length) {
        numFrequent = (numHighlight - 1 + data.trajectories.length) % data.trajectories.length;
        highlightBehaviorNodeIndex(numFrequent, fill(numFrequent));
    }
}

function toggleHighlightFreqTrajectories() {
    clearHighlight();
    var numHighlight = parseInt(d3.select("#number-highlight").node().value);
    if (data.hasOwnProperty('trajectories') && numHighlight <= data.trajectories.length) {
        applyOpacity(lowestOpacity);
        numFrequent = numHighlight;
        var bNodeArray = _.range(numFrequent);
        _.each(bNodeArray, function (d) {
            highlightBehaviorNodeIndex(d, fill(d));
        });
    }
}

function highlightTraj(trajString, color) {

    // 1. break the trajectory into nodes and statelinks ID
    ids = trajToIDs(trajString);

    // 2. assign the color to a corresponding list of colors.
    d3.selectAll(ids)
        .style("stroke", color)
        .style("stroke-opacity", 1);

    d3.selectAll(ids).select("circle")
        .style("fill-opacity", 1);

    d3.selectAll(ids).select("text")
        .style("fill", 'black')
        //            .style("fill", color)
        .style("fill-opacity", 1);
}


// return: "#statenode975, #statelink975_0, #statenode1015, #statelink1015_0, #statenode475 "
// for "975, 0, 1015, 1015_0, 475"
var trajToIDs = function (traj) {
    pArray = traj.trajectory;
    selectArray = "";
    for (var i = 0; i < pArray.length; i++) {
        selectArray += "#statenode" + pArray[i];
        if (i < pArray.length - 1) {
            selectArray += ", ";
            selectArray += "#statelink" + pArray[i] + "_" + pArray[i + 1] + ", ";
        }
    }
    return selectArray;
};

var currentOpacity = 0.7;
function incrementOpacity() {
    currentOpacity = currentOpacity + 0.1;
    if (currentOpacity > 1) currentOpacity = 1;
    applyOpacity(currentOpacity);
}

function decrementOpacity() {
    currentOpacity = currentOpacity - 0.1;
    if (currentOpacity < 0.2) currentOpacity = 0.2;
    applyOpacity(currentOpacity);
}

function applyOpacity(opacityValue) {
    d3.selectAll(".statelink,.statenode,.behaviorlink,.behaviornode")
        .style("stroke-opacity", opacityValue)
        .style("fill-opacity", opacityValue);
}

var freezeLayout = function () {
    // still moving
    if (behaviorforce.alpha() > 0) {
        stateforce.stop();
        behaviorforce.stop();
    } else {
        stateforce.resume();
        behaviorforce.resume();
    }
}

var allCurrentlyFixed = false;
var fixLayout = function () {
    allCurrentlyFixed = !allCurrentlyFixed;
    d3.selectAll(".statenode,.behaviornode")
        .classed("fixed", function (d) {
            d.fixed = allCurrentlyFixed;
        });
}

var incrementGraph = function (forceChoice) {
    var force = stateforce;
    if (forceChoice > 0)
        force = behaviorforce;
    var currentCharge = force.charge();
    force.charge(currentCharge * 1.5).start();
};

var decrementGraph = function (forceChoice) {
    var force = stateforce;
    if (forceChoice > 0)
        force = behaviorforce;
    var currentCharge = force.charge();
    force.charge(currentCharge * 0.7).start();
};

function toggleHighlightPanel() {
    let panel = document.getElementById('highlight-controls')
    let title = document.getElementById('highlight-title')
    let button = document.getElementById('highlight-button')
    let icon = document.getElementById('highlight-button-icon')
    if (panel.classList.contains('highlight-open')) {
        panel.classList.remove('highlight-open')
        panel.classList.add('highlight-closed')
        title.classList.remove('highlight-title-inactive')
        title.classList.add('highlight-title-active')
        button.classList.add('highlight-button-closed')
        icon.classList.remove('highlight-button-icon-closed')
    } else {
        panel.classList.remove('highlight-closed')
        panel.classList.add('highlight-open')
        title.classList.remove('highlight-title-active')
        title.classList.add('highlight-title-inactive')
        button.classList.remove('highlight-button-closed')
        icon.classList.add('highlight-button-icon-closed')
    }
}

function activateCompleteSequence() {
    let complete = document.getElementById('complete-sequence-container')
    if (!complete.classList.contains('complete-sequence-active')) {
        complete.classList.add('complete-sequence-active')
    }
}
