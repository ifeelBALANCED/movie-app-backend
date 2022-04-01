import { IsString, MinLength } from 'class-validator'
import { ApiProperty } from "@nestjs/swagger";

export class AuthDto {
	@IsString()
	@ApiProperty()
	email: string

	@MinLength(6, { message: 'Password cannot be less than 6 characters' })
	@IsString()
	@ApiProperty()
	password: string
}
