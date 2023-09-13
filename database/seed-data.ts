
interface SeedData {
    entries: SeedEntry[];

}

interface SeedEntry {
    description: string;
    status: string;
    createdAt: number;

}

export const seedData: SeedData = {
    entries: [
        {
            description: 'Mollit cupidatat aliquip irure consequat commodo voluptate occaecat esse laborum',
            status: 'pending',
            createdAt: Date.now()
          },
          {
            description: ' Mollit cupidatat aliquip irure consequat commodo voluptate occaecat esse laborum',
            status: 'in-progress',
            createdAt: Date.now() - 1000000 , 
          },
          {
            description: ' Mollit cupidatat aliquip irure consequat commodo voluptate occaecat esse laborum',
            status: 'finished',
            createdAt: Date.now() - 100000,
          },
    ]
}