import { SERVERIP, instance } from "../LOCAL";

class Server {
  constructor() {
    this.loaded = false;
  }

  async LoadServerList() {
    const serverresponse = await instance.get(SERVERIP + "server/");
    if (serverresponse.status !== 200) {
      throw Error("Could not find the data");
    }
    return serverresponse.data;
  }

  async LoadServerDetails(params) {
    const { id } = params;

    console.log(SERVERIP + "server/" + id);
    const response = await instance.get(SERVERIP + "server/" + id);
    console.log(response);
    if (response.status !== 200) {
      throw Error("Could not find the data");
    }
    console.log(response.data);
    return response.data;
  }
}
export default new Server();
