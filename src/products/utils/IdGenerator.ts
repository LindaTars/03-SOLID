import { Injectable } from "@nestjs/common";

@Injectable()
export class IdGenerator {
    private next = 1;

    generate(isTaken: (id : number) => boolean) {
        while(isTaken(this.next)) this.next++;
        return this.next++;
    }
}