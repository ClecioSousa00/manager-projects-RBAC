import type { ICrypto } from "@/shared/cryptography/crypto-interface.ts";

export class MockBcrypt implements ICrypto {
  async hash(plain: string): Promise<string> {
    return plain.concat("-fake-hashed");
  }
  async compare(plain: string, hashed: string): Promise<boolean> {
    return plain.concat("-fake-hashed") === hashed;
  }
}
