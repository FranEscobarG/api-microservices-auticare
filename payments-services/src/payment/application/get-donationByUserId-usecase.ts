import { Donacion } from "../domain/donacion";
import { DonacionRepository } from "../domain/donacion-repository";

class GetDonacionByUserIdUseCase {
  constructor(private donacionRepository: DonacionRepository) {}

  async execute(userId: string): Promise<Donacion[]> {
    const donaciones = await this.donacionRepository.getDonationByUserId(userId);

    if (!donaciones) {
      throw new Error(`Usuario ID: ${userId} sin donaciones`);
    }
    console.log(donaciones);

    return donaciones;
  }
}

export default GetDonacionByUserIdUseCase;
