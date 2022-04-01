import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Logger,
	NotFoundException,
	Param,
	Post,
	Put,
	Query,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { IdValidationPipe } from 'src/pipes/id.validation.pipe'
import { CreateGenreDto } from './dto/create-genre.dto'
import { GenreService } from './genre.service'
import { Auth } from "../auth/decorators/auth.decorator";
import { ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { GenreModel } from "./genre.model";
import { Types } from "mongoose";

@ApiTags('Genres')
@Controller('genres')
export class GenreController {
	constructor(private readonly genreService: GenreService) {}

	@Get('by-slug/:slug')
	@ApiOkResponse({ type: GenreModel })
	async bySlug(@Param('slug') slug: string) {
		return this.genreService.bySlug(slug)
	}

	@Get()
	@ApiOkResponse({ type: GenreModel, isArray: true })
	async getAll(@Query('searchTerm') searchTerm?: string) {
		return this.genreService.getAll(searchTerm)
	}

	@Get('/popular')
	@ApiOkResponse({ type: GenreModel, isArray: true })
	async getPopular() {
		return this.genreService.getPopular()
	}

	@Get('/collections')
	@ApiOkResponse({ type: GenreModel, isArray: true })
	async getCollections() {
		return this.genreService.getCollections()
	}

	@Get(':id')
	@Auth('admin')
	@ApiUnauthorizedResponse()
	@ApiOkResponse({ type: GenreModel })
	async get(@Param('id', IdValidationPipe) id: string) {
		return this.genreService.byId(id)
	}

	@UsePipes(new ValidationPipe())
	@Post()
	@HttpCode(200)
	@Auth('admin')
	@ApiUnauthorizedResponse()
	@ApiOkResponse({ type: Types.ObjectId })
	async create() {
		return this.genreService.create()
	}

	@UsePipes(new ValidationPipe())
	@Put(':id')
	@HttpCode(200)
	@Auth('admin')
	@ApiUnauthorizedResponse()
	@ApiOkResponse({ type: GenreModel })
	async update(
		@Param('id', IdValidationPipe) id: string,
		@Body() dto: CreateGenreDto
	) {
		const updateGenre = await this.genreService.update(id, dto)
		if (!updateGenre) throw new NotFoundException('Genre not found')
		return updateGenre
	}

	@Delete(':id')
	@Auth('admin')
	@ApiUnauthorizedResponse()
	async delete(@Param('id', IdValidationPipe) id: string) {
		const deletedDoc = await this.genreService.delete(id)
		if (!deletedDoc) throw new NotFoundException('Genre not found')
	}
}
