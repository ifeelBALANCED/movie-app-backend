import { IsEmail, IsString } from 'class-validator'
import { ApiProperty } from "@nestjs/swagger";

export class UpdateDto {
	@IsEmail()
	@ApiProperty()
	email: string

	@IsString()
	@ApiProperty()
	password?: string

    @ApiProperty()
	isAdmin?: boolean
}
