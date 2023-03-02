const { Facebook } = require('fb');
const query = require('../../utils/query');
const handleError = require('../../utils/handleErrorResponse');
const { ACCESS_TOKEN } = require('../../configs/security').FACEBOOK;
const { DOMAIN, NODE_ENV } = require('../../configs/server');

const fb = new Facebook();
const pageId = '107491668440073';

fb.setAccessToken(ACCESS_TOKEN);

module.exports = {
  postProductToPage: async (req, res) => {
    try {
      const { productId } = req.params;
      const product = await query('Product').findById(productId);
      if (!product) {
        return handleError(
          res,
          'Product not found',
          'Product.not.found',
        );
      }

      const { shortDesc, images } = product;
      console.log(shortDesc);
      console.log(images);

      //Post product images to facebook
      let imageIds = [];
      if (NODE_ENV === 'staging' || NODE_ENV === 'production') {
        imageIds = await Promise.all(images.map((imageURL) => {
          const params = {
            published: false,
            url: DOMAIN + imageURL,
          }
          console.log(params.url);
          return fb.api(`/${pageId}/photos`, 'POST', params)
        }));
      } else {
        const test = [
          'https://cdn.24h.com.vn/upload/4-2021/images/2021-12-02/Nu-cuoi-chien-thang-cua-Salah-freyyr-1638453864-335-width640height480.jpg',
          'https://cdn.24h.com.vn/upload/4-2021/images/2021-12-02/Truc-tiep-bong-da-MU---Arsenal-Rangnick-co-giay-phep-lao-dong-an-dinh-ngay-ra-mat-Vong-14-Ngoai-hang-nintchdbpict000697542495-1638461355-976-width740height546.jpg',
          'https://cdn.24h.com.vn/upload/4-2021/images/2021-12-02/Truc-tiep-bong-da-MU---Arsenal-Rangnick-co-giay-phep-lao-dong-an-dinh-ngay-ra-mat-Vong-14-Ngoai-hang-nintchdbpict000697546880-1638461355-774-width740height673.jpg',
        ]
        imageIds = await Promise.all(test.map((imageURL) => {
          const params = {
            published: false,
            url: imageURL,
          }
          return fb.api(`/${pageId}/photos`, 'POST', params)
        }));
      }

      const params = {
        message: shortDesc,
        attached_media: imageIds.map(({ id }) => {
          return {
            media_fbid: id,
          }
        }),
      }
      const result = await fb.api(`/${pageId}/feed`, 'POST', params);
      return res.status(201).json(result);
    } catch (ex) {
      return handleError.badGateway(res, `Error: ${ex}`);
    }
  },
};
