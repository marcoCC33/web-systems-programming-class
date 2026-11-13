import { hashPassword, comparePassword } from '../../../src/utils/password.util.ts';

describe('Password util', () => {
    const password1 = "LanaLang99@";
    const password2 = "LoisLane55#";

    it('strings should be not void and different from original password', async () => {
        const hash1 = await hashPassword(password1);
        const hash2 = await hashPassword(password2);

        expect(typeof hash1).toBe('string');
        expect(hash1.length).toBeGreaterThan(0);

        expect(typeof hash2).toBe('string');
        expect(hash2.length).toBeGreaterThan(0);

        expect(hash1).not.toBe(password1);
        expect(hash2).not.toBe(password2);
    });

    it('Should return true when compare hash', async () => {
        const hash1 = await hashPassword(password1);
        const hash2 = await hashPassword(password2);
        
        const isMatch1 = await comparePassword(password1, hash1);
        const isMatch2 = await comparePassword(password2, hash2);

        expect(isMatch1).toBe(true);
        expect(isMatch2).toBe(true);
    });

    it('Should return false when compare hashes', async () => {
        const hash1 = await hashPassword(password1);
        const hash2 = await hashPassword(password2);

        const isMatch1 = await comparePassword(password2, hash1);
        const isMatch2 = await comparePassword(password1, hash2);

        expect(isMatch1).toBe(false);
        expect(isMatch2).toBe(false);

    });
});



