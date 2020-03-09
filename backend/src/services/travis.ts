import { Service, Inject } from "typedi";
import request from "superagent";
import config from "../config";
import { version } from "../../package.json";

@Service()
export default class TravisService {
  private apiUrl = "https://api.travis-ci.com";
  private token: string;
  private organization: string;
  private agent: request.SuperAgentStatic;

  constructor() {
    this.token = config.travisciKey;
    this.organization = config.organization;
    this.agent = request
      .agent()
      .use(request => {
        request.url = this.apiUrl + request.url;
        return request;
      })
      .accept("json")
      .set("Travis-API-Version", "3")
      .set("User-Agent", `Classroom-hide-and-seek ${version}`)
      .set("Authorization", `token ${this.token}`);
  }

  public async getOrgs(): Promise<Array<Organization>> {
    const res = await this.agent.get("/orgs");
    return res.body.organizations;
  }

  public async getRepo(user: string, repo: string) {
    const res = await this.agent.get(`/repo/${user}%2f${repo}`);
    return res.body;
  }

  public async getEnvVars(user: string, repo: string): Promise<Array<EnvVar>> {
    const res = await this.agent.get(`/repo/${user}%2f${repo}/env_vars`);
    return res.body["env_vars"];
  }

  public async setEnvVar(
    user: string,
    repo: string,
    name: string,
    value: string,
    isPublic: boolean = false
  ): Promise<EnvVar> {
    const res = await this.agent.post(`/repo/${user}%2f${repo}/env_vars`).send({
      "env_var.name": name,
      "env_var.value": value,
      "env_var.public": isPublic
    });
    return res.body;
  }

  public async getBuilds(
    user: string,
    repo: string,
    limit: number = 1
  ): Promise<Array<Build>> {
    const res = await this.agent.get(`/repo/${user}%2f${repo}/builds`).query({
      limit
    });
    return res.body.builds;
  }

  public async restartBuild(id: number): Promise<Build> {
    const res = await this.agent.post(`/build/${id}/restart`);
    return res.body.build;
  }
}
