const { response, query } = require('express')
const express = require('express')
const app = express()
const path = require('path')
const request = require('request')

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.static('public'))

app.get('/search', (req,res)=>{
    res.render('search')
})

app.get('/results', (req,res)=>{
    
    const query = req.query.search;

    request.get(
    'https://api.themoviedb.org/3/search/movie?api_key=45a29c8d44a5f2c249ae528f0532f5d6&query=' + query, 
    (error, response, body)=>{
        
        if(error){
            console.log(error);
        }
        console.log('what is body', body)
        const data = JSON.parse(body);
        data.searchQuery = query
        console.log('results are ', data)


         res.render('results', {data:data})
    })

   
})

app.listen(3000, ()=>{
    console.log('Listening on port 3000')
})

