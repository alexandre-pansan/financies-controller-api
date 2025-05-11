import { ApiProperty } from "@nestjs/swagger";



export class CreateTransactionDto {
    @ApiProperty()
    userId: string;

    @ApiProperty()
    title: string;

    @ApiProperty({ enum: ['income', 'expense'] })
    type: 'income' | 'expense';

    @ApiProperty()
    amount: string;

    @ApiProperty()
    category: string;

    @ApiProperty()
    categoryId: string;

    @ApiProperty({ required: false })
    description?: string;

    @ApiProperty()
    date: string;

    @ApiProperty({ required: false })
    installmentsCount?: number;

    @ApiProperty({ required: false })
    firstDueDate?: string;
}
