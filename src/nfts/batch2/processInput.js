const fs = require("fs");
const { stringify } = require("csv-stringify");
const writableStream = fs.createWriteStream("./src/nfts/batch2/output.csv");

const columns = [
  "name",
  "description",
  `Spirit`,
  `Region`,
  `ABV`,
  `Size`,
  `# of Bottles per`,
  `Batch #`,
  `Year Distilled`,
  "image",
  "animation_url"
];

const stringifier = stringify({ header: true, columns: columns });

function pad(num, size) {
  num = num.toString();
  while (num.length < size) num = "0" + num;
  return num;
}

const lastIndex = -1;
const total = 300;
for (let i = 1; i < total + 1; i++) {
  const actualIndex = i + lastIndex;
  const fancyIndex = actualIndex + 1;
  stringifier.write([
    `Lil Noun Spirited Vodka #${pad(fancyIndex, 3)}`,
    `This Lil Noun Spirited Vodka is the inaugural launch NFT of Liquid Collections.
This is the first in a series of exclusive, collectible ultra-premium spirits made in collaboration with artists. Launching with a unique Lil Noun, Liquid Collections created a ghostly-inspired, limited-edition vodka, only available via NFT.
Made of locally sourced winter wheat from a farm in Washington state, this Spirited vodka has been artisanally crafted, triple-distilled, and freeze-filtered before being blended with ultra-pure water from the Cascade mountain range.

Go to the collection page https://liquidcollections.com/lil-noun-vodka for redemption logistics, FAQs and to sign up for notifications via email.`,

    `Vodka`,
    `Pacific Northwest`,
    `40%`,
    `750ml`,
    `Two`,
    `One`,
    `2022`,
    `${fancyIndex}.jpg`,
    `https://chromapdx.github.io/liquidCollectionXChroma/animation-prod.html?nftid=${actualIndex}`,
  ]);
}
stringifier.pipe(writableStream);
