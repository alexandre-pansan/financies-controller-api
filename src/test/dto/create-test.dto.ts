import { ApiProperty } from "@nestjs/swagger";

export class CreateTestDto {
    @ApiProperty()
    observations: string;
    @ApiProperty()
    isActive: boolean
}
