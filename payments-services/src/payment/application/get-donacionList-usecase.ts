import { Donacion } from "../domain/donacion";
import { DonacionRepository } from "../domain/donacion-repository";

class GetDonacionListUseCase {
  constructor(private donacionRepository: DonacionRepository) {}

  async execute(): Promise<Donacion[]> {
    return this.donacionRepository.getAll();
  }
}

export default GetDonacionListUseCase;
