import { RootRandomUser } from "./RandomUser";

export function getRandomUsers():Promise<RootRandomUser>{

    return fetch("https://randomuser.me/api/?nat=us,br").then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(`Não foi possível consumir API ${response.status}`);
      })
      .then((responseJson) => {
        return responseJson as RootRandomUser;
      })
      .catch((error) => {
        throw new Error(`Não foi possível consumir API ${error}`);
      });
}