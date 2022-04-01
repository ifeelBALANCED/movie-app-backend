import {
	IsArray,
	IsBoolean,
	IsNumber,
	IsObject,
	IsString,
} from 'class-validator'
import { ApiProperty } from "@nestjs/swagger";

export class Parameter {
	@ApiProperty()
	@IsNumber()
	year: number

	@ApiProperty()
	@IsNumber()
	duration: number

	@ApiProperty()
	@IsString()
	country: string
}

export class CreateMovieDto {
	@IsString()
	@ApiProperty()
	poster: string

	@IsString()
	@ApiProperty()
	bigPoster: string

	@IsString()
	@ApiProperty()
	title: string

	@IsString()
	@ApiProperty()
	description: string

	@IsObject()
	@ApiProperty()
	parameters?: Parameter

	@IsArray()
	@ApiProperty()
	@IsString({ each: true })
	genres: string[]

	@IsArray()
	@ApiProperty()
	@IsString({ each: true })
	actors: string[]

	@IsString()
	@ApiProperty()
	videoUrl: string

	@IsString()
	@ApiProperty()
	slug: string

	@IsBoolean()
	@ApiProperty()
	isSendTelegram?: boolean
}
