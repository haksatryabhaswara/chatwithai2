import Cors from "cors";

const cors = Cors({
  origin: [
    "https://localhost:3000/",
    "https://tokkuai.com/",
    "https://www.tokkuai.com/",
  ],
  methods: ["POST"],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}
async function handler(req, res) {
  await runMiddleware(req, res, cors);
  return new Promise((resolve, reject) => {
    if (req.method !== "POST") {
      res.status(400).send({ message: "Missing Credentials.." });
      return;
    } else {
      // console.log(req.body.nomor);
      // console.log(req.headers.authorization);
      if (req.headers.authorization != "Bearer " + process.env.BR) {
        res.status(405).end();
        return resolve();
      } else {
        let chooseAI;
        if (req.body.nomor % 2 == 0) {
          chooseAI = "Marv is a chatbot that reluctantly answers questions.";
        } else {
          chooseAI =
            "The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.";
        }
        const data = {
          prompt: chooseAI + "\n\n" + req.body.prompt,
          temperature: 0.9,
          max_tokens: 100,
          top_p: 1.0,
          frequency_penalty: 1,
          presence_penalty: 0.6,
          stop: ["\n", "Human:", "AI:"],
        };
        fetch(process.env.linkChatAPIAI, {
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OAK}`,
          },
          method: "POST",
        })
          .then((response) => response.json())
          .then((dataRes) => {
            // console.log(dataRes);
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.setHeader(
              "Cache-Control",
              "public, max-age=20140, must-revalidate, no-transform"
            );
            res.end(JSON.stringify(dataRes));
            resolve();
          })
          .catch((error) => {
            res.json(error);
            res.status(405).end();
            return resolve();
          });
      }
    }
  });
}

export default handler;
