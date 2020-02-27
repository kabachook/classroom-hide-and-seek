import { Server, Model } from "miragejs"

export function makeServer({ environment = "development" } = {}) {
  let server = new Server({
    environment,

    routes() {
      this.namespace = "api"

      this.get("/webhook", () => {
        return {webhook: "https://lol.kek.ru"};
      });

      this.post("/rule", (schema, request) => {
        let requestObject = JSON.parse(request.requestBody);
        return {sshKey: 'ssh@'+requestObject.name+':'+requestObject.address+':'+requestObject.pattern};
      });

      this.post("/test", (request) => {
        return {result: true};
      });

      this.post("/travis", (request) => {
        return {code: "lolkek"};
      });
    },
  })

  return server
}