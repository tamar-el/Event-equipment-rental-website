
const fs = require('fs');

function get(req, res) {
    fs.readFile("users.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("error read file users ")
        } else {
            res.send(JSON.parse(data));
        }

    })
}
//אפשרות ראשונה ליצא פונקציה מדף
exports.getById = (req, res) => {

    fs.readFile("users.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("error read file users ")
        } else {
            let id = req.params.id;

            data = JSON.parse(data);
            let user = data.find(st => st.id == id)

            if (user == undefined) {
                res.status(500).send("not found student by tz " + id);
            } else {
                res.send(user);
            }

        }


    })
}

exports.login = (req, res) => {
    fs.readFile("users.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("error read file users ")
        } else {
            let user = req.body
            data = JSON.parse(data);
            let currentUser = data.find(st => st.password == user.password)

            if (currentUser == undefined) {
                res.status(500).send("user isn't exist!, please register");
            } else {
                res.send(currentUser);
            }

        }

    })
}
exports.deleteById = (req, res) => {
    fs.readFile("users.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("error read file users ")
        } else {
            let id = req.body;

            data = JSON.parse(data);
            let user = data.find(st => st.id == id)

            if (user == undefined) {
                res.status(500).send("not found student by tz " + id);
            } else {
                data = data.filter(st => st.id != id)
                fs.writeFile("users.json", JSON.stringify(data), (err) => {
                    if (err) {
                        res.status(500).send("error write file users ")
                    } else {
                        res.send("delete user");
                    }
                })
            }

        }

    }
    )
}

exports.post = (req, res) => {
    fs.readFile("users.json", "utf-8", (err, data) => {
        //המרה של טקסט למערך
        let users = JSON.parse(data);
        //body =  לתוכן שנשלח בפונקציה פןסט 
        req.body.id = users[users.length - 1].id + 1
        users.push(req.body);

        fs.writeFile("users.json", JSON.stringify(users), (err) => {
            if (err) {
                res.status(500).send("error  in add users ");
            } else {
                // res.send("sucess add");
                res.json(req.body);
                console.log(req.body, "success add user");
            }
        })
    })
}

exports.put = (req, res) => {
    fs.readFile("users.json", "utf-8", (err, data) => {
        if (err) {
            return res.status(500).send("Error reading users file");
        }

        let id = req.params.id;
        let users;

        try {
            users = JSON.parse(data);
        } catch (parseErr) {
            return res.status(500).send("Error parsing JSON");
        }

        const index = users.findIndex(user => user.id == id);

        if (index === -1) {
            return res.status(404).send("User not found with id: " + id);
        }

        req.body.id = users[index].id; //id נשאר כמו המקורי
        users[index] = req.body;

        fs.writeFile("users.json", JSON.stringify(users, null, 2), (err) => {
            if (err) {
                return res.status(500).send("Error writing to users file");
            }

             res.json(users[index]);
             console.log(req.body, "success add user")
        });
    });
};

//אפשרות שניה ליצא פונקציה מדף
exports.get = get;
