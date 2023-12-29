require('dotenv').config();
const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');

const app = express();
app.use(cors());
const PORT= process.env.SERVER_PORT || 5000;




app.get('/', async(req,res)=> {
    res.status(200).send('Server is running');
});

app.get('/info', async(req,res)=> {
   try {
    const {url} = req.query;
    const videoInfo = await ytdl.getInfo(url);
    res.status(200).send(videoInfo);
    console.log('GET Request received');
    
   } catch (error) {
    res.status(500).send('Something wents wrong');
    
   }
})



app.listen(PORT, ()=> {
    console.log(`server is running at http://localhost:${PORT}`);
})