# Natzka coding challenge

## Problem to solve

> Given an arbitrary list of strings (paths), which represent a (directory/file) tree structure separated by a forward slash, present that same tree using react components. The tree structure should be expandable/collapsible.


### Requirements

- Input list is an array of strings. Those strings have a forward slash as separator to indicate the depth of the tree.
- Use react components and typescript to construct a solution.
- Use styled components to style your solution to your own preference.
- Think about what is required to make this a production ready solution. There is no need to implement in full detail the actual production ready requirements, but ensure at least the scaffolding is there.
- Do not spend more than 1 working day on this solution.

### Input example

```js
[
'/root/test',
'/dev/null',
'/root/something/somewhere'
]
```

## Early considerations

- Use Vite with TS for a fast starter pack
- Use [MUI's React tree view](https://mui.com/x/react-tree-view/) for the visualization of the tree structure
  - Need to map the input structure to the expected format from MUI.


## Notes

### Production-ready missing items

- Component tests
  - Since there is no logic in the React components, I focused the testing on the module logic.
- Production build
  - `npm run build` will create a production build in the `dist/` folder
- i18n
  - Not a concern for the current assignment, but a production-ready app would need to take care of this when catering to users from different countries
- Some performance assessment might be involved considering the product Natzka builds
  - Considering the volume of nested products and complexity of data, fine-tuning the mapper could prove important when optimizing client-side performance
