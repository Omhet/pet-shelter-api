import compression from 'compression';
import cors from 'cors';
import express from 'express';
import { getCat, getDog } from './parsers';

const app = express();

app.use(cors());
app.use(compression());

app.get('/dog/:index', async (req, res) => {
    const animal = await getDog(Number(req.params.index));
    res.json(animal);
});

app.get('/cat/:index', async (req, res) => {
    const animal = await getCat(Number(req.params.index));
    res.json(animal);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Your app is listening on port ' + port);
});
