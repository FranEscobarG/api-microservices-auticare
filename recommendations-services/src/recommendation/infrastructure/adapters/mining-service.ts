import axios from "axios";

class MiningService {
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = "http://localhost:3000/api/v1/mining";
  }

  async analyzeSentiment(comentario: string): Promise<number> {
    try {
      const response = await axios.post(`${this.baseUrl}/analyze-sentiment`, { comentario });
      return response.data.polaridad; // Extrae la polaridad de la respuesta
    } catch (error: any) {
      console.error("Error al analizar el sentimiento: ", error.message);
      throw new Error("Error al conectar con el servicio de minería.");
    }
  }

  async predictRecommendations(data: object[]): Promise<any> {
    try {
    console.log(data)

      const response = await axios.post(`${this.baseUrl}/predict-recommendations`, { data });
      return response.data; // Retorna la respuesta completa
    } catch (error: any) {
      console.error("Error al predecir recomendaciones: ", error.message);
      throw new Error("Error al conectar con el servicio de minería.");
    }
  }
}

export default new MiningService();
