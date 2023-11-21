import { GetSortImplementation, SortDirection, SortStrategy } from '../src/sort-strategies'

test('area sort', () => {
  const testItems = [
    { width: 10, height: 20, allowRotation: true },
    { width: 10, height: 10, allowRotation: true },
    { width: 10, height: 40, allowRotation: true },
    { width: 10, height: 30, allowRotation: true },
    { width: 10, height: 50, allowRotation: true }
  ]
  const sorter = GetSortImplementation(SortStrategy.Area, SortDirection.ASC)
  const items = sorter.sort(testItems)

  expect(items).toMatchInlineSnapshot(`
Array [
  Object {
    "allowRotation": true,
    "height": 10,
    "width": 10,
  },
  Object {
    "allowRotation": true,
    "height": 20,
    "width": 10,
  },
  Object {
    "allowRotation": true,
    "height": 30,
    "width": 10,
  },
  Object {
    "allowRotation": true,
    "height": 40,
    "width": 10,
  },
  Object {
    "allowRotation": true,
    "height": 50,
    "width": 10,
  },
]
`)
})
test('area sort DESC', () => {
  const testItems = [
    { width: 10, height: 20, allowRotation: true },
    { width: 10, height: 10, allowRotation: true },
    { width: 10, height: 40, allowRotation: true },
    { width: 10, height: 30, allowRotation: true },
    { width: 10, height: 50, allowRotation: true }
  ]
  const sorter = GetSortImplementation(SortStrategy.Area, SortDirection.DESC)
  const items = sorter.sort(testItems)

  expect(items).toMatchInlineSnapshot(`
Array [
  Object {
    "allowRotation": true,
    "height": 50,
    "width": 10,
  },
  Object {
    "allowRotation": true,
    "height": 40,
    "width": 10,
  },
  Object {
    "allowRotation": true,
    "height": 30,
    "width": 10,
  },
  Object {
    "allowRotation": true,
    "height": 20,
    "width": 10,
  },
  Object {
    "allowRotation": true,
    "height": 10,
    "width": 10,
  },
]
`)
})

test('differences sort', () => {
  const testItems = [
    { width: 10, height: 20, allowRotation: true },
    { width: 10, height: 10, allowRotation: true },
    { width: 10, height: 40, allowRotation: true },
    { width: 10, height: 30, allowRotation: true },
    { width: 10, height: 50, allowRotation: true }
  ]
  const sorter = GetSortImplementation(SortStrategy.Differences, SortDirection.ASC)
  const items = sorter.sort(testItems)

  expect(items).toMatchInlineSnapshot(`
Array [
  Object {
    "allowRotation": true,
    "height": 10,
    "width": 10,
  },
  Object {
    "allowRotation": true,
    "height": 20,
    "width": 10,
  },
  Object {
    "allowRotation": true,
    "height": 30,
    "width": 10,
  },
  Object {
    "allowRotation": true,
    "height": 40,
    "width": 10,
  },
  Object {
    "allowRotation": true,
    "height": 50,
    "width": 10,
  },
]
`)
})

test('long side sort', () => {
  const testItems = [
    { width: 10, height: 20, allowRotation: true },
    { width: 10, height: 10, allowRotation: true },
    { width: 10, height: 40, allowRotation: true },
    { width: 10, height: 30, allowRotation: true },
    { width: 10, height: 50, allowRotation: true },
    { width: 15, height: 50, allowRotation: true },
    { width: 5, height: 50, allowRotation: true}
  ]
  const sorter = GetSortImplementation(SortStrategy.LongSide, SortDirection.ASC)
  const items = sorter.sort(testItems)

  expect(items).toMatchInlineSnapshot(`
Array [
  Object {
    "allowRotation": true,
    "height": 10,
    "width": 10,
  },
  Object {
    "allowRotation": true,
    "height": 20,
    "width": 10,
  },
  Object {
    "allowRotation": true,
    "height": 30,
    "width": 10,
  },
  Object {
    "allowRotation": true,
    "height": 40,
    "width": 10,
  },
  Object {
    "allowRotation": true,
    "height": 50,
    "width": 5,
  },
  Object {
    "allowRotation": true,
    "height": 50,
    "width": 10,
  },
  Object {
    "allowRotation": true,
    "height": 50,
    "width": 15,
  },
]
`)
})

test('short side sort', () => {
  const testItems = [
    { width: 10, height: 10, allowRotation: true },
    { width: 10, height: 9, allowRotation: true },
    { width: 10, height: 8, allowRotation: true },
    { width: 10, height: 7, allowRotation: true },
    { width: 10, height: 6, allowRotation: true },
    { width: 10, height: 6, allowRotation: true },
    { width: 10, height: 7, allowRotation: true },
    { width: 11, height: 6, allowRotation: true },
    { width: 10, height: 6, allowRotation: true }
  ]
  const sorter = GetSortImplementation(SortStrategy.ShortSide, SortDirection.ASC)
  const items = sorter.sort(testItems)

  expect(items).toMatchInlineSnapshot(`
Array [
  Object {
    "allowRotation": true,
    "height": 6,
    "width": 10,
  },
  Object {
    "allowRotation": true,
    "height": 6,
    "width": 10,
  },
  Object {
    "allowRotation": true,
    "height": 6,
    "width": 10,
  },
  Object {
    "allowRotation": true,
    "height": 6,
    "width": 11,
  },
  Object {
    "allowRotation": true,
    "height": 7,
    "width": 10,
  },
  Object {
    "allowRotation": true,
    "height": 7,
    "width": 10,
  },
  Object {
    "allowRotation": true,
    "height": 8,
    "width": 10,
  },
  Object {
    "allowRotation": true,
    "height": 9,
    "width": 10,
  },
  Object {
    "allowRotation": true,
    "height": 10,
    "width": 10,
  },
]
`)
})

test('ratio sort', () => {
  const testItems = [
    { width: 10, height: 10, allowRotation: true },
    { width: 10, height: 20, allowRotation: true },
    { width: 10, height: 40, allowRotation: true },
    { width: 10, height: 30, allowRotation: true }
  ]
  const sorter = GetSortImplementation(SortStrategy.Ratio, SortDirection.ASC)
  const items = sorter.sort(testItems)

  expect(items).toMatchInlineSnapshot(`
Array [
  Object {
    "allowRotation": true,
    "height": 40,
    "width": 10,
  },
  Object {
    "allowRotation": true,
    "height": 30,
    "width": 10,
  },
  Object {
    "allowRotation": true,
    "height": 20,
    "width": 10,
  },
  Object {
    "allowRotation": true,
    "height": 10,
    "width": 10,
  },
]
`)
})

test('perimeter sort', () => {
  const testItems = [
    { width: 10, height: 10, allowRotation: true },
    { width: 30, height: 30, allowRotation: true },
    { width: 20, height: 20, allowRotation: true }
  ]

  const sorter = GetSortImplementation(SortStrategy.Perimeter, SortDirection.ASC)
  const items = sorter.sort(testItems)

  expect(items).toMatchInlineSnapshot(`
Array [
  Object {
    "allowRotation": true,
    "height": 10,
    "width": 10,
  },
  Object {
    "allowRotation": true,
    "height": 20,
    "width": 20,
  },
  Object {
    "allowRotation": true,
    "height": 30,
    "width": 30,
  },
]
`)
})
