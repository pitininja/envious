import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        include: ['tests/**/*.test.ts'],
        reporters: ['default'],
        coverage: {
            enabled: true,
            provider: 'istanbul',
            reporter: ['text'],
            extension: '.ts',
            all: true,
            reportOnFailure: true
        }
    }
});
