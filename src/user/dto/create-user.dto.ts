import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty()
    firstName: string;
    @ApiProperty()
    lastName: string;
    @ApiProperty()
    phoneNumber: string;
    @ApiProperty()
    zipCode: string;
    @ApiProperty()
    govID: string;
}
