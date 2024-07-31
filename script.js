let draggedElement = null;

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  draggedElement = ev.target;
  ev.dataTransfer.setData("text", ev.target.id);
  ev.target.classList.add("dragging");
}

function drop(ev, sectionId) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  var element = document.getElementById(data);
  var listId = element.getAttribute("id");

  if (listId.startsWith("terminal")) {
    sectionId = sectionId.replace("relic", "terminals");
  } else if (listId.startsWith("relic")) {
    sectionId = sectionId.replace("terminals", "relic");
  }

  var section = document.getElementById(sectionId);

  if (!section.contains(element)) {
    var clone = element.cloneNode(true);
    clone.removeAttribute("draggable");
    clone.setAttribute("data-id", element.id);
    clone.removeAttribute("id");
    clone.classList.remove("draggable");
    clone.classList.remove("dragging");
    clone.innerHTML +=
      ' <span class="remove-btn" onclick="removeItem(this)">&#10005;</span>';
    section.appendChild(clone);
    element.style.display = "none";
  }
  element.classList.remove("dragging");
  draggedElement = null;

  if (section.children.length === 0) {
    section.parentElement.style.display = "none";
  }
}

function removeItem(btn) {
  var item = btn.parentElement;
  var itemId = item.getAttribute("data-id");
  var group = item.parentElement;

  document.getElementById(itemId).style.display = "block";
  item.remove();

  if (group.children.length > 0) {
  } else {
    group.parentElement.style.display = "none";
  }
}

document.addEventListener("dragend", function () {
  if (draggedElement) {
    draggedElement.classList.remove("dragging");
    draggedElement = null;
  }
});
function modalFunc() {
  const nameInput = document.getElementById("zip-name").value.trim();
  if (!nameInput || nameInput == "default") return;
  document.getElementById("your-folder").innerText = nameInput;
  document.getElementById(
    "your-folder-command"
  ).innerText = `/ga select ${nameInput}`;
  $("#downloadModal").modal("show");
}
function generateZIP() {
  const zip = new JSZip();
  const nameInput = document.getElementById("zip-name").value.trim();
  if (!nameInput || nameInput == "default") return;
  const folderName = `${nameInput}`;

  const sections = [
    "archer-terminals",
    "tank-terminals",
    "archer-relic",
    "tank-relic",
  ];

  sections.forEach((sectionId) => {
    const section = document.getElementById(sectionId);
    const items = section.querySelectorAll(".list-group-item");

    const sectionJson = [];
    items.forEach((element) => {
      const jsonString = element.getAttribute("data-json");
      const jsonEntries = jsonString
        .split("}, {")
        .map((entry) => {
          return entry.startsWith("{") ? entry : `{${entry}`;
        })
        .map((entry) => {
          return entry.endsWith("}") ? entry : `${entry}}`;
        });
      jsonEntries.forEach((jsonEntry) =>
        sectionJson.push(JSON.parse(jsonEntry))
      );
    });

    zip
      .folder(folderName)
      .file(`${sectionId}.json`, JSON.stringify(sectionJson, null, 2));
  });

  zip
    .generateAsync({ type: "blob" })
    .then(function (content) {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(content);
      a.download = `unzip-${folderName}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    })
    .catch(function (err) {
      console.error("Error generating ZIP file:", err);
    });
}

document.addEventListener("DOMContentLoaded", (event) => {
  const itemGroups = [
    {
      id: "terminals-1",
      items: [
        {
          id: "terminal-1-1",
          name: "Terminal 1-1",
          json: '{ "x": 110.5, "y": 113, "z": 73.5, "r": 0, "g": 1, "b": 0, "options": { "name": "1-1" } }',
        },
        {
          id: "terminal-1-2",
          name: "Terminal 1-2",
          json: '{ "x": 110.5, "y": 119, "z": 79.5, "r": 0, "g": 1, "b": 0, "options": { "name": "1-2" } }',
        },
        {
          id: "terminal-1-3",
          name: "Terminal 1-3",
          json: '{ "x": 90.5, "y": 112, "z": 92.5, "r": 0, "g": 1, "b": 0, "options": { "name": "1-3" } }',
        },
        {
          id: "terminal-1-4",
          name: "Terminal 1-4",
          json: '{ "x": 90.5, "y": 122, "z": 101.5, "r": 0, "g": 1, "b": 0, "options": { "name": "1-4" } }',
        },
        {
          id: "terminal-1-dev",
          name: "Device - 1",
          json: '{ "x": 110, "y": 120, "z": 94, "r": 0, "g": 1, "b": 0, "options": { "name": "1-dev" } }',
        },
      ],
    },
    {
      id: "terminals-2",
      items: [
        {
          id: "terminal-2-1",
          name: "Terminal 2-1",
          json: '{ "x": 68.5, "y": 109, "z": 122.5, "r": 0, "g": 1, "b": 0, "options": { "name": "2-1" } }',
        },
        {
          id: "terminal-2-2",
          name: "Terminal 2-2",
          json: '{ "x": 59.5, "y": 120, "z": 124.5, "r": 0, "g": 1, "b": 0, "options": { "name": "2-2" } }',
        },
        {
          id: "terminal-2-3",
          name: "Terminal 2-3",
          json: '{ "x": 47.5, "y": 109, "z": 122.5, "r": 0, "g": 1, "b": 0, "options": { "name": "2-3" } }',
        },
        {
          id: "terminal-2-4",
          name: "Terminal 2-4",
          json: '{ "x": 39, "y": 108, "z": 140, "r": 0, "g": 1, "b": 0, "options": { "name": "2-4" } }',
        },
        {
          id: "terminal-2-5",
          name: "Terminal 2-5",
          json: '{ "x": 40.5, "y": 124, "z": 125.5, "r": 0, "g": 1, "b": 0, "options": { "name": "2-5" } }',
        },
        {
          id: "terminal-2-dev",
          name: "Device - 2",
          json: '{ "x": 60.5, "y": 132, "z": 140.5, "r": 0, "g": 1, "b": 0, "options": { "name": "2-dev" } }',
        },
      ],
    },
    {
      id: "terminals-3",
      items: [
        {
          id: "terminal-3-1",
          name: "Terminal 3-1",
          json: '{ "x": -0.5, "y": 109, "z": 112.5, "r": 0, "g": 1, "b": 0, "options": { "name": "3-1" } }',
        },
        {
          id: "terminal-3-2",
          name: "Terminal 3-2",
          json: '{ "x": 0.5, "y": 119, "z": 93.5, "r": 0, "g": 1, "b": 0, "options": { "name": "3-2" } }',
        },
        {
          id: "terminal-3-3",
          name: "Terminal 3-3",
          json: '{ "x": 16.5, "y": 123, "z": 93.5, "r": 0, "g": 1, "b": 0, "options": { "name": "3-3" } }',
        },
        {
          id: "terminal-3-4",
          name: "Terminal 3-4",
          json: '{ "x": 0.5, "y": 109, "z": 77.5, "r": 0, "g": 1, "b": 0, "options": { "name": "3-4" } }',
        },
        {
          id: "terminal-3-dev",
          name: "Device - 3",
          json: '{ "x": 0.5, "y": 120, "z": 77.5, "r": 0, "g": 1, "b": 0, "options": { "name": "3-dev" } }',
        },
      ],
    },
    {
      id: "terminals-4",
      items: [
        {
          id: "terminal-4-1",
          name: "Terminal 4-1",
          json: '{ "x": 41.5, "y": 109, "z": 32.5, "r": 0, "g": 1, "b": 0, "options": { "name": "4-1" } }',
        },
        {
          id: "terminal-4-2",
          name: "Terminal 4-2",
          json: '{ "x": 44.5, "y": 121, "z": 30.5, "r": 0, "g": 1, "b": 0, "options": { "name": "4-2" } }',
        },
        {
          id: "terminal-4-3",
          name: "Terminal 4-3",
          json: '{ "x": 67.5, "y": 109, "z": 32.5, "r": 0, "g": 1, "b": 0, "options": { "name": "4-3" } }',
        },
        {
          id: "terminal-4-4",
          name: "Terminal 4-4",
          json: '{ "x": 72.5, "y": 115, "z": 47.5, "r": 0, "g": 1, "b": 0, "options": { "name": "4-4" } }',
        },
        {
          id: "terminal-4-dev",
          name: "Device - 4",
          json: '{ "x": 63.5, "y": 127, "z": 35.5, "r": 0, "g": 1, "b": 0, "options": { "name": "4-dev" } }',
        },
      ],
    },
    {
      id: "relics",
      items: [
        {
          id: "relic-green",
          name: "Green Relic",
          json: '{ "x": 20.5, "y": 7, "z": 94.5, "r": 0, "g": 1, "b": 0, "options": { "name": "crystal-green" } }, { "x": 49.5, "y": 7.5, "z": 44.5, "r": 0, "g": 1, "b": 0, "options": { "name": "altar-green" } }',
        },
        {
          id: "relic-red",
          name: "Red Relic",
          json: '{ "x": 20.5, "y": 7, "z": 59.5, "r": 0, "g": 1, "b": 0, "options": { "name": "crystal-red" } }, { "x": 51.5, "y": 7.5, "z": 42.5, "r": 0, "g": 1, "b": 0, "options": { "name": "altar-red" } }',
        },
        {
          id: "relic-orange",
          name: "Orange Relic",
          json: '{ "x": 92.5, "y": 7, "z": 56.5, "r": 0, "g": 1, "b": 0, "options": { "name": "crystal-orange" } }, { "x": 57.5, "y": 7.5, "z": 42.5, "r": 0, "g": 1, "b": 0, "options": { "name": "altar-orange" } }',
        },
        {
          id: "relic-purple",
          name: "Purple Relic",
          json: '{ "x": 56.5, "y": 9, "z": 132.5, "r": 0, "g": 1, "b": 0, "options": { "name": "crystal-purple" } }, { "x": 54.5, "y": 7.5, "z": 41.5, "r": 0, "g": 1, "b": 0, "options": { "name": "altar-purple" } }',
        },
        {
          id: "relic-blue",
          name: "Blue Relic",
          json: '{ "x": 91.5, "y": 7, "z": 94.5, "r": 0, "g": 1, "b": 0, "options": { "name": "crystal-blue" } }, { "x": 59.5, "y": 7.5, "z": 44.5, "r": 0, "g": 1, "b": 0, "options": { "name": "altar-blue" } }',
        },
      ],
    },
  ];

  itemGroups.forEach((group) => {
    const groupElement = document.getElementById(group.id);
    const itemGroupElement = document.getElementById(group.id + "-group");
    group.items.forEach((item) => {
      const itemElement = document.createElement("div");
      itemElement.classList.add("draggable", "list-group-item");
      itemElement.id = item.id;
      itemElement.draggable = true;
      itemElement.ondragstart = drag;
      itemElement.setAttribute("data-json", item.json);
      itemElement.textContent = item.name;
      groupElement.appendChild(itemElement);
    });
    if (group.items.length > 0) {
      itemGroupElement.style.display = "block";
    }
  });
});

///////////////
// Dark Mode //
///////////////
document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.querySelector(".dark-mode-switch");

  toggleButton.addEventListener("click", function () {
    if (document.body.classList.contains("dark-mode")) {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("darkMode", "disabled");
    } else {
      document.body.classList.add("dark-mode");
      localStorage.setItem("darkMode", "enabled");
    }
  });

  if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
  } else {
    if (localStorage.getItem("darkMode") === "disabled")
      document.body.classList.remove("dark-mode");
  }
});
