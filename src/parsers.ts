import { JSDOM } from 'jsdom';
import { getText, getImage } from './utils';

const parserOptions = {
    referrer: 'https://example.com/',
};

const dogsUrl = 'https://izpriuta.ru/sobaki';
const catsUrl = 'https://izpriuta.ru/koshki';

export const getAnimal = async (url: string, index: number) => {
    const cardsOnPage = 9;
    const page = Math.floor(index / cardsOnPage);
    const cardIndex = index % cardsOnPage;

    const dom = await JSDOM.fromURL(`${url}?page=${page}`, parserOptions);
    const doc = dom.window.document;
    const cards = doc.querySelectorAll('.card.box');
    const card = cards[cardIndex];
    const name = getText(card, '.title h2');
    const gender = getText(card, '.title .gender');
    const description = getText(card, '.h4');
    const img = getImage(card, '.img-wrap img');

    return { name, gender, description, img };
};

export const getDog = async (index: number) => getAnimal(dogsUrl, index)
export const getCat = async (index: number) => getAnimal(catsUrl, index)