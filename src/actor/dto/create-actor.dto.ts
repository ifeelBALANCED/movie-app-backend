import { IsString } from 'class-validator'
import { ApiProperty } from "@nestjs/swagger";

export class CreateActorDto {
	@IsString()
	@ApiProperty()
	name: string

	@IsString()
	@ApiProperty()
	slug: string

	@IsString()
	@ApiProperty()
	photo: string
}
