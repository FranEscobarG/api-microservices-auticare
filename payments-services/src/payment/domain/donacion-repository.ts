import { Donacion } from "./donacion";

export interface DonacionRepository {
  save(donacion: Donacion): Promise<Donacion>;
  getAll(): Promise<Donacion[]>;
  getDonationByUserId(userId: string): Promise<Donacion[] | null>;
}

export default DonacionRepository;
