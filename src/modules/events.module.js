const TEAM_API_KEY =
  "549f3a7741960eec918a71f67d9ae4086e22e838f5b6e5ac906da8cf8616f34e";

export function getEvents() {
  fetch(
    "https://api.teamup.com/kshv1tq4rmguxp3h7g/events?choises='Анатолій Сахно'",
    {
      method: "GET",
      headers: {
        "Teamup-Token": TEAM_API_KEY,
      },
    }
  )
    .then((response) => response.json())
    .then((result) => console.log(result));
}
