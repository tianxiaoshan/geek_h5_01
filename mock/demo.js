import mockjs from 'mockjs';
import { delay } from 'roadhog-api-doc';

const api = {
  'POST /api/getdata': (req, res) => {
    res.send(
      mockjs.mock({
        statusCode: '0',
        data: {
          'prizetype|1': ['weixin', 'zhifubao'],
          'momey|1': ['1', '5'],
        },
      }),
    );
  },
};
export default delay(api, 1000);
