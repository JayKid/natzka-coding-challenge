import { mapFilesystemPathsToMUIRichTreeFormat } from './treeMapper';

describe('treeMapper', () => {
    test('should return an empty array when given an empty array', async () => {
        expect(mapFilesystemPathsToMUIRichTreeFormat([])).toStrictEqual([]);
    });

    test('should return a properly formatted structure when given one path', () => {
        const inputWithOnePath = ['/root'];
        const expectedMUIFormattedStructure = [
            {
                id: 'root',
                label: 'root',
                children: [],
            },
        ];

        expect(
            mapFilesystemPathsToMUIRichTreeFormat(inputWithOnePath),
        ).toStrictEqual(expectedMUIFormattedStructure);
    });

    test('should return a properly formatted structure when given one path with two levels of depth', () => {
        const inputWithTwoLevelsOfDepth = ['/root/foo'];
        const expectedMUIFormattedStructure = [
            {
                id: 'root',
                label: 'root',
                children: [
                    {
                        id: 'foo',
                        label: 'foo',
                        children: [],
                    },
                ],
            },
        ];

        expect(
            mapFilesystemPathsToMUIRichTreeFormat(inputWithTwoLevelsOfDepth),
        ).toStrictEqual(expectedMUIFormattedStructure);
    });

    test('should return a properly formatted structure when given two paths with a common root', () => {
        const inputWithTwoLevelsOfDepth = ['/root/foo', '/root/var'];
        const expectedMUIFormattedStructure = [
            {
                id: 'root',
                label: 'root',
                children: [
                    {
                        id: 'foo',
                        label: 'foo',
                        children: [],
                    },
                    {
                        id: 'var',
                        label: 'var',
                        children: [],
                    },
                ],
            },
        ];

        expect(
            mapFilesystemPathsToMUIRichTreeFormat(inputWithTwoLevelsOfDepth),
        ).toStrictEqual(expectedMUIFormattedStructure);
    });

    test('should return a properly formatted structure when given several paths', () => {
        const exampleInput = [
            '/root/test',
            '/dev/null',
            '/root/something/somewhere',
        ];

        const expectedMUIFormattedStructure = [
            {
                id: 'root',
                label: 'root',
                children: [
                    {
                        id: 'test',
                        label: 'test',
                        children: [],
                    },
                    {
                        id: 'something',
                        label: 'something',
                        children: [
                            {
                                id: 'somewhere',
                                label: 'somewhere',
                                children: [],
                            },
                        ],
                    },
                ],
            },
            {
                id: 'dev',
                label: 'dev',
                children: [{ id: 'null', label: 'null', children: [] }],
            },
        ];

        expect(
            mapFilesystemPathsToMUIRichTreeFormat(exampleInput),
        ).toStrictEqual(expectedMUIFormattedStructure);
    });
});
