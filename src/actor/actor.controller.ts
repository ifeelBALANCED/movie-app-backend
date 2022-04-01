import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	NotFoundException,
	Param,
	Post,
	Put,
	Query,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { IdValidationPipe } from 'src/pipes/id.validation.pipe'
import { ActorService } from './actor.service'
import { CreateActorDto } from './dto/create-actor.dto'
import { Auth } from "../auth/decorators/auth.decorator";
import { ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { ActorModel } from "./actor.model";
import { Types } from "mongoose";

@ApiTags('Actors')
@Controller('actors')
export class ActorController {
	constructor(private readonly actorService: ActorService) {}

	@Get()
	@ApiOkResponse({ type: ActorModel, isArray: true })
	async getAll(@Query('searchTerm') searchTerm?: string) {
		return this.actorService.getAll(searchTerm)
	}

	@Get('by-slug/:slug')
	async bySlug(@Param('slug') slug: string) {
		return this.actorService.bySlug(slug)
	}

	@UsePipes(new ValidationPipe())
	@Post()
	@HttpCode(200)
	@Auth('admin')
	@ApiUnauthorizedResponse()
	@ApiOkResponse({ type: Types.ObjectId })
	async create() {
		return this.actorService.create()
	}

	@Get(':id')
	@Auth('admin')
	@ApiUnauthorizedResponse()
	@ApiOkResponse({ type: ActorModel })
	async get(@Param('id', IdValidationPipe) id: string) {
		return this.actorService.byId(id)
	}

	@UsePipes(new ValidationPipe())
	@Put(':id')
	@HttpCode(200)
	@Auth('admin')
	@ApiUnauthorizedResponse()
	@ApiOkResponse({ type: ActorModel })
	async update(
		@Param('id', IdValidationPipe) id: string,
		@Body() dto: CreateActorDto
	) {
		const updateActor = await this.actorService.update(id, dto)
		if (!updateActor) throw new NotFoundException('Actor not found')
		return updateActor
	}

	@Delete(':id')
	@Auth('admin')
	@ApiUnauthorizedResponse()
	async delete(@Param('id', IdValidationPipe) id: string) {
		const deletedDoc = await this.actorService.delete(id)
		if (!deletedDoc) throw new NotFoundException('Actor not found')
	}
}
