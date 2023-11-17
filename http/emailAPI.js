export const sendMessageEmail = async ({ phone, name }) => {
  try {
    const data = await fetch(
      `https://spa-server-6cnp-gf2s3bc1a-matveys-projects-69b106dd.vercel.app/api/email/send`,
      {
        method: "POST",
        body: JSON.stringify({
          phone: phone,
          name: name,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const json = await data.json();

    return json.errors ? { errors: json.errors } : [json];
  } catch (e) {
    console.log(e);
  }
};
