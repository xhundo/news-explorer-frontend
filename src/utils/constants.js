import cardimage1 from '../images/card/card/image1.jpg';
import cardimage2 from '../images/card/card/image2.jpg';
import cardimage3 from '../images/card/card/image3.jpg';
import cardimage4 from '../images/card/card/image4.jpg';
import cardimage5 from '../images/card/card/image5.jpg';

const apiKey = '5a6b2a43ab6041619415e96fcaf5eedd';
const baseUrl = 'http://localhost:3002';

const currentDate = new Date().toLocaleDateString();
const previousDate = new Date(
  Date.now() - 7 * 24 * 60 * 60 * 1000,
).toLocaleDateString();

const savedCards = [
  {
    title: "Everyone Needs a Special 'Sit Spot' in Nature",
    image: cardimage1,
    text: "Ever since I read Richard Louv's influential book, 'Last Child in the Woods,' the idea of having a special 'sit spot' has stuck with me. This advice, which Louv attributes to nature educator Jon Young, is for both adults and children to find...",
    source: 'treehugger',
    date: 'November 4, 2020',
    keyword: 'Nature',
    _id: 2,
  },
  {
    title: 'Nature makes you better',
    image: cardimage2,
    text: 'We all know how good nature can make us feel. We have known it for millennia: the sound of the ocean, the scents of a forest, the way dappled sunlight dances through leaves.',
    source: 'national geographic',
    date: 'February 19, 2019',
    keyword: 'Nature',
    _id: 3,
  },
  {
    title: 'Nostalgic Photos of Tourists in U.S. National Parks',
    image: cardimage3,
    text: 'Uri Løvevild Golman and Helle Løvevild Golman are National Geographic Explorers and conservation photographers who just completed a project and book they call their love letter to...',
    source: 'national geographic',
    date: 'October 19, 2020',
    keyword: 'Yellowstone',
    _id: 4,
  },
  {
    title: 'Grand Teton Renews Historic Crest Trail',
    image: cardimage4,
    text: '“The linking together of the Cascade and Death Canyon trails, at their heads, took place on October 1, 1933, and marked the first step in the realization of a plan whereby the hiker will be...',
    source: 'National parks traveler',
    date: 'November 4, 2020',
    keyword: 'Parks',
    _id: 5,
  },
  {
    title: "Scientists Don't Know Why Polaris Is So Weird",
    image: cardimage5,
    text: 'Humans have long relied on the starry sky to push into new frontiers, sail to the very edge of the world and find their way back home again. Even animals look to the stars to guide them. ',
    source: 'treehugger',
    date: 'March 16, 2020',
    keyword: 'Photography',
    _id: 6,
  },
];

export { apiKey, currentDate, previousDate, baseUrl, savedCards };
