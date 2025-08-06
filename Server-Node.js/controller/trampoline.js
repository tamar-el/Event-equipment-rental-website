const fs = require('fs');
function getTrampoline(req, res) {
    fs.readFile("trampoline.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("error read file student ")
        } else {
            res.send(JSON.parse(data));
        }

    })
}

function deleteTrampoline(req, res) {
    const idToDelete = req.params.id;

    fs.readFile("trampoline.json", "utf-8", (err, data) => {
        if (err) {
            return res.status(500).send("Error reading file bags.json");
        }

        let tramp;
        try {
            tramp = JSON.parse(data);
        } catch (parseErr) {
            return res.status(500).send("Error parsing JSON");
        }

        const updatedTramp = tramp.filter(tra => tra.id != idToDelete);

        fs.writeFile("trampoline.json", JSON.stringify(updatedTramp, null, 2), "utf-8", (err) => {
            if (err) {
                return res.status(500).send("Error writing to file");
            }
            res.json(updatedTramp)
            console.log(`Trampoline with id ${idToDelete} deleted successfully`)
            // res.send({ message: `Trampoline with id ${idToDelete} deleted successfully`, tramp: updatedTramp });
        });
    });
}

function post(req, res) {
    fs.readFile("trampoline.json", "utf-8", (err, data) => {
        if (err) {
            return res.status(500).send("Error reading file");
        }

        let trampolines = [];

        try {
            trampolines = JSON.parse(data);
        } catch (e) {
            return res.status(500).send("Invalid JSON in trampoline.json");
        }

        // מציאת ה־ID הכי גבוה
        const maxId = trampolines.reduce((max, item) => {
            const id = parseInt(item.id, 10);
            return id > max ? id : max;
        }, 0);

        const newTrampoline = {
            ...req.body,
            id: (maxId + 1).toString()
        };

        trampolines.push(newTrampoline);

        fs.writeFile("trampoline.json", JSON.stringify(trampolines, null, 2), (err) => {
            if (err) {
                res.status(500).send("Error writing file");
            } else {
                // החזרת כל המוצרים כולל החדש
                res.status(201).json(trampolines);
            }
        });
    });
}
function put(req, res) {
    fs.readFile("trampoline.json", "utf-8", (err, data) => {
        if (err) {
            return res.status(500).send("Error reading users file");
        }

        let id = req.params.id;
        let trampolines;

        try {
            trampolines = JSON.parse(data);
        } catch (parseErr) {
            return res.status(500).send("Error parsing JSON");
        }

        const index = trampolines.findIndex(tramp => tramp.id == id);

        if (index === -1) {
            return res.status(404).send("trampoline not found with id: " + id);
        }

        req.body.id = trampolines[index].id; //id נשאר כמו המקורי
        trampolines[index] = req.body;

          fs.writeFile("trampoline.json", JSON.stringify(trampolines, null, 2), (err) => {
            if (err) {
                res.status(500).send("Error writing file");
            } else {
                // החזרת כל המוצרים כולל החדש
                res.status(201).json(trampolines);
            }
        });
    });
};


module.exports={getTrampoline, deleteTrampoline,post,put}