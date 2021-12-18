export default function handler(req, res) {
  return new Promise((resolve, reject) => {
    if (req.method !== "POST") {
      res.status(400).send({ message: "Missing Credentials.." });
      return;
    } else {
      // console.log(req.body.prompt);
      // console.log(req.headers.token);
      if (req.headers.token != "eb11b5397527d8c2dfef407f98ba831a") {
        res.status(405).end();
        return resolve();
      } else {
        fetch(
          "https://www.google.com/recaptcha/api/siteverify?secret=6Lemga4dAAAAAEHBmilzMyMKfNtoL15GeiXkSEcS&response=03AGdBq26AERi0Ujm4xwAC2MLaQLYAu-izxPbvWW-2wChiWrzJAyza_FR1J4OtcxVFnsNoPf3Nn-E-MovLmR8mfEKHiw4zlmhWli3Ea5LOH3mWB9MLbma5Rg_eaIvqbhXPsvYtkQ3kJ7TZaQIGIp0cwx8KIQy2S98YSha7gKBPexyb6xUmEJjq3fyk2iM_1leSCw86l7KlTe-4vSsUz1OwzOvwSSfnTEBsNTYwmdthD8MLgrxu6PPKRkUw1GMB4KpmPWbdnZrg38AR6GUNWFdCNr1HsAKzTW_afwvAyjrRNHcUyuOxCZWRfbTyKejlLa7yls3iaMeT5hJWr7KDIUkzAmFzvcB_M59Pv2Z3_PYpXr6GZ1YPMnLdGIJyFqZONtDXeT8Ip8W8kSofW29K0Ej3wPi_EX49hc_Edw2aKWo3AZGuKZXidsweTli8iI_xzEXVjvZQ-lehjZHS",
          {
            headers: {
              "Content-Type":
                "application/x-www-form-urlencoded; charset=utf-8",
            },
            method: "POST",
          }
        )
          .then((response) => response.json())
          .then((dataCapGoogle) => {
            console.log(dataCapGoogle);
          });
        const data = {
          prompt: req.body.prompt,
          temperature: 0.9,
          max_tokens: 100,
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
