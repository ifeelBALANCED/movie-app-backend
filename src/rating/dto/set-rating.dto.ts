import { IsNumber, IsString } from 'class-validator'
import { ApiProperty } from "@nestjs/swagger";

export class SetRatingDto {
	@ApiProperty()
	@IsString()
	movieId: string

	@ApiProperty()
	@IsNumber()
	value: number
}
