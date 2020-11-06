const http = require('http');
const request = require('request');
const cheerio = require('cheerio');

const getDouThree = async () => {
  let result = '';

  await new Promise(res => {
    request('https://dou.ua', function (error, response, body) {
      result = body;
      res();
    });
  });

  return result;
};

const getImages = async () => {
  return new Promise(async res => {
    const linksArr = [];
    const three = await getDouThree();

    const $ = cheerio.load(three);
    $('div.b-footer-slider a.item img').each((i, img) => {
      linksArr.push(img.attribs.src);
    });

    res(linksArr);
  });
}

const server = http.createServer(async (req, res) => {
  const images = await getImages();
  console.log(images);

  res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8'
  });
});

server.listen(3000, () => {
  console.log('Server is running on port 3000...')
});
