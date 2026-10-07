import { IsString, IsNumber, IsPositive, IsNotEmpty, IsOptional, MaxLength, MinLength, Matches } from 'class-validator';

export class CreateProductDto {
    @IsNumber()
    @IsPositive()
    @IsOptional()
    id?: number;
    
    @MaxLength(100)
    @MinLength(5)
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsPositive()
    stock: number;

    @IsString()
    @IsNotEmpty()
    //?         1x1x1x
    @Matches(/^\d+x\d+x\d+$/, {
        message: "El formato del tamaño es incorrecto (largo x alto x ancho"
    })
    size: string;
}
