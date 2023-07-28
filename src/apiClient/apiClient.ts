import axios, {AxiosInstance} from "axios"

export class ApiClient {
  private httpClient: AxiosInstance


  constructor() {
    this.httpClient = axios.create({
      baseURL: "https://3sb655pz3a.execute-api.ap-southeast-2.amazonaws.com/live"
    })
  }

  public async getProduct(): Promise<IProduct> {
    const {data} = await this.httpClient.get("/product")
    return data
  }
}

export interface IProduct{
  id: number,
  title: string,
  description: string,
  price: number,
  imageURL: string,
  sizeOptions: ISize[]
}

export interface ISize {
  id: number,
  label: string
}