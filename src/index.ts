import compression from 'compression';
import cors from 'cors';
import express from 'express';
import { getCat, getDog, getDogsNumber } from './parsers';

const app = express();

app.use(cors());
app.use(compression());

app.get('/dogs/number', async (_req, res) => {
    const data = await getDogsNumber();
    res.json(data);
});

app.get('/dogs/:index', async (req, res) => {
    const data = await getDog(Number(req.params.index));
    res.json(data);
});

app.get('/cats/:index', async (req, res) => {
    const data = await getCat(Number(req.params.index));
    res.json(data);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Your app is listening on port ' + port);
});
