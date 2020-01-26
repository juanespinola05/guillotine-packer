import { packer, SortStrategy, SplitStrategy, SelectionStrategy } from '../src/guillotine-packer'
import { Item } from '../src/types'

test('pack item requiring rotation', () => {
  const items = [
    {
      name: 'test',
      width: 30,
      height: 40
    } as Item
  ]

  const result = packer({
    binHeight: 30,
    binWidth: 40,
    items
  })

  expect(result).toMatchInlineSnapshot(`
Array [
  Array [
    Object {
      "bin": 1,
      "height": 30,
      "item": Object {
        "name": "test",
      },
      "width": 40,
      "x": 0,
      "y": 0,
    },
  ],
]
`)
})

test('pack a single', () => {
  const items = [
    {
      name: 'test',
      width: 20,
      height: 20
    } as Item,
    {
      name: 'test2',
      width: 15,
      height: 5
    } as Item
  ]

  const result = packer({
    binHeight: 30,
    binWidth: 40,
    items
  })
  expect(result).toMatchInlineSnapshot(`
Array [
  Array [
    Object {
      "bin": 1,
      "height": 5,
      "item": Object {
        "name": "test2",
      },
      "width": 15,
      "x": 0,
      "y": 0,
    },
    Object {
      "bin": 1,
      "height": 20,
      "item": Object {
        "name": "test",
      },
      "width": 20,
      "x": 0,
      "y": 5,
    },
  ],
]
`)
})

test('should rotate items if it results in more efficent packing', () => {
  const result = packer(
    {
      binHeight: 40,
      binWidth: 80,
      items: [
        {
          name: '40x20',
          width: 40,
          height: 20
        } as Item,
        {
          name: '40x20',
          width: 40,
          height: 20
        } as Item
      ]
    },
    {
      kerfSize: 2,
      sortStrategy: SortStrategy.Area,
      splitStrategy: SplitStrategy.ShortAxisSplit,
      selectionStrategy: SelectionStrategy.BEST_AREA_FIT
    }
  )
  expect(result).toHaveLength(1)
})

test('should not rotate items if allow rotation is disabled', () => {
  const result = packer(
    {
      binHeight: 40,
      binWidth: 80,
      items: [
        {
          name: '40x20',
          width: 40,
          height: 20
        } as Item,
        {
          name: '40x20',
          width: 40,
          height: 20
        } as Item
      ]
    },
    {
      kerfSize: 2,
      sortStrategy: SortStrategy.Area,
      splitStrategy: SplitStrategy.ShortAxisSplit,
      selectionStrategy: SelectionStrategy.BEST_AREA_FIT,
      allowRotation: false
    }
  )
  expect(result).toHaveLength(2)
})

test('pack two', () => {
  const result = packer({
    binHeight: 30,
    binWidth: 30,
    items: [
      {
        name: 'test2',
        width: 20,
        height: 20
      } as Item,
      {
        name: 'test',
        width: 20,
        height: 20
      } as Item
    ]
  })
  expect(result).toMatchInlineSnapshot(`
Array [
  Array [
    Object {
      "bin": 1,
      "height": 20,
      "item": Object {
        "name": "test2",
      },
      "width": 20,
      "x": 0,
      "y": 0,
    },
    Object {
      "bin": 1,
      "height": 20,
      "item": Object {
        "name": "test",
      },
      "width": 20,
      "x": 20,
      "y": 0,
    },
  ],
]
`)
})

test('create kerfs if provided', () => {
  const result = packer(
    {
      binHeight: 30,
      binWidth: 30,
      items: [
        {
          name: 'test',
          width: 20,
          height: 20
        } as Item,
        {
          name: 'kerfed offcut',
          width: 5,
          height: 5
        } as Item
      ]
    },
    { kerfSize: 2 }
  )
  expect(result).toMatchInlineSnapshot(`
Array [
  Array [
    Object {
      "bin": 1,
      "height": 5,
      "item": Object {
        "name": "kerfed offcut",
      },
      "width": 5,
      "x": 0,
      "y": 0,
    },
    Object {
      "bin": 1,
      "height": 20,
      "item": Object {
        "name": "test",
      },
      "width": 20,
      "x": 0,
      "y": 7,
    },
  ],
]
`)
})

test('throw error if item too large for bin', () => {
  const invalidItem = () =>
    packer({
      binHeight: 30,
      binWidth: 30,
      items: [
        {
          width: 40,
          height: 40
        }
      ]
    })
  expect(invalidItem).toThrowError('exceeds bin dimensions')
})