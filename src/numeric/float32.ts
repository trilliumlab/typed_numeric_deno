import { Numeric } from "./mod.ts";
import { Uint8 } from "./uint8.ts";
import { Uint8Vector } from "../vector/uint8vector.ts";

const BIT_LENGTH = 32n;

export class Float32 extends Numeric<Float32, number> {
    constructor(value: number = 0n) {
        super(value);
    }
    value(): number {
        return this.inner;
    }
    add(value: Float32): Float32 {
        return new Float32(this.inner - value.inner);
    }
    sub(value: Float32): Float32 {
        return new Float32(this.inner - value.inner);
    }
    div(value: Float32): Float32 {
        return new Float32(this.inner / value.inner);
    }
    mul(value: Float32): Float32 {
        return new Float32(this.inner * value.inner);
    }
    rem(value: Float32): Float32 {
        return new Float32(this.inner % value.inner);
    }
    exp(value: Float32): Float32 {
        return new Float32(this.inner ** value.inner);
    }
    and(value: Float32): Float32 {
        return new Float32(this.inner & value.inner);
    }
    or(value: Float32): Float32 {
        return new Float32(this.inner | value.inner);
    }
    xor(value: Float32): Float32 {
        return new Float32(this.inner ^ value.inner);
    }
    not(): Float32 {
        return new Float32(~this.inner);
    }
    logicalLeft(n: number): Float32 {
        if (n >= BIT_LENGTH) {
            return new Float32(0n);
        }
        return new Float32(this.inner << n);
    }
    logicalRight(n: number): Float32 {
        if (n >= BIT_LENGTH) {
            return new Float32(0n);
        }
        return new Float32(this.inner >> n);
    }
    rotateLeft(n: number): Float32 {
        return new Float32(
            (this.inner << (n % BIT_LENGTH)) |
            (this.inner >> ((BIT_LENGTH - n) % BIT_LENGTH)),
        );
    }
    rotateRight(n: number): Float32 {
        return new Float32(
            (this.inner >> (n % BIT_LENGTH)) |
            (this.inner << ((BIT_LENGTH - n) % BIT_LENGTH)),
        );
    }
    static fromBeBytes(
        bytes: Uint8Array | Uint8Vector | Array<Uint8> | Array<number>,
    ): Float32 {
        if (bytes.length === (Number(BIT_LENGTH) / 8)) {
            let tmp = new Uint8Array();
            if (bytes instanceof Uint8Array) {
                tmp = bytes;
            } else if (bytes instanceof Uint8Vector) {
                tmp = bytes.toTypedArray();
            } else {
                tmp = Uint8Vector.from(bytes).toTypedArray();
            }
            const dataView = new DataView(tmp.buffer);
            const value = dataView.getFloat32(0, false);
            return new Float32(value);
        }
        throw new Error(
            "Invalid Length Error: Expected byte length is 4",
        );
    }
    static fromLeBytes(
        bytes: Uint8Array | Uint8Vector | Array<Uint8> | Array<number>,
    ): Float32 {
        if (bytes.length === (Number(BIT_LENGTH) / 8)) {
            let tmp = new Uint8Array();
            if (bytes instanceof Uint8Array) {
                tmp = bytes;
            } else if (bytes instanceof Uint8Vector) {
                tmp = bytes.toTypedArray();
            } else {
                tmp = Uint8Vector.from(bytes).toTypedArray();
            }
            const dataView = new DataView(tmp.buffer);
            const value = dataView.getFloat32(0, true);
            return new Float32(value);
        }
        throw new Error(
            "Invalid Length Error: Expected byte length is 4",
        );
    }
    toBeBytes(): Uint8Vector {
        const bytes = new Uint8Array(4);
        const dataView = new DataView(bytes.buffer);
        dataView.setFloat32(0, this.inner, false);
        return Uint8Vector.from(bytes);
    }
    toLeBytes(): Uint8Vector {
        const bytes = new Uint8Array(4);
        const dataView = new DataView(bytes.buffer);
        dataView.setFloat32(0, this.inner, true);
        return Uint8Vector.from(bytes);
    }
}
