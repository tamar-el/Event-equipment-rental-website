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

            res.send({ message: `Trampoline with id ${idToDelete} deleted successfully`, tramp: updatedTramp });
        });
    });
}
function post(req, res)  {

    fs.readFile("trampoline.json", "utf-8", (err, data) => {
        //המרה של טקסט למערך
        let trampolines = JSON.parse(data);
        //body =  לתוכן שנשלח בפונקציה פןסט 
        trampolines.push(req.body);
        fs.writeFile("trampoline.json", JSON.stringify(trampolines), (err) => {
            if (err) {
                res.status(500).send("error  in add order ");
            } else {
                res.send("sucess add Trampoline");
            }
        })
    })
}

module.exports={getTrampoline, deleteTrampoline,post}