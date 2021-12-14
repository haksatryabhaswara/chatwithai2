export default function handler(req, res) {
  return new Promise((resolve, reject) => {
    if (req.method !== "POST") {
      res.status(400).send({ message: "Missing Credentials.." });
      return;
    } else {
    //   console.log(req.body.prompt);
      // console.log(req.headers.token);
      const test =
        "Human: Halo i'm Brain, i want to talk, can you accompany me?\nAI: No, i'm pretty clear. You're just not a race.\nHuman:i got no race\nAI:";
      if (req.headers.token != "eb11b5397527d8c2dfef407f98ba831a") {
        res.status(405).end();
        return resolve();
      } else {
        const data = {
          prompt: req.body.prompt,
          temperature: 0.9,
          max_tokens: 150,
          top_p: 1.0,
          frequency_penalty: 1,
          presence_penalty: 0.6,
          stop: ["\\n", " Human:", " AI:"],
        };
        fetch("https://api.openai.com/v1/engines/ada/completions", {
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
