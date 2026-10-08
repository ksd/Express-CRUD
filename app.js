import express from 'express'
const app = express()
app.set('view engine', 'pug')
// extended
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('assets'))

let cats = [{name: 'Garfield', id: 1}, {name: 'Findus', id: 3}, {name: 'Futte', id: 5}]

// Endpoint
// Route
app.get('/', (request, response)=>{
    response.render('index', {name: 'Yvonne', cats})
})

app.get('/cat/:id', (request, response)=>{
    const id = request.params.id
    // convert id to Number
    const cat = cats.find(cat => cat.id === Number(id))
    // PUG crash if !cat so send 404 
    if (!cat) return response.status(404).send('Cat not found')
    response.render('detail', {cat})
})

app.post('/add', (request, response)=>{
    // remove  spaces
    const name = request.body.name?.trim()
    // check for name
    if (!name) return response.status(400).send('No name supplied')
    // find det højeste id og læg en til 
    const id = cats.length ? Math.max(...cats.map(c => c.id)) + 1 : 1
    const cat = {name: name, id: id}
    cats.push(cat)
    response.redirect('/')
})

app.delete('/cat/:id', (request, response)=>{
    const id = request.params.id
    // convert id to Number
    const index = cats.findIndex(cat => cat.id === Number(id))
    // check om id findes og hvis ikke, så svar error tilbage
    if (index === -1) return response.status(404).json({ error: 'Not found' })
    const deletedCat = cats.splice(index, 1)
    response.json(deletedCat[0])
})

app.put('/cat/:id', (request, response) => {
    const id = request.params.id
    // convert id to Number
    const index = cats.findIndex(cat => cat.id === Number(id))
    // check om id findes og hvis ikke, så svar error tilbage
    if (index === -1) return response.status(404).json({ error: 'Not found' })
    const name = request.body.name
    // check for name
    if (!name) return response.status(400).json({error: 'No name supplied'})
    cats[index].name = name
    response.json('OK')
})


app.listen(8000, (error) => {
    if (error) return console.error('Kunne ikke starte:', error.message)
    console.log('Fut fut, nu kører toget')
})