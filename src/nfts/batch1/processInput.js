const fs = require("fs");
const { stringify } = require("csv-stringify");
const writableStream = fs.createWriteStream("./src/nfts/batch1/output.csv");

const columns = [
  "name",
  "description",
  "attributes/0/trait_type",
  "attributes/0/value",
  "attributes/1/trait_type",
  "attributes/1/value",
  "attributes/2/trait_type",
  "attributes/2/value",
  "attributes/3/trait_type",
  "attributes/3/value",
  "attributes/4/trait_type",
  "attributes/4/value",
  "attributes/5/trait_type",
  "attributes/5/value",
  "attributes/6/trait_type",
  "attributes/6/value",
  "image",
  "animation_url"
];

const stringifier = stringify({ header: true, columns: columns });

function pad(num, size) {
  num = num.toString();
  while (num.length < size) num = "0" + num;
  return num;
}

const offset = 0;
for (let i = 0; i < 300; i++) {
  const actualIndex = i + offset;
  const fancyIndex = actualIndex + 1;
  stringifier.write([
    `Lil Noun Spirited Vodka #${pad(fancyIndex, 3)}`,
    `This Lil Noun Spirited Vodka is the inaugural launch NFT of Liquid Collections.
This is the first in a series of exclusive, collectible ultra-premium spirits made in collaboration with artists. Launching with a unique Lil Noun, Liquid Collections created a ghostly-inspired, limited-edition vodka, only available via NFT.
Made of locally sourced winter wheat from a farm in Washington state, this Spirited vodka has been artisanally crafted, triple-distilled, and freeze-filtered before being blended with ultra-pure water from the Cascade mountain range.

Go to the collection page https://liquidcollections.com/lil-noun-vodka for redemption logistics, FAQs and to sign up for notifications via email.`,
    `Spirit`,
    `Vodka`,
    `Region`,
    `Pacific Northwest`,
    `ABV`,
    `40%`,
    `Size`,
    `750ml`,
    `# of Bottles per`,
    `Two`,
    `Batch #`,
    `One`,
    `Year Distilled`,
    `2022`,
    `https://chromapdx.github.io/liquidCollectionXChroma/animation-prod.html?nftid=${actualIndex}`,
    `${fancyIndex}.jpg`

  ]);
}

stringifier.pipe(writableStream);
console.log("Finished writing data");