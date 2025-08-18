import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength, IsDate, isString, IsArray, IsInt } from 'class-validator';

export class createroleDto {

    @IsNotEmpty({ message: "name tidak boleh kosong" })

    name: string;

    @IsArray({ message: 'Izin harus berupa array' })
    @IsInt({ each: true, message: 'Setiap ID izin harus berupa angka' })
    permissions?: number[] = [];

}