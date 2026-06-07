// const data = {
//   'public': true,
//   'name': 'account',
//   'parent': 'api',
//   'methods': ['get'],
//   'children': [
//     {
//       'name': 'login',
//       'children': [
//         {
//           name: 'admin'
//         }
//       ]
//     }
//   ]
// };
//
//
// export type Node = {
//   name: string;
//   children?: Node[],
// }
//
// export const getAllChildren = ({
//                                  node
//                                }: {
//   node: Node
// }): any => {
//   const { children } = node ?? {};
//
//   if (children) {
//     return getAllChildren({ node: children });
//   }
//
//   return node;
// };
//
// describe('', () => {
//   it('children', () => {
//     const result = getAllChildren({
//       node: {
//         name: 'test',
//         children: [
//           {
//             name: 'nested'
//           }
//         ]
//       }
//     });
//     expect(result).toEqual({});
//   });
// });