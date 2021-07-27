var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/swag-shop', {useNewUrlParser: true, useUnifiedTopology: true});

var Product = require('./model/product');
var WishList = require('./model/wishlist');
var Hero = require('./model/hero');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
})

app.get('/all-heroes', function(req, res){
    Hero.find({}).populate({path:'heroes', model: 'Hero'}).exec(function(err, heroes){
        if (err){
            res.status(500).send({error:"could not fetch heroes"});
        }
        else{
            res.send(heroes);
        }
    })
});

app.post('/hero', function(req,res){
    var hero = new Hero();
    hero.id = req.body.id;
    hero.name = req.body.name;
    hero.save(function(err, savedHero){
        if (err){
            res.status(500).send({error: "Could not save Hero"});
        } else {
            res.send(savedHero);
        }
    });
})
app.get('/hero/:id', function(req, res){
    Hero.findOne({id: req.params.id}, function(err, hero){
        if (err){
            res.status(500).send({error: "no Hero with this ID"});
        }
        else{
            console.log(hero);
            res.send(hero);
        }
    });            
})
app.post('/product', function(req, res){
    var product = new Product();
    product.title = req.body.title;
    product.price = req.body.price;
    product.save(function(err, savedProduct){
        if (err){
            res.status(500).send({error: "Could not save product"});
        } else {
            res.send(savedProduct);
        }
    });
});

app.get('/wishlist', function(req, res){
    WishList.find({}).populate({path:'products', model: 'Product'}).exec(function(err, wishlists){
        if (err){
            res.status(500).send({error:"could not fetch wishlist"});
        }
        else{
            res.send(wishlists);
        }
    })
})

app.get('/product', function(req, res){
    Product.find({}, function(err, products){
        if (err){
            res.status(500).send({error:"could not fetch data"})
        }
        else{
            res.send(products)
        }
    } );

});

app.post('/wishlist', function(req, res){
    var wishList = new WishList();
    wishList.title = req.body.title;
    wishList.save(function(err, newWishList){
        if (err) {
            res.status(500).send({error: "could no create your stupid WL"});
        }
        else{
            res.send(newWishList);
        }
    })
})

app.put('/wishlist/product/add', function(req, res){
    Product.findOne({_id: req.body.productId}, function(err, product){
        if (err){
            res.status(500).send({error: "no product of the sort"});
        }
        else{
            WishList.updateOne({_id:req.body.wishListId}, {$addToSet:{products: product._id}}, function(err, wishList){
                if (err){
                    res.status(500).send({error:"could not "});
                }
                else{
                    res.send(wishList);
                }
            });
        }
    })
})

    // Hero.findOne({id: req.params.id}, function(err, hero){
    //     if (err){
    //         res.status(500).send({error: "no Hero with this ID"});
    //     }

app.put('/hero/',function(req,res){
    Hero.findOneAndUpdate({_id: req.body._id}, {$set:{"name": req.body.name}}, {new: true} , function(err,hero){
        if(err){
            res.status(500).send({error:"could not find him"})
        }
        else{
            res.send(hero)
        }
    })
})

// app.put('/hero/', function(req, res){
//     Hero.findOne({_id: req.body._id}, function(err, hero){
//         if (err){
//             res.status(500).send({error: "no hero with this ID"});
//         }
//         else{
//             console.log(req.body.name, req.body._id, hero);
//             Hero.updateOne({_id:req.body._id}, {$set:{"name":req.body.name}}, function(err, hero){
//                 if (err){
//                     res.status(500).send({error:"could not "});
//                 }
//                 else{
//                     res.send(hero);
//                 }
//             });
//         }
//     })
// })
app.listen(3000, function(){
    console.log("YallaMaccabi");
});