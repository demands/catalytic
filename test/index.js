import assert from 'assert'
import catalytic from '../src'

describe('stateful converters', function() {
  describe('valid converters', function() {
    beforeEach('create converter', function() {
      this.converter = catalytic({
        baseUnitName: 'lb',
        types: [
          {id: 'id1', name: 'case (50lb)', qty: 50},
          {id: 'id2', name: 'porterhouse (1.5lb)', qty: 1.5},
          {id: 'id3', name: 'porterhouse (2lb)', qty: 2}
        ]
      })
    })

    it('converts to provided types', function() {
      assert.equal(this.converter.convertTo(100, 'id1'), 2)
      assert.equal(this.converter.convertTo(90, 'id1'), 1.8)
    })

    it('converts to provided types with a fancy formatted string', function() {
      assert.equal(this.converter.strConvertTo(100, 'id1'), "2 x case (50lb)")
    })

    it('converts from provided types to base unit', function() {
      assert.equal(this.converter.convertFrom(2, 'id1'), 100)
    })

    it('converts from provided types to base unit with a fancy formatted string', function() {
      assert.equal(this.converter.strConvertFrom(5, 'id1'), "250 x lb")
    })

    it('treats a conversion to `undefined` as converting from the base unit to the base unit', function() {
      assert.equal(this.converter.convertTo(5, undefined), 5)
      assert.equal(this.converter.strConvertTo(5, undefined), "5 x lb")
    })

    it('treats a conversion from `undefined` as converting to the base unit from the base unit', function() {
      assert.equal(this.converter.convertFrom(5, undefined), 5)
      assert.equal(this.converter.strConvertFrom(5, undefined), "5 x lb")
    })
  })


  describe('trying to create a converter with invalid input', function() {
    it('complains if type.id is not provided', function() {
      assert.throws(() => converter({types: [{qty: 10}]}))
    })

    it('complains if type.qty is not provided', function() {
      assert.throws(() => converter({types: [{id: 'stuff'}]}))
    })

    it('complains if type.qty is not a number or a BigNumber', function() {
      assert.throws(() => converter({types: [{id: 'stuff', qty: '1000'}]}))
    })
  })
})

describe('static conversion methods', function() {
  it('can convert to unit quantities', function() {
    assert.equal(catalytic.convertToUnitQty({count: 5, unitQty: 10}), 50)
  })

  it('can convert from unit quantities', function() {
    assert.equal(catalytic.convertFromUnitQty({count: 50, unitQty: 10}), 5)
  })
})
