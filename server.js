const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://user:user12345678@cluster0-pimrp.mongodb.net/test?retryWrites=true&w=majority";
//No exemplo não pediu essa linha mais tive que colocar para ter o ObjectId dentro das funções
var ObjectId = require('mongodb').ObjectID;

MongoClient.connect(uri, (err, client) => {
    if (err) return console.log(err)
    db = client.db('crud-nodejs') // coloque o nome do seu DB

    app.listen(3000, () => {
        console.log('Server running on port 3000')
    })
})

app.use(bodyParser.urlencoded({ extended: true }))

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.get('/', (req, res) => {
    var cursor = db.collection('data').find()
})

//o get é para por exemplo um refresh
app.get('/show', (req, res) => {
    db.collection('data').find().toArray((err, results) => {
        if (err) return console.log(err)
        res.render('show.ejs', { data: results })

    })
})

// post é para por exemplo um envio por dentro do formulário
app.post('/show', (req, res) => {
    db.collection('data').save(req.body, (err, result) => {
        if (err) return console.log(err)

        console.log('Salvo no Banco de Dados')
        res.redirect('/show')
    })
})


app.route('/edit/:id')
    .get((req, res) => {
        var id = req.params.id
        //como se busca o valor da coleção data que possue esse nome no banco rsrsrs
        db.collection('data').find(ObjectId(id)).toArray((err, result) => {
            // Manda mensagem no browser do erro
            if (err) return res.send(err)
            res.render('edit.ejs', { data: result })
        })
    })//fim do get
    .post((req, res) => {
        var id = req.params.id
        var name = req.body.name
        var surname = req.body.surname
        db.collection('data').updateOne({ _id: ObjectId(id) }, {
            $set: {
                name: name,
                surname: surname
            }
        }, (err, result )=> {
            if (err) return res.send(err)
            res.redirect('/show')
            console.log('Atualizado no Banco de Dados')
        })
        
    })//fim do post
app.route('/delete/:id')
    .get((req,res)=>{
        var id = req.params.id

        db.collection('data').deleteOne({_id:ObjectId(id)},(err,result)=>{
            if(err)return res.send(500,err)
            console.log('Deletado do Banco de Dados!')
            res.redirect('/show')
        })
        
    })




