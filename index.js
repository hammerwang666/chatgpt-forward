const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
const axios = require('axios');
const { Configuration, OpenAIApi } = require('openai');
const configuration = new Configuration({
  apiKey: process.env.key,
});
const openai = new OpenAIApi(configuration);
const port = process.env.PORT || 3000;

app.use(bodyParser());

app.use(async (ctx) => {
  const { chat_param } = ctx.request.body;
  if (!chat_param) {
    console.log('no messages');
    return (ctx.body = 'hi');
  }
  console.log('chat_param:', { chat_param });
  try {
    const completion = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      chat_param,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Bearer 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',
        },
        timeout: 500000,
      },
    );
    // const completion = await openai.createChatCompletion(chat_param);
    const resObj = completion.data;
    console.log('resObj', resObj);
    ctx.body = resObj;
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
