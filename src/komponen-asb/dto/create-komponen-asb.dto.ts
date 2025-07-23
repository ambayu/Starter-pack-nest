import { IsNotEmpty } from "class-validator";

export class CreateKomponenAsbDto {
    @IsNotEmpty({ message: 'Id Kegiatan tidak boleh kosong' })
    id_kegiatan_asb : number;
    
    @IsNotEmpty({ message: 'Id Kategori  tidak boleh kosong' })
    id_kategori_komponen: number;
    @IsNotEmpty({ message: 'Id Satuan tidak boleh kosong' })    
    id_satuan: number;

    uraian: string;
    koefisien: number;
    hargaSatuan: number;
    jumlahHarga: number;
    urutan: number;
}
