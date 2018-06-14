// Shop.findOne({ name: 'Food Lovers Market' }, (err, shop) => {
//     Status.findOne({ name: 'Permanent' }, (err, status) => {
//         Item.create({
//             name: "Rice",
//             shop: shop,
//             sorting: 90,
//             isRepeating: true,
//             status: status
//         }, (err, item) => {
//             if (err) {
//                 console.log(err);
//              } else {
//                  console.log(item);
//              }
//         })
//     })
// });

Item.find({}, (err, item) => {
    if (err) {
        console.log(err);
    } else {
        console.log(item);
    }
})