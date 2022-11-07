function importAll(r) {
  return r.keys().map(r);
}

/* @ts-ignore:next-line */
const postImages = importAll(require.context('./post/', false, /\.(png|jpe?g|svg)$/));

/* @ts-ignore:next-line */
const preContext = require.context('./pre/', false, /\.(png|jpe?g|svg)$/);

const preImagesImport2 = importAll(preContext)
const unbundledFiles = preContext.keys();

const preImages3 = [];
for (let i = 0; i < preImagesImport2.length; i++) {
  const matches = unbundledFiles[i].match(/.\/(\d*).jpg+/);

  /* @ts-ignore:next-line */
  preImages3[i] = {
    input: unbundledFiles[i],
    output: preImagesImport2[i],
    num: parseInt(matches[1])
  }
}

/* @ts-ignore:next-line */
const sortedPreImages = preImages3.sort((a, b) => a.num - b.num)



export default () => {
  return {
    images: {
      pre: sortedPreImages.map((x: { output: string }) => x.output),
      post: postImages
    },
    fileWriter: async () => {
      console.log(sortedPreImages.map((x: { output: string }) => x.output))
      console.log(postImages);
    }
  };
}