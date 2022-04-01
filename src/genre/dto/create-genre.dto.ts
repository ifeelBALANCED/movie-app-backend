import { IsString } from 'class-validator'
import { ApiProperty } from "@nestjs/swagger";

export class CreateGenreDto {
	@IsString()
	@ApiProperty()
	name: string

	@IsString()
	@ApiProperty()
	slug: string

	@IsString()
	@ApiProperty()
	description: string

	@IsString()
	@ApiProperty()
	icon: string
}
