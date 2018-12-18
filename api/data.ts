import { Data } from './types';

const users = [
  { id: '1', name: 'Alice', postIDs: ['3', '4'] },
  { id: '2', name: 'Bob', postIDs: [] },
];

const posts = [
  {
    authorId: '1',
    content: 'An awesome GraphQL conference in Berlin.',
    id: '3',
    published: true,
    title: 'GraphQL Conf 2019',
  },
  {
    authorId: '1',
    content: 'Weekly news about the Grap[hQL ecosystem and community.',
    id: '4',
    published: false,
    title: 'GraphQL Weekly',
  },
];

let idCount = 4;
const idProvider = (): string => {
  return `${idCount++}`;
};

export const data: Data = { posts, users, idProvider };
