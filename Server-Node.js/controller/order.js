
const e = require('express');
const fs = require('fs');

function get(req, res) {
    fs.readFile("orders.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("error read file student ")
        } else {
            res.send(JSON.parse(data));
        }

    })
}
// exports.deleteItemFromCartFuncyion = (req, res) => {
//     fs.readFile("orders.json", "utf-8", (err, data) => {
//         if (err) {
//             res.status(500).send("error read file student ")
//         } else {
//             let id = req.params.id;
//             console.log("ID to delete:", id);

//             data = JSON.parse(data);
//             let order = data.find(st => st.id == id)

//             if (order == undefined) {
//                 res.status(500).send("not found student by tz " + id);
//             } else {
//                 deleteItemFromCart(data, id);
//                 res.send(order);
//             }

//         }
//     }
//     )
// }
// deleteItemFromCart = (cart, id) => {
//     let index = cart.findIndex(item => item.id == id);
//     if (index !== -1) {
//         cart.splice(index, 1);
//     }
//     return cart;
// }
exports.deleteById = (req, res) => {
    fs.readFile("orders.json", "utf-8", (err, data) => {
        if (err) {
            return res.status(500).send("error reading file");
        }

        let id = req.params.id;
        console.log("ID to delete:", id);

        let orders = JSON.parse(data);
        let order = orders.find(o => String(o.id) === String(id));

        if (!order) {
            return res.status(404).send("Order not found with id " + id);
        }

        orders = orders.filter(o => String(o.id) !== String(id));

        fs.writeFile("orders.json", JSON.stringify(orders, null, 2), (err) => {
            if (err) {
                return res.status(500).send("Error writing file");
            }

            res.json({ deletedId: id });
        });
    });
};

//אפשרות ראשונה ליצא פונקציה מדף
exports.getById = (req, res) => {

    fs.readFile("orders.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("error read file student ")
        } else {
            let id = req.params.id;

            data = JSON.parse(data);
            let order = data.find(st => st.id == id)

            if (order == undefined) {
                res.status(500).send("not found student by tz " + id);
            } else {
                res.send(order);
            }

        }


    })
}


exports.post = (req, res) => {

    fs.readFile("orders.json", "utf-8", (err, data) => {
        //המרה של טקסט למערך
        let orders = JSON.parse(data);
        //body =  לתוכן שנשלח בפונקציה פןסט 
        const newId = orders.length > 0 ? orders[orders.length - 1].id + 1 : 1;

        const newOrder = {
            ...req.body,
            id: newId
        };
        orders.push(newOrder);
        fs.writeFile("orders.json", JSON.stringify(orders), (err) => {
            if (err) {
                res.status(500).send("error  in add order ");
            } else {
                 res.json(orders)
                
               
            }
        })
    })
}
//אפשרות שניה ליצא פונקציה מדף
exports.get = get;
