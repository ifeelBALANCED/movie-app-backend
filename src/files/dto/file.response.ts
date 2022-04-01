import { ApiProperty } from "@nestjs/swagger";

export class FileResponse {
	@ApiProperty()
	url: string

	@ApiProperty()
	name: string
}
