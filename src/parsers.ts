import { JSDOM } from 'jsdom';
import { getText, getImage, getLink } from './utils';

const parserOptions = {
    referrer: 'https://example.com/',
};

const dogsUrl = 'https://izpriuta.ru/sobaki';
const catsUrl = 'https://izpriuta.ru/koshki';

export const getTotalCardsNumber = (dom: JSDOM) => {
    const doc = dom.window.document;
    const link = doc.querySelector('.pager-last.last a');
    let [_, totalPagesMatch] =
        link?.getAttribute('href')?.match(/page=(\d+)/) ?? [];

    const totalPages = Number(totalPagesMatch) || 0;
    const total = totalPages * getPageCardsNumber(dom);

    return total;
};

export const getPageCardsNumber = (dom: JSDOM) => {
    const doc = dom.window.document;
    const cards = doc.querySelectorAll('.card.box');

    return cards.length;
}

export const getAnimal = async (url: string, index: number) => {
    // TODO: Use getPageCardsNumber
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
    const relLink = getLink(card, '.img-wrap a');
    const link = `${dom.window.location.hostname}${relLink}`;

    return { name, gender, description, img, link };
};

export const getAnimalsNumber = async (url: string) => {
    const dom = await JSDOM.fromURL(url, parserOptions);
    return { total: getTotalCardsNumber(dom) };
};

export const getDog = async (index: number) => getAnimal(dogsUrl, index);
export const getCat = async (index: number) => getAnimal(catsUrl, index);

export const getDogsNumber = async () => getAnimalsNumber(dogsUrl);
export const getCatsNumber = async () => getAnimalsNumber(catsUrl);
