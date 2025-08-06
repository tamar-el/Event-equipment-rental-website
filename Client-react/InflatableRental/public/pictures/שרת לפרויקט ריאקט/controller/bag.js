const fs = require('fs');
function get(req, res) {
    fs.readFile("bags.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("error read file student ")
        } else {
            res.send(JSON.parse(data));
        }

    })
}

// function deleteBag(req, res) {
//     fs.writeFile("bags.json", "utf-8", (err, data) => {
//         if (err) {
//             res.status(500).send("error read file student ")
//         } else {
//             res.send(JSON.parse(data));
//         }

//     })
// }
function deleteBag(req, res) {
    const idToDelete = req.params.id;

    fs.readFile("bags.json", "utf-8", (err, data) => {
        if (err) {
            return res.status(500).send("Error reading file bags.json");
        }

        let bags;
        try {
            bags = JSON.parse(data);
        } catch (parseErr) {
            return res.status(500).send("Error parsing JSON");
        }

        const updatedBags = bags.filter(bag => bag.id != idToDelete);

        fs.writeFile("bags.json", JSON.stringify(updatedBags, null, 2), "utf-8", (err) => {
            if (err) {
                return res.status(500).send("Error writing to file");
            }

            res.send({ message: `Bag with id ${idToDelete} deleted successfully`, bags: updatedBags });
        });
    });
}

module.exports={get, deleteBag}