import assert from 'assert'
import converter from '../src'

it('works like the readme promises', () => {
  var steakConverter = converter({
    baseUnitName: 'lb',
    types: [
      {id: 'id1', name: 'case (50lb)', qty: 50},
      {id: 'id2', name: 'porterhouse (1.5lb)', qty: 1.5},
      {id: 'id3', name: 'porterhouse (2lb)', qty: 2}
    ]
  })

  assert.equal(steakConverter.convertTo(100, 'id1'), 2)
  assert.equal(steakConverter.convertTo(90, 'id1'), 1.8)
  assert.equal(steakConverter.strConvertTo(100, 'id1'), "2 x case (50lb)")

  assert.equal(steakConverter.convertFrom(2, 'id1'), 100)
  assert.equal(steakConverter.strConvertFrom(5, 'id1'), "250 x lb")
})

describe('validation', () => {

  it('complains if type.id is not provided', () => {
    assert.throws(() => converter({types: [{qty: 10}]}))
  })

  it('complains if type.qty is not provided', () => {
    assert.throws(() => converter({types: [{id: 'stuff'}]}))
  })

  it('complains if type.qty is not a number or a BigNumber', () => {
    assert.throws(() => converter({types: [{id: 'stuff', qty: '1000'}]}))
  })

})
