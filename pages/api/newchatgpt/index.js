const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const response = await openai
  .createCompletion({
    model: "text-ada-001",
    prompt:
      "The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.\n\nHuman: Hello, who are you?\nAI: I am an AI created by OpenAI. How can I help you today?\nHuman: \nAI: What kind of assistance do you need? I'm here to help in any way I can.\nHuman: Hello, i'm feeling sad rn\nAI: I'm sorry to hear that. Is there anything specific causing you to feel sad?\nHuman: nah, just feeling sad\nAI: It's completely understandable to feel this way sometimes. Is there anything I can do to help cheer you up? Maybe we could watch a funny movie together or listen to some uplifting music.\nHuman: how about you tell me the common language for bible\nAI: The most common language for the Bible is currently English, however many other translations exist in other languages, such as Spanish, French, and German. Do you have a specific version of the Bible you would like to read?\nHuman: Is it good to eat junk food?\n\nThere is no one-size-fits-all answer to this question, as the use of good food for everyone is different. However, some people might find it helpful to learn about the benefits of junk food, as it can be a source of calories and weight that don't belongs in the body.",
    temperature: 0.9,
    max_tokens: 150,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0.6,
    stop: [" Human:", " AI:"],
  })
  .then((data) => {
    console.log("API called successfully. Returned data: " + data);
    resolve();
  })
  .catch((error) => console.error(error));
