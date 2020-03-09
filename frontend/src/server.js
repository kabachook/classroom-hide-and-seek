import { Server, Model } from "miragejs"

export function makeServer({ environment = "development" } = {}) {
  let server = new Server({
    environment,

    routes() {
      this.namespace = "api"

      this.get("/webhook", () => {
        if (Math.random() > 0.5)
          return {webhook: "https://lol.kek.ru"};
      });

      this.get("/tests", () => {
        return [
          {name:'test1'},
          {name:'test2'},
          {name:'test2-very-long-additionalpart11111111'},
          {name:'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww'},
          {name:'test-grob'},
          {name:'wow'}
        ];
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