var id = document.getElementById("drawflow");
const editor = new Drawflow(id);
editor.reroute = true;
editor.reroute_fix_curvature = true;
editor.force_first_input = false;

const dataToImport = {
  drawflow: {
    Home: {
      data: {
        1: {
          id: 1,
          name: "activity1",
          data: {},
          class: "activity1",
          html: '\n<div>\n<div class="title-box"><i class="fab fa-flag"></i>Activity 1</div>\n</div>\n',
          typenode: false,
          inputs: {},
          outputs: {
            output_1: {
              connections: [{ node: "2", output: "input_1" }],
            },
          },
          pos_x: 347,
          pos_y: 87,
        },

        2: {
          id: 2,
          name: "email",
          data: {},
          class: "email",
          html: '\n<div>\n<div class="title-box"><i class="fas fa-at"></i><span> Email send</span></div>\n</div>\n',
          typenode: false,
          inputs: {
            input_1: {
              connections: [{ node: "1", input: "output_1" }],
            },
          },
          outputs: {},
          pos_x: 1000,
          pos_y: 360,
        },
      },
    },
  },
};

editor.start();
editor.import(dataToImport);

// Events!
editor.on("nodeCreated", function (id) {
  console.log("Node created " + id);
});

editor.on("nodeRemoved", function (id) {
  console.log("Node removed " + id);
});

editor.on("nodeSelected", function (id) {
  console.log("Node selected " + id);
  //alert("node selected, id: " + id);
});

editor.on("moduleCreated", function (name) {
  console.log("Module Created " + name);
});

editor.on("moduleChanged", function (name) {
  console.log("Module Changed " + name);
});

editor.on("connectionCreated", function (connection) {
  console.log("Connection created");
  console.log(connection);
});

editor.on("connectionRemoved", function (connection) {
  console.log("Connection removed");
  console.log(connection);
});
/*
    editor.on('mouseMove', function(position) {
      console.log('Position mouse x:' + position.x + ' y:'+ position.y);
    })
*/
editor.on("nodeMoved", function (id) {
  console.log("Node moved " + id);
});

editor.on("zoom", function (zoom) {
  console.log("Zoom level " + zoom);
});

editor.on("translate", function (position) {
  console.log("Translate x:" + position.x + " y:" + position.y);
});

editor.on("addReroute", function (id) {
  console.log("Reroute added " + id);
});

editor.on("removeReroute", function (id) {
  console.log("Reroute removed " + id);
});
/* DRAG EVENT */

/* Mouse and Touch Actions */

var elements = document.getElementsByClassName("drag-drawflow");
for (var i = 0; i < elements.length; i++) {
  elements[i].addEventListener("touchend", drop, false);
  elements[i].addEventListener("touchmove", positionMobile, false);
  elements[i].addEventListener("touchstart", drag, false);
}

var mobile_item_selec = "";
var mobile_last_move = null;
function positionMobile(ev) {
  mobile_last_move = ev;
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  if (ev.type === "touchstart") {
    mobile_item_selec = ev.target
      .closest(".drag-drawflow")
      .getAttribute("data-node");
  } else {
    ev.dataTransfer.setData("node", ev.target.getAttribute("data-node"));
  }
}

function drop(ev) {
  if (ev.type === "touchend") {
    var parentdrawflow = document
      .elementFromPoint(
        mobile_last_move.touches[0].clientX,
        mobile_last_move.touches[0].clientY
      )
      .closest("#drawflow");
    if (parentdrawflow != null) {
      addNodeToDrawFlow(
        mobile_item_selec,
        mobile_last_move.touches[0].clientX,
        mobile_last_move.touches[0].clientY
      );
    }
    mobile_item_selec = "";
  } else {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("node");
    addNodeToDrawFlow(data, ev.clientX, ev.clientY);
  }
}

function addNodeToDrawFlow(name, pos_x, pos_y) {
  if (editor.editor_mode === "fixed") {
    return false;
  }
  pos_x =
    pos_x *
      (editor.precanvas.clientWidth /
        (editor.precanvas.clientWidth * editor.zoom)) -
    editor.precanvas.getBoundingClientRect().x *
      (editor.precanvas.clientWidth /
        (editor.precanvas.clientWidth * editor.zoom));
  pos_y =
    pos_y *
      (editor.precanvas.clientHeight /
        (editor.precanvas.clientHeight * editor.zoom)) -
    editor.precanvas.getBoundingClientRect().y *
      (editor.precanvas.clientHeight /
        (editor.precanvas.clientHeight * editor.zoom));

  switch (name) {
    case "activity1":
      var activity1 = `<div>
                <div class="title-box"><i class="fab fa-flag"></i> Activity 1</div>
            </div>`;
      editor.addNode(
        "activity1",
        0,
        1,
        pos_x,
        pos_y,
        "activity1",
        {},
        activity1
      );
      break;

    case "activity2":
      var activity2 = `<div>
                <div class="title-box"><i class="fab fa-flag"></i> Activity 1</div>
            </div>`;
      editor.addNode(
        "activity2",
        0,
        1,
        pos_x,
        pos_y,
        "activity2",
        {},
        activity2
      );
      break;

    case "activity3":
      var activity3 = `<div>
                <div class="title-box"><i class="fab fa-flag"></i> Activity 3</div>
            </div>`;
      editor.addNode(
        "activity3",
        0,
        1,
        pos_x,
        pos_y,
        "activity3",
        {},
        activity3
      );
      break;

    case "email":
      var email = `
        <div>
          <div class="title-box"><i class="fas fa-at"></i> Send Email </div>
        </div>
        `;
      editor.addNode("email", 1, 2, pos_x, pos_y, "email", {}, email);
      break;

    default:
      break;
  }
}

var transform = "";
function showpopup(e) {
  e.target.closest(".drawflow-node").style.zIndex = "9999";
  e.target.children[0].style.display = "block";
  //document.getElementById("modalfix").style.display = "block";

  //e.target.children[0].style.transform = 'translate('+translate.x+'px, '+translate.y+'px)';
  transform = editor.precanvas.style.transform;
  editor.precanvas.style.transform = "";
  editor.precanvas.style.left = editor.canvas_x + "px";
  editor.precanvas.style.top = editor.canvas_y + "px";
  console.log(transform);

  //e.target.children[0].style.top  =  -editor.canvas_y - editor.container.offsetTop +'px';
  //e.target.children[0].style.left  =  -editor.canvas_x  - editor.container.offsetLeft +'px';
  editor.editor_mode = "fixed";
}

function closemodal(e) {
  e.target.closest(".drawflow-node").style.zIndex = "2";
  e.target.parentElement.parentElement.style.display = "none";
  //document.getElementById("modalfix").style.display = "none";
  editor.precanvas.style.transform = transform;
  editor.precanvas.style.left = "0px";
  editor.precanvas.style.top = "0px";
  editor.editor_mode = "edit";
}

function changeModule(event) {
  var all = document.querySelectorAll(".menu ul li");
  for (var i = 0; i < all.length; i++) {
    all[i].classList.remove("selected");
  }
  event.target.classList.add("selected");
}

function changeMode(option) {
  //console.log(lock.id);
  if (option == "lock") {
    lock.style.display = "none";
    unlock.style.display = "block";
  } else {
    lock.style.display = "block";
    unlock.style.display = "none";
  }
}
