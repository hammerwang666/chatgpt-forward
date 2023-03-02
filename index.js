const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
const { Configuration, OpenAIApi } = require('openai');
const configuration = new Configuration({
  apiKey: process.env.key,
});
const openai = new OpenAIApi(configuration);
const port = process.env.PORT || 3000;

app.use(bodyParser());

app.use(async (ctx) => {
  const { query, model, role } = ctx.request.body;
  if (!query) {
    return (ctx.body = 'hi');
  }
  try {
    const completion = await openai.createChatCompletion({
      model,
      messages: [{ role, content: query }],
    });
    // console.log('completion', completion);
    const resObj = completion.data;
    ctx.body = resObj;
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
