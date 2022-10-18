// CONFIG INICIAL   
const express = require(`express`)
const app = express()

const hostname = '127.0.0.1';
const port = 3000;

const quizzes = [
    { _id: 123, title: `Quiz 1`, active: true },
    { _id: 345, title: `Quiz 2`, active: true },
    { _id: 567, title: `Quiz 3`, active: false },
]

//forma de ler JSON, configurar um middleares
app.use(
    express.urlencoded({
        extended: true,
    })
)

app.use(express.json())

//rota inicial / endopoint
app.get(`/`, (req, res) => {
    // mostrar req

    //res.json({ message: `Oi Express` })
    res.sendFile(__dirname + `/index_params.html`)
})

app.get(`/send_file`, (req, res) => {
    // mostrar req
    res.sendFile(__dirname + `/index.html`)
})

app.get(`/quizzes`, (req, res) => {
    // mostrar req
    //res.send(quizzes.filter(i => !i.active))
    res.status(200).json(quizzes)
})

app.get(`/quizzes/:id`, (req, res) => {
    // mostrar req
    console.log(req.params.id)
    let quizze = quizzes.filter(i => i._id == parseInt(req.params.id))
    console.log(`teste:`, quizze)
    return res.status(200).json(quizze)

})

app.get(`/quizzes/:active`, (req, res) => {
    // mostrar req
    console.log(req.params.id)
    //res.send(quizzes.filter(i => (String(i.active).toLowerCase() === req.params.active)))
    res.send(quizzes.filter(i => (`${i.active}` == req.params.active)))
})

app.post(`/quizzes`, (req, res) => {
    const { _id, title, active } = req.body
    const quizze = { _id, title, active }
    quizzes.push(quizze)

    return res.status(201).json(quizzes)
})

// https://bobbyhadz.com/blog/javascript-remove-object-from-array-by-value#:~:text=To%20remove%20an%20object%20from,removing%20or%20replacing%20existing%20elements.
app.delete(`/quizzes/:id`, (req, res) => {
    const indexOfObject = quizzes.findIndex(o => o._id == req.params.id);
    console.log('index object in array:', indexOfObject);

    quizzes.splice(indexOfObject, 1);
    console.log(quizzes);

    return res.status(200).json(quizzes)
})

app.get(`/query_teste`, (req, res) => {
    // mostrar req
    res.end('Bem_Vindo: ' + req.query.nome + `; Idade: ` + req.query.idade)
})


//entregar uma porta para disponibilizar para que possamos testar
app.listen(port, hostname, () => console.log(`Server rodando!  http://${hostname}:${port}/`))
